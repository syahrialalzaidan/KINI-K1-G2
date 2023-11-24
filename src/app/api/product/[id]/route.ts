import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface params {
    id?: string
}

export async function PATCH(request: Request, { params }: { params: params}) {
    try {
        const data = await request.json()

        const{ id } = params


        const produk = await prisma.produk.findUnique({
        where: {
                id: id
            }
        })

        if (!produk) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
        }

        if (data?.namaBrg && (data?.namaBrg !== produk.namaBrg)) {
            
            const produkExisted = await prisma.produk.findUnique({
                where: {
                    namaBrg: data?.namaBrg
                }
            })
    
            if (produkExisted) {
                throw new Error("Produk sudah ada")
                // return NextResponse.json({message: 'Username sudah ada!'}, { status: 400 })
                return NextResponse.error()
            }
        }

        const updatedProduk = await prisma.produk.update({
            where: {
                id: id
            }, 
            data: {
                ...data
            }

        })
        return NextResponse.json(updatedProduk, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(error, {status: 500})
    }
}

export async function GET({ params }: { params: params}) {
    try {
        const{ id } = params

        const getProduk = await prisma.produk.findMany({
            where: {
                id: id
            }
        })

        return NextResponse.json(getProduk, {status: 200})
    } catch (error: any) {
        return NextResponse.json(error, {status: 500})
    }
}
