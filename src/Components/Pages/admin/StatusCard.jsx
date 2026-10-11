
import React from 'react'

const StatusCard = ({title,value}) => {
  return (
    <div>
        <p className="bg-white border border-gray-300 rounded-xl px-5 py-1 w-80">
            {title} {value}            
        </p> 
          
    </div>
  )
}

export default StatusCard
