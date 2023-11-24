import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
    try {
        const{ jenisBrg, namaBrg, hargaBrg, stok, penerima, image } = await request.json()
        
        const produk = await prisma.produk.create({
            data: {
                jenisBrg,
                namaBrg,
                hargaBrg,
                stok,
                penerima,
                image
            }
        })
        return NextResponse.json(produk, {status: 201})
    } catch (error: any) {
        return NextResponse.json(error, {status: 500})
    }
}

export async function GET() {
    try {
        const produk = await prisma.produk.findMany({
            orderBy: {
                jenisBrg: "asc",
            }
        })
        console.log("error1")
        return NextResponse.json(produk, {status: 200})
    } catch (error: any) {
        console.log("error2")
        return NextResponse.json(error, {status: 500})
    }
}

export async function DELETE(request: Request) {
    try {
        const{ id } = await request.json()

        const produk = await prisma.produk.findUnique({
            where: {
                id: id
            }
        })

        if (!produk) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const deletedProduk = await prisma.produk.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json(deletedProduk, {status: 200})
    } catch (error: any) {
        return NextResponse.json(error, {status: 500})
    }
}
