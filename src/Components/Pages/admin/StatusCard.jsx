
import React from 'react'

const StatusCard = ({title,value}) => {
  return (
    <div>
        <p className="bg-white border border-gray-200 rounded-md  font-semibold px-5 py-2.5 w-78.5 text-[#334155] text-[12px] ">
            {title} <span className=' text-[#64748] text-[10px] font-medium '>{value}</span>             
        </p>           
    </div>
  )
}

export default StatusCard
