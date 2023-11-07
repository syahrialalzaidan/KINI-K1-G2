import Sidebar from '@/components/Sidebar'


export default function WarehouseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Sidebar role="warehouse" />
        <div className="pl-80 py-4">
            {children}
        </div>
    </>
  )
}
