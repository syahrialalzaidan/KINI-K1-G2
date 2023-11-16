import Sidebar from '@/components/Sidebar'


export default function CashierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Sidebar role="cashier" />
        <div className="lg:pl-80 px-[5%] py-24 lg:py-4">
            {children}
        </div>
    </>
  )
}
