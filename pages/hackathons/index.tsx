import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Hackathon } from "@/utils/types";

export default function HackathonsPage() {
  const [isFetching, setIsFetching] = useState(true);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [hackathonKeys, setHackathonKeys] = useState(new Set(["0"]));
  const { theme } = useTheme();

  useEffect(() => {
    async function getHackathonData() {
      const response = await fetch("/api/hackathon/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data) {
          setHackathons(data);
        }
      }
    }

    if (isFetching && hackathons.length === 0) {
      setIsFetching(false);
      getHackathonData();
    }
  }, [hackathons, isFetching]);
  
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full md:w-3/5 text-center justify-center">
          <h1 className={title()}>Hackathons</h1>
          <Accordion
            className="py-8 mx-auto"
            selectedKeys={hackathonKeys}
            variant="splitted"
            onSelectionChange={(keys) => {
              setHackathonKeys((prevKeys) => {
                const newKeys = new Set(prevKeys);

                (keys as unknown as string[]).forEach((key) => {
                  if (newKeys.has(key)) {
                    newKeys.delete(key);
                  } else {
                    newKeys.add(key);
                  }
                });

                return newKeys;
              });
            }}
          >
            {hackathons.map((hackathon, index) => (
              <AccordionItem
                key={index.toString()}
                title={
                  <div className="flex items-center justify-between w-full gap-4">
                    {theme === "light" ? (
                      <Image
                        src={hackathon.logoLight}
                        alt={hackathon.shortName}
                        width={100}
                      />
                    ) : (
                      <Image
                        src={hackathon.logoDark}
                        alt={hackathon.shortName}
                        width={100}
                      />
                    )}
                    <div className="flex flex-col w-full items-start ml-8">
                      <p>{hackathon.name}</p>
                      <p>{hackathon.year}</p>
                    </div>
                  </div>
                }
              >
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                  <Button
                    showAnchorIcon
                    as={Link}
                    href={`${hackathon.website}`}
                    variant="bordered"
                  >
                    View Hackathon Website
                  </Button>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </DefaultLayout>
  );
}
