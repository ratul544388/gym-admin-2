"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { Gender } from "@prisma/client";
import { toast } from "sonner";
import { Modal } from "./modal";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createMember } from "@/actions/members";
import { admissionFee, membershipPlans } from "@/constants";
import { MemberSchema } from "@/validation";
import { useEffect, useState, useTransition } from "react";
import { DatePicker } from "../date-picker";
import { ImageUpload } from "../image-upload";
import { LoadingButton } from "../loading-button";
import { Select } from "../select";
import { formatPrice } from "@/lib/utils";
import { List } from "../list";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ModifyPrice } from "../modify-price";

export const CreateMemberModal = () => {
  const { isOpen, type, onClose } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [openEditTotal, setOpenEditTotal] = useState(false);

  const form = useForm<z.infer<typeof MemberSchema>>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      name: undefined,
      address: undefined,
      age: undefined,
      gender: undefined,
      id: undefined,
      phone: undefined,
      startDate: undefined,
      membershipPlan: undefined,
      image: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof MemberSchema>) {
    startTransition(() => {
      createMember({ values, modifiedCost: total }).then(
        ({ success, error }) => {
          if (success) {
            toast.success(success);
            form.reset();
            onClose();
          } else {
            toast.error(error);
          }
        },
      );
    });
  }

  const memebershipPrice =
    membershipPlans.find(
      (plan) => plan.label === form.getValues("membershipPlan"),
    )?.price || 0;

  const priceList = [
    {
      label: "Admission Fee",
      value: formatPrice(admissionFee),
      labelClassName: "whitespace-nowrap",
    },
    {
      label: "Membership Price",
      value: memebershipPrice ? formatPrice(memebershipPrice) : "NaN",
      labelClassName: "whitespace-nowrap",
    },
  ];

  const [total, setTotal] = useState(
    () => admissionFee + (memebershipPrice ? memebershipPrice : 0),
  );

  useEffect(() => {
    setTotal(memebershipPrice + admissionFee);
  }, [memebershipPrice]);

  return (
    <Modal open={isOpen && type === "createMember"} title="Add a new Member">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 px-5 py-2"
        >
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    required={false}
                    autoFocus
                    disabled={isPending}
                    label="Id"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isPending} label="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    required={false}
                    disabled={isPending}
                    label="Phone"
                    phone
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    required={false}
                    disabled={isPending}
                    label="Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    label="Gender"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                    options={Object.values(Gender).map((item) => item)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="membershipPlan"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    label="Membership Plan"
                    value={field.value}
                    onChange={(value) =>
                      form.setValue("membershipPlan", value, {
                        shouldValidate: true,
                      })
                    }
                    disabled={isPending}
                    options={membershipPlans.map((plan) => plan.label)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                    isUploadingImage={isUploadingImage}
                    onChangeUploadingImage={setIsUploadingImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                    label="Start Date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="sticky bottom-0 flex items-center gap-5 bg-background px-5 py-3">
        <div className="flex flex-col gap-2">
          <List items={priceList} className="gap-2" />
          <ModifyPrice
            triggerLabel="Total"
            price={total}
            onChange={setTotal}
            title="Edit Total"
          />
        </div>
        <LoadingButton
          isLoading={isPending}
          disabled={isUploadingImage}
          label="Submit"
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
          className="w-full"
        />
      </div>
    </Modal>
  );
};
