import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
// import { Input } from "@nextui-org/input";
// import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  // SearchIcon,
  Logo,
} from "@/components/icons";
import { UserAvatar } from "@/components/avatar";

export const Navbar = () => {
  // const searchInput = (
  //   <Input
  //     aria-label="Search"
  //     classNames={{
  //       inputWrapper: "bg-default-100",
  //       input: "px-grotesk text-sm",
  //     }}
  //     labelPlacement="outside"
  //     placeholder="Search..."
  //     startContent={
  //       <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
  //     }
  //     type="search"
  //   />
  // );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" href="/">
            <Logo className="text-foreground" />
            {/* <a href="http://www.onlinewebfonts.com/fonts">Web Fonts</a> */}
            <div className="flex flex-col gap-0 px-grotesk">
              <p className="text-3xs/[4px] text-foreground">  The</p>
              <div className="flex flex-row gap-0">
                <p className="text-sm/[18px] text-foreground font-thin">Hack</p>
                <p className="text-sm/[18px] text-foreground font-bold">Cambridge</p>
              </div>
              <p className="text-3xs/[4px] text-foreground">  Foundation</p>
            </div>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  "px-grotesk data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex gap-2">
          <Link isExternal href={siteConfig.links.facebook}>
            <FacebookIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.linkedin}>
            <LinkedInIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.instagram}>
            <InstagramIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.email}>
            <EmailIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <UserAvatar />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            isExternal
            as={Link}
            className="px-grotesk text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <UserAvatar />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Link
              color="danger"
              href={siteConfig.links.sponsor}
              size="lg"
            >
              Sponsor
            </Link>
          </NavbarMenuItem>
        </div>
        <div className="p-12 absolute inset-x-0 bottom-0 flex justify-around items-center">
          <Link isExternal href={siteConfig.links.facebook}>
            <FacebookIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.linkedin}>
            <LinkedInIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.instagram}>
            <InstagramIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.email}>
            <EmailIcon className="text-default-500" />
          </Link>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
