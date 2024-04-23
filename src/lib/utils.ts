import { membershipPlans } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { stopCoverage } from "v8";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

export const formatDate = (date: Date) => {
  return format(date, "d MMMM yyyy");
};

export const formatPhone = (phone: string | null) => {
  return phone ? (phone.startsWith("0") ? phone : `0${phone}`) : "Not given";
};

export const formatPrice = (price: number, type: "icon" | "text" = "icon") => {
  const symbol = type === "icon" ? "৳" : " BDT";
  return `${price.toLocaleString()}${symbol}`;
};

export const getMembershipPlanByLabel = (label: string) => {
  return (
    membershipPlans.find((plan) => plan.label === label) || membershipPlans[0]
  );
};

export const calculateRevenue = (
  members: { revenue: number; renews: { revenue: number }[] }[],
) => {
  const revenue = members.reduce((total, member) => {
    const renewTotal = member.renews.reduce((total, renew) => {
      return (total += renew.revenue);
    }, 0);

    return (total += member.revenue + renewTotal);
  }, 0);

  return revenue;
};
