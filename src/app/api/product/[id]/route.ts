import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface Params {
    id?: string
}

export async function PATCH(request: Request, { params }: { params: Params}) {
    try {
        const data = await request.json()
        
        const produk = await prisma.produk.findUnique({
        where: {
                id: params.id
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
                id: params.id
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

export async function GET(request: Request, { params }: { params: params}) {
    try {
        

        const getProduk = await prisma.produk.findUnique({
            where: {
                id: params.id
            }
        })

        return NextResponse.json(getProduk, {status: 200})
    } catch (error: any) {
        console.log("PARAMS : ", params)
        return NextResponse.json(error, {status: 500})
    }
}

export async function DELETE(request: Request, { params }: { params: Params}) {
    try {

        const produk = await prisma.produk.findUnique({
            where: {
                id: params.id
            }
        })

        if (!produk) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const deletedProduk = await prisma.produk.delete({
            where: {
                id: params.id
            }
        })

        return NextResponse.json(deletedProduk, {status: 200})
    } catch (error: any) {
        return NextResponse.json(error, {status: 500})
    }
}