import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Trip_Card from '../Trip Card/Trip_Card'
import axios from 'axios';
import { CONSTANTS } from '../CONSTANTS';


const All_Passengers_List_2 = () => {

    window.onbeforeunload = function () {
        return 'Your result trips will be lost. Are you really want to refresh the page?';
    }
    
    const urlParams = useParams()
    console.log(urlParams)
    let pickup_city = urlParams.pickup_city?.toUpperCase()
    let drop_city = urlParams.drop_city?.toUpperCase()
    let trip_date = urlParams.trip_date
    let arrive_by_time = urlParams.arrive_by_time
    

    // if(trip_date == ''){
    //     const currentDate = new Date();
    //     const currentMonth = currentDate.getMonth() + 1; // Adding 1 to convert zero-based index to actual month
    //     const twoDigitMonth = currentMonth.toString().padStart(2, '0');

    //     // console.log(twoDigitMonth); // This will output the current month as a two-digit number (e.g., "08" for August)

    //     trip_date = currentDate.getFullYear() +"-"+ twoDigitMonth +"-"+ currentDate.getDate();
    //     console.log(trip_date)

    // }
    // console.log(pickup_city,drop_city,trip_date)

    const [All_filtered_Trips, setAll_filtered_Trips] = useState([])
    const [N, setN] = useState(0)

    useEffect(() => {
        document.getElementById("trip_title").innerText = "Available Yellow Trips"

        document.getElementById("loadMoreBtn").innerHTML = `<div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div>`
        // console.log("use effect",N);
        // if(pickup_city || drop_city || trip_date){
            let data = JSON.stringify({
                "start_n": N,
                "pickup_city": pickup_city,
                "drop_city": drop_city,
                "trip_date": trip_date,
                "arrive_by_time": arrive_by_time
            });
    
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: CONSTANTS.server_url + '/get_filtered_trips_data_2',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };
    
            /*axios(config)
                .then(function (response) {
                    console.log("response.data.length",response.data.length);
                    if(response.data.length !== 0){
                        document.getElementById("loadMoreBtn").innerText = "Load More"
                        setAll_Accommodations_Data([...All_Accommodations_Data, ...response.data])
                    }else{
                        document.getElementById("loadMoreBtn").innerText = "That's all, My Friend..!"
                        document.getElementById("loadMoreBtn").disabled = true
                    }
                })
                .catch(function (error) {
                    console.log(error);
                }); */

                axios.request(config)
                .then((response) => {
                    // console.log("call")
                    // console.log(response.data);
                    document.getElementById("loadMoreBtn").innerHTML = "Find more";
                    if(response.data.length != 0){
                        document.getElementById("loadMoreBtn").style.display = "block"
                        // document.getElementById("no_trip_found").style.display = "none"
                        setAll_filtered_Trips([...All_filtered_Trips, ...response.data]);
                    }
                    else{
                        // document.getElementById("loadMoreBtn").style.display = "none"
                        document.getElementById("loadMoreBtn").innerText = "That's all, Dear Rider..!"
                        document.getElementById("loadMoreBtn").disabled = true
                        console.log("that's it",N)
                        // if(N != 0){
                        //     document.getElementById("no_trip_found").style.display = "block"
                        //     document.getElementById("no_trip_found").innerHTML = "Right now no more trip is found. Please check after sometime."
                        // }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        // }
        // else{
            // console.log("else use effect")
            // document.getElementById("trip_title").innerText = "Available Trips"
            // console.log(urlParams)
/*            let data = JSON.stringify({
                "start_n": N,
                "pickup_city": pickup_city,
                "drop_city": drop_city,
                "trip_date": trip_date
            });
    
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: CONSTANTS.server_url + '/get_filtered_trips_data_2',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

                axios.request(config)
                .then((response) => {
                    document.getElementById("loadMoreBtn").innerHTML = "Find more";
                    if(response.data.length != 0){
                        document.getElementById("loadMoreBtn").style.display = "block"
                        setAll_filtered_Trips([...All_filtered_Trips, ...response.data]);
                    }
                    else{
                        document.getElementById("loadMoreBtn").innerText = "That's all, Dear Rider..!"
                        document.getElementById("loadMoreBtn").disabled = true
                        console.log("that's it",N)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }*/
        
    }, [N])

    return (
        <>
            <Container>
                <marquee className="text-success pt-3 sticky-top" width="100%" direction="left" scrollamount="3">
                    <Link to={"/"}>
                        <b>{CONSTANTS.client_url}</b>
                    </Link>
                </marquee>
                <h1 className="text-center mt-3" id='trip_title'>Trips From <u>{pickup_city}</u> to <u>{drop_city}</u> on <u>{trip_date}</u></h1>
                <Row className='d-flex justify-content-around mb-5'>
                {
                    All_filtered_Trips.map((each_trip, id1) => {
                        return (
                            <Col className='pt-5' xs={12} md={4} key={id1}>
                            {/* {
                                All_Uploader_Data.map((each_uploader_item, id2) => {
                                    let arr = each_accommodation_item.Id.split("_@@_");
                                    let id_of_uploaded_by = arr[0];
                                    if(id_of_uploaded_by === each_uploader_item.Contact[0])
                                    {
                                        return (
                                            <Card_Of_Accommodation_Item
                                                key={id2} 
                                                each_accommodation_item={each_accommodation_item}
                                                each_uploader_item={each_uploader_item}
                                            />
                                        )
                                    }
                                })
                            } */}
                                <Trip_Card
                                    each_trip={each_trip} user_in_session={"g"} />
                            </Col>
                        )        
                    })
                }
                </Row>
                <center>
                    <Button id='loadMoreBtn' className='mb-5' variant="success" onClick={()=>setN(N+10)}>
                        Find More
                    </Button>
                </center>
            </Container>
        </>
    )
}

export default All_Passengers_List_2