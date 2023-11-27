import ProductCard from "./products/ProductCard";


const getCatalog = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/product`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Faile to fetch the catalog");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading catalog: ", error);
  }
};

export default async function Catalog() {
  const products = await getCatalog();
  const isDataEmpty =
    !Array.isArray(products) || products.length < 1 || !products;

  return (
    <div className="pt-8 sm:pt-0">
      {!isDataEmpty ? (
        <section>
          <div>
            {products?.map((produk, index) => (
              <div key={index}>
                <ProductCard produks={produk} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center pt-6 sm:pt-16">
          <h2 className="text-xl font-bold">Oops, no results</h2>
          <p>Please add new product</p>
        </div>
      )}
    </div>
  );
}
