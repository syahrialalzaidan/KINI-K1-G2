"use client";

import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";

import { barangAll } from "@/constants";

interface SearchBarangProps {
    barang: string
    setBarang: (barang: string) => void;
}

export default function SearchBarang({ barang, setBarang }: SearchBarangProps) {
    const [query, setQuery] = useState("")

    const filteredBarang = 
        query === "" 
        ? barangAll : barangAll.filter((item) => (
            item.toLowerCase().replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        ))

    return (
        <div className="max-w-full">
            <Combobox value={barang} onChange={setBarang}>
                <div className="">
                    {/* inpput column */}
                    <Combobox.Input 
                        className="w-[400px] sm:w-[550px] h-12 pl-3"
                        placeholder="Cari barang..."
                        displayValue={(barang: string) => barang}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {/* transition for typing */}
                    <Transition
                        as={Fragment}
                        leave="transisition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        {/* option while typing */}
                        <Combobox.Options className="w-[550px]">
                            {filteredBarang.map((item) => (
                                    // styling option
                                    <Combobox.Option 
                                        key={item}
                                        className={({ active }) => `relative pl-3 ${active 
                                            ? "bg-[#F472B6] text-white" : "text-gray-900 bg-white" }`}
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? "font-medium" : "font-normal"
                                                    }`}
                                                >
                                                    {item}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? "text-white" : "text-teal-600"
                                                        }`}
                                                    >
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                )
                            )}
                        </Combobox.Options>

                    </Transition>

                </div>
            </Combobox>
        </div>
    )
}
