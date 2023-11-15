import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request){
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