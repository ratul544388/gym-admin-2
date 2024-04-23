import { Activity, LayoutDashboard, Users2, Wallet } from "lucide-react";

export const admissionFee = 500;

export const primaryColor = "#2563EB"
export const fallbackImage = "/placeholder.jpg";

export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Members",
    href: "/members",
    icon: Users2,
  },
  {
    label: "Activities",
    href: "/activities",
    icon: Activity,
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: Wallet,
  },
];

export const membershipPlans = [
  {
    label: "Basic Plan",
    duration: 1,
    price: 1000,
  },
  {
    label: "Standard Plan",
    duration: 6,
    price: 5000,
  },
  {
    label: "Premium Plan",
    duration: 12,
    price: 10000,
  },
];

export const statuses = ["Active", "Pending", "Expire", "Invalid"] as const;
