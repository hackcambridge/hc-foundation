import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function TrusteePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full text-center">
          <h1 className={title()}>Trustee</h1>
          <div className="flex flex-col items-center justify-center py-8 space-y-8">
            <Button
              showAnchorIcon
              as={Link}
              href="/trustee/users"
              variant="bordered"
            >
              Manage Users
            </Button>
            <Button
              showAnchorIcon
              as={Link}
              href="/trustee/committee"
              variant="bordered"
            >
              Manage Committee
            </Button>
            <Button
              showAnchorIcon
              as={Link}
              href="/trustee/trustees"
              variant="bordered"
            >
              View Trustees
            </Button>
            <Button
              showAnchorIcon
              as={Link}
              href="/trustee/admins"
              variant="bordered"
            >
              View Admins
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
