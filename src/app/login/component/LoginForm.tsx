"use client"
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation"

import { signIn, signOut } from "next-auth/react" 
import { toast } from 'react-hot-toast'

export default function LoginForm() {
    const router = useRouter()
    const [loginData, setLoginData] = useState({
        username: "",
        password:"",
    })

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        signIn("credentials", {...loginData, redirect: false})
            .then((res) => {
                if (res?.error) {
                    toast.error(res.error)
                }
                if (res?.ok && !res?.error) {
                    toast.success("Logged in successfully")
                    router.push("/")
                }
            })
    }

    return (
        <form className="w-full h-full items-center" onSubmit={onSubmit}>
            <div className="border border-black text-center rounded-3xl">
                <div className="text-5xl underline underline-offset-4 my-14">
                    Welcome!
                </div>
                <div className="flex flex-col mt-3.5">
                    <label
                        htmlFor="userName"
                        className="text-left font-semibold ml-20 py-1"
                    >
                        Username
                    </label>
                    <input
                        type="username"
                        name="username"
                        placeholder=" "
                        className="bg-[#FDF2F8] focus:bg-white placeholder-shown:bg-white border border-black mx-20 rounded py-1 px-2 transition duration-300"
                        value={loginData.username}
                        onChange={onChange}
                        required
                    >
                    </input>
                </div>
                <div className="flex flex-col mt-3.5">
                    <label
                        htmlFor="password"
                        className="text-left font-semibold ml-20 py-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder=" "
                        className="bg-[#FDF2F8] focus:bg-white placeholder-shown:bg-white border border-black mx-20 rounded py-1 px-2 transition duration-300"
                        value={loginData.password}
                        onChange={onChange}
                        required
                    >
                    </input>
                </div>
                <button className="bg-[#DB2777] text-white p-3 mt-5 mb-14 rounded-lg" type="submit">
                    Login
                </button>
            </div>
        </form>
    )
}