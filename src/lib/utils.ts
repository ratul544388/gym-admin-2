import { _30DaysLessDate, membershipPlans, statuses, today } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import {
  differenceInDays,
  differenceInMinutes,
  differenceInHours,
  format,
  subDays,
} from "date-fns";
import { twMerge } from "tailwind-merge";

type StrType = string | null | undefined;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

export const formatDate = ({
  date,
  showTime,
}: {
  date: Date;
  showTime?: boolean;
}) => {
  if (!showTime) {
    return format(date, "d MMMM yyyy");
  } else {
    return format(date, "d MMMM yyyy - hh:mm aa");
  }
};

export const formatPhone = (phone: string | null) => {
  return phone ? (phone.startsWith("0") ? phone : `0${phone}`) : "Not given";
};

export const formatPrice = (price: number, type: "icon" | "text" = "icon") => {
  const symbol = type === "icon" ? "৳" : " BDT";
  return `${price.toLocaleString()}${symbol}`;
};

export const isEqualString = (str1: StrType, str2: StrType) => {
  if (
    str1 === undefined ||
    str1 === null ||
    str2 === undefined ||
    str2 === null
  )
    return false;
  return str1.toLowerCase() === str2.toLowerCase();
};

export const getMembershipPlanByLabel = (label: string) => {
  return (
    membershipPlans.find((plan) => plan.label === label) || membershipPlans[0]
  );
};

export const calculateRevenue = (revenues: number[]) => {
  return revenues.reduce((total, revenue) => {
    return (total += revenue);
  }, 0);
};

export const getMemberStatus = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  type LeftOver = "exceeded" | "left" | "to go";
  type Unit = "minute" | "hour" | "day";

  const today = new Date();
  const dayDifference = differenceInDays(endDate, new Date());

  let unit: Unit = "day";
  let status: (typeof statuses)[number]["label"] = "Active";

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
    const minuteDifference = differenceInMinutes(endDate, today);
    const hourDifference = differenceInHours(endDate, today);
    const difference = dayDifference || hourDifference || minuteDifference;

    unit = dayDifference ? "day" : hourDifference ? "hour" : "minute";
    unit = formatUnit({ unit, difference });

    return `${Math.abs(difference)} ${unit} ${leftOver}`;
  };

  let message: string = getMessage({ leftOver: "left" });

  if (startDate <= today && endDate > today) {
    status = "Active";
    message = getMessage({ leftOver: "left" });
  } else if (startDate > today) {
    message = getMessage({ leftOver: "to go" });
    status = "Pending";
  } else if (endDate < today && endDate > _30DaysLessDate) {
    status = "Expire";
    message = getMessage({ leftOver: "exceeded" });
  } else if (endDate <= _30DaysLessDate) {
    status = "Invalid";
    message = getMessage({ leftOver: "exceeded" });
  }

  return { status, message };
};
