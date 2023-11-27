import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
    try {
        const{ jenisBrg, namaBrg, hargaBrg, stok, penerima, image } = await request.json()

        if (!jenisBrg || !namaBrg || !hargaBrg || !stok || !penerima || !image) {
            return NextResponse.json({error: 'Data tidak lengkap!'}, { status: 400 })
        }

        const isProductExisted = await prisma.produk.findUnique({
            where: {
                namaBrg
            }
        })

        if (isProductExisted) {
            return NextResponse.json({ message: 'Produk sudah ada!' }, { status: 406 })
        }
        
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
        return NextResponse.json(produk)
    } catch (error: any) {
        return NextResponse.json(error)
    }
}

export async function GET() {
    try {
        const produk = await prisma.produk.findMany({
            orderBy: {
                jenisBrg: "asc"
            }
        })

        return NextResponse.json(produk, {status: 200})
    } catch (error: any) {

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
