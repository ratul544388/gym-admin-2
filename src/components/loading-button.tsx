"use client";

import { Loader } from "./loader";
import { Button, ButtonProps } from "./ui/button";

type LoadingButtonProps = ButtonProps & {
  label: string;
  loadingLabel?: string;
  isLoading: boolean;
  disabled?: boolean;
};

export const LoadingButton = ({
  label,
  loadingLabel = "Processing",
  isLoading,
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading || disabled}>
      {isLoading && <Loader className="!w-5" />}
      {isLoading ? loadingLabel : label}
    </Button>
  );
};
