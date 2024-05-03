import React from 'react'
import {QRCodeSVG} from 'qrcode.react';

const EditTableDetailsPage = ({tableData, setFragment}) => {
    console.log(tableData)
  return (
    <div className='flex justify-center items-center text-white flex-col w-full'>
        <div className='w-[80%] bg-slate-900 flex justify-center items-center p-10 m-10 flex-col rounded-xl'>
            <h1 className=' text-2xl m-10'>Scan this to confirm your Table</h1>
            <QRCodeSVG value={tableData?.data?.user} size={300} includeMargin level='H' className='rounded-xl'/> 
        </div>

<button className='w-[80%] bg-slate-950 m-10 p-5 text-2xl rounded-3xl' onClick={()=>setFragment("tableFragment")}>Back to Home page</button>
    </div>
  )
}

export default EditTableDetailsPage