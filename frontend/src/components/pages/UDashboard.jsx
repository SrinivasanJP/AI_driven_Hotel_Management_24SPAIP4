import React, { useEffect, useState } from 'react'

import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { FaCircle } from 'react-icons/fa';
import { IoTabletLandscape } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineChair } from "react-icons/md";
const TableCard = ({isReserved, onTableClick,id,isMine})=>{
  return (
    <div className=' relative justify-center items-center flex  w-[25em] h-[24em] bg-gray-900 rounded-3xl cursor-pointer' onClick={onTableClick}>
      {isReserved && <div className='flex absolute z-10 backdrop-blur-sm  w-full h-full flex-col justify-center items-center'>
        <h1 className=' text-green-800 font-extrabold text-3xl'>Table Reserved</h1>
        {isMine && 
      <h2 className=' text-red-700
      '>This is your Table</h2>
        }</div>
      }
      <MdOutlineChair size={50} className='absolute top-0' />
      <MdOutlineChair size={50} className='absolute right-0' />
      <MdOutlineChair size={50} className='absolute left-0' />
      <MdOutlineChair size={50} className=' absolute bottom-0' />

      <div className='relative justify-center items-center flex w-[15em] h-[15em] bg-slate-500 rounded-full'>
        <h1 className='absolute text-black'>{id}</h1>
      <IoTabletLandscape size={100}  />
      <FaCircle className='absolute top-0' size={50}/>
      <FaCircle className='absolute right-0' size={50}/>
      <FaCircle className='absolute left-0' size={50}/>
      <FaCircle className='absolute bottom-0' size={50}/>

    </div>
    </div>
    
  )
}
const UDashboard = ({userData, setPage}) => {
  const [tableData,setTableData] = useState(Array(5).fill({
  id:1,
  isReserved:false
}))
const handleLogout = async () =>{
  await auth?.signOut()
  localStorage.setItem("auth",false)
  setPage("home")
}
const getTableData = async ()=>{
  let data = []
    const collRef = collection(db,"table")
    const querySnapshot = await getDocs(collRef);
      querySnapshot.forEach((doc) => {
        data.push({id:doc.id,data:doc.data()});
      });
      setTableData(data)
  }
useEffect(()=>{
  getTableData()
},[])
const handleTableClick = async(id) => {
  const index = tableData.findIndex((value)=>value?.id == id)
  console.log(tableData, index, )
  if(!tableData[index].data.isReserved){
    if(confirm("do you want to reserve this table")){
      const docRef = doc(db,"table", id)
    await setDoc(docRef, {isReserved:true,user:auth?.currentUser?.uid}).then(res=>{
      toast.success('Table Reservation is success', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
        });
     getTableData()
    }).catch(e=>{
      alert(e.message.slice(22,-2))
    })

    }else{
      console.log("reservation cancelled")
      
    }
  
  }else{
    alert("table is reserved by someone else")
  }
}
  return (
    <div className='text-white flex flex-col items-center justify-center'>
       <ToastContainer />
      <div className='w-screen bg-slate-950 h-14 flex items-center justify-between p-10'>
        <div>
          <h1>Smart Restaurant management system</h1>
        <h1>Welcome {userData.name}</h1>
        </div>
      <button>Confirm Table</button>
      </div>
      <div className=' bg-slate-950 m-10 p-5'>
        <h1 className=' text-3xl font-bold'>Book your Table</h1>
        <div className=' flex  flex-wrap gap-20 justify-center items-center mt-10'>
          {tableData.map((value,index)=>(<TableCard isReserved={value?.data?.isReserved} key={index} id={value?.id} onTableClick={()=>handleTableClick(value?.id)} isMine={auth?.currentUser?.uid == value?.data?.user}/>))}
        </div>
      </div>
      <button className='w-[80%] bg-slate-950 m-10 p-5 text-2xl rounded-3xl' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UDashboard