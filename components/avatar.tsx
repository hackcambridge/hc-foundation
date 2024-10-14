import { FC, useState, useEffect, useContext } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { AuthContext } from "@/components/auth";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const UserAvatar: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { isLoggedIn, avatar, firstName, lastName, notifications } =
    useContext(AuthContext);
  const { theme } = useTheme();
  
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onChange = () => {
    setIsOpen(!isOpen);
  }

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: isOpen,
    onChange,
  });

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <div>
      <Component
        {...getBaseProps({
          className: clsx(
            "px-0 transition-opacity hover:opacity-80 cursor-pointer",
            className,
            classNames?.base,
          ),
        })}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: clsx(
              [
                "w-12 h-12",
                "bg-transparent",
                "rounded-full",
                "flex items-center justify-center",
                "group-data-[selected=true]:bg-transparent",
                "!text-default-500",
                "pt-px",
                "px-0",
                "mx-0",
              ],
              classNames?.wrapper,
            ),
          })}
        >
          {isLoggedIn ? (
            notifications === 0 ? (
              avatar !== "" ? (
                <Avatar
                  isBordered
                  isFocusable
                  id="avatar"
                  name={`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()}
                  size="sm"
                  src={avatar}
                />
              ) : (
                <Avatar
                  isBordered
                  isFocusable
                  id="avatar"
                  name={`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()}
                  size="sm"
                />
              )
            ) : (
              avatar !== "" ? (
                <Badge
                  color="danger"
                  content={notifications.toString()}
                  placement="top-right"
                  size="sm"
                >
                  <Avatar
                    isBordered
                    isFocusable
                    id="avatar"
                    name={`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()}
                    size="sm"
                    src={avatar}
                  />
                </Badge>
              ) : (
                <Badge
                  color="danger"
                  content={notifications.toString()}
                  placement="top-right"
                  size="sm"
                >
                  <Avatar
                    isBordered
                    isFocusable
                    id="avatar"
                    name={`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()}
                    size="sm"
                  />
                </Badge>
              )
            )
          ) : (
            <Avatar isBordered isFocusable showFallback id="avatar" size="sm" />
          )}
        </div>
      </Component>
      {isSelected && (
        <div className="absolute top-14 right-6 z-10 w-44 mt-2 border rounded shadow-lg">
          {!isLoggedIn ? (
            theme === "dark" ? (
              <>
                <Link
                  className="block px-4 py-2 text-sm text-center text-white hover:bg-gray-700"
                  href="/sign-in"
                >
                  Sign in
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-center text-white hover:bg-gray-700"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="block px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/sign-in"
                >
                  Sign in
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </>
            )
          ) : theme === "dark" ? (
            <>
              <Link
                className="block px-4 py-2 text-sm text-center text-white hover:bg-gray-700"
                href="/profile"
              >
                Profile Settings
              </Link>
              <Link
                className="block px-4 py-2 text-sm text-center text-white hover:bg-gray-700"
                href="/sign-out"
              >
                Sign out
              </Link>
            </>
          ) : (
            <>
              <Link
                className="block px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                href="/profile"
              >
                Profile Settings
              </Link>
              <Link
                className="block px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                href="/sign-out"
              >
                Sign out
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ Avatar uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ Avatar upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected avatar...</p>;
  } else if (status === "invalid") {
    return <p>❌ Avatar must be an image!</p>;
  } else {
    return null;
  }
};

export function ShowAvatar() {
  const { avatar, firstName, lastName } = useContext(AuthContext);

  if (avatar !== "") {
    return (
      <Avatar
        isBordered
        isFocusable
        id="avatar"
        name={`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()}
        size="lg"
        src={avatar}
      />
    );
  } else {
    return (
      <Avatar
        isBordered
        isFocusable
        id="avatar"
        name={`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()}
        size="lg"
      />
    );
  }
}

export function AvatarUpload({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const authProvider = useContext(AuthContext);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarName, setAvatarName] = useState("");
  const [avatarPath, setAvatarPath] = useState("");
  const [avatarType, setAvatarType] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [avatarAvailable, setAvatarAvailable] = useState(false);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "invalid" | "fail"
  >("initial");

  useEffect(() => {
    const fetchData = async () => {
      setAvatarPath(authProvider.avatar);
      if (authProvider.avatar !== "") {
        setAvatarAvailable(true);
      }
      setAvatarType(authProvider.avatarType);
      setAvatarURL(authProvider.avatarURL);
    };

    fetchData();
  }, [email]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      const avatar = e.target.files[0];

      setAvatar(avatar);
      setAvatarName(avatar.name);
      const path =
        "/images/avatars/" + userId + "." + avatar.name.split(".")[1];

      setAvatarPath(path);
      setAvatarType(avatar.type);
      if (avatar.type.split("/")[0] !== "image") {
        setStatus("invalid");
        setAvatar(null);

        return;
      }
      setAvatarURL(URL.createObjectURL(avatar));
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();

    if (avatar) {
      setStatus("uploading");
      try {
        const formData = new FormData();

        formData.append("avatar", avatar, avatarName);

        const res_1 = await fetch(`/api/avatar/upload?userId=${userId}`, {
          method: "POST",
          body: formData,
        });

        const res_role = await fetch(`/api/user/role?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const userRole = await res_role.json();

        const userData = JSON.stringify({
          userID: userId.toString(),
          role: userRole.role.toString(),
          avatarName: avatarName.toString(),
          avatarPath: avatarPath.toString(),
          avatarType: avatarType.toString(),
          avatarURL: avatarURL.toString(),
        });

        const res_2 = await fetch("/api/user/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData,
        });

        const res_3 = await fetch(`/api/avatar/find?avatar=${avatarPath}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data_1 = await res_1.json();
        const data_2 = await res_2.json();
        const data_3 = await res_3.json();

        if (!res_1.ok) {
          setStatus("fail");
          throw new Error(data_1.message);
        } else if (!res_2.ok) {
          setStatus("fail");
          throw new Error(data_2.message);
        } else if (!res_3.ok) {
          setStatus("fail");
          throw new Error(data_3.message);
        } else {
          setStatus("success");
        }
      } catch (error) {
        setStatus("fail");
      }
    }
  };

  return (
    <>
      <div className="group flex flex-col w-full md:w-3/5 is-filled">
        <div
          className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2.5 is-filled"
          data-slot="input-wrapper"
        >
          <label
            className="block text-foreground-500 cursor-text text-xs py-1.5"
            data-slot="label"
            htmlFor="avatar"
          >
            Avatar
            <span className="text-red-500"> *</span>
          </label>
          <div
            className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5"
            data-slot="inner-wrapper"
          >
            <input
              required
              className="w-full font-sm bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground is-filled"
              id="avatar"
              name="avatar"
              type="file"
              onChange={handleAvatarChange}
            />
          </div>
        </div>
      </div>
      {avatarAvailable && (
        <Button
          color="secondary"
          onClick={async () => {
            try {
              const res_1 = await fetch(`/api/avatar/remove?userId=${userId}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const res_role = await fetch(`/api/user/role?email=${email}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const userRole = await res_role.json();

              const userData = JSON.stringify({
                userID: userId.toString(),
                role: userRole.role.toString(),
                avatarName: "",
                avatarPath: "",
                avatarType: "",
                avatarURL: "",
              });

              const res_2 = await fetch("/api/user/save", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: userData,
              });

              const data_1 = await res_1.json();
              const data_2 = await res_2.json();

              if (!res_1.ok) {
                setStatus("fail");
                throw new Error(data_1.message);
              } else if (!res_2.ok) {
                setStatus("fail");
                throw new Error(data_2.message);
              }

              setAvatar(null);
              setAvatarName("");
              setAvatarPath("");
              setAvatarType("");
              setAvatarURL("");
              setStatus("success");
            } catch (error) {
              console.error(error);
              setStatus("fail");
            }
          }}
        >
          Remove avatar
        </Button>
      )}
      {avatar && <p className="text-sm">Selected avatar: {avatarName}</p>}
      {avatar && (
        <Image
          alt="Selected avatar preview"
          className="mt-2 rounded-full"
          src={avatarURL}
          width={100}
        />
      )}
      {avatar && (
        <button
          className="mt-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          type="submit"
          onClick={() => setAvatar(null)}
        >
          Clear selected avatar
        </button>
      )}
      {avatar && (
        <button
          className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          type="submit"
          onClick={handleSubmit}
        >
          Upload avatar
        </button>
      )}
      <Result status={status} />
    </>
  );
}
