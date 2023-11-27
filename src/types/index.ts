export interface ProdukProps {
    id:           string
    jenisBrg:     string   
    namaBrg:      string        
    hargaBrg:     number
    stok:         number     
    penerima:     string
    image:        string
    tglUpdate:    string
}

export const items = [
    'FoodNBeverage',
    'Kecantikan',
    'Kesehatan',
    'RumahTangga'
]