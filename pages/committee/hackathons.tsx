import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { AuthContext } from "@/components/auth";
import { Hackathon } from "@/utils/types";

export default function CommitteeHackersPage() {
  const authProvider = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/hackathon/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authProvider.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setHackathons(data);
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
              <h1 className={title()}>Committee Member Hackathons</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <div className="flex flex-col w-full">
                  <span className="text-4xl font-bold">{hackathons?.length}</span>
                  <span className="text-lg">Hackathons</span>
                </div>
                {!hasAccess && (
                  <Spinner
                    className="py-8"
                    color="warning"
                    label="Loading..."
                    size="md"
                  />
                )}
                {hasAccess && hackathons.length === 0 && (
                  <p className="text-lg">No hackathons found.</p>
                )}
                {hasAccess && (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="py-2 text-xs md:text-base">Year</th>
                        <th className="py-2 text-xs md:text-base">Logo</th>
                        <th className="py-2 text-xs md:text-base">
                          <div className="hidden sm:flex sm:flex-col">
                            Name
                          </div>
                        </th>
                        <th className="py-2 text-xs md:text-base">
                          <div className="hidden sm:flex sm:flex-col">
                            Short Name
                          </div>
                        </th>
                        <th className="py-2 text-xs md:text-base">
                          <div className="hidden sm:flex sm:flex-col">
                            Website
                          </div>
                        </th>
                        <th className="py-2 text-xs md:text-base">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hackathons.map((event, index) => (
                        <tr key={index} className="text-center">
                          <td className="py-2 px-auto text-xs md:text-base">
                            <div className="flex justify-center">
                              {event.year}
                            </div>
                          </td>
                          <td className="py-2 px-auto text-xs md:text-base">
                            <div className="flex justify-center">
                              <Avatar
                                showFallback
                                alt={event.shortName}
                                className="w-8 h-8 rounded-full"
                                name={`${event.shortName[0]}`}
                                src={theme === "light" ? event.logoLight : event.logoDark}
                              />
                            </div>
                          </td>
                          <td className="py-2 text-xs md:text-base">
                            <div className="hidden sm:flex sm:flex-col">
                              {event.name}
                            </div>
                          </td>
                          <td className="py-2 text-xs md:text-base">
                            <div className="hidden sm:flex sm:flex-col">
                              {event.shortName}
                            </div>
                          </td>
                          <td className="py-2 text-xs md:text-base">
                            <div className="hidden sm:flex sm:flex-col">
                              {event.website}
                            </div>
                          </td>
                          <td>
                            <Button
                              className="py-2 text-xs md:text-base"
                              as={Link}
                              href={`/hackathons/edit?year=${event.year}`}
                            >
                              Edit
                            </Button>
                            <Button
                              className="py-2 text-xs md:text-base"
                              onClick={async () => {
                                await fetch(`/api/hackathon/delete`, {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${authProvider.accessToken}`,
                                  },
                                  body: JSON.stringify({ year: event.year }),
                                });
                                setIsFetching(true);
                              }}
                            >
                              Delete
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
                  href="/hackathons/add"
                  size="md"
                  variant="bordered"
                >
                  Add Hackathon
                </Button>
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
              <h1 className={title()}>Committee Member Hackathons</h1>
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
