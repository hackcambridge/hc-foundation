import { useContext } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { AuthContext } from "@/components/auth";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function TrusteePage() {
  const authProvider = useContext(AuthContext);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full text-center">
          {authProvider.isLoggedIn && authProvider.role === "Trustee" && (
            <>
              <h1 className={title()}>Trustee</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/trustee/users"
                  variant="bordered"
                >
                  Manage Users
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/trustee/hackers"
                  variant="bordered"
                >
                  Manage Hackers
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/trustee/hackathons"
                  variant="bordered"
                >
                  Manage Hackathons
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/trustee/sponsors"
                  variant="bordered"
                >
                  Manage Sponsors
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/trustee/committee"
                  variant="bordered"
                >
                  Manage Committee
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/trustee/trustees"
                  variant="bordered"
                >
                  View Trustees
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/trustee/admins"
                  variant="bordered"
                >
                  View Admins
                </Button>
              </div>
            </>
          )}
          {(!authProvider.isLoggedIn || authProvider.role !== "Trustee") && (
            <>
              <h1 className={title()}>Trustee</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <p className="text-lg">
                  You are not authorized to access this page.
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
            </>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
