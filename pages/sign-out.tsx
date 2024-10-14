import { useEffect, useContext } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { AuthContext } from "@/components/auth";

export default function SignOutPage() {
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    signOut();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center py-8 space-y-8">
          <h1 className={title()}>Sign Out</h1>
          <p className="text-lg text-default-600">You have been signed out.</p>
          <p className="text-lg text-default-600">
            Thank you very much for visiting!
          </p>
          <p className="text-lg text-default-600">
            I hope to see you again soon.
          </p>
          <p className="text-lg text-default-600">Have a great day!</p>
        </div>
        <Button
          showAnchorIcon
          as={Link}
          color="default"
          href="/"
          size="md"
          variant="bordered"
        >
          Return to the Homepage
        </Button>
      </section>
    </DefaultLayout>
  );
}
