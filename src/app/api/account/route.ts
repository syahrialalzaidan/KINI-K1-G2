import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
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

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(users, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(error)
    }
}