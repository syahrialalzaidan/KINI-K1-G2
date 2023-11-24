import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    try {
        const { username, name, password, role } = await request.json()

        if (!username || !name || !password || !role) {
            return NextResponse.json({error: 'Data tidak lengkap!'}, { status: 400 })
        }
        const isUserExisted = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (isUserExisted) {
            return NextResponse.json({ message: 'Username sudah ada!' }, { status: 406 })

        }
        
        const hashedPassword = await bcrypt.hash(password, 5)
        
        const user = await prisma.user.create({
            data: { username, name, password: hashedPassword, role}
        })
        
        return NextResponse.json(user, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(error)
    }
}