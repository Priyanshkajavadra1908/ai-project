"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import React, { useState , useEffect} from 'react';
const MobileSidebar = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null;
    }
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <Button variant="ghost" size={"icon"} className="md:hidden">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className="p-0">
                        <Sidebar />
                </SheetContent>
            </Sheet>
        </>
    );
}

export default MobileSidebar;