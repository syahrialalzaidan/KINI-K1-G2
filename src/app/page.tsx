import Image from "next/image";
import LoginForm from "@/components/LoginForm"; 

export default function LoginPage() {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:pr-[10%]">
            <div className="py-8 flex items-center justify-center bg-[#192310] h-fit md:h-screen w-full md:w-2/5 overflow-hidden">
                <Image 
                    src="logo.svg"
                    width={484}
                    height={767}
                    alt="logo"
                    className="w-2/5 md:w-[80%] items-center self-center"
                />
            </div>
            <div className="flex justify-center items-center py-8 bg-white md:h-screen relative">
                <div className=" px-[5%] md:px-0 w-full md:w-[557px]">
                    <LoginForm />
                </div>
                
            </div>
        </div>
    )
}