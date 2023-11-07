import Sidebar from '@/components/Sidebar'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Sidebar role="admin" />
        <div className="pl-80 py-4">
            {children}
        </div>
    </>
  )
}
