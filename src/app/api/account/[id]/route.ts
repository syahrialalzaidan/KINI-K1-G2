import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Params {
    id?: string
}

export async function DELETE(request: Request, { params }: { params: Params }){
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: params.id
            },
        })

        if (!user) {
            return new NextResponse('Invalid ID', { status: 400 })
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: params.id
            }
        })

        return NextResponse.json(deletedUser, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(error)
    }
}

export async function PATCH(request: Request, { params }: { params: Params }) {
    try{
        const data = await request.json()

        const user = await prisma.user.findUnique({
            where: {
                id: params.id
            },
        })

        if (!user) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
        }

        if (data?.username && (data?.username !== user.username)) {
            
            const usernameExisted = await prisma.user.findUnique({
                where: {
                    username: data?.username
                }
            })
    
            if (usernameExisted) {
                throw new Error('Username sudah ada')
                // return NextResponse.json({message: 'Username sudah ada!'}, { status: 400 })
                return NextResponse.error()
            }
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: params.id
            }, 
            data: {
                ...data
            }

        })
        return NextResponse.json(updatedUser, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(error)
    }
}