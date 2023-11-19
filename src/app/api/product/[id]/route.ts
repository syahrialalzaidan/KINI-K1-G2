import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: Request) {
    try{
        const data = await request.json()

        const{ id } = await request.json()

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
