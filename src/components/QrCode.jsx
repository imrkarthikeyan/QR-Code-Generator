import { useState } from "react"

export const QrCode = () => {

    const[img,setImg]=useState("")
    const[loading,setLoading]=useState(false)
    const[qrData,setQrData]=useState("")
    const[qrSize,setQrSize]=useState("150")

    async function generateQR(){
        setLoading(true)
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
            setImg(url)
        }
        catch(error){
            console.error("Error generating QR code:", error)
        }
        finally{
            setLoading(false)
        }
    }

    function downloadQR(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link=document.createElement("a")
            link.href=URL.createObjectURL(blob)
            link.download="QR_code.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }).catch((error)=>{
            console.error("Error downloading QR code", error)
        })
    }

  return (
    <div className="app-container">
        <h2>QR CODE GENERATOR</h2>
        {loading && <p>Loading..</p>}
        {img && <img src={img} alt="" className="QR-code" />}
        <div>
            <label htmlFor="dataInput" className="input-label">Data for Qr Code :</label>
            <input type="text" id="dataInput" placeholder="Enter url" onChange={(e)=>setQrData(e.target.value)}/>

            <label htmlFor="sizeInput" className="input-label">Image size (eg., 200) :</label>
            <input type="text" id="sizeInput" placeholder="Enter size" onChange={(e)=>setQrSize(e.target.value)}/>

            <button className="generate-btn" disabled={loading} onClick={generateQR}>Generate QR code</button>
            <button className="download-btn" onClick={downloadQR}>Download QR code</button>
        </div>
    </div>
  )
}
