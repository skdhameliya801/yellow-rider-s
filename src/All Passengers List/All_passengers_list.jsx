import React, { useEffect, useState } from 'react'
import { CONSTANTS } from '../CONSTANTS'
import axios from 'axios'; 
import Trip_Card from '../Trip Card/Trip_Card';
import "./All_Passengers_List.css"

const All_passengers_list = () => {

    const [N, setN] = useState(-2)
    const [user_in_session, setUser_in_session] = useState("g")
    let [trips_data, setTrips_data] = useState([])

    
    // const [is_rider_online, setIs_rider_online] = useState(false)

    // useEffect(() => {
    //     console.log(N)
    //     let session_data = JSON.parse(sessionStorage.getItem("log_u_d"))
    //     console.log(session_data)

    //     if(session_data != null){
    //         // console.log("not null")
    //         setUser_in_session(true)
    //         let data = JSON.stringify({
    //             "whatsapp_no": session_data.whn
    //         });

    //             let config = {
    //                 method: 'post',
    //                 maxBodyLength: Infinity,
    //                 url: CONSTANTS.server_url + '/get_user',
    //                 headers: { 
    //                     'Content-Type': 'application/json'
    //                 },
    //                 data : data
    //             };
        
    //         axios.request(config)
    //         .then((response) => {
    //             console.log(response.data);
    //             if(response.data.rider_data.total_device_online == 0 || response.data.rider_data.total_device_online >= 2){
    //                 alert("you can not logged in multiple devices. We make you logout from all other devices. Please login again.")
    //                 let data = JSON.stringify({
    //                     "whatsapp_no": session_data.whn,
    //                     "total_device_online": 0
    //                   });

    //                   let config = {
    //                     method: 'patch',
    //                     maxBodyLength: Infinity,
    //                     url: CONSTANTS.server_url + '/logout_from_all_devices',
    //                     headers: { 
    //                       'Content-Type': 'application/json'
    //                     },
    //                     data : data
    //                   };

    //                     axios.request(config)
    //                     .then((response) => {
    //                         console.log(response.data)
    //                         window.location.href = "/login"
    //                         // if(response.data.response1){
    //                         //     document.getElementById("response_message").style.display = "block"
    //                         //     document.getElementById("response_message").innerHTML = "You are logged out from multiple devices. Please login again."
    //                         //     document.getElementById("logout_btn_from_all").style.display = "none"
    //                         //     document.getElementById("logout_btn_from_all").innerHTML = 'Click to Logout From All Devices';
    //                         //     document.getElementById("response_message").style.display = "none"

    //                         //     document.getElementById("login_btn").style.display = "block"
    //                         //     document.getElementById("login_btn").innerHTML = "Login";
    //                         // }
                            
    //                     })
    //                     .catch((error) => {
    //                         console.log(error);
    //                     });
    //             }else{
    //                 console.log("no worries")
    //                 setUser_in_session(true)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     }
    //     else{
    //         window.location.href = "/login"
    //     }
    // }, [N])
    
    // useEffect(() => {
    //     console.log(N)
    // }, [N])
    

    // useEffect(() => {
    //     let session_data = JSON.parse(sessionStorage.getItem("l_r_d"))

    //     if(session_data != null){
    //         // setUser_in_session(true)
    //         let data = JSON.stringify({
    //             "whatsapp_no": session_data.whn
    //         });
    //         let config = {
    //             method: 'post',
    //             maxBodyLength: Infinity,
    //             url: CONSTANTS.server_url + '/get_user',
    //             headers: { 
    //                 'Content-Type': 'application/json'
    //             },
    //             data : data
    //         };
    //         axios.request(config)
    //         .then((response) => {
    //             console.log(N)
    //             if(response.data.response == true){
    //                 setIs_rider_online(true)
    //             }
    //             else if(response.data.response == false){
    //                 setIs_rider_online(false)
    //             }
    //             else if(response.data.response == "not found"){
    //                 setIs_rider_online(false)
    //             }
    //             else{
    //                 alert("Please login")
    //                 setIs_rider_online(false)
    //                 window.location.href = "/login"
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     }
    //     else{
    //         alert("please do login")
    //         window.location.href = "/login"
    //     }
    // }, [N])
    
    let call_trip_data_api = () => {
        console.log(N)
        let d = new Date();
        let current_date_str = (d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate()).toString()

                        let data = JSON.stringify({
                            start_n : N,
                            pickup_city : document.getElementById("pickup_city").value.toUpperCase(),
                            drop_city : document.getElementById("drop_city").value.toUpperCase(),
                            trip_date : current_date_str,

                        });

                            let config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: CONSTANTS.server_url + '/get_filtered_trips_data',
                                headers: { 
                                    'Content-Type': 'application/json'
                                },
                                data : data
                            };
                    
                        axios.request(config)
                        .then((response) => {
                            console.log(response.data);
                            if(response.data.length != 0){
                                document.getElementById("loadMoreBtn").style.display = "block"
                                setTrips_data([...trips_data, ...response.data]);
                            }
                            else{
                                document.getElementById("loadMoreBtn").style.display = "none"
                                console.log("that's it")
                                
                                // setN(0)
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
    }

    useEffect(() => {
        document.getElementById("choose_btn").click();

        let rider_data1 = JSON.parse(localStorage.getItem("l_r_d"))


        console.log(rider_data1)

        if(rider_data1 != null){
            let rider_data = JSON.stringify({
                "whatsapp_no": rider_data1.whn,
                "token1" : rider_data1.tok
            });
            let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: CONSTANTS.server_url + '/get_rider',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : rider_data
                };
            axios.request(config)
            .then((response) => {
                if(response.data.rider_data.token1 == rider_data1.tok){
                    window.location.href = "/login"
                }
                
            })
            .catch((error) => {
                alert("")
                console.log(error);
            });
        }
        else{
            window.location.href = "/login"
        }
    }, [])
    
    useEffect(() => {
        // let pickup_city1 = document.getElementById("pickup_city").value
        // let drop_city1 = document.getElementById("drop_city").value
        // if(document.getElementById("pickup_city").value == ''){
        //     document.getElementById("pickup_city").value = "p" 
        // }
        // if(document.getElementById("drop_city").value == ''){
        //     document.getElementById("drop_city").value = "p" 
        // }

        

        let rider_data = JSON.parse(localStorage.getItem("l_r_d"))
        console.log(rider_data)
        
        if(rider_data != null){
            if(rider_data.sub == true){
                if(rider_data.tot_dev_onl == true){
                    let d = new Date();
                    let current_date_str = (d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate()).toString()
                    let exp_date_str = rider_data.sub_exp_dat;
                    const current_date = new Date(current_date_str); // Assuming YYYY-MM-DD format
                    const exp_date = new Date(exp_date_str); // Assuming YYYY-MM-DD format
                    
                    // console.log(current_date_str)
                    // console.log(exp_date_str)
                    // console.log(current_date)
                    // console.log(exp_date)
                    if (current_date <= exp_date) {
                        // alert("The current date is before the expiration date.");
                        console.log("The current date is before the expiration date.");
                        // setN(N)
                        setUser_in_session(true)
                        call_trip_data_api()
    
                    } 
                    else if (current_date > exp_date) {
                        // alert("Subscription has been expired");
                        console.log("Subscription has been expired");
                        call_trip_data_api()
                    } 
                    // else {
                    //     alert("Last day of subscription");
                    // }

                }
                else{
                    // alert("Rider is loggedin on multiple devices. Profile is locked.")
                    console.log("Rider is loggedin on multiple devices. Profile is locked.")
                    call_trip_data_api()
                }
            }
            else{
                // alert("Rider has not subscribed or Subscription has been expired.")
                console.log("Rider has not subscribed or Subscription has been expired.")
                call_trip_data_api()
            }
        }
        else{
            // alert("Not found rider data. Please do login")
            console.log("Not found rider data. Please do login")
            call_trip_data_api()
        }
    }, [N])
    
    let form_choose_cities = (event) => {
        event.preventDefault(); 
        setN(N+2)
    }

    let find_btn = (event) => {
        // event.preventDefault(); 
        document.getElementById("choose_btn").click();
        setTrips_data([])
        setN(-2)
    }
    return (
    
        <>
        {/* {is_rider_online &&  <p>user's whatsapp number</p> } */}

        
        <button id='choose_btn' style={{"position":"fixed","bottom":"30px","right":"15px","borderRadius":"100px","zIndex":"99"}} class="btn btn-primary p-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Choose</button>

        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasBottomLabel">Find Passengers on {(new Date().getFullYear() +"-"+ (new Date().getMonth()+1) +"-"+ new Date().getDate()).toString()}</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
                        <div class="offcanvas-body small">
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12'>
                                            <form class="row g-3" onSubmit={form_choose_cities}>
                                                {/* <div class="col-md-6">
                                                    <label for="inputEmail4" class="form-label">Pickup City : </label>
                                                    <input type="text" class="form-control" id="trip_date" disabled/>
                                                </div> */}
                                                <div class="col-12">
                                                    <label for="inputEmail4" class="form-label">Pickup City : </label>
                                                    <input type="text" class="form-control bg-warning" id="pickup_city" placeholder='enter pickup city' />
                                                </div>
                                                <div class="col-12">
                                                    <label for="inputPassword4" class="form-label">Drop City : </label>
                                                    <input type="text" class="form-control bg-warning" id="drop_city" placeholder='enter drop city' />
                                                </div>
                                                <div class="col-12">
                                                    <button type="submit" class="btn btn-success" onClick={find_btn}>Find</button>
                                                </div>
                                                </form>
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>

            <div className='container'>
                <div className='row d-flex justify-content-start mb-5'>
                    {
                        trips_data.map((each_trip,id1) => (
                            <div className='col-xs-12 col-md-4 pt-5' key={id1}>
                                <Trip_Card each_trip={each_trip} user_in_session={user_in_session} />
                            </div>
                            // <div key={trip.id }>
                            //     <p>{trip.full_name}</p>
                            //     <p>{trip.arrive_by_time}</p>
                            //     <p>{user_in_session=='g'? "Login to see" : trip.phone_no}</p>
                            // </div>
                        ))
                    }
                </div>
            </div>

            <center>
                <p id='response_message'></p>
                    <button id='loadMoreBtn' className='mb-5 btn btn-success' variant="success" onClick={()=>setN(N+2)}>
                        Find more
                    </button>
            </center>
        </>

    )
}

export default All_passengers_list