import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function NavigationMenu({ className, children, viewport = true, ...props }) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex w-full md:max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex w-full md:w-auto flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative w-full md:w-auto", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  `
  group inline-flex
  h-10 md:h-9
  w-full md:w-max
  items-center justify-between md:justify-center
  rounded-md
  bg-background
  px-4 py-2
  text-sm font-medium
  hover:bg-accent hover:text-accent-foreground
  focus:bg-accent focus:text-accent-foreground
  disabled:pointer-events-none disabled:opacity-50
  data-[state=open]:bg-accent/50
  focus-visible:ring-ring/50
  outline-none transition
  focus-visible:ring-[3px]
  `
);

function NavigationMenuTrigger({ className, children, ...props }) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="ml-2 size-4 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        `
        w-full
        md:absolute md:w-auto
        p-3
        bg-popover text-popover-foreground
        rounded-md border shadow
        data-[motion^=from-]:animate-in
        data-[motion^=to-]:animate-out
        data-[motion^=from-]:fade-in
        data-[motion^=to-]:fade-out
        `,
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({ className, ...props }) {
  return (
    <div className="absolute top-full left-0 z-50 flex w-full justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          `
          origin-top-center
          bg-popover text-popover-foreground
          relative mt-2
          h-[var(--radix-navigation-menu-viewport-height)]
          w-full md:w-[var(--radix-navigation-menu-viewport-width)]
          overflow-hidden
          rounded-md border shadow
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          `,
          className
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        `
        flex flex-col gap-1
        rounded-md
        px-3 py-2
        text-sm
        hover:bg-accent hover:text-accent-foreground
        focus:bg-accent focus:text-accent-foreground
        transition-all
        `,
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center",
        className
      )}
      {...props}
    >
      <div className="bg-border h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
