import SideBar from "../components/Nav/SideBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-6 mt-4 min-h-[1000px]">
      <nav className="col-span-1 mt-10">
        <SideBar />
      </nav>
      <div className="col-span-5 my-4">{children}</div>
    </div>
  );
}
