import React from 'react'
import { auth } from '../../config/firebase'
import { IoTabletLandscape } from "react-icons/io5";
import { FaCircle } from 'react-icons/fa';
import { MdOutlineChair } from "react-icons/md";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
const UReservedTableDetails = ({tableData}) => {
    console.log(tableData)
    const valueFormatter = (value) => `${value}mm`;
    const chartSetting = {
      yAxis: [
        {
          label: 'No. of the test',
        },
      ],
      series: [{dataKey:"quantity",label: 'Predited bar chart', valueFormatter, }],
      height: 300,
      sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
          transform: 'translateX(-10px)',
        },
      },
    };
    
    const userTable = tableData.filter((val)=>val?.data?.user == auth?.currentUser?.uid)
    console.log(userTable)
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
  return (
    <div className='flex w-screen flex-wrap'>
        {userTable.map((val,ind)=>(
            <div key={ind} className=' flex w-full justify-evenly m-10'>
                <TableCard id={val.id}  isMine={true} isReserved={true} />
                {console.log(val?.data?.orderDetails )}
                {val?.data?.orderDetails &&
                <div >
                <BarChart
                        dataset={val?.data?.orderDetails} 
                        xAxis={[
                        { scaleType: 'band', dataKey: 'product', tickPlacement:"middle", tickLabelPlacement:"middle" },
                        ]}
                        {...chartSetting}
                        width={400}
                        height={400}
                    />
                </div> }
            </div>
        ))}
    </div>
  )
}

export default UReservedTableDetails