import Image from "next/image";
import LoginForm from "@/components/LoginForm"; 
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'
import TypeWriterLogin from "@/components/TypeWriter";

export default async function LoginPage() {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (user?.role  === 'ADMIN') {
      redirect('/admin')
    }
    if (user?.role  === 'CASHIER') {
      redirect('/cashier')
    }
    if (user?.role  === 'WAREHOUSE') {
      redirect('/warehouse?q=')
    }
    
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:pr-[10%]">
            <div style={{ backgroundImage: 'url(/loginbg.svg)' }} className="flex flex-col py-8 px-[160px] items-center justify-center h-fit md:h-screen w-full md:w-3/5 overflow-hidden max-w-[844px]">
                <div className="mt-16 w-[325px] h-[204px]">
                    <div style={{backgroundImage:'url(/logo_textonly.svg'}} className='w-[325px] h-[204px] justify-center'></div>
                </div>
                <div className="max-w-[360px] mt-4 justify-center text-center text-white text-2xl font-normal">
                    Aplikasi kewirusahaan yang intuitif, nyaman, dan inovatif.
                </div>
                <div className="mt-[96px] text-cyan-200 text-4xl font-bold text-center">
                    Satu aplikasi. Banyak fungsi.
                </div>
                <div className="mt-8 text-white text-2xl leading-[25px] h-[60px]">
                    <span>
                        <TypeWriterLogin/>
                    </span>
                </div>
            </div>
            <div className="flex justify-center items-center py-8 md:h-screen relative">
                <div className="px-[5%] md:px-0 w-full md:w-[557px]">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
