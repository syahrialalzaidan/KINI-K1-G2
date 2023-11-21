{/* ntar sesuaiin sama punya kevin */}

interface CashierPageProps {
    produk : Array<Object>
}

interface Product {
    id : string,
    jenisBrg : string,   
    namaBrg : string, 
    hargaBrg : number,
    stok : number, 
    tglTerima : string,
    tglUpdate : string,
    penerima : string,
    image : string 
}

interface ProductListProps {
    products: Product[]
}



function ProductList( {products}: ProductListProps, addToCart) {
    return (
        <div>
            <div className='flex'>
                {
                    products.map((productItem)=>{
                        console.log("PRODUCT ITEM : ", productItem)
                        return (
                            <div id='product' className='w-[168px] min-h-[261px] p-5 mr-10 relative bg-white rounded-lg shadow'>
                                <img src={productItem.image} className='w-32 justify-center items-center inline-flex'/>
                                <p className='text-slate-400 text-base font-bold leading-tight mt-[11px] text-center'>{productItem.namaBrg}</p>
                                <p className='text-black text-xs font-normal leading-[18px] mt-[6px] text-center'>Rp{new Intl.NumberFormat('id-ID', {minimumFractionDigits: 2}).format(productItem.hargaBrg)}</p>
                                <button className="w-32 h-8 px-3 py-2 rounded border-2 border-slate-400 justify-center items-center gap-1 inline-flex mt-[11px]"
                                    onClick={() => addToCart(productItem)}>
                                    <p className="text-slate-400 text-[9px] font-medium leading-[15px]">Tambah ke Keranjang</p>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductList;