"use client";

import { deleteMember } from "@/actions/members";
import { useModalStore } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Modal } from "./modal";
import { LoadingButton } from "../loading-button";

export const DeleteMemberModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, onClose, data } = useModalStore();
  const { member } = data;
  const router = useRouter();

  const onDelete = () => {
    startTransition(() => {
      deleteMember(member?.id as number).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          router.refresh();
          onClose();
        } else {
          toast.error(error);
        }
      });
    });
  };

  return (
    <Modal
      open={isOpen && type === "deleteMember"}
      title={`Delete "${member?.name}"`}
      description={`Are you sure you want to delete "${member?.name}". This action cannot be undone!`}
      disabled={isPending}
      className="max-w-[350px] rounded-md"
    >
      <div className="flex items-center gap-5 px-5 pb-3 pt-6">
        <Button
          disabled={isPending}
          onClick={onClose}
          variant="outline"
          className="w-full"
        >
          Cencel
        </Button>
        <LoadingButton
          isLoading={isPending}
          label="Confirm"
          loadingLabel="Deleting"
          onClick={onDelete}
          variant="destructive"
          className="w-full"
        />
      </div>
    </Modal>
  );
};
