import { useContext, useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { AuthContext } from "@/components/auth";
import { User } from "@/utils/types";

export default function CommitteeHackersPage() {
  const authProvider = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [hackers, setHackers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/hacker/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authProvider.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setHackers(data);
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    }

    const sessionRole = window.sessionStorage.getItem("role")?.toString();

    if (authProvider.isLoggedIn && sessionRole === "Committee" && isFetching) {
      setIsFetching(false);
      fetchData();
    }
  }, [authProvider, isFetching]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full text-center">
          {authProvider.isLoggedIn && authProvider.role === "Committee" && (
            <>
              <h1 className={title()}>Committee Member Hackers</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <div className="flex flex-col w-full">
                  <span className="text-4xl font-bold">{hackers?.length}</span>
                  <span className="text-lg">Hackers</span>
                </div>
                {!hasAccess && (
                  <Spinner
                    className="py-8"
                    color="warning"
                    label="Loading..."
                    size="md"
                  />
                )}
                {hasAccess && hackers.length === 0 && (
                  <p className="text-lg">No hackers found.</p>
                )}
                {hasAccess && (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="py-2 text-xs md:text-base">Avatar</th>
                        <th className="py-2 text-xs md:text-base">
                          <div className="hidden sm:flex sm:flex-col">
                            Full Name
                          </div>
                        </th>
                        <th className="py-2 text-xs md:text-base">
                          <div className="hidden md:flex md:flex-col">
                            Email Address
                          </div>
                        </th>
                        <th className="py-2 text-xs md:text-base">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hackers.map((user, index) => (
                        <tr key={index} className="text-center">
                          <td className="py-2 px-auto text-xs md:text-base">
                            <div className="flex justify-center">
                              <Avatar
                                showFallback
                                alt={user.avatarName}
                                className="w-8 h-8 rounded-full"
                                name={`${user.firstName[0]}${user.lastName[0]}`}
                                src={user.avatar}
                              />
                            </div>
                          </td>
                          <td className="py-2 text-xs md:text-base">
                            <div className="hidden sm:flex sm:flex-col">
                              {user.firstName} {user.lastName}
                            </div>
                          </td>
                          <td className="py-2 text-xs md:text-base">
                            <div className="hidden md:flex md:flex-col">
                              {user.email}
                            </div>
                          </td>
                          <td>
                            <Button
                              className="py-2 text-xs md:text-base"
                              onClick={async () => {
                                await fetch(`/api/hacker/demote`, {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${authProvider.accessToken}`,
                                  },
                                  body: JSON.stringify({
                                    email: user.email,
                                  }),
                                });
                                setIsFetching(true);
                              }}
                            >
                              Make User
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <Button
                  showAnchorIcon
                  as={Link}
                  color="default"
                  href="/committee"
                  size="md"
                  variant="bordered"
                >
                  Go to Committee Panel
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
              </div>
            </>
          )}
          {(!authProvider.isLoggedIn || authProvider.role !== "Committee") && (
            <>
              <h1 className={title()}>Committee Member Hackers</h1>
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
