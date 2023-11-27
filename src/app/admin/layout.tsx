import Sidebar from '@/components/Sidebar'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Sidebar role="admin" />
        <div className="sm:pl-80 bg-[#FBF4FB]">
            {children}
        </div>
    </>
  )
}
