import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <div>
        <Link href="/sing-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sing-up">
          <Button>sing-up</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
