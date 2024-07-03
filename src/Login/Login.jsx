import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from '../CONSTANTS';
import axios from 'axios'; 

const Login = () => {

    useEffect(() => {
        document.getElementById("login_btn").innerHTML = "Login";
        document.getElementById("response_message").style.display = "none";
        // document.getElementById("logout_btn_from_all").style.display = "none";

        let rider_data = JSON.parse(localStorage.getItem("l_r_d"))

        if(rider_data != null){
            window.location.href = "/passenger_list"
        }
    }, [])

    let rider_guest_login = () => {
        // let rider_data = {
        //     "whn" : "g",
        //     "fln" : "g",
        //     "sub" : "g",
        //     "tot_dev_onl" : "g",
        //     "sub_exp_dat" : "g",
        // }
        // localStorage.setItem("l_r_d",JSON.stringify(rider_data))
        window.location.href = "/passenger_list"
        // window.location.href = "/choose_start_end_cities"
    }

    // let logout_btn_from_all = () => {
    //     console.log("----------------logout_btn_from_all")
    //     document.getElementById("logout_btn_from_all").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    //     let data = JSON.stringify({
    //                         "whatsapp_no": document.getElementById("whatsapp_no").value,
    //                         "total_device_online": false
    //                       });

    //                       let config = {
    //                         method: 'patch',
    //                         maxBodyLength: Infinity,
    //                         url: CONSTANTS.server_url + '/logout_from_all_devices',
    //                         headers: { 
    //                           'Content-Type': 'application/json'
    //                         },
    //                         data : data
    //                       };

    //                         axios.request(config)
    //                         .then((response) => {
    //                             console.log(response.data)
    //                             if(response.data.response1){
    //                                 document.getElementById("response_message").style.display = "block"
    //                                 document.getElementById("response_message").innerHTML = "You are logged out from multiple devices. Please login again."
    //                                 document.getElementById("logout_btn_from_all").style.display = "none"
    //                                 document.getElementById("logout_btn_from_all").innerHTML = 'Click to Logout From All Devices';
    //                                 document.getElementById("response_message").style.display = "none"

    //                                 document.getElementById("login_btn").style.display = "block"
    //                                 document.getElementById("login_btn").innerHTML = "Login";
    //                             }
                                
    //                         })
    //                         .catch((error) => {
    //                             console.log(error);
    //                         });        
    // }

    // let make_new_login = () => {
    //     let login_data = JSON.stringify({
    //         "whatsapp_no": document.getElementById("whatsapp_no").value,
    //     });
    //     let config = {
    //             method: 'post',
    //             maxBodyLength: Infinity,
    //             url: CONSTANTS.server_url + '/make_new_login',
    //             headers: { 
    //                 'Content-Type': 'application/json'
    //             },
    //             data : login_data
    //         };
    //         axios.request(config)
    //         .then((response) => {

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    let form_login_submit = (event) => {
        event.preventDefault(); 
        document.getElementById("login_btn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

            let login_data = JSON.stringify({
                    "whatsapp_no": document.getElementById("whatsapp_no").value,
                    "password": document.getElementById("password").value,
                    "today_date": (new Date().getMonth() +"-"+ new Date().getDate() +"-"+ new Date().getFullYear()).toString()
                });
            let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: CONSTANTS.server_url + '/login_rider',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : login_data
                };
            axios.request(config)
            .then((response) => {
                if(response.data.response == "success"){
                    // alert(response.data.message)
                    document.getElementById("login_btn").innerHTML = "Login";
                    let rider_data = {
                        "whn" : response.data.rider_data.whatsapp_no,
                        "fln" : response.data.rider_data.full_name,
                        "sub" : response.data.rider_data.subscribed,
                        "tot_dev_onl" : response.data.rider_data.total_device_online,
                        "sub_exp_dat" : response.data.rider_data.subscription_expire_date,
                        "tok" : response.data.rider_data.token1
                    }
                    localStorage.setItem("l_r_d",JSON.stringify(rider_data))
                    window.location.href = "/passenger_list"
                }
                else if(response.data.response == "already"){
                    document.getElementById("login_btn").innerHTML = "Login";
                    // document.getElementById("response_message").style.display = "block";
                    // document.getElementById("response_message").innerHTML= response.data.message;

                    // make_new_login()

                    document.getElementById("login_btn").innerHTML = "Login";
                    let rider_data = {
                        "whn" : response.data.rider_data.whatsapp_no,
                        "fln" : response.data.rider_data.full_name,
                        "sub" : response.data.rider_data.subscribed,
                        "tot_dev_onl" : response.data.rider_data.total_device_online,
                        "sub_exp_dat" : response.data.rider_data.subscription_expire_date,
                        "tok" : response.data.rider_data.token1
                    }
                    localStorage.setItem("l_r_d",JSON.stringify(rider_data))
                    window.location.href = "/passenger_list"

                    // alert(response.data.message)
                }
                else if(response.data.response == "not found"){
                    document.getElementById("login_btn").innerHTML = "Login";
                    document.getElementById("response_message").style.display = "block";
                    document.getElementById("response_message").innerHTML= response.data.message;
                    // alert(response.data.message)
                }
                else if(response.data.response == "wrong"){
                    document.getElementById("login_btn").innerHTML = "Login";
                    document.getElementById("response_message").style.display = "block";
                    document.getElementById("response_message").innerHTML= response.data.message;
                    // alert(response.data.message)
                }
                else{
                    // Something went wrong while login
                    document.getElementById("login_btn").innerHTML = "Login";
                    document.getElementById("response_message").style.display = "block";
                    document.getElementById("response_message").innerHTML= response.data.message;
                    // alert(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // let form_login_submit = (event) => {
    //     event.preventDefault(); 
    //     console.log("login submit")
    //     document.getElementById("login_btn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    //     let login_data = JSON.stringify({
    //                 "whatsapp_no": document.getElementById("whatsapp_no").value,
    //                 "password": document.getElementById("password").value,
    //                 "today_date": (new Date().getMonth() +"-"+ new Date().getDate() +"-"+ new Date().getFullYear()).toString()
    //             });
    //             let config = {
    //                 method: 'post',
    //                 maxBodyLength: Infinity,
    //                 url: CONSTANTS.server_url + '/login_rider',
    //                 headers: { 
    //                     'Content-Type': 'application/json'
    //                 },
    //                 data : login_data
    //             };
    //         axios.request(config)
    //         .then((response) => {
    //             console.log(response.data)

    //             if(response.data.response == true){
    //                 // "rider found, first time login"
    //                 document.getElementById("response_message").style.display = "block"
    //                 document.getElementById("response_message").innerHTML = response.data.message
    //                 console.log('window.location.href = "/passenger_list"', response.data.message)
    //                 document.getElementById("login_btn").innerHTML = "Login"

    //                 let rider_data = {
    //                     whn : response.data.rider_data.whatsapp_no,
    //                     fn : response.data.rider_data.full_name,
    //                     sub : response.data.rider_data.subscribed,
    //                     tot_dev_onl : response.data.rider_data.total_device_online,
    //                     sub_exp_dat : response.data.rider_data.subscription_expire_date
    //                 }
    //                 sessionStorage.setItem("l_r_d",JSON.stringify(rider_data));

    //                 window.location.href = "/passenger_list"
    //             }
    //             else if(response.data.response == "already"){
    //                 document.getElementById("response_message").style.display = "block"
    //                 document.getElementById("response_message").innerHTML = response.data.message
    //                 console.log(response.data.message)
    //                 document.getElementById("login_btn").innerHTML = "Login"
    //                 // document.getElementById("login_btn").style.backgroundColor = "darkred"

    //                 // document.getElementById("logout_btn_from_all").style.display = "block"
    //             }
    //             else{
    //                 document.getElementById("response_message").style.display = "block"
    //                 document.getElementById("response_message").innerHTML = response.data.message
    //                 console.log(response.data.message)
    //                 document.getElementById("login_btn").innerHTML = "Login"
    //             }
                
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    // let form_login_submit = (event) => {
    //     event.preventDefault(); 
    //     console.log("login submit")
        
    //     document.getElementById("login_btn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    //     let login_data = JSON.stringify({
    //         "whatsapp_no": document.getElementById("whatsapp_no").value,
    //         "password": document.getElementById("password").value,
    //         "today_date": (new Date().getMonth() +"-"+ new Date().getDate() +"-"+ new Date().getFullYear()).toString()
    //     });
    //     let config = {
    //         method: 'post',
    //         maxBodyLength: Infinity,
    //         url: CONSTANTS.server_url + '/login_rider',
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },
    //         data : login_data
    //     };

    //     axios.request(config)
    //         .then((response) => {
    //         // console.log(response.data);
    //         if(response.data.response){

    //             // check subscription then total device online
    //             if(response.data.rider_data.subscribed){
    //                 // if(response.data.rider_data.total_device_online == 0){

    //                     let data = JSON.stringify({
    //                         "whatsapp_no": response.data.rider_data.whatsapp_no,
    //                         "total_device_online": true
    //                       });
                          
    //                       let config = {
    //                         method: 'patch',
    //                         maxBodyLength: Infinity,
    //                         url: CONSTANTS.server_url + '/update_login_devices',
    //                         headers: { 
    //                           'Content-Type': 'application/json'
    //                         },
    //                         data : data
    //                       };
                          
    //                       axios.request(config)
    //                       .then((response) => {
    //                         if(response.data.response1){
    //                             let logged_user_data = {
    //                                 "fn" : response.data.rider_data.full_name,
    //                                 "whn" : response.data.rider_data.whatsapp_no,
    //                                 "has_sub" : response.data.rider_data.subscribed,
    //                                 "tot_dev_onl" : response.data.rider_data.total_device_online,
    //                                 "sub_exp_dat" : response.data.rider_data.subscription_expire_date,
    //                             }
    //                             sessionStorage.setItem("log_u_d",JSON.stringify(logged_user_data));
    //                             window.location.href = "/passenger_list";
    //                         }
    //                       })
    //                       .catch((error) => {
    //                         console.log(error);
    //                       });

                        
    //                 // }
    //                 // else{
    //                     // alert("already login")
    //                     // document.getElementById("login_btn").innerHTML = "Login";
    //                     // document.getElementById("response_message").style.display = "none";
    //                     // document.getElementById("login_btn").style.display = "none";
    //                     // document.getElementById("logout_btn_from_all").style.display = "block";
    //                     // document.getElementById("response_message").style.display = "block";
    //                     // document.getElementById("response_message").innerHTML = "Already Loggedin in multiple. Click on Logout From All Devices Button";
    //                     // document.getElementById("response_message").style.display = "none";
    //                     // console.log("-----else")
    //                     // document.getElementById("response_message").style.display = "block"
    //                     // document.getElementById("response_message").innerHTML = "You are logged out from multiple devices. Please login again."

    //                     // let data = JSON.stringify({
    //                     //     "whatsapp_no": response.data.rider_data.whatsapp_no,
    //                     //     "total_device_online": 0
    //                     //   });

    //                     //   let config = {
    //                     //     method: 'patch',
    //                     //     maxBodyLength: Infinity,
    //                     //     url: CONSTANTS.server_url + '/logout_from_all_devices',
    //                     //     headers: { 
    //                     //       'Content-Type': 'application/json'
    //                     //     },
    //                     //     data : data
    //                     //   };

    //                     //     axios.request(config)
    //                     //     .then((response) => {
    //                     //         if(response.data.response){
    //                     //             document.getElementById("response_message").style.display = "block"
    //                     //             document.getElementById("response_message").innerHTML = "You are logged out from multiple devices. Please login again."
    //                     //             document.getElementById("login_btn").innerHTML = "Login";
    //                     //         }
                                
    //                     //     })
    //                     //     .catch((error) => {
    //                     //         console.log(error);
    //                     //     });
    //                 // }
    //             }
    //             else{
    //                 document.getElementById("response_message").innerHTML = "Not subscribed or subscription is expired."
    //             }


                
    //         }else{
    //             document.getElementById("login_btn").innerHTML = "Login";
    //             document.getElementById("response_message").style.display = "block";
    //             document.getElementById("response_message").innerHTML = response.data.message
    //             // window.location.href = "/passenger_list"; //----------------change----------------
    //         }
    //     })
    //     .catch((error) => {
    //         document.getElementById("login_btn").innerHTML = "Login";
    //         console.log(error);
    //     });

    // }

    return (
        <>
            
            <div className="d-flex justify-content-center align-items-center p-3" style={{"height":"100vh"}}>
                <form action='#' onSubmit={form_login_submit} className='border border-primary bg-light rounded-5 p-5 '>
                <marquee className="text-danger" width="100%" direction="left" scrollamount="3">
                    {/* You can not do login in multiple devices otherwise your profile will be locked and then you can not unlock your profile. */}
                    <b>
                    You must not login on other device and browser after your FIRST LOGIN otherwise your account will be locked.
                    </b>
                </marquee>

                    <h1 className="text-center">{CONSTANTS.app_name} - Login </h1>

                    <p className="text-center bg-danger p-2 text-light" id='response_message'></p>

                    <div className="m-3">
                        <label className="form-label">WhatsApp No.</label>
                        <input type="number" className="form-control bg-warning" id="whatsapp_no" placeholder="enter only 10 digits" required />
                    </div>
                    <div className="m-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control bg-warning" id="password" placeholder="enter password" required />
                    </div>
                    <div className="m-3">
                        {/* <Link to={'/rider_info'}> */}
                            {/* <button type="submit" id='login_btn' className='btn btn-success'>Login</button>  */}

                            <div class="btn-group mr-2" role="group" aria-label="First group">
                                <button type="submit" id='login_btn' class="btn btn-success">Login</button>
                                <button type="button" onClick={rider_guest_login} class="btn btn-secondary text-dark">Guest Login</button>
                            </div>

                        {/* </Link> */}
                    </div>
                    <div className="m-3">
                        {/* <Link to={'/rider_info'}> */}
                            {/* <button type="button" onClick={logout_btn_from_all} id='logout_btn_from_all' className='btn btn-danger text-dark'>Click to Logout From All Devices</button> */}
                        {/* </Link> */}
                    </div>
                    <div className="m-3">
                        <Link to={'https://wa.me/+15483333597?text=Hi, I want to register as a rider.'} target='_blank'>register?</Link>
                    </div>
                    <div className="m-3">
                        <Link to={'/forgot_password'}>forgot password?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login