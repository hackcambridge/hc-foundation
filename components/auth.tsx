import { useState, createContext, ReactNode, useEffect, useContext } from "react";
import { Input } from "@nextui-org/input";

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

export const AuthContext = createContext({
  isLoggedIn: false,
  isSigningIn: false,
  isSignedUp: false,
  isEmailValid: false,
  isPasswordValid: false,
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
});

export function AuthProviderComponent({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
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
      isEmailValid,
      isPasswordValid,
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
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function FirstName() {
  const [firstNameInput, setFirstNameInput] = useState("");
  const { setFirstName } = useContext(AuthContext);

  useEffect(() => {
    setFirstName(firstNameInput);
  }, [firstNameInput]);

  return (
    <Input
      fullWidth
      isRequired
      className="w-full md:w-3/5"
      id="first-name"
      label="First Name"
      placeholder="Enter your first name"
      type="text"
      value={firstNameInput}
      onValueChange={setFirstNameInput}
    />
  );
}

export function FirstNameUpdate() {
  const [firstNameInput, setFirstNameInput] = useState("");
  const { firstName, setFirstName } = useContext(AuthContext);

  useEffect(() => {
    if (firstName !== "") {
      setFirstNameInput(firstName);
    }
  }, [firstName]);

  useEffect(() => {
    setFirstName(firstNameInput);
  }, [firstNameInput]);

  return (
    <Input
      fullWidth
      isRequired
      className="w-full md:w-3/5"
      id="first-name"
      label="First Name"
      placeholder="Enter your first name"
      type="text"
      value={firstNameInput}
      onValueChange={setFirstNameInput}
    />
  );
}

export function LastName() {
  const [lastNameInput, setLastNameInput] = useState("");
  const { setLastName } = useContext(AuthContext);

  useEffect(() => {
    setLastName(lastNameInput);
  }, [lastNameInput]);

  return (
    <Input
      fullWidth
      isRequired
      className="w-full md:w-3/5"
      id="last-name"
      label="Last Name"
      placeholder="Enter your last name"
      type="text"
      value={lastNameInput}
      onValueChange={setLastNameInput}
    />
  );
}

export function LastNameUpdate() {
  const [lastNameInput, setLastNameInput] = useState("");
  const { lastName, setLastName } = useContext(AuthContext);

  useEffect(() => {
    if (lastName !== "") {
      setLastNameInput(lastName);
    }
  }, [lastName]);

  useEffect(() => {
    setLastName(lastNameInput);
  }, [lastNameInput]);

  return (
    <Input
      fullWidth
      isRequired
      className="w-full md:w-3/5"
      id="last-name"
      label="Last Name"
      placeholder="Enter your last name"
      type="text"
      value={lastNameInput}
      onValueChange={setLastNameInput}
    />
  );
}

export function Email() {
  const [emailInput, setEmailInput] = useState("");
  const { setEmail, validateEmail, isEmailValid } = useContext(AuthContext);

  useEffect(() => {
    setEmail(emailInput);
    validateEmail();
  }, [emailInput]);

  return (
    <Input
      fullWidth
      isRequired
      className="w-full md:w-3/5"
      color={isEmailValid ? "default" : "danger"}
      errorMessage="Please enter a valid email"
      id="email"
      isInvalid={!isEmailValid}
      label="Email"
      placeholder="Enter your email address"
      type="email"
      value={emailInput}
      onValueChange={setEmailInput}
    />
  );
}

export function EmailUpdate() {
  const [emailInput, setEmailInput] = useState("");
  const { email, setEmail, validateEmail, isEmailValid } =
    useContext(AuthContext);

  useEffect(() => {
    if (email !== "") {
      setEmailInput(email);
    }
  }, [email]);

  useEffect(() => {
    setEmail(emailInput);
    validateEmail();
  }, [emailInput]);

  return (
    <Input
      fullWidth
      isRequired
      className="w-full md:w-3/5"
      color={isEmailValid ? "default" : "danger"}
      errorMessage="Please enter a valid email"
      id="email"
      isInvalid={!isEmailValid}
      label="Email"
      placeholder="Enter your email address"
      type="email"
      value={emailInput}
      onValueChange={setEmailInput}
    />
  );
}

export function PasswordInput() {
  const [passwordInput, setPasswordInput] = useState("");
  const { setPassword, validatePassword } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setPassword(passwordInput);
    validatePassword();
  }, [passwordInput]);

  return (
    <Input
      fullWidth
      isRequired
      className="w-full md:w-3/5"
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      id="password"
      label="Password"
      placeholder="Enter your password"
      type={isVisible ? "text" : "password"}
      value={passwordInput}
      onValueChange={setPasswordInput}
    />
  );
}

export function Password() {
  const [passwordInput, setPasswordInput] = useState("");
  const { setPassword, validatePassword, isPasswordValid } =
    useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setPassword(passwordInput);
    validatePassword();
  }, [passwordInput]);

  return (
    <Input
      fullWidth
      isRequired
      className="w-full md:w-3/5"
      color={isPasswordValid ? "default" : "danger"}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      errorMessage={
        <p className="text-sm text-danger-500">
          Password minimum requirements:
          <ul>
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>
        </p>
      }
      id="password"
      isInvalid={!isPasswordValid}
      label="Password"
      placeholder="Enter your password"
      type={isVisible ? "text" : "password"}
      value={passwordInput}
      onValueChange={setPasswordInput}
    />
  );
}
