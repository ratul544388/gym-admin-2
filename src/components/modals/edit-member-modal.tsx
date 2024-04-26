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

import { updateMember } from "@/actions/members";
import { membershipPlans } from "@/constants";
import { MemberSchema } from "@/validation";
import { useEffect, useState, useTransition } from "react";
import { DatePicker } from "../date-picker";
import { ImageUpload } from "../image-upload";
import { LoadingButton } from "../loading-button";
import { Select } from "../select";

export const EditMemberModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const { member } = data;

  const form = useForm<z.infer<typeof MemberSchema>>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      name: undefined,
      address: undefined,
      age: undefined,
      gender: undefined,
      memberId: undefined,
      phone: undefined,
      startDate: undefined,
      membershipPlan: undefined,
      image: undefined,
    },
  });

  useEffect(() => {
    if (member) {
      const {
        name,
        address,
        age,
        gender,
        memberId,
        phone,
        startDate,
        membershipPlan,
        image,
      } = member;
      form.reset({
        name,
        address: address || undefined,
        age: age || undefined,
        gender,
        memberId,
        phone: phone || undefined,
        startDate,
        membershipPlan,
        image: image || undefined,
      });
    }
  }, [member, form]);

  function onSubmit(values: z.infer<typeof MemberSchema>) {
    startTransition(() => {
      updateMember({ values, memberId: member?.id as string }).then(
        ({ error, success }) => {
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

  return (
    <Modal open={isOpen && type === "editMember"} title="Edit Member">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 px-5 py-2"
        >
          <FormField
            control={form.control}
            name="memberId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    required={false}
                    disabled={isPending}
                    label="memberId"
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
                    onChange={field.onChange}
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
      <div className="sticky bottom-0 bg-background px-5 py-3">
        <LoadingButton
          label="Save"
          isLoading={isPending}
          disabled={isUploadingImage}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
          className="w-full"
        />
      </div>
    </Modal>
  );
};
