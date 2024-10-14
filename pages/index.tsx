import { useTheme } from "next-themes";
import { Image } from "@nextui-org/image";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const { theme } = useTheme();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8">
        {theme === "dark" ? (
          <div className="justify-center flex">
            <Image
              alt="Hack Cambridge Foundation"
              height={700}
              src={"/images/hack-cambridge-dark.gif"}
              width={700}
            />
          </div>
        ) : (
          <div className="justify-center flex">
            <Image
              alt="Hack Cambridge Foundation"
              height={700}
              src={"/images/hack-cambridge-light.gif"}
              width={700}
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-center">
          The Hack Cambridge Foundation is a charity that aims to inspire and
          empower the next generation of technologists.
        </h1>
        <h1 className="text-4xl font-bold text-center">
          We run events and programmes that encourage young people to explore technology and
          develop their skills.
        </h1>
        <h1 className="text-4xl font-bold text-center">
          We believe that everyone should have the
          opportunity to learn about technology, regardless of their background.
        </h1>
        <h1 className="text-4xl font-bold text-center">
          The animation above is a list of the hackathons, which we have run since 2016.
        </h1>
        <h1 className="text-4xl font-bold text-center">
          Please feel free to read about the foundation and its origins on the Charity page.
        </h1>
        <h1 className="text-4xl font-bold text-center">
          We are excited to see what the future holds for us and the young people
          we work with.
        </h1>
        <h1 className="text-4xl font-bold text-center">
          If you would like to get involved, please get in touch.
          If you would like to support us, please consider making a donation.
        </h1>
      </section>
    </DefaultLayout>
  );
}
