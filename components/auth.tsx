import { useState, createContext, ReactNode, useEffect, useContext } from "react";
import { Input } from "@nextui-org/input";

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

export const AuthContext = createContext({
  isLoggedIn: false,
  isSigningIn: false,
  isSignedUp: false,
  isUpdated: false,
  isEmailValid: false,
  isPasswordValid: false,
  userId: "",
  avatar: "",
  avatarType: "",
  avatarURL: "",
  firstName: "",
  setFirstName: (value: string) => {},
  lastName: "",
  setLastName: (value: string) => {},
  email: "",
  setEmail: (value: string) => {},
  validateEmail: () => {},
  password: "",
  setPassword: (value: string) => {},
  validatePassword: () => {},
  role: "",
  accessToken: "",
  notifications: 0,
  signIn: async () => {},
  signInAgain: () => {},
  signUp: async () => {},
  signUpAgain: () => {},
  signOut: async () => {},
  updateUser: async () => {},
});

export function AuthProviderComponent({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarType, setAvatarType] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    async function checkToken() {
      const response = await fetch("/api/user/check-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();

      if (response.ok) {
        setIsTokenValid(data?.valid);
      }
    }

    async function getUser() {
      const response = await fetch("/api/user/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setUserId(data?.user._id);
        setAvatar(data?.user.avatar);
        setAvatarType(data?.user.avatarType);
        setAvatarURL(data?.user.avatarURL);
        setFirstName(data?.user.firstName);
        setLastName(data?.user.lastName);
        setEmail(data?.user.email);
        setRole(data?.role);
        setAccessToken(data?.token);
        setNotifications(data?.user.notifications);
      }
    }

    if (email && role && token) {
      checkToken();

      if (isTokenValid) {
        setIsLoggedIn(true);
        getUser();
      }
    }
  }, [isTokenValid]);

  const signInFormData = JSON.stringify({
    email,
    password,
  });

  async function signIn() {
    const response = await fetch("/api/user/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: signInFormData,
    });
    const data = await response.json();

    if (response.ok) {
      setIsLoggedIn(true);
      setIsSigningIn(true);
      setUserId(data?.user._id);
      setAvatar(data?.user.avatar);
      setAvatarType(data?.user.avatarType);
      setAvatarURL(data?.user.avatarURL);
      setFirstName(data?.user.firstName);
      setLastName(data?.user.lastName);
      setEmail(data?.user.email);
      setRole(data?.role);
      setAccessToken(data?.token);
      setNotifications(data?.user.notifications);
      sessionStorage.setItem("email", data?.user.email);
      sessionStorage.setItem("role", data?.role);
      sessionStorage.setItem("token", data?.token);
    }
  }

  function signInAgain() {
    setIsSigningIn(false);
  }

  const signUpFormData = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
  });

  async function signUp() {
    const response = await fetch("/api/user/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: signUpFormData,
    });
    const data = await response.json();

    if (response.ok) {
      setIsLoggedIn(true);
      setIsSignedUp(true);
      setUserId(data?.user._id);
      setAvatar(data?.user.avatar);
      setAvatarType(data?.user.avatarType);
      setAvatarURL(data?.user.avatarURL);
      setFirstName(data?.user.firstName);
      setLastName(data?.user.lastName);
      setEmail(data?.user.email);
      setRole(data?.role);
      setAccessToken(data?.token);
      setNotifications(data?.user.notifications);
      sessionStorage.setItem("email", data?.user.email);
      sessionStorage.setItem("role", data?.role);
      sessionStorage.setItem("token", data?.token);
    }
  }

  function signUpAgain() {
    setIsSignedUp(false);
  }

  async function signOut() {
    setIsLoggedIn(false);
    setUserId("");
    setAvatar("");
    setAvatarType("");
    setAvatarURL("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
    setAccessToken("");
    setNotifications(0);
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
  }

  const updateFormData = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
  });

  async function updateUser() {
    const response = await fetch(
      `/api/user/update?userID=${userId}&role=${role}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: updateFormData,
      },
    );

    if (response.ok) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }

  function validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    setIsEmailValid(email.length > 6 ? emailRegex.test(email) : true);
  }

  function validatePassword() {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
  
    setIsPasswordValid(passwordRegex.test(password));
  }
  
  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      isSigningIn,
      isSignedUp,
      isUpdated,
      isEmailValid,
      isPasswordValid,
      userId,
      avatar,
      avatarType,
      avatarURL,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      email,
      setEmail,
      validateEmail,
      password,
      setPassword,
      validatePassword,
      role,
      accessToken,
      notifications,
      signIn,
      signInAgain,
      signUp,
      signUpAgain,
      signOut,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
