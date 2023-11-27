import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const produk = await prisma.produk.findMany({
            orderBy: {
                jenisBrg: "asc"
            }
        })

        const { searchParams } = new URL(request.url)
        console.log(request.url)
        const searchQuery = searchParams.get("q") || ""

        const filteredProduk = produk.filter((produk) => {
            return produk.namaBrg.toLowerCase().includes(searchQuery?.toLowerCase() || "")
        })

        return NextResponse.json(filteredProduk , {status: 200})
    } catch (error: any) {

        return NextResponse.json(error, {status: 500})
    }
}