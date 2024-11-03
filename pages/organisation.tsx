import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Trustee } from "@/utils/types";

export default function OrganisationPage() {
  const [isFetching, setIsFetching] = useState(true);
  const [trustees, setTrustees] = useState<Trustee[]>([]);

  useEffect(() => {
    async function getTrusteesData() {
      const response = await fetch("/api/trustee/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data) {
          setTrustees(data);
        }
      }
    }

    if (isFetching && trustees.length === 0) {
      setIsFetching(false);
      getTrusteesData();
    }
  }, [trustees, isFetching]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full text-center justify-center">
          <h1 className={title()}>Trustees</h1>
          <p className="px-grotesk text-md sm:text-lg pt-8">
            The Hack Cambridge Foundation is governed by a board of trustees.
            The trustees are responsible for the overall governance and strategic direction of the charity.
            These trustees are also directors of the company for the purposes of company law.
            Trustees are volunteers and receive no remuneration.
            Usually, the trustees meet four times a year to discuss the charity&apos;s progress and future plans.
            They are also responsible for ensuring that the charity complies with the law and its governing document.
            They are all ex-committee members of Hack Cambridge.
          </p>
          <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustees.map((trustee, index) => (
              <Card isFooterBlurred key={index} className="w-full">
                <Image
                  removeWrapper
                  src={trustee.avatar}
                  alt={`${trustee.firstName[0]}${trustee.lastName[0]}`}
                  height="100%"
                  width="100%"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                  <div className="flex flex-col w-full items-center justify-center gap-2">
                    <h2 className="font-bold">{trustee.firstName} {trustee.lastName}</h2>
                    <a href={`mailto:${trustee.email}`}>{trustee.email}</a>
                    <a href={`tel:${trustee.phone}`}>{trustee.phone}</a>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <h1 className={title()}>Organising Committee</h1>
          <p className="px-grotesk text-md sm:text-lg py-8">
            The Hack Cambridge Foundation is run by a committee of student volunteers.
            The committee is responsible for the day-to-day running of the charity.
            The Hack Cambridge Committee works in division with each of them having a specific set of responsibilities.
            The committee meets regularly to discuss the charity&apos;s progress and future plans.
            One of the main roles of the committee is to organise the annual Hack Cambridge hackathon.
            The committee is made up of ex-committee members of Hack Cambridge, as well as other volunteers.
            No prior experience is required to join the committee, and we welcome new members.
          </p>
          <h2 className={subtitle()}>General Manager</h2>
          <p className="px-grotesk text-md sm:text-lg pb-8">
            The General Manager is responsible for piecing together the different parts of the hackathon through bringing the team&apos;s work together and ensuring nothing is missed.
            The General Manager also acts as a point of contact for the trustees of the Hack Cambridge Foundation and controls the creative direction of Hack Cambridge.
            Strong team management skills are a must for this role. Therefore, it is usually filled by the best member from the previous year&apos;s committee.
          </p>
          <h2 className={subtitle()}>Design Team</h2>
          <p className="px-grotesk text-md sm:text-lg pb-8">
            The Design team, led by the Head of Design, controls the creative direction of the Hack Cambridge brand.
            The design team is responsible for everything from creating the event&apos;s logo and branding guidelines to sourcing and designing Hack Cambridge stash, so that people wear it with a smile.
            The design team is also responsible for designing the event&apos;s website and social media graphics.
          </p>
          <h2 className={subtitle()}>Development Team</h2>
          <p className="px-grotesk text-md sm:text-lg pb-8">
            The Development team, led by the Head of Development, is responsible for building and maintaining the Hack Cambridge hackathon website.
            The team is also responsible for building and maintaining the Hack Cambridge registration system for hacker applications.
            They are also responsible for building and maintaining the Hack Cambridge judging system and sponsors portal.
            They also help the Head of Publicity with distributing key information to hackers.
            Some technologies employed by the current Hack Cambridge system setup are: Node, Next, React, Vercel, Laravel (PHP), AWS, TerraForm, Auth0.
            Coding experience is useful, although getting into the environment is straightforward.
          </p>
          <h2 className={subtitle()}>Finance Team</h2>
          <p className="px-grotesk text-md sm:text-lg pb-8">
            The Finance team, led by the Head of Finance, is responsible for managing the Hack Cambridge budget.
            They are responsible for creating and updating the budget, as well as managing the charity&apos;s bank accounts.
            The team is also responsible for ensuring that the charity complies with financial regulations.
            The finance team is also responsible for managing the charity&apos;s financial relationships with sponsors and partners, overseeing all incoming sponsorships.
            This role also includes organising the annual Hack Cambridge dinner which usually takes place in Michaelmas term.
            No prior knowledge is required, although a basic understanding of accounting and VAT is useful.
          </p>
          <h2 className={subtitle()}>Logistics Team</h2>
          <p className="px-grotesk text-md sm:text-lg pb-8">
            The Logistics team, led by the Head of Logistics, is responsible for organising the physical aspects of the Hack Cambridge hackathon.
            The team is responsible for sourcing and ordering the event&apos;s food and drink, as well as organising the event&apos;s venue.
            They are also responsible for organising the event&apos;s security and first aid, the event&apos;s transport and accommodation, and the event&apos;s merchandise and swag.
            This requires effective, detailed planning before the event, and help from the rest of the committee in the planning and execution process where necessary.
          </p>
          <h2 className={subtitle()}>Publicity Team</h2>
          <p className="px-grotesk text-md sm:text-lg pb-8">
            The Publicity team, led by the Head of Publicity, is responsible for promoting the Hack Cambridge hackathon.
            The team is responsible for creating and distributing marketing materials, as well as managing the Hack Cambridge social media accounts.
            The team is also responsible for liaising with the press and other media outlets to promote the event.
            The publicity team is also responsible for organising the Hack Cambridge launch event, which usually takes place in Lent term.
            No prior knowledge is required, although a basic understanding of marketing and social media is useful.
          </p>
          <h2 className={subtitle()}>Sponsorship Team</h2>
          <p className="px-grotesk text-md sm:text-lg pb-8">
            The Sponsorship team, led by the Head of Sponsorship, is responsible for securing sponsorship for the Hack Cambridge hackathon.
            The team is responsible for creating and updating the sponsorship prospectus, as well as managing the charity&apos;s relationships with sponsors.
            The team is also responsible for organising the Hack Cambridge sponsor fair, which usually takes place in Lent term.
            The sponsorship team is also responsible for organising the charity&apos;s relationships with partners and other stakeholders.
            They play a key role in securing the charity&apos;s financial future, and ensuring that the charity can continue to run the Hack Cambridge hackathon, which is absolutely free for everyone.
            This role requires strong communication skills and the ability to build and maintain relationships with sponsors.
          </p>
          <h2 className={subtitle()}>Volunteers Team</h2>
          <p className="px-grotesk text-md sm:text-lg pb-8">
            Even with the whole committee onboard, the event would not be possible without the help of our volunteers.
            These volunteers are students who give up their free time to attend Hack Cambridge and help hackers thrive.
            The Volunteers Coordinator recruits and organisers volunteers, and in the end becomes an essential part of the Volunteers team too!
            The volunteers team is responsible for ensuring that the event runs smoothly, and that hackers have everything they need to succeed.
            This role requires strong communication skills and the ability to work well under pressure.
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
