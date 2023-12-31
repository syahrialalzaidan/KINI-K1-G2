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

        if (data?.username === null || data?.name === null || data?.role === null) {
            return NextResponse.json({ error: 'Data tidak boleh kosong' }, { status: 400 })
        }

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
                return NextResponse.json({ error: "Username sudah ada!"}, { status: 406 })
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
        return NextResponse.json(error, { status: 400})
    }
}