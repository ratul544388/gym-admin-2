import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/dashboard");
  return <div></div>;
};

export default HomePage;
