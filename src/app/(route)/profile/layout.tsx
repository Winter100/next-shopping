import SideBar from "@/app/_components/Nav/SideBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:grid md:grid-cols-6 md:mt-4 md:min-h-[1000px]">
      <div className="md:col-span-5 mt-6 sm:mt-4 md:order-last md:p-0 h-full min-h-full pb-16 md:pb-0">
        {children}
      </div>
      <nav className="w-full sm:mt-16 md:col-span-1 md:order-first md:bottom-auto">
        <SideBar />
      </nav>
    </div>
  );
}
