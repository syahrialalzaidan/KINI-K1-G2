import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    try {
        const { username, name, password, role} = await request.json()
        
        const hashedPassword = await bcrypt.hash(password, 5)
        
        const user = await prisma.user.create({
            data: { username, name, password: hashedPassword, role}
        })
        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json(error)
    }
}