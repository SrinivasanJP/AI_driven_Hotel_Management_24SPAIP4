import React, { useEffect, useState } from 'react'

import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { FaCircle } from 'react-icons/fa';
import { IoTabletLandscape } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineChair } from "react-icons/md";
import UOrderDetails from '../fragments/UOrderDetails';
import UReservedTableDetails from '../fragments/UReservedTableDetails';
import Profile from '../fragments/Profile';
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
const [showMenu, setShowMenu] = useState(false) 

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
const [tableId, setTableId] = useState(0)
const handleTableClick = async(id) => {
  const index = tableData.findIndex((value)=>value?.id == id)
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
    if(tableData[index]?.data?.user == auth?.currentUser?.uid){
      setShowMenu(true)
      setTableId(id)
    }else{
    alert("table is reserved by someone else")

    }
  }
}



const [currentOrder, setCurrentOrder] = useState([])
const [order,setOrder] = useState({product:"", quantity:""})
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder({...order,[name]:value})
  };

  const handleAddOrder = () => {
    const newdata = currentOrder
    newdata.push(order)
    setCurrentOrder(newdata)
    setOrder({product:"", quantity:""})
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    const docRef = doc(db,"user",auth?.currentUser?.uid)
    const tableRef = doc(db,"table",tableId)
    const tableIndex= tableData.findIndex((value)=>value.id == tableId)
    if(tableIndex !=-1)
    await setDoc(tableRef, {...tableData[tableIndex].data,orderDetails:currentOrder})

    let preData = userData?.preOrder
    preData = preData.concat(currentOrder)
    await setDoc(docRef,{...userData,preOrder:preData}).then(()=>{
      toast.success('Order plased', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
        });
        setCurrentOrder([])
        getTableData()
        setShowMenu(false)
    })
  };
  const [fragment,setFragment] = useState("dashboard");
  const renderFragment = () =>{ 
    switch (fragment) {
      case "dashboard":
        return(
          <>
          {
        showMenu && (
           <div className=' flex flex-col bg-slate-900 p-10 w-[48%] rounded-2xl m-5 '>
          <h1 className=' text-2xl mb-5'>Order Menu</h1>
      <form onSubmit={(e)=>handleSubmit(e)} className=' flex flex-col justify-center items-center'>
      <div className='flex justify-between items-center w-full'>
  <select
    className='text-black p-3 focus:outline-none rounded-xl'
    name="product"
    value={order.product}
    onChange={(event) => handleInputChange(event)}
  >
    <option value="">Select Product</option>
    <option value="Butter Chicken">Butter Chicken</option>
    <option value="Palak Paneer">Palak Paneer</option>
    <option value="Spicy Pork Vindaloo">Spicy Pork Vindaloo</option>
  </select>
  <input
    className='text-black p-3 focus:outline-none rounded-xl'
    type="number"
    placeholder="Quantity"
    name="quantity"
    value={order.quantity}
    onChange={(event) => handleInputChange(event)}
  />
</div>

        <button type="button" className='text-black p-3 mt-5 focus:outline-none bg-white  rounded-xl w-full' onClick={handleAddOrder}>
          + Add Order
        </button>
        <button className='text-black p-3 m-5 focus:outline-none bg-white  rounded-xl w-full' type="submit">Submit Orders</button>
      </form>
      <div>
  <table className='w-full table-auto'>
    <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {currentOrder.map((value,index)=>(
        <tr key={index}>
          <td>{value.product}</td>
          <td>
            {value.quantity}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </div>)
      }
      <div className=' bg-slate-950 m-10 p-5'>
        <h1 className=' text-3xl font-bold'>Book your Table</h1>
        <div className=' flex  flex-wrap gap-20 justify-center items-center mt-10'>
          {tableData.map((value,index)=>(<TableCard isReserved={value?.data?.isReserved} key={index} id={value?.id} onTableClick={()=>handleTableClick(value?.id)} isMine={auth?.currentUser?.uid == value?.data?.user}/>))}
        </div>
      </div>
     
     
          </>
        )
      case "orderDetails":
        return <UOrderDetails orders = {userData?.preOrder}/>
      case "reservedTableDetails":
        return <UReservedTableDetails tableData ={tableData} />
      case "profile":
        return <Profile userData={userData} setPage={setPage}/>
    
      default:
        break;
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
        <ul className=' flex gap-7'>
          <li className=' cursor-pointer hover:scale-110 transition-all delay-200' onClick={()=>setFragment("dashboard")}>Dashboard</li>
          <li className=' cursor-pointer hover:scale-110 transition-all delay-200' onClick={()=>setFragment("orderDetails")}>Order details</li>
          <li className=' cursor-pointer hover:scale-110 transition-all delay-200' onClick={()=>setFragment("reservedTableDetails")}>Reserved Table details</li>
          <li className=' cursor-pointer hover:scale-110 transition-all delay-200' onClick={()=>setFragment("profile")}>Profile</li>
        </ul>
      </div>
      {renderFragment()}
      </div>
  )
}

export default UDashboard