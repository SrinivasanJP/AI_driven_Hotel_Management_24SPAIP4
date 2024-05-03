import React, { useEffect, useState } from 'react'
import {QRCodeSVG} from 'qrcode.react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { Bounce, ToastContainer, toast } from 'react-toastify';
const EditTableDetailsPage = ({tableData, setFragment,getTableData}) => {
    const [tableUserData, setTableUserData] = useState({})
    const [val,setVal] = useState("")
    console.log(val)
    const [preOrder, setPreOrder] = useState()
    const [currentOrder, setCurrentOrder] = useState([])
    const getTableUserData = async()=>{
      const docRef = doc(db, "user", tableData?.data?.user);
      await getDoc(docRef).then((docs)=>{
        if(docs?.exists()){
          setTableUserData(docs.data())
          setPreOrder(docs.data().preOrder)
          console.log(docs.data())
        }else{
          console.log("No data available")
        }
      });
    }
    console.log(tableUserData)
    useEffect(()=>{
      if(tableData?.data?.isReserved){
      getTableUserData()
      }else{
        console.log("Table not reserved")
      }
    },[tableData])

    const handleFreeTable = async() => {
      await setDoc(doc(db,"table",tableData?.id),{isReserved:false}).then(()=>{
        getTableData()
        setFragment("tableFragment")
      })
    } 


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
    console.log(currentOrder);
    const docRef = doc(db,"user",tableData?.data?.user)
    await setDoc(docRef,{...tableUserData,preOrder:currentOrder}).then(()=>{
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
    })
  };

  const handleVal = (e) =>{
    e.preventDefault()
    if(val == tableData?.data?.user?.slice(0,4)){
      toast.success('Table Reservation is verified', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
        });
    }else{
      toast.error('Table Reservation is not verified', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
        })
    }
  }
  return (
    <div className='flex justify-center items-center text-white flex-col w-full'>
             <ToastContainer />
        <div className='w-[80%] bg-slate-900 flex justify-center items-center p-10 m-10 flex-col rounded-xl'>
            <h1 className=' text-2xl m-10'>Scan this to confirm your Table</h1>
            <QRCodeSVG value={"Your secret Code is "+tableData?.data?.user?.slice(0,4)} size={300} includeMargin level='H' className='rounded-xl'/> 
            <form onSubmit={handleVal} className=' bg-gray-800 w-[50%] flex flex-col justify-center items-center m-10 p-5 rounded-2xl '>
              <input type="text" name="val" id="val" onChange={(e)=>setVal(e.target.value)} className=' rounded-xl p-4 focus:outline-none mb-5 bg-slate-300 text-black' placeholder='Enter Your key here' required minLength={4} maxLength={4}/>
              <input type="submit" value="Submit"  className='bg-slate-300 py-2 px-5 rounded-xl text-black' />
            </form>
        </div>
        <div className='w-[80%] bg-slate-900 m-10 p-5 rounded-xl'>
          <h1 className='text-3xl'>User data:</h1>
          <table className=' table-auto w-full'>
            <tbody>
              {
                tableUserData!={} && Object.keys(tableUserData).filter((value)=>value!="preOrder").sort().map((values, index)=>
                  (
                  <tr>
                  <td>{values.charAt(0).toUpperCase()+values.slice(1)} </td>
                  <td>{tableUserData[values]}</td>
                </tr>
                  )
                )
              }
             
            </tbody>
          </table>
        </div>
        <div className=' flex w-[80%]'>
        <div className='w-[48%] m-5 bg-slate-900 p-10 rounded-2xl'>
    <h1 className='text-2xl'>Predited Orders</h1>
    {preOrder === undefined ? (
        <h1>No Previous Orders</h1>
    ) : (
        <table className='w-full '>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {preOrder
                    .map((order, index) => (
                        <tr key={index}>
                            <td>{order.product}</td>
                            <td>{order.quantity}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )}
</div>

          <div className=' flex flex-col bg-slate-900 p-10 w-[48%] rounded-2xl m-5 '>
          <h1 className=' text-2xl mb-5'>Order Menu</h1>
      <form onSubmit={(e)=>handleSubmit(e)} className=' flex flex-col justify-center items-center'>
          <div className='flex justify-between items-center w-full'>
            <input
            className='text-black p-3 focus:outline-none rounded-xl'
              type="text"
              placeholder="Product"
              name="product"
              value={order.product}
              onChange={(event) => handleInputChange(event)}
            />
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
          </div>
        </div>
        <button className='w-[80%] bg-slate-950 m-10 p-5 text-2xl rounded-3xl' onClick={()=>handleFreeTable()}>Free Table</button>
<button className='w-[80%] bg-slate-950 m-10 p-5 text-2xl rounded-3xl' onClick={()=>setFragment("tableFragment")}>Back to Home page</button>

    </div>
  )
}

export default EditTableDetailsPage