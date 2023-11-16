import Sidebar from "@/components/Sidebar";

export default function WarehouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar role="warehouse" />
      <div className="lg:pl-80 px-[5%] py-24 lg:py-4">{children}</div>
    </>
  );
}
