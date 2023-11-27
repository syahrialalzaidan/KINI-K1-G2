"use client"
import Link from "next/link";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { signIn, signOut, useSession } from "next-auth/react" 
import { toast } from 'react-hot-toast'

export default function LoginForm() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [loginData, setLoginData] = useState({
        username: "",
        password:"",
    })

    useEffect(() => {
        if (status === "authenticated") {
            if (session.user.role === 'ADMIN') {
                router.push('/admin')
            }
            if (session.user.role === 'CASHIER') {
                router.push('/cashier')
            }
            if (session.user.role === 'WAREHOUSE') {
                router.push('/warehouse?q=')
            }
        }
    }, [status])

    

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
                }
            })
    }
    
    return (
        <form className="w-full h-full items-center" onSubmit={onSubmit}>
            <div className="text-center">
                <div className="text-4xl font-bold mt-14 mb-3">
                    Login
                </div>
                <div className='text-stone-500 mx-20 mt-4 text-xl'>
                    Tidak punya akun atau lupa kata sandi? Hubungi administrator Anda.
                </div>
                <div className="flex flex-col mt-16">
                    <label
                        htmlFor="userName"
                        className="text-left text-neutral-500 font-semibold ml-20 py-1"
                    >
                        Username
                    </label>
                    <input
                        type="username"
                        name="username"
                        placeholder="Masukkan username di sini"
                        className="bg-[#FDF2F8] focus:bg-white placeholder-shown:bg-white rounded border border-neutral-300 mx-20 p-3 transition duration-300"
                        value={loginData.username}
                        onChange={onChange}
                        required
                    >
                    </input>
                </div>
                <div className="flex flex-col mt-6">
                    <label
                        htmlFor="password"
                        className="text-left text-neutral-500 font-semibold ml-20 py-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Masukkan password di sini"
                        className="bg-[#FDF2F8] focus:bg-white placeholder-shown:bg-white rounded border border-neutral-300 mx-20 p-3 transition duration-300"
                        value={loginData.password}
                        onChange={onChange}
                        required
                    >
                    </input>
                </div>
                <div className="flex flex-col">
                    <button className="bg-[#001118] text-white p-3 mt-16 mb-14 mx-20 rounded-lg" type="submit">
                        Login
                    </button>
                </div>
            </div>
        </form>
    )
}