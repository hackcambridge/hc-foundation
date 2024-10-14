import { useContext } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spacer } from "@nextui-org/spacer";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { AuthContext, FirstName, LastName, Email, PasswordInput } from "@/components/auth";

export default function SignUpPage() {
  const { isLoggedIn, isSignedUp, firstName, lastName, signUp } = useContext(AuthContext);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full text-center">
          {isLoggedIn || isSignedUp ? (
            <>
              <h1 className={title()}>
                Welcome, {firstName} {lastName}
              </h1>
              <Spacer y={4} />
              <div className="text-lg py-4 space-y-4">
                <p>You are now signed up and signed in!</p>
                <p>You must log out to sign up again.</p>
                <p>Use the button below to access your account.</p>
                <p>You can customise your profile and avatar.</p>
              </div>
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
            </>
          ) : (
            <>
              <h1 className={title()}>Sign Up</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <FirstName />
                <LastName />
                <Email />
                <PasswordInput />
                <Button
                  className="bg-blue-500 text-white rounded-md px-4 py-2 gap-y-16"
                  color="primary"
                  type="submit"
                  onClick={() => signUp()}
                >
                  Sign Up
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
