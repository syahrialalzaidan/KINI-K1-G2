'use client'
import { Typewriter } from 'react-simple-typewriter';

export default function TypeWriterLogin() {
    return (
        <Typewriter
            words={['Manajemen stok produk', 'Katalog produk', 'Manajemen transaksi', 'Laporan keuangan komprehensif']}
            loop={true}
            cursor={true}
            cursorStyle='|'
        />
    )
}