import React from 'react'
import { Link } from 'react-router-dom'

const Whatsapp_Button = (props) => {
  return (
    <>
        {
            props.user_in_session == 'g'
            ? <Link to={"/rider_info"}> <button class="btn btn-success">Register to see whatsapp</button> </Link>  
            : <a href={`https://wa.me/${props.each_trip?.phone_no.split("#")[0]}?text= *Hi ${props.each_trip?.full_name}*, %0A *Pickup Address :* ${props.each_trip?.full_pickup_address}, ${props.each_trip?.pickup_city}, %0A *Drop Address :* ${props.each_trip?.full_drop_address}, ${props.each_trip?.drop_city}, %0A *Arrive by Time :* ${props.each_trip?.arrive_by_time}, %0A *Trip Date :* ${props.each_trip?.trip_date}, %0A %0A *You are looking for rider for this trip, Right?*`} target='_blank' className='btn btn-success'>WhatsApp</a>
        }
        

        
    </>
  )
}

export default Whatsapp_Button