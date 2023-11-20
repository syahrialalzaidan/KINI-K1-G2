import Sidebar from '@/components/Sidebar'


export default function CashierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Sidebar role="cashier" />
        <div className="pl-80 py-4">
            {children}
        </div>
    </>
  )
}
