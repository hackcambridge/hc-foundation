// import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function HackathonsPage() {
  // const hackathons = [
  //   { year: 2023, image: "/images/2023.png", participants: 150, sponsors: ["Company A", "Company B"] },
  //   { year: 2022, image: "/images/2022.png", participants: 140, sponsors: ["Company C", "Company D"] },
  //   { year: 2021, image: "/images/2021.png", participants: 130, sponsors: ["Company E", "Company F"] },
  //   { year: 2020, image: "/images/2020.png", participants: 120, sponsors: ["Company G", "Company H"] },
  //   { year: 2019, image: "/images/2019.png", participants: 110, sponsors: ["Company I", "Company J"] },
  //   { year: 2018, image: "/images/2018.png", participants: 100, sponsors: ["Company K", "Company L"] },
  //   { year: 2017, image: "/images/2017.png", participants: 90, sponsors: ["Company M", "Company N"] },
  //   { year: 2016, image: "/images/2016.png", participants: 80, sponsors: ["Company O", "Company P"] },
  // ];
  
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Hackathons</h1>
          {/* <Accordion>
            {hackathons.map((hackathon) => (
              <AccordionItem key={hackathon.year} title={`Hackathon ${hackathon.year}`}>
                <div className="flex flex-col items-center">
                  <img src={hackathon.image} alt={`Hackathon ${hackathon.year}`} className="w-full h-auto mb-4" />
                  <p>Participants: {hackathon.participants}</p>
                  <p>Sponsors: {hackathon.sponsors.join(", ")}</p>
                </div>
              </AccordionItem>
            ))}
          </Accordion> */}
        </div>
      </section>
    </DefaultLayout>
  );
}
