import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/input";

import { AuthContext } from "@/components/auth";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Hackathon } from "@/utils/types";
import { Button } from "@nextui-org/button";

export default function HackathonEditPage() {
  const authProvider = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [logoLight, setLogoLight] = useState("");
  const [logoDark, setLogoDark] = useState("");
  const [website, setWebsite] = useState("");

  const router = useRouter();
  const { year } = router.query;

  useEffect(() => {
    async function getHackathonData() {
      const response = await fetch(`/api/hackathon/find?year=${year}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authProvider.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data) {
          setHackathon(data);
          setName(data.name);
          setShortName(data.shortName);
          setLogoLight(data.logoLight);
          setLogoDark(data.logoDark);
          setWebsite(data.website);
        }
      }
    }

    if (isFetching && !hackathon) {
      setIsFetching(false);
      getHackathonData();
    }
  }, [hackathon, isFetching]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          {authProvider.isLoggedIn && ["Admin", "Committee", "Trustee"].includes(authProvider.role) && (
            <>
              <h1 className={title()}>Edit Hackathon</h1>
              <div className="flex flex-col items-center justify-center py-8 space-y-8">
                <Input
                  isDisabled
                  label="Year"
                  placeholder="YYYY"
                  value={year as string ?? ""}
                />
                <Input
                  label="Name"
                  placeholder="Hackathon Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Short Name"
                  placeholder="Short Name"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                />
                <Input
                  label="Logo (Light)"
                  placeholder="URL"
                  value={logoLight}
                  onChange={(e) => setLogoLight(e.target.value)}
                />
                <Input
                  label="Logo (Dark)"
                  placeholder="URL"
                  value={logoDark}
                  onChange={(e) => setLogoDark(e.target.value)}
                />
                <Input
                  label="Website"
                  placeholder="URL"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <Button
                  onClick={async () => {
                    const response = await fetch(`/api/hackathon/edit?year=${year}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authProvider.accessToken}`,
                      },
                      body: JSON.stringify({
                        name,
                        shortName,
                        logoLight,
                        logoDark,
                        website,
                      }),
                    });

                    if (response.ok) {
                      router.push("/hackathons");
                    }
                  }}
                >
                  Update
                </Button>
              </div>
            </>
          )}
          {!authProvider.isLoggedIn || !["Admin", "Committee", "Trustee"].includes(authProvider.role) && (
            <>
              <h1 className={title()}>Edit Hackathon</h1>
              <p className="text-lg">You do not have permission to edit hackathons.</p>
            </>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}