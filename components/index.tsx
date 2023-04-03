"use client"
import React, { useState } from 'react'

const PageC = () => {
    const [file, setFile] = useState<any>();
    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target?.files?.[0])
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const sendFile = async () => {
        const newFile = await toBase64(file)

        await fetch(`${process.env.NEXT_PUBLIC_SITE}/api/storage?key=image`, {
            method: 'PUT',
            body: JSON.stringify({image: newFile}),
        })
    }

  return (
    <>
        <p>select file</p>
        <input type="file" onChange={(event) => selectFile(event)} />

        <button onClick={sendFile}>Отправить</button>
    </>
  )
}

export default PageC
