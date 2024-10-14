import { useContext } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { AuthContext, Email, PasswordInput } from "@/components/auth";

export default function SignInPage() {
  const { isLoggedIn, role, isSigningIn, signIn, signInAgain } = useContext(AuthContext);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full text-center">
          {isLoggedIn && (
            <>
              <h1 className={title()}>Welcome Back!</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <p className="text-lg text-default-600">
                  Use the button below to access your account.
                </p>
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
                {role === "Admin" && (
                  <>
                    <p className="text-lg text-default-600">
                      You are logged in as an admin.
                    </p>
                    <p className="text-lg text-default-600">
                      Use the button below to access the admin panel.
                    </p>
                    <Button
                      showAnchorIcon
                      as={Link}
                      color="default"
                      href="/admin"
                      size="md"
                      variant="bordered"
                    >
                      Go to Admin Panel
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
          {!isLoggedIn && isSigningIn && (
            <>
              <h1 className={title()}>Sign In</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <p className="text-lg text-default-600">
                  An error occurred while signing in. Please try again.
                </p>
                <Button
                  className="bg-blue-500 text-white rounded-md px-4 py-2 gap-y-16"
                  color="primary"
                  type="submit"
                  onClick={() => signInAgain()}
                >
                  Try Again
                </Button>
              </div>
            </>
          )}
          {!isLoggedIn && !isSigningIn && (
            <>
              <h1 className={title()}>Sign In</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <Email />
                <PasswordInput />
                <Button
                  className="bg-blue-500 text-white rounded-md px-4 py-2 gap-y-16"
                  color="primary"
                  type="submit"
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  color="default"
                  href="/sign-up"
                  size="md"
                  variant="bordered"
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
