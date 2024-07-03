import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import { CONSTANTS } from '../CONSTANTS';
import Trip_Card from '../Trip Card/Trip_Card';
import Swal from 'sweetalert2'

const All_Passengers_List_1 = () => {

    let [N, setN] = useState(0)
    let [trips_data, setTrips_data] = useState([])
    const [user_in_session, setUser_in_session] = useState("g")
    const [trip_date_1, setTrip_date_1] = useState("Chosen Date")


    useEffect(() => {
        // setN(N+10)
        // console.log("first use effect", N)
        let rider_data_str = localStorage.getItem("l_r_d")
        let rider_data_obj = JSON.parse(rider_data_str)
        document.getElementById("no_trip_found").style.display = "none"
        document.getElementById("loadMoreBtn").style.display = "none"

        
        if(rider_data_obj != null || user_in_session == "g"){
            document.getElementById("choose_btn").click();
        }
        else{
            window.location.replace("/")
        }
        

        /*
        let rider_data_str = localStorage.getItem("l_r_d")
        let rider_data_obj = JSON.parse(rider_data_str)
        
        if(rider_data_obj != null){

        let data1 = JSON.stringify({
            "whatsapp_no": rider_data_obj.whn,
        });
        let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: CONSTANTS.server_url + '/get_rider',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data1
                };
        axios.request(config)
        .then((response) => {
            if(response.data.response == "r_f"){
            // rider found
            if(response.data.rider_data.token1 == rider_data_obj.tok){
                // token same means old login
                console.log("same")
            }
            else{
                // token are not same means new login
                window.location.href = "/"
                // console.log("not same")
            }
            }
            else if(response.data.response == "r_n_f"){
            // rider not found
            alert(response.data.message)
            window.location.href = "/"
            }
            else{
            alert("something went wrong")
            window.location.href = "/"
            }
        })
        .catch((error) => {
            console.log(error);
        });
        
        }
        else{
        window.location.href = "/"
        // alert("Please login")
        }
        */

        
    }, [])

    useEffect(() => {
        // console.log("second use effect",N)
        document.getElementById("no_trip_found").style.display = "none"

        let rider_data_str = localStorage.getItem("l_r_d")
        let rider_data_obj = JSON.parse(rider_data_str)
        
        if(rider_data_obj != null || user_in_session == "g"){
                        let d = new Date();
                        let current_date_str = (d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate()).toString()
                        let exp_date_str = rider_data_obj?.sub_exp_dat;
                        const current_date = new Date(current_date_str); // Assuming YYYY-MM-DD format
                        const exp_date = new Date(exp_date_str); // Assuming YYYY-MM-DD format
                        
                        // console.log(current_date_str)
                        // console.log(exp_date_str)
                        // console.log(current_date)
                        // console.log(exp_date)
                        if (current_date <= exp_date) {
                            // console.log("cd")
                            // alert("The current date is before the expiration date.");
                            // console.log("The current date is before the expiration date.");
                            // setN(N)
                            setUser_in_session(true)
                            // if(N != -10){
                                call_trip_data_api()
                            // }
                            // else{
                            //     setN(N+10)
                            // }
        
                        } 
                        else if (current_date > exp_date) {
                            // console.log("ed")
                            // alert("Your subscription has been expired.");
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Your subscription has been expired.'
                                // footer: '<a href="">Why do I have this issue?</a>'
                            })
                            // console.log("Subscription has been expired");
                            // if(N != -10){
                                call_trip_data_api()
                            // }
                            // else{
                                // setN(N+10)
                            // }
                        }
                        else{
                            // console.log("else cd ed")
                            // if(N != -10){
                                call_trip_data_api()
                            // }
                            // else{
                                // setN(N+10)
                            // }
                        }
        }
        else{
            window.location.replace("/")
        }

    }, [N])
    
    // let choose_btn = () => {
    //     // console.log("------choose_btn")
    //     document.getElementById("loadMoreBtn").style.display = "none"
    //     document.getElementById("no_trip_found").style.display = "none"
    //     setTrips_data([])
    // }

    let find_btn = (event) => {
            event.preventDefault(); 
            // document.getElementById("choose_btn").click();
            
            document.getElementById("choose_city_find_btn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
            // setN(-10)
            N=0
            setN(N+10);
            //-------------------- setTrips_data([])
            trips_data.length = 0;
            setTrips_data([])
            
            // console.log(trips_data,N)

            let rider_data_str = localStorage.getItem("l_r_d")
            let rider_data_obj = JSON.parse(rider_data_str)
            
            if(rider_data_obj != null || user_in_session == 'g'){

                let data1 = JSON.stringify({
                    "whatsapp_no": rider_data_obj?.whn,
                });
                let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: CONSTANTS.server_url + '/get_rider',
                        headers: { 
                            'Content-Type': 'application/json'
                        },
                        data : data1
                        };
                axios.request(config)
                .then((response) => {
                    document.getElementById("choose_btn").click();
                    document.getElementById("choose_city_find_btn").innerHTML = "Find";
                    if(response.data.response == "r_f"){
                        // rider found
                        if(response.data.rider_data.token1 == rider_data_obj.tok){
                            // token same means old login
                            // console.log("same")
                            // setTrips_data([])
                            // setN(-2)
                            call_trip_data_api()
                        }
                        else{
                            // token are not same means new login
                            // alert("At a time you can do only one login. So you are now logged out from all the places. Please login here again.")
                            Swal.fire(
                                'Only one login?',
                                'At a time you can do only one login. So you are now logged out from all the places. Please login here again.',
                                'warning'
                            )
                            window.location.replace("/login")
                            // console.log("not same")
                        }
                    }
                    else if(response.data.response == "r_n_f"){
                        // rider not found
                        // console.log("rider not found")
                        setUser_in_session("g")
                        call_trip_data_api()
                        // alert(response.data.message)
                        // window.location.replace("/")
                    }
                    else{
                        // alert("something went wrong")
                        Swal.fire(
                            '',
                            'Something went wrong',
                            'error'
                        )
                        window.location.replace("/")
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            
            }
            else{
            window.location.replace("/")
            // alert("Please login")
            }

    }

    

    let call_trip_data_api = () => {
        // console.log("call_trip_data_api-------",N)
        if(N >= 0){
            let d = new Date();
            // let current_date_str = (d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate()).toString()
            let current_date_str = trip_date_1

                        let data = JSON.stringify({
                            start_n : N,
                            pickup_city : document.getElementById("pickup_city").value.trim().toUpperCase(),
                            drop_city : document.getElementById("drop_city").value.trim().toUpperCase(),
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
                            // console.log(response.data);
                            document.getElementById("loadMoreBtn").innerHTML = "Find more";
                            if(response.data.length != 0){
                                document.getElementById("loadMoreBtn").style.display = "block"
                                document.getElementById("no_trip_found").style.display = "none"
                                setTrips_data([...trips_data, ...response.data]);
                            }
                            else{
                                document.getElementById("loadMoreBtn").style.display = "none"
                                // document.getElementById("no_trip_found").style.display = "block"
                                    // document.getElementById("no_trip_found").innerHTML = "Right now no more trip is found. Please check after sometime."
                                console.log("that's it",N)
                                if(N != 0){
                                    document.getElementById("no_trip_found").style.display = "block"
                                    document.getElementById("no_trip_found").innerHTML = "Right now no more trip is found. Please check after sometime."
                                    // Swal.fire({
                                    //     icon: 'success',
                                    //     title: "That's it",
                                    //     text: "We showed you all the available trips based on your chosen cities."
                                    //     // footer: '<a href="">Why do I have this issue?</a>'
                                    // })
                                }
                                // setN(0)
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
        }
    }

    let find_more = () => {
        // console.log("1-find_more---", N)
        document.getElementById("loadMoreBtn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
        setN(N+10)
        // console.log("find_more",N)
        // console.log("2-find_more---", N)

    }

    let choose_btn = () => {
        // setTrips_data([])
        // setN(0)
        // console.log("choose_btn",N)
        // document.getElementById("no_trip_found").style.display = "block"
        // document.getElementById("no_trip_found").innerHTML = "Right now no more trip is found. Please check after sometime."
    }

    let test_trip_date = () => {
        let trip_date = document.getElementById("trip_date").value;
        console.log(trip_date);
        setTrip_date_1(trip_date)
        console.log(trip_date_1)
    }

    return (
    
    <>
    {/* {is_rider_online &&  <p>user's whatsapp number</p> } */}

    {/* <h5 class="text-center mt-5" >Trips on {(new Date().getFullYear() +"-"+ (new Date().getMonth()+1) +"-"+ new Date().getDate()).toString()}</h5> */}
    <h5 class="text-center mt-5" >Trips on {trip_date_1}</h5>
    
    

    <button id='choose_btn' style={{"position":"fixed","bottom":"30px","right":"15px","borderRadius":"100px","zIndex":"99"}} class="btn btn-primary p-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" onClick={choose_btn}>Choose</button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header">
            {/* <h5 class="offcanvas-title" id="offcanvasBottomLabel">Find Passengers on {(new Date().getFullYear() +"-"+ (new Date().getMonth()+1) +"-"+ new Date().getDate()).toString()}</h5> */}
            <h5 class="offcanvas-title" id="offcanvasBottomLabel">Find Passengers on {trip_date_1}</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
                    <div class="offcanvas-body small">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                        <form class="row g-3" onSubmit={find_btn}>
                                            {/* <div class="col-md-6">
                                                <label for="inputEmail4" class="form-label">Pickup City : </label>
                                                <input type="text" class="form-control" id="trip_date" disabled/>
                                            </div> */}
                                            <div class="col-12">
                                                <label for="inputEmail4" class="form-label">*Trip date : </label>
                                                <input type="date" onChange={test_trip_date} class="form-control bg-warning" id="trip_date"  required />
                                            </div>
                                            <div class="col-12">
                                                <label for="inputEmail4" class="form-label">*Pickup City : </label>
                                                <input type="text" class="form-control bg-warning" id="pickup_city" placeholder='enter pickup city' required />
                                            </div>
                                            <div class="col-12">
                                                <label for="inputPassword4" class="form-label">*Drop City : </label>
                                                <input type="text" class="form-control bg-warning" id="drop_city" placeholder='enter drop city' required />
                                            </div>
                                            <div class="col-12">
                                                {/* <button type="submit" class="btn btn-success" onClick={find_btn}>Find</button> */}
                                                <button type="submit" id='choose_city_find_btn' class="btn btn-success">Find</button>
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
                <button id='loadMoreBtn' className='mb-5 btn btn-success' variant="success" onClick={() => setN(N+10)}>
                    Find more
                </button>
                <p id='no_trip_found' className='mt-5 p-5 text-center'></p>
        </center>
    </>

)
}

export default All_Passengers_List_1