import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="w-full pb-10 pt-4 md:pl-[240px]">{children}</main>
      <ModalProvider />
      <Toaster />
    </>
  );
}
