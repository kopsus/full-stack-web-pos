"use client";

import React from "react";
import { Button } from "../ui/button";
import logout from "@/lib/actions/logout";

const Logout = () => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <Button size={"lg"} variant={"destructive"} onClick={handleLogout}>
      Akhiri Shift
    </Button>
  );
};

export default Logout;
