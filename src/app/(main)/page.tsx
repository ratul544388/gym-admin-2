import { redirect } from "next/navigation";
import React from "react";

const HomePage = () => {
  redirect("/dashboard");
  return <div></div>;
};

export default HomePage;
