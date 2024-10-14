import { useContext } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { AuthContext } from "@/components/auth";
import { ShowAvatar } from "@/components/avatar";

export default function ProfilePage() {
  const { isLoggedIn, firstName, lastName, email, role } =
    useContext(AuthContext);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 space-y-8 md:py-10">
        {!isLoggedIn && (
          <div className="w-full text-center">
            <h1 className={title()}>Profile</h1>
            <div className="flex flex-col items-center justify-center py-8 space-y-8">
              <p className="md:text-lg">Please sign in to view your profile</p>
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
          <div className="w-full text-center">
            <h1 className={title()}>Profile</h1>
            <div className="flex flex-col items-center justify-center py-8 space-y-8">
              <p className="md:text-lg">Welcome to your profile.</p>
              <p className="md:text-lg">
                You can view and update your profile information here.
              </p>
              <div className="flex flex-col lg:flex-row items-center w-full lg:space-x-8">
                <div className="w-3/5 md:2/5 lg:w-1/3 flex flex-col items-center text-center space-y-4 py-4">
                  <ShowAvatar />
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
                </div>
                <div className="lg:w-2/3 flex flex-col items-start text-center space-y-4 py-4">
                  <p className="md:text-lg text-center">
                    <strong>Role:</strong> {role}
                  </p>
                  <p className="md:text-lg text-center">
                    <strong>First Name:</strong> {firstName}
                  </p>
                  <p className="md:text-lg text-center">
                    <strong>Last Name:</strong> {lastName}
                  </p>
                  <p className="md:text-lg text-center">
                    <strong>Email:</strong> {email}
                  </p>
                  <Button
                    showAnchorIcon
                    as={Link}
                    color="default"
                    href="/profile/update"
                    size="md"
                    variant="bordered"
                  >
                    Update Profile
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
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
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
