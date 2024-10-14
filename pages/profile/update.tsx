import { useContext } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {
  AuthContext,
  FirstNameUpdate,
  LastNameUpdate,
  EmailUpdate,
  Password,
} from "@/components/auth";

export default function ProfilePage() {
  const { isLoggedIn, isUpdated, role, updateUser } = useContext(AuthContext);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 space-y-8 md:py-10">
        {!isLoggedIn && (
          <div className="w-full text-center">
            <h1 className={title()}>Update Profile</h1>
            <div className="flex flex-col items-center justify-center py-8 space-y-8">
              <p className="text-lg text-default-600">
                Please sign in to view your profile
              </p>
              <Button
                showAnchorIcon
                as={Link}
                color="default"
                href="/sign-in"
                size="md"
                variant="bordered"
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
        {isLoggedIn && (
          <>
            <div className="w-full text-center">
              <h1 className={title()}>Update Profile</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                {isUpdated && (
                  <>
                    <p className="theme_bright_green">
                      Your profile has been updated successfully
                    </p>
                  </>
                )}
                {!isUpdated && (
                  <>
                    <p className="text-lg">
                      Use the form below to update your profile
                    </p>
                    <Input
                      fullWidth
                      isDisabled
                      className="w-full md:w-3/5"
                      id="role"
                      label="Role"
                      type="text"
                      value={role}
                    />
                    <FirstNameUpdate />
                    <LastNameUpdate />
                    <EmailUpdate />
                    <Password />
                    <Button
                      className="bg-blue-500 text-white rounded-md px-4 py-2 gap-y-16"
                      color="primary"
                      type="submit"
                      onClick={() => updateUser()}
                    >
                      Update Profile
                    </Button>
                  </>
                )}
              </div>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                {role === "Admin" && (
                  <Button
                    showAnchorIcon
                    as={Link}
                    color="default"
                    href="/profile/avatar"
                    size="md"
                    variant="bordered"
                  >
                    Update Avatar
                  </Button>
                )}
                <Button
                  showAnchorIcon
                  as={Link}
                  color="default"
                  href="/profile"
                  size="md"
                  variant="bordered"
                >
                  Go to Profile
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  color="default"
                  href={`/${role.toLowerCase()}`}
                  size="md"
                  variant="bordered"
                >
                  Go to {role} Panel
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
    </DefaultLayout>
  );
}
