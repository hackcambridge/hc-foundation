import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function CharityPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8">
        <div className="inline-block text-center justify-center">
          <h1 className={title()}>Charity</h1>
          <p className="py-4 text-center">
            The Hack Cambridge Foundation (HCF) is a charity that aims to inspire and empower the next generation of technologists. <br />
            In late October 2017 we filed for registering a Charitable Incorporated Organisation (Foundation model). <br />
            The trustees&apos; job is to represent the organisation in the face of the Charity Commission and to make sure that its objectives
              (detailed in the <a href="/documents/constitution.pdf">Constitution</a>) are upheld. <br />
            Informally, they are veteran committee members who will provide assistance to the current committee (but will not be directly responsible for organising the event). <br />
            They also have to file an annual report of activities and annual accounts. <br />
          </p>
          <p className="py-2 text-center">
            We came to the decision to create this organisation because:
          </p>
          <ol className="py-4 list-decimal list-inside text-left">
            <li><strong>Favourable tax treatment</strong> - charities do not pay Corporation Tax, although we believe that as an unincorporated association we might not be liable to it anyway.</li>
            <li><strong>Limited liability</strong> - the CIO is a type of incorporated organisation which trades in its own name. Previously the committee had personal liability.</li>
            <li><strong>Captures the essence of the event well</strong> - it&apos;s all about the hackers, not the committee making a profit. <br />
            We could have registered as a non-profit company, but limited companies have a larger administrative overhead.</li>
          </ol>
          <a href="/documents/cio.pdf">
            <p className="py-2 text-center underline">Read about Charitable Incorporated Organisations (CIOs)</p>
          </a>
          <a href="/documents/constitution.pdf">
            <p className="py-2 text-center underline">Read the Hack Cambridge Foundation Constitution</p>
          </a>
          <p className="py-2 text-center">
            HCF&apos;s constitution allows for funding of other tech-related events that might not necessarily be hackathons, but must aim to uphold the object.
          </p>
          <p className="py-2 text-center">
            From Hack Cambridge 2019, our hackathons now take place under the Hack Cambridge Foundation.
          </p>
          <a href="https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/5111093/charity-overview">
            <p className="py-2 text-center underline">View our Charity Commission page</p>
          </a>
          <p className="py-2 text-center">
            If you have any questions, please email <a href="mailto:team@hackcambridge.com">us</a>.
          </p>
          <h1 className="px-grotesk font-semibold text-[2.3rem] lg:text-5xl py-4">VAT</h1>
          <p className="pb-2 text-center">
            We are VAT registered and our VAT number is 303 0778 32.
          </p>
          <p className="py-2 text-center">
            We pay VAT on all purchases and claim it back on all sales. This means that we are VAT neutral.
          </p>
          <p className="py-2 text-center">
            We move goods from one location to another, in order to ensure that our hackathons run properly.
          </p>
          <p className="py-2 text-center">
            An Economic Operators Registration and Identification number (EORI number) is needed, if you move goods between Great Britain and non-EU countries.
          </p>
          <p className="py-2 text-center">
            We have an EORI number, which is GB303077832000.
          </p>
          <p className="py-2 text-center">
            To learn more about VAT for businesses, please visit the <a className="underline" href="https://www.gov.uk/vat-businesses">UK government website</a>.
          </p>
          <p className="py-4 text-center">
            If you have any further questions, please email <a href="mailto:team@hackcambridge.com">us</a>.
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
