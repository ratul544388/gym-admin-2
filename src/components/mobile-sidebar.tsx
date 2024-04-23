"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Logo } from "./logo";
import { SidebarLinks } from "./sidebar-links";
import { useState } from "react";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-5 pb-3 flex flex-col gap-6" side="left">
        <Logo className="ml-4" />
        <SidebarLinks onCloseSidebar={() => setOpen(false)}/>
      </SheetContent>
    </Sheet>
  );
};
