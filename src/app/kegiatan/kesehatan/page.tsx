'use client'

import CardKegiatan from "@/app/(components)/cardKegiatan"
import Navbar from "@/app/(components)/navbar"
import Link from "next/link"
import { db } from "@/lib/firebase/init"
import { getDocs, query, orderBy, collection } from "firebase/firestore"
import { useState, useEffect } from "react"
import CardSkeleton from "@/app/(components)/cardSkeleton"

export default function Kesehatan() {
    const [kesehatan, setKesehatan] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setIsLoading(true)
        try {
            const q = query(collection(db, 'kegiatanKesehatan'));
            const snapshot = await getDocs(q);
            const data: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setKesehatan(data);
        } catch (error) {
            console.error("Error getting documents: ", error);
        } finally {
            setIsLoading(false)
        }
    };

    const skeleton = []
    for(let i = 1 ; i <= 4 ; i ++) {
        skeleton.push(
            <CardSkeleton/>
        )
    } 

    return (
        <>
            <Navbar />
            <div className="flex justify-center py-24 px-5 xl:px-0">
                <div className="w-[70rem]">
                    <h1 className="text-4xl font-bold tracking-tighter">Kegiatan Kesehatan Turus</h1>
                    <div className="flex mt-6 gap-2 sm:gap-4">
                        <Link href={'/kegiatan/keagamaan'} className="hover:border-b-2 py-3 px-1 flex justify-center border-zinc-400">
                            <h1 className="font-semibold text-zinc-700 text-sm sm:text-base">Keagamaan</h1>
                        </Link>
                        <Link href={'/kegiatan/kesehatan'} className="py-3 px-1 flex justify-center border-b-2 border-black">
                            <h1 className="font-semibold text-zinc-700 text-sm sm:text-base">Kesehatan</h1>
                        </Link>
                        <Link href={'/kegiatan/kebudayaan'} className="py-3 px-1 flex justify-center hover:border-b-2 border-zinc-400 ">
                            <h1 className="font-semibold text-zinc-700 text-sm sm:text-base">Kebudayaan</h1>
                        </Link>
                        <Link href={'/kegiatan/umkm'} className="py-3 px-1 flex justify-center hover:border-b-2 border-zinc-400">
                            <h1 className="font-semibold text-zinc-700 text-sm sm:text-base">UMKM</h1>
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:gap-5 mt-8">
                        {isLoading ? 
                            <>{skeleton}</>
                        :
                        (kesehatan && kesehatan.map((item: any) => (
                            <>
                                <CardKegiatan 
                                    judul={item.judul}
                                    deskripsi={item.deskripsi}
                                    image={item.image}
                                />
                            </>
                        )))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}