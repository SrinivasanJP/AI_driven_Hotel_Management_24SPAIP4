import React, { useEffect, useState } from 'react'
import { db } from './config/firebase.js'
import { doc, getDoc } from 'firebase/firestore'
import Login from './components/pages/Login'
import Signup from './components/pages/SignUp'
import BasicDetails from './components/pages/BasicDetails.jsx'
import { auth } from './config/firebase.js'
import EDashboard from './components/pages/EDashboard.jsx'
import UDashboard from './components/pages/UDashboard.jsx'
import { ToastContainer } from 'react-toastify';
import Home from './components/pages/Home.jsx'
import EditTableDetailsPage from './components/pages/EditTableDetailsPage.jsx'
 function App(){
  const [userData,setUserData] = useState({})
  const [tableData,setTableData] = useState([])
  const [page, setPage] = useState("home")
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user!=null && user.emailVerified){
        checkBasics()
      }
    })
  },[])
  const checkBasics = async() =>{
    const docRef = doc(db, "user", auth?.currentUser?.uid);
    await getDoc(docRef).then((docs)=>{
      if(docs?.exists()){
        setUserData(docs.data())
        localStorage.setItem("auth",true)
        if(docs.data().employee){
          setPage("eDashboard")
        }else{
          setPage("uDashboard")
        }
      }else{
        setPage("initialization")
      }
    });
    
  }
  
  
  const renderPage = ()=>{
    switch (page){
      case "home":{
        return(<Home setPage={setPage}/>)
      }
      case "login":{
        return (<Login setPage={setPage} checkBasics={checkBasics}/>)
      }
      case "signup":{
        return (<Signup setPage={setPage}/>)
      }
      case "eDashboard": {
        return(<EDashboard userData={userData} tableData={tableData} setTableData = {setTableData}/>)

      }
      case "editTableDetials":{
        return(<EditTableDetailsPage tableData={tableData[index]}/>)
      }
      case "uDashboard":{
        return(<UDashboard userData={userData} setPage={setPage} tableData={tableData} setTableData = {setTableData}/>)

      }
      case "initialization":{
        return (<BasicDetails setPage={setPage} checkBasics={checkBasics}/>)
      }
      default:
        return null
    }
  }
  return (
    <div>
      {renderPage()}
    </div>
  )
}

export default App
