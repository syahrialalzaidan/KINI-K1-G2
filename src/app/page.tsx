import Image from "next/image";
import LoginForm from "@/components/LoginForm"; 

export default function LoginPage() {
    return (
        <div className="flex">
            <div className="py-8 flex items-center bg-[#192310] h-screen w-2/5 overflow-hidden">
                <Image 
                    src="logo.svg"
                    width={484}
                    height={767}
                    alt="logo"
                    className="w-[80%]"
                />
            </div>
            <div className="flex-1 flex justify-center items-center py-8 bg-white h-screen relative">
                <div className="w-[557px]">
                    <LoginForm />
                </div>
                
            </div>
        </div>
    )
}