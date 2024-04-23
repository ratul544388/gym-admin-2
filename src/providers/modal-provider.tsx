"use client";
import { CreateMemberModal } from "@/components/modals/create-member-modal";
import { DeleteMemberModal } from "@/components/modals/delete-member-modal";
import { EditMemberModal } from "@/components/modals/edit-member-modal";
import { ProfileModal } from "@/components/modals/profile-modal";
import { RenewModal } from "@/components/modals/renew-modal";
import { useEffect, useState } from "react";
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateMemberModal />
      <EditMemberModal />
      <DeleteMemberModal />
      <ProfileModal/>
      <RenewModal/>
    </>
  );
};
