import { useContext } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { AuthContext } from "@/components/auth";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function AdminPage() {
  const authProvider = useContext(AuthContext);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full text-center">
          {authProvider.isLoggedIn && authProvider.role === "Admin" && (
            <>
              <h1 className={title()}>Admin</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/admin/users"
                  variant="bordered"
                >
                  Manage Users
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/admin/hackers"
                  variant="bordered"
                >
                  Manage Hackers
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/admin/hackathons"
                  variant="bordered"
                >
                  Manage Hackathons
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/admin/sponsors"
                  variant="bordered"
                >
                  Manage Sponsors
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/admin/committee"
                  variant="bordered"
                >
                  Manage Committee
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/admin/trustees"
                  variant="bordered"
                >
                  Manage Trustees
                </Button>
                <Button
                  showAnchorIcon
                  as={Link}
                  href="/admin/admins"
                  variant="bordered"
                >
                  Manage Admins
                </Button>
              </div>
            </>
          )}
          {(!authProvider.isLoggedIn || authProvider.role !== "Admin") && (
            <>
              <h1 className={title()}>Admin</h1>
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
