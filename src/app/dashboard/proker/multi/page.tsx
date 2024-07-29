'use client'

import { db } from "@/lib/firebase/init"
import { storage } from "@/lib/firebase/init"
import { useState, useEffect, useRef } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { collection, getDocs, query, addDoc, orderBy } from "firebase/firestore"
import Image from "next/image"

export default function DashboardProkerMulti() {
    const [prokerImage, setProkerImage] = useState<File | null>(null);
    const [profileImage1, setProfileImage1] = useState<File | null>(null);
    const [profileImage2, setProfileImage2] = useState<File | null>(null);
    const [profileImage3, setProfileImage3] = useState<File | null>(null);
    const [profileImage4, setProfileImage4] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false)
    const [nama1, setNama1] = useState("")
    const [nama2, setNama2] = useState("")
    const [nama3, setNama3] = useState("")
    const [nama4, setNama4] = useState("")
    const [jurusan1, setJurusan1] = useState("")
    const [jurusan2, setJurusan2] = useState("")
    const [jurusan3, setJurusan3] = useState("")
    const [jurusan4, setJurusan4] = useState("")
    const [judul, setJudul] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [previewProfile1, setPreviewProfile1] = useState("")
    const [previewProfile2, setPreviewProfile2] = useState("")
    const [previewProfile3, setPreviewProfile3] = useState("")
    const [previewProfile4, setPreviewProfile4] = useState("")
    const [previewProker, setPreviewProker] = useState("")

    const handleFileImage = (event: any) => {
        const image = event.target.files[0]
        setProkerImage(image)
        setPreviewProker(URL.createObjectURL(image))   
    }

    const handleFileProfileImage1 = (event: any) => {
        const image = event.target.files[0]
        setProfileImage1(image)
        setPreviewProfile1(URL.createObjectURL(image))
    }
    const handleFileProfileImage2 = (event: any) => {
        const image = event.target.files[0]
        setProfileImage2(image)
        setPreviewProfile2(URL.createObjectURL(image))
    }
    const handleFileProfileImage3 = (event: any) => {
        const image = event.target.files[0]
        setProfileImage3(image)
        setPreviewProfile3(URL.createObjectURL(image))
    }
    const handleFileProfileImage4 = (event: any) => {
        const image = event.target.files[0]
        setProfileImage4(image)
        setPreviewProfile4(URL.createObjectURL(image))
    }

    const uploadImage = async (image: File) => {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        return await getDownloadURL(storageRef);
    };

    const addMono = async (e: any) => {
        e.preventDefault()
        if (!prokerImage || !profileImage1 || !profileImage2 || !profileImage3 || !profileImage4) return;
        setUploading(true);
        try {
            const prokerImageUrl = await uploadImage(prokerImage);
            const profileImageUrl1 = await uploadImage(profileImage1);
            const profileImageUrl2 = await uploadImage(profileImage2);
            const profileImageUrl3 = await uploadImage(profileImage3);
            const profileImageUrl4 = await uploadImage(profileImage4);
            await addDoc(collection(db, 'prokerMulti'), {
                judul: judul,
                deskripsi: deskripsi,
                image: prokerImageUrl,
                nama1: nama1,
                nama2: nama2,
                nama3: nama3,
                nama4: nama4,
                jurusan1: jurusan1,
                jurusan2: jurusan2,
                jurusan3: jurusan3,
                jurusan4: jurusan4,
                profileImage1: profileImageUrl1,
                profileImage2: profileImageUrl2,
                profileImage3: profileImageUrl3,
                profileImage4: profileImageUrl4,
                createdAt: new Date()
            });
            alert("Berhasil Terupload")
            window.location.reload();
        } catch (error) {
            console.error("Error adding post: ", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full flex justify-center py-20">
            <div className="w-[70rem]">
                <h1 className="text-4xl font-bold tracking-tighter mb-5">Upload Proker Multi</h1>
                <form onSubmit={addMono}>
                    <label className="font-semibold">Masukkan Nama Anggota 1</label>
                    <input
                        type="text"
                        value={nama1} 
                        onChange={(e) => setNama1(e.target.value)} 
                        placeholder="Masukkan Nama 1"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Jurusan Anggota 1</label>
                    <input
                        type="text"
                        value={jurusan1} 
                        onChange={(e) => setJurusan1(e.target.value)} 
                        placeholder="Masukkan Jurusan 1"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Foto Anggota 1</label>
                    <input type="file" onChange={handleFileProfileImage1} accept="image/*" required
                        className="cursor-pointer file:cursor-pointer block w-full text-sm text-zinc-500
                            file:mr-4 file:py-2 file:px-10
                            file:rounded-full file:border-0
                            file:font-semibold file:text-base
                          file:bg-sky-50 file:text-sky-700
                            file:transition-all hover:file:bg-sky-100 mb-5"
                    />
                    {previewProfile1 &&
                        <Image 
                            src={previewProfile1}
                            alt="image"
                            width={200}
                            height={200}    
                        />
                    }
                    <label className="font-semibold">Masukkan Nama Anggota 2</label>
                    <input
                        type="text"
                        value={nama2} 
                        onChange={(e) => setNama2(e.target.value)} 
                        placeholder="Nama 2"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Jurusan Anggota 2</label>
                    <input
                        type="text"
                        value={jurusan2} 
                        onChange={(e) => setJurusan2(e.target.value)} 
                        placeholder="Jurusan 2"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Foto Anggota 2</label>
                    <input type="file" onChange={handleFileProfileImage2} accept="image/*" required
                        className="cursor-pointer file:cursor-pointer block w-full text-sm text-zinc-500
                            file:mr-4 file:py-2 file:px-10
                            file:rounded-full file:border-0
                            file:font-semibold file:text-base
                          file:bg-sky-50 file:text-sky-700
                            file:transition-all hover:file:bg-sky-100 mb-5"
                    />
                    {previewProfile2 &&
                        <Image 
                            src={previewProfile2}
                            alt="image"
                            width={200}
                            height={200}    
                        />
                    }
                    <label className="font-semibold">Masukkan Nama Anggota 3</label>
                    <input
                        type="text"
                        value={nama3} 
                        onChange={(e) => setNama3(e.target.value)} 
                        placeholder="Nama 3"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Jurusan Anggota 3</label>
                    <input
                        type="text"
                        value={jurusan3} 
                        onChange={(e) => setJurusan3(e.target.value)} 
                        placeholder="Jurusan 3"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Foto Anggota 3</label>
                    <input type="file" onChange={handleFileProfileImage3} accept="image/*" required
                        className="cursor-pointer file:cursor-pointer block w-full text-sm text-zinc-500
                            file:mr-4 file:py-2 file:px-10
                            file:rounded-full file:border-0
                            file:font-semibold file:text-base
                          file:bg-sky-50 file:text-sky-700
                            file:transition-all hover:file:bg-sky-100 mb-5"
                    />
                    {previewProfile3 &&
                        <Image 
                            src={previewProfile3}
                            alt="image"
                            width={200}
                            height={200}    
                        />
                    }
                    <label className="font-semibold">Masukkan Nama Anggota 4</label>
                    <input
                        type="text"
                        value={nama4} 
                        onChange={(e) => setNama4(e.target.value)} 
                        placeholder="Nama 4"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Jurusan Anggota 4</label>
                    <input
                        type="text"
                        value={jurusan4} 
                        onChange={(e) => setJurusan4(e.target.value)} 
                        placeholder="Jurusan 4"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Foto Anggota 4</label>
                    <input type="file" onChange={handleFileProfileImage4} accept="image/*" required
                        className="cursor-pointer file:cursor-pointer block w-full text-sm text-zinc-500
                            file:mr-4 file:py-2 file:px-10
                            file:rounded-full file:border-0
                            file:font-semibold file:text-base
                          file:bg-sky-50 file:text-sky-700
                            file:transition-all hover:file:bg-sky-100 mb-5"
                    />
                    {previewProfile4 &&
                        <Image 
                            src={previewProfile4}
                            alt="image"
                            width={200}
                            height={200}    
                        />
                    }
                    <label className="font-semibold">Masukkan Judul Proker Multi</label>
                    <input
                        type="text"
                        value={judul} 
                        onChange={(e) => setJudul(e.target.value)} 
                        placeholder="Judul"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Deskripsi Proker Multi</label>
                    <input
                        type="text"
                        value={deskripsi} 
                        onChange={(e) => setDeskripsi(e.target.value)} 
                        placeholder="Deskripsi"
                        className="outline-none border rounded-full h-12 px-5 w-full mt-2 mb-5"
                        required
                    />
                    <label className="font-semibold">Masukkan Foto Proker Multi</label>
                    <input type="file" onChange={handleFileImage} accept="image/*" required
                        className="cursor-pointer file:cursor-pointer block w-full text-sm text-zinc-500
                            file:mr-4 file:py-2 file:px-10
                            file:rounded-full file:border-0
                            file:font-semibold file:text-base
                          file:bg-sky-50 file:text-sky-700
                            file:transition-all hover:file:bg-sky-100 mb-5"
                        />
                        {previewProker &&
                        <Image 
                            src={previewProker}
                            alt="image"
                            width={200}
                            height={200}    
                        />
                        }
                    <div className="flex gap-2">
                            <button
                                className="bg-zinc-300 font-bold text-black px-6 py-3 mt-5 rounded-xl">
                                Cancel
                            </button>
                            <button type="submit" disabled={uploading} className="bg-black font-bold text-white px-6 py-3 mt-5 rounded-xl">
                                {uploading ? 
                                    (
                                        <svg aria-hidden="true" className="w-5 h-5 text-white animate-spin fill-zinc-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                    ) 
                                : "Upload"}
                            </button>
                    </div>
                </form>
            </div>
        </div>
    )
}