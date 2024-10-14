import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function AddressPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 px-grotesk">
        <h1 className={title()}>Our Address</h1>
        <p className="text-center">
            Hack Cambridge Foundation <br />
            ideaSpace City <br />
            3 Laundress Lane <br />
            Cambridge <br />
            CB2 1SD <br />
        </p>
        <h1 className="px-grotesk tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9 py-4">About ideaSpace</h1>
        <p className="text-center">
          <strong>ideaSpace</strong> is a community of founders, innovators and investors in Cambridge. <br />
          <a href="https://ideaspace.cam.ac.uk/"><strong>ideaSpace City</strong></a> is a co-working space in the heart of Cambridge, where the Hack Cambridge Foundation is based. <br />
          It is located in the centre of Cambridge, close to the train station and the city&apos;s main attractions. <br />
        </p>
        <p className="text-center py-4">
          Hack Cambridge was founded in 2016 by students at the University of Cambridge at ideaSpace. <br />
          Since then, it has grown into a charity that runs events and programmes to inspire young people to explore technology. <br />
          The foundation is run by a team of volunteers who are passionate about technology and education. <br />
          We believe that everyone should have the opportunity to learn about technology, regardless of their background. <br />
          If you would like to get involved, please get in touch. <br />
        </p>
      </section>
    </DefaultLayout>
  );
}
