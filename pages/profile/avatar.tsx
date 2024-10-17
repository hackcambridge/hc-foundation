import { useContext } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { AuthContext } from "@/components/auth";
import { ShowAvatar, AvatarUpload } from "@/components/avatar";

export default function ProfilePage() {
  const { isLoggedIn, userId, email, role } = useContext(AuthContext);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 space-y-8 md:py-10">
        {!isLoggedIn && (
          <div className="w-full text-center">
            <h1 className={title()}>Profile Avatar</h1>
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
          <div className="flex flex-col w-full items-center gap-4">
            <h1 className={title()}>Profile Avatar</h1>
            <ShowAvatar />
            <AvatarUpload email={email} userId={userId} />
            <div className="flex flex-col items-center justify-center py-8 space-y-8">
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
        )}
      </section>
    </DefaultLayout>
  );
}
