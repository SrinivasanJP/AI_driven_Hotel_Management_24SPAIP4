import React, { useState } from 'react';
import SettingSVG from '../../assets/svgs/personl_settings.svg'
import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
const StudentForm = ({setPage,checkBasics}) => {
  const [pState, setPState] = useState(false)
  const [userDetails, setUserDetails] = useState({
    name: '',
    dob:'',
    gender: 'other',
    nationality: 'India',
    address: '',
    phoneNumber: '',
    email: auth?.currentUser?.email,
    employee:false,
  });
  const input_box="border-b-2 w-full pl-8 p-3 mb-6  bg-stone-100 rounded-2xl shadow-sm"
const handleSubmit = async(e)=>{
    setPState(true)
    e.preventDefault()
    
    const docRef = doc(db,"user", auth?.currentUser?.uid)
    await setDoc(docRef, userDetails).then(res=>{
        checkBasics()
    }).catch(e=>{
      setPState(false)
      alert(e.message.slice(22,-2))
    })
}

  return (
    <div className="bg-[#f6f6f6] flex justify-center items-center">
      <div className="bg-[#fefefe] w-[90%] my-[10%] rounded-2xl shadow-2xl flex flex-wrap md:p-10 p-2">
        <img src={SettingSVG} alt="Login Svg" className="w-1/2 p-5 hidden md:block" />
        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center">
          <h1 className="antialiased font-extrabold font text-3xl text-left mb-10">Enter Basic Details</h1>
          <form className='mt-5' onSubmit={(e)=> handleSubmit(e)}>
            <label htmlFor="uname" className="absolute pt-4 pl-2"></label>
            <input type="text" name="uname" id="uname" placeholder="Enter your Fullname" required title="Username" className={input_box} onChange ={(e) => setUserDetails({...userDetails, name:e.target.value})}/>
            <label htmlFor="dob">Select the date of Birth:</label>
      
            <input type="date" 
            name="dob" 
            id="dob"  
            required 
            title="dob" 
            className={input_box} 
            onChange={(e) => setUserDetails({...userDetails, dob:e.target.value})}/>
            <select name="gender" id="gender" className={input_box} required onChange={(e)=> setUserDetails({...userDetails, gender:e.target.value})}>
                <option value="">Choose your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <input type="text" 
            value={"India"} 
            name="nationality" 
            id="nationality" 
            placeholder="Enter your Nationality" 
            required 
            title="nationality" 
            className={input_box} 
            onChange={(e) => setUserDetails({...userDetails, nationality:e.target.value})}/>
           
            <textarea name="address" id="address" 
            className={input_box} placeholder='Enter your address' required onChange={(e)=>setUserDetails({...userDetails, address:e.target.value})}></textarea>
            <input type="tel" 
            min={10}
            max={10}
            name="mobile" 
            id="mobile" 
            placeholder="Enter your Mobile number" 
            required 
            title="mobile" 
            className={input_box} 
            onChange={(e) => setUserDetails({...userDetails, phoneNumber:e.target.value})}/>
            <input type="email" 
            name="email" 
            id="email" 
            placeholder="Enter your email"
            value={auth?.currentUser?.email} 
            required 
            title="email" 
            className={input_box} 
            onChange={(e) => setUserDetails({...userDetails, email:e.target.value})}/>
            <div className="flex items-center mt-2">
            <input 
              type="checkbox" 
              name="emp" 
              id="emp" 
              checked={userDetails.employee} 
              onChange={(e) => setUserDetails({...userDetails, employee: e.target.checked})} 
              className="mr-2"
            />
            <label htmlFor="emp" className='inline-block'>Are you an Employee?</label>
          </div>
           
            
           
            
            <button className="flex items-center px-4 justify-center py-2 mt-5 font-bold leading-6 text-sm shadow rounded-md text-white bg-cyan-500 min-w-[7em] transition ease-in-out duration-150">
            <svg className={pState?"animate-spin -ml-1 mr-3 h-5 w-5 text-white":"hidden"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>{pState?"Processing...":"Submit"}
              </button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default StudentForm;
