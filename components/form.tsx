import { useContext, useEffect, useState } from "react";

import { Input } from "@nextui-org/input";

import { AuthContext } from "@/components/auth";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

export function FirstName({ type }: { type?: string }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const { firstName, setFirstName } = useContext(AuthContext);

  useEffect(() => {
    if (firstName !== "" && !isUpdated && type === "update") {
      setFirstNameInput(firstName);
      setIsUpdated(true);
    }
  }, [firstName, type]);

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

export function LastName({ type }: { type?: string }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [lastNameInput, setLastNameInput] = useState("");
  const { lastName, setLastName } = useContext(AuthContext);

  useEffect(() => {
    if (lastName !== "" && !isUpdated && type === "update") {
      setLastNameInput(lastName);
      setIsUpdated(true);
    }
  }, [lastName, type]);

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

export function Email({ type }: { type?: string }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const { email, setEmail, validateEmail, isEmailValid } =
    useContext(AuthContext);

  useEffect(() => {
    if (email !== "" && !isUpdated && type === "update") {
      setEmailInput(email);
      setIsUpdated(true);
    }
  }, [email, type]);

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

export function Password({ type }: { type?: string }) {
  const [passwordInput, setPasswordInput] = useState("");
  const { password, setPassword, validatePassword, isPasswordValid } =
    useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    validatePassword();
  }, [password])
  
  useEffect(() => {
    setPassword(passwordInput);
  }, [passwordInput]);

  return (
    <Input
      fullWidth
      isRequired
      className="w-full md:w-3/5"
      color={isPasswordValid || type === "input" ? "default" : "danger"}
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
      isInvalid={!isPasswordValid && type === "update"}
      label="Password"
      placeholder="Enter your password"
      type={isVisible ? "text" : "password"}
      value={passwordInput}
      onValueChange={setPasswordInput}
    />
  );
}
