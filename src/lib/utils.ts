import { membershipPlans, statuses } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import {
  differenceInDays,
  differenceInMinutes,
  differenceInHours,
  format,
} from "date-fns";
import { twMerge } from "tailwind-merge";

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

export const getMemberStatus = ({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate: Date;
}) => {
  type LeftOver = "exceeded" | "left" | "to go";
  type Unit = "minute" | "hour" | "day";

  const today = new Date();
  const dayDifference = differenceInDays(startDate || endDate, new Date());

  let unit: Unit = "day";
  let status: (typeof statuses)[number] = "Active";

  const formatUnit = ({
    unit,
    difference,
  }: {
    unit: Unit;
    difference: number;
  }) => {
    if (Math.abs(difference) > 1) {
      unit = unit + "s";
    }
    return unit;
  };

  const getMessage = ({ leftOver }: { leftOver: LeftOver }) => {
    const minuteDifference = differenceInMinutes(startDate || endDate, today);
    const hourDifference = differenceInHours(startDate || endDate, today);
    const difference = dayDifference || hourDifference || minuteDifference;

    unit = dayDifference ? "day" : hourDifference ? "hour" : "minute";
    unit = formatUnit({ unit, difference });

    return `${Math.abs(difference)} ${unit} ${leftOver}`;
  };

  let message: string = getMessage({ leftOver: "left" });

  if (startDate && startDate > today) {
    status = "Pending";
    message = getMessage({ leftOver: "to go" });
  } else if (dayDifference >= 0) {
    status = "Active";
    message = getMessage({ leftOver: "left" });
  } else if (dayDifference > -30) {
    status = "Expire";
    message = getMessage({ leftOver: "exceeded" });
  } else {
    status = "Invalid";
    message = getMessage({ leftOver: "exceeded" });
  }

  return { status, message };
};
