import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
const UOrderDetails = ({orders}) => {
    const formatedData = orders?.map((values,index)=>({id:index,value:values.quantity,label:values.product}))

  return (
    <div className='flex w-screen justify-between items-center h-screen flex-col lg:flex-row'>
<PieChart
className='w-[50%]'
      series={[
        {
            innerRadius:30,
            paddingAngle:5,
            cornerRadius:5,
          data: formatedData,
        },
      ]}
      width={800}
      height={500}
      
    />
      <div className='w-[45%] p-5 rounded-xl m-10 bg-slate-950'>
            <p>
            The pie chart, a quintessential visual tool, serves a dual purpose within the realm of culinary exploration, encapsulating the essence of your gastronomic journey and offering insights into your evolving palate and preferences. As you gaze upon its vibrant segments, each slice tells a story, a narrative woven from the myriad flavors, ingredients, and dishes that have graced your palate over time.

At its core, the pie chart serves as a tangible reflection of your culinary odyssey, a testament to the diverse array of dishes you've encountered and savored from the inception of the app to the present moment. With its meticulously crafted segments, the pie chart offers a snapshot of your gastronomic repertoire, showcasing the breadth and depth of your culinary experiences.

As you navigate the intricate labyrinth of the pie chart's segments, you may find yourself embarking on a journey of self-discovery, unraveling the intricacies of your culinary inclinations and uncovering the threads that bind your gastronomic experiences together. Whether it's a penchant for comfort food classics or an insatiable curiosity for exotic delicacies, each slice of the pie chart offers a glimpse into the multifaceted tapestry of your culinary identity.
            </p>
        </div>

    </div>
  )
}

export default UOrderDetails