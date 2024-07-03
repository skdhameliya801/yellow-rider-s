import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'; 
import { CONSTANTS } from '../CONSTANTS';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const Login_1 = () => {

  const [rider_in_session, setRider_in_session] = useState(null)

  useEffect(() => {
    document.getElementById("login_btn").innerHTML = "Login";
    document.getElementById("response_message").style.display = "none";

    // let rider_data = JSON.parse(localStorage.getItem("l_r_d"))
    // if(rider_data != null){
    //   setRider_in_session(rider_data)
    //   window.location.href = "/passenger_list"
    // }
  }, [])
  

  let form_login_submit = (event) => {
    event.preventDefault(); 
    
    document.getElementById("login_btn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    let data1 = JSON.stringify({
      "whatsapp_no": document.getElementById("whatsapp_no").value,
      "password": document.getElementById("password").value,
      "token1": rider_in_session?.tok
    });
    let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: CONSTANTS.server_url + '/login_rider',
          headers: { 
              'Content-Type': 'application/json'
          },
          data : data1
    };
    axios.request(config)
    .then((response) => {
      // console.log(response.data)
      document.getElementById("login_btn").innerHTML = "Login";
      if(response.data.response == "old_l" || response.data.response == "new_l" || response.data.response == "n_subscribe"){
        // old login or new login
        
        let rider_data = {
          "whn" : response.data.rider_data.whatsapp_no,
          "fln" : response.data.rider_data.full_name,
          "sub" : response.data.rider_data.subscribed,
          "sub_exp_dat" : response.data.rider_data.subscription_expire_date,
          "tok" : response.data.rider_data.token1
        }
        localStorage.setItem("l_r_d",JSON.stringify(rider_data))
        window.location.replace("/passenger_list")
      }
      // else if(response.data.response == "new_l"){
      //   // new login
      // }
      // else if(response.data.response == "n_subscribe"){
      //   // not subscribed
      //   document.getElementById("response_message").style.display = "block";
      //   document.getElementById("response_message").innerHTML = response.data.message;
      // }
      else if(response.data.response == "wrong"){
        // wrong password
        document.getElementById("response_message").style.display = "block";
        document.getElementById("response_message").innerHTML = response.data.message;
      }
      else if(response.data.response == "n_found"){
        // rider not found
        document.getElementById("response_message").style.display = "block";
        document.getElementById("response_message").innerHTML = response.data.message;
      }
      else{
        // something went wrong
        document.getElementById("response_message").style.display = "block";
        document.getElementById("response_message").innerHTML = "something went wrong";
        // alert("something went wrong")
        // window.location.href = "/login"
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function PopoverPositionedExample(popover_placement, popover_bodyText) {
    return (
      <>
          <OverlayTrigger
            trigger="click"
            key={popover_placement}
            placement={popover_placement}
            overlay={
              <Popover id={`popover-positioned-${popover_placement}`}>
                <Popover.Header as="h3" style={{"background":"black","color":"yellow"}}>{`format : WhatsApp no#code ( e.g. +15483333597#a1b2c3 )`}</Popover.Header>
                {/* <Popover.Body style={{"background":"black","color":"white"}}>
                  <p>{popover_bodyText}</p>
                </Popover.Body> */}
              </Popover>
            }
          >
            <b style={{"border": "5px solid black", "borderRadius":"50%", "padding":"0px 5px", "background":"black","color":"yellow","margin":"5px","cursor":"pointer"}}>?</b>
          </OverlayTrigger>
      </>
    );
  }

  let rider_guest_login = () => {
    window.location.replace("/passenger_list")
  }

  return (
    <>
        
        <div className="d-flex justify-content-center align-items-center p-3" style={{"height":"100vh"}}>
            <form action='#' onSubmit={form_login_submit} className='border border-primary bg-light rounded-5 p-5 '>
            {/* <marquee className="text-danger" width="100%" direction="left" scrollamount="3"> */}
                {/* You can not do login in multiple devices otherwise your profile will be locked and then you can not unlock your profile. */}
                {/* <b> */}
                {/* You must not login on other device and browser after your FIRST LOGIN otherwise your account will be locked. */}
                  {/* At a time you can use only one login */}
                {/* </b> */}
            {/* </marquee> */}

                <h1 className="text-center">{CONSTANTS.app_name} - Login </h1>

                <p className="text-center bg-danger p-2 text-light" id='response_message'></p>

                <div className="m-3">
                    <label className="form-label">Username { PopoverPositionedExample("top", "( Country / State / City )")} </label>
                    <input type="text" className="form-control bgMajorColor" id="whatsapp_no" placeholder="enter username" required />
                </div>
                <div className="m-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control bgMajorColor" id="password" placeholder="enter password" required />
                </div>
                <div className="m-3">
                    {/* <Link to={'/rider_info'}> */}
                        {/* <button type="submit" id='login_btn' className='btn btn-success'>Login</button>  */}

                        <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button type="submit" id='login_btn' class="btn btn-success text-dark" style={{"display":"none"}}>Login</button>
                            {/* <button type="button" onClick={rider_guest_login} class="btn btn-success">Skip login</button> */}
                            <Link to={`/choose`}>
                              <button type="button" class="btn btn-success">Skip login</button>
                            </Link>
                        </div>

                    {/* </Link> */}
                </div>
                <div className="m-3">
                    {/* <Link to={'/rider_info'}> */}
                        {/* <button type="button" onClick={logout_btn_from_all} id='logout_btn_from_all' className='btn btn-danger text-dark'>Click to Logout From All Devices</button> */}
                    {/* </Link> */}
                </div>
                <div className="m-3">
                    <Link to={'https://wa.me/+15483333597?text=Hi, I want to register as a rider. Provide me my login credentials.'} target='_blank'>register?</Link>
                </div>
                <div className="m-3">
                    <Link to={'/forgot_password'}>forgot password?</Link>
                </div>
            </form>
        </div>
    </>
  )

}

export default Login_1