import Sidebar from '@/components/Sidebar'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Sidebar role="admin" />
        <div className="sm:pl-80 px-[5%] py-24 sm:py-4">
            {children}
        </div>
    </>
  )
}
