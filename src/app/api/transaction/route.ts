import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface TransactionRequestBody {
  pic: string;
  items: {
    name: string;
    price: number;
    qty: number;
  }[];
  total: number;
  paymentMethod: string;
}

interface TransactionItemApi {
  name: string;
  price: number;
  qty: number;
}

// make a post API call to create a transaction
export async function POST(req: NextRequest) {
  const transactionToPost = await req.json();
  console.log("transactionToPost", transactionToPost);

  const { pic, items, total, paymentmethod } = transactionToPost;

  const mappedItems = items.map((item: TransactionItemApi) => ({
    name: item.name,
    price: item.price,
    qty: item.qty,
  }));
  console.log("mappedItems", mappedItems);

  // create a transaction using Prisma
  try {
    const transaction = await prisma.transaction.create({
      data: {
        pic: pic,
        total: total,
        items: {
          create: mappedItems,
        },
        paymentmethod: paymentmethod,
      },
    });

    const updateproduk = mappedItems.map(async (item: TransactionItemApi) => {
      const produk = await prisma.produk.update({
        where: {
          namaBrg: item.name,
        },
        data: {
          stok: {
            decrement: item.qty,
          },
        },
      });
    });

    const updateproduk2 = await Promise.all(updateproduk);

    return NextResponse.json(
      { message: "Transaction successfully created" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating questions:", error);
    return NextResponse.json(
      { error: "Error creating Transactions" },
      { status: 500 }
    );
  }
}
