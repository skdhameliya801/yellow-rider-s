import React, { useEffect, useState } from 'react'
import { CONSTANTS } from '../CONSTANTS'
import axios from 'axios'; 
import Swal from 'sweetalert2'
import { OverlayTrigger, Popover } from "react-bootstrap";

const Passenger_View_1 = () => {

    let [submitted, setSubmitted] = useState(false)
    let [isLoader, setIsLoader] = useState(false)
    let [submitted_trip_data, setSubmitted_trip_data] = useState('')
    const [input_phone_no, setInput_phone_no] = useState(false);


    useEffect(() => {
        document.getElementById("hint").click();
        // document.getElementById("response_message").style.display = "none";
    }, [])

    const handle_phone_no_Change = (e) => {
        setInput_phone_no(e.target.value);
        // document.getElementById("entered_phone_no").innerText = input_phone_no;
    };

    function PopoverPositionedExample(popover_placement, popover_bodyText) {
        return (
          <>
              <OverlayTrigger
                trigger="click"
                key={popover_placement}
                placement={popover_placement}
                overlay={
                  <Popover id={`popover-positioned-${popover_placement}`}>
                    <Popover.Header as="h3" style={{"background":"black","color":"yellow"}}>{`Rider will contact you on this WhatsApp number. So please give right WhatsApp no. with +1 country code. (e.g. +15483333597)`}</Popover.Header>
                    {/* <Popover.Body style={{"background":"black","color":"white"}}>
                      <p>{popover_bodyText}</p>
                    </Popover.Body> */}
                  </Popover>
                }
              >
                <b id='hint' style={{"border": "5px solid black", "borderRadius":"50%", "padding":"0px 5px", "background":"black","color":"yellow","margin":"5px","cursor":"pointer"}}>?</b>
              </OverlayTrigger>
          </>
        );
    }

    let test_trip_date = () => {
        let trip_date = document.getElementById("trip_date").value;
        console.log(trip_date);
    }

    let sweet_alert = (event) => {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure want to post this trip?',
            text: "Available rider will contact you on "+input_phone_no,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Yes, post it!'
        }).then((result) => {
            if (result.isConfirmed) {
                passenger_form_submit()
            }
        })
    }
    
    let passenger_form_submit = () => {
        // event.preventDefault();
        
        document.getElementById("submit_ride_detail_btn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

        let trip_date = document.getElementById("trip_date").value;
        let req_fare = document.getElementById("req_fare").value.trim().toUpperCase();
        let full_name = document.getElementById("full_name").value.trim()
        let full_pickup_address = document.getElementById("full_pickup_address").value.trim()
        let pickup_city = document.getElementById("pickup_city").value.toUpperCase().trim()
        
        // let pickup_landmark = document.getElementById("pickup_landmark").value
        let phone_no = document.getElementById("phone_no").value.trim()
        let full_drop_address = document.getElementById("full_drop_address").value.trim()
        let drop_city = document.getElementById("drop_city").value.toUpperCase().trim()
        let pickup_time = document.getElementById("pickup_time").value
        let arrive_by_time = document.getElementById("arrive_by_time").value
        
        // let arrive_by_HH = document.getElementById("arrive_by_HH").value
        // let arrive_by_MM = document.getElementById("arrive_by_MM").value
        // let arrive_by_am_pm = document.getElementById("arrive_by_am_pm").value

        // phone_no = phone_no.replace(/[^0-9]/g, "");
        // phone_no = "+1"+phone_no;
        // console.log(phone_no)

        let trip_data = JSON.stringify({
            trip_date,
            req_fare,
            full_name,
            full_pickup_address,
            // pickup_landmark,
            phone_no,
            full_drop_address,
            pickup_time,
            arrive_by_time,
            pickup_city,
            drop_city,
            // "trip_date": (new Date().getFullYear() + "-" +(new Date().getMonth()+1) +"-"+ new Date().getDate()).toString()
        });

        // console.log(trip_data)
        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: CONSTANTS.server_url + '/trip_data',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : trip_data
        };

        axios.request(config)
            .then((response) => {
                // console.log(response.data)
                if(response.data.response == "trip added"){
                    setSubmitted_trip_data(response.data.rider_data)
                    document.getElementById("submit_ride_detail_btn").innerHTML = "Submit"
                    // document.getElementById("response_message").style.display = "block";
                    // document.getElementById("response_message").innerHTML = response.data.message;
                    document.getElementById("contact_us_form").style.display = "none";
                }
                else{
                    document.getElementById("submit_ride_detail_btn").innerHTML = "Submit"
                    // document.getElementById("response_message").style.display = "block";
                    // document.getElementById("response_message").innerHTML = response.data.message
                    document.getElementById("contact_us_form").style.display = "none";
                }
            })
            .catch((error) => {
                console.log(error);
            });        
    }

    let check_phone_no = () => {
        // console.log("check_phone_no")
        let phone_no = document.getElementById("phone_no").value.trim()
        phone_no = phone_no.replace(/[^0-9]/g, "");
        
        if(phone_no.startsWith("1")){
            phone_no = "+"+phone_no;
        }else{
            phone_no = "+1"+phone_no;
        }

        setInput_phone_no(phone_no)
        // console.log(input_phone_no)
        // alert(`Is ${phone_no} right WhatsApp No?`)
    }

    return (
        <div className="container mt-5 mb-5 pl-2 pr-2">
            
            {
                submitted_trip_data && <div className='mt-5'>
                    <h3 className='mt-5 p-5'>Hey {submitted_trip_data.full_name}, 
                        <span id="response_message" className='text-center justify-content-center align-content-center'> We got your Trip details as mentioned below. You will soon get whatsapp messages from riders.</span>
                    </h3>
                    
                    <div className='m-5 text-center p-5' style={{"boxShadow":"0 0 10px 2px green"}}>
                        <p><b>Pickup Address :</b> {submitted_trip_data.full_pickup_address}, {submitted_trip_data.pickup_city}</p>
                        <p><b>Drop Address :</b> {submitted_trip_data.full_drop_address}, {submitted_trip_data.drop_city}</p>
                        <p><b>Arrive by Time :</b> {submitted_trip_data.arrive_by_time}</p>
                        <p><b>Phone No :</b> {submitted_trip_data.phone_no}</p>
                        <p><b>Requested Fare :</b> {submitted_trip_data.req_fare}</p>
                        <p><b>Trip Date :</b> {submitted_trip_data.trip_date}</p>
                        <h3 className='mt-5'>Thank You..!, {submitted_trip_data.full_name}</h3>
                    </div>
                </div>
            }
        
            <form 
                id='contact_us_form'
                method='POST'
                onSubmit={sweet_alert}>
                
                {/* <h1 className='text-center'><b>Want a trip on {(new Date().getFullYear() + "-" +(new Date().getMonth()+1) +"-"+ new Date().getDate()).toString()} ? </b> </h1> */}
                <h1 className='text-center'><b>Give your trip details here. Rider will contact you. </b> </h1>
                
                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*Choose Trip Date : </b> </label>
                    <input type="date" id='trip_date' className="form-control border-5" required />
                    </div>
                </div>

                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*How much fare you want to give? : </b> </label>
                    <input type="text" id='req_fare' className="form-control border-5" placeholder='15 CAD' required />
                    </div>
                </div>

                <div className="row mt-5 justify-content-center">
                    
                    <div className="col-sm-6">
                        <label className="form-label"> <b>*Full Name : </b> </label>
                        <input type="text" id='full_name' className="form-control border-5" required />
                    </div>
                </div>

                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*Pickup Address : </b> <br/> (Format :  House no, Street/Apartment name, Pincode)</label>
                    <input type="text" id='full_pickup_address' minLength={"5"} className="form-control border-5" required />
                    </div>
                </div>

                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*Pickup city : </b> </label>
                    <input type="text" id='pickup_city' minLength={"3"} placeholder='Toronto' className="form-control border-5" required />
                    </div>
                </div>

                {/* <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*Nearest Landmark of above Pickup Address : </b> </label>
                    <select className="form-select border-5" id='pickup_landmark' name='entry.1343336432' required>
                        <option selected>Choose...</option>
                        <option>1.0 - Conestoga Mall</option>
                        <option>2.0 - University of Waterloo</option>
                        <option>3.0 - Conestoga College Waterloo Campus</option>
                        <option>4.0 - Sobeys Columbia Laurelwood</option>
                        <option>5.0 - Walmart at Boardwalk</option>
                        <option>6.0 - Central Frederick</option>
                        <option>7.0 - Walmart at Sunrise Shopping Centre</option>
                        <option>8.0 - Block Line Station</option>
                        <option>9.0 - Fairview Park</option>
                        <option>10.0 - Doon South</option>
                        <option>11.0 - Conestoga College Doon Campus</option>
                        <option>12.0 - Toyota Motor Manufacturing Inc Cambridge</option>
                        <option>13.0 - Preston Cambridge</option>
                        <option>14.0 - Walmart at Pinebush Cambridge</option>
                        <option>15.0 - Hespeler Mill Pond Cambridge</option>
                        <option>16.0 - Fiddlesticks Cambridge</option>
                        <option>17.0 - Biryaniwalla Cambridge</option>
                        <option>18.0 - Cambridge Cricket Club</option>
                        <option>19.0 - Southwood Cambridge</option>
                        <option>20.0 - Churchill Park Cambridge</option>
                        <option>21.0 - Decaro Park Cambridge</option>
                    </select>
                    </div>
                </div> */}

                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*Drop Address : </b> <br/> (Format :  House no, Street/Apartment name, Pincode)</label>
                    <input type="text" className="form-control border-5" minLength={"5"} id='full_drop_address' required />
                    </div>
                </div>

                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*Drop city : </b> </label>
                    <input type="text" id='drop_city' minLength={"3"} placeholder='Kitchener' className="form-control border-5" required />
                    </div>
                </div>

                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*WhatsApp No : { PopoverPositionedExample("bottom", "( Country / State / City )")} </b> <br/> (Format : WhatsApp number with +1 country code (e.g. +15483333597)) 
                    </label>
                    {/* <input type="tel" pattern="[1-9]{1}[0-9]{9}" title="Only 10 digits Canadian WhatsApp number (e.g. 5483333597)" className="form-control border-5" id='phone_no'  required /> */}
                    {/* <input type="tel" title="WhatsApp number with country code (e.g. +15483333597)" placeholder='enter whatsapp no. here' onfocusout={(e) => check_phone_no(e.target.value)} className="form-control border-5 bg-warning" id='phone_no'  required /> */}
                    <input autoComplete='nope' type="number" title="WhatsApp number with country code (e.g. +15483333597)" placeholder='enter whatsapp no. here' onBlur={check_phone_no} className="form-control border-5 bg-warning" id='phone_no'  required />
                    {input_phone_no && <span id='entered_phone_no'>Your number will be : {input_phone_no}</span> }
                    </div>
                </div>
                
                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*Pick Up Time from Pickup Address : </b> </label>
                    {/* <input type="time" className="form-control border-5" id='arrive_by_time' name='entry.452012505' required /> */}
                    <select className="form-select border-5" id='pickup_time' required>
                        <option selected>Choose...</option>
                        <option value="12:30 AM">12:30 AM</option>
                        <option value="1:00 AM">1:00 AM</option>
                        <option value="1:30 AM">1:30 AM</option>
                        <option value="2:00 AM">2:00 AM</option>
                        <option value="2:30 AM">2:30 AM</option>
                        <option value="3:00 AM">3:00 AM</option>
                        <option value="3:30 AM">3:30 AM</option>
                        <option value="4:00 AM">4:00 AM</option>
                        <option value="4:30 AM">4:30 AM</option>
                        <option value="5:00 AM">5:00 AM</option>
                        <option value="5:30 AM">5:30 AM</option>
                        <option value="6:00 AM">6:00 AM</option>
                        <option value="6:30 AM">6:30 AM</option>
                        <option value="7:00 AM">7:00 AM</option>
                        <option value="7:30 AM">7:30 AM</option>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="8:30 AM">8:30 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="9:30 AM">9:30 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="11:55 AM">11:55 AM</option>
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="2:30 PM">2:30 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="3:30 PM">3:30 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="4:30 PM">4:30 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="5:30 PM">5:30 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="6:30 PM">6:30 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="8:30 PM">8:30 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="9:30 PM">9:30 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                        <option value="10:30 PM">10:30 PM</option>
                        <option value="11:00 PM">11:00 PM</option>
                        <option value="11:30 PM">11:30 PM</option>
                        <option value="11:55 PM">11:55 PM</option>
                    </select>
                    </div>
                </div>

                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*Arrive By Time at Drop Address : </b> </label>
                    {/* <input type="time" className="form-control border-5" id='arrive_by_time' name='entry.452012505' required /> */}
                    <select className="form-select border-5" id='arrive_by_time' required>
                        <option selected>Choose...</option>
                        <option value="12:30 AM">12:30 AM</option>
                        <option value="1:00 AM">1:00 AM</option>
                        <option value="1:30 AM">1:30 AM</option>
                        <option value="2:00 AM">2:00 AM</option>
                        <option value="2:30 AM">2:30 AM</option>
                        <option value="3:00 AM">3:00 AM</option>
                        <option value="3:30 AM">3:30 AM</option>
                        <option value="4:00 AM">4:00 AM</option>
                        <option value="4:30 AM">4:30 AM</option>
                        <option value="5:00 AM">5:00 AM</option>
                        <option value="5:30 AM">5:30 AM</option>
                        <option value="6:00 AM">6:00 AM</option>
                        <option value="6:30 AM">6:30 AM</option>
                        <option value="7:00 AM">7:00 AM</option>
                        <option value="7:30 AM">7:30 AM</option>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="8:30 AM">8:30 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="9:30 AM">9:30 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="11:55 AM">11:55 AM</option>
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="2:30 PM">2:30 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="3:30 PM">3:30 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="4:30 PM">4:30 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="5:30 PM">5:30 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="6:30 PM">6:30 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="8:30 PM">8:30 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="9:30 PM">9:30 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                        <option value="10:30 PM">10:30 PM</option>
                        <option value="11:00 PM">11:00 PM</option>
                        <option value="11:30 PM">11:30 PM</option>
                        <option value="11:55 PM">11:55 PM</option>
                    </select>
                    </div>
                </div>

                {/* <div className="row mt-5 justify-content-center">
                    <div className="col-sm-6">
                    <label className="form-label"> <b>*Arrive By Time at Drop Address : </b> <br/> (Format : hh:mm AM/PM)</label>
                        <div className="row justify-content-center align-items-center g-2">
                        <div className="col-4">
                            <input type="text" className="form-control border-5" id='arrive_by_HH' placeholder='hh' />
                        </div>
                        <div className="col-4">
                            <input type="text" className="form-control border-5" id='arrive_by_MM' placeholder='mm' />
                        </div>
                        <div className="col-4">
                            <select className="form-select border-5" id='arrive_by_am_pm'>
                            <option selected>AM</option>
                            <option>PM</option>
                            </select>
                        </div>
                        </div>
                    </div>
                </div> */}

                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                    <center>
                        <button type="submit" id='submit_ride_detail_btn' className='btn btn-success'>Submit Trip</button>
                    </center>
                    </div>
                </div>
            
            </form>
        </div>
    )
}

export default Passenger_View_1