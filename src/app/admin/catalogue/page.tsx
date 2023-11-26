import ProdukAdmin from "./ProdukAdmin";

const getCatalog = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/api/product`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Faile to fetch the catalog");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading catalog: ", error);
  }
};

export default async function CashierPage() {
    const produk_get = await getCatalog()
    // Push 26 November 2023 11.52

  return (
    <div className="py-8 px-[5%]">
      <ProdukAdmin products={produk_get} />
    </div>
  );
}