import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from '../CONSTANTS';
import axios from 'axios'; 
import Swal from 'sweetalert2'
import { OverlayTrigger, Popover } from 'react-bootstrap';

const Forgot_Password = () => {

    useEffect(() => {
        document.getElementById("set_new_pass_btn").innerHTML = "Set New Password";
        document.getElementById("response_message").style.display = "none";
    }, [])
    

    let form_forgot_pass_submit = (event) => {
        event.preventDefault(); 
        document.getElementById("set_new_pass_btn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

        let form_data = JSON.stringify({
            "whatsapp_no": document.getElementById("whatsapp_no").value,
            "password": document.getElementById("password").value,
            "security_code" : document.getElementById("security_code").value
        });

        if(document.getElementById("password").value == document.getElementById("confirm_password").value){
            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: CONSTANTS.server_url + '/forgot_password_rider',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : form_data
            };
    
            axios.request(config)
                .then((response) => {
                // console.log(response.data);
                document.getElementById("set_new_pass_btn").innerHTML = "Set New Password";
                document.getElementById("response_message").style.display = "block";
                document.getElementById("response_message").innerHTML = response.data.message;
            })
            .catch((error) => {
                document.getElementById("set_new_pass_btn").innerHTML = "Set New Password";
                console.log(error);
            });
        }else{
            document.getElementById("set_new_pass_btn").innerHTML = "Set New Password";
            // alert("password and confirm password are not same");
            document.getElementById("response_message").style.display = "block";
            document.getElementById("response_message").innerHTML = "Password and confirm password are not same";
            // Swal.fire(
            //     '',
            //     'Password and confirm password are not same',
            //     'error'
            // )

        }
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

  return (
    <div className="container">
        {/* <h1 className="text-center mt-5">{CONSTANTS.app_name} - Forgot Password </h1> */}
        <div className="row">
            <div className="col">
                <div className="d-flex justify-content-center align-items-center" style={{"height":"100vh"}}>
                    <form onSubmit={form_forgot_pass_submit} className='border border-primary bg-light rounded-5 p-5 '>
                        <h1 className="text-center">{CONSTANTS.app_name} - Forgot Password </h1>
                        <p className="text-center bg-danger p-2 text-white" id='response_message'></p>
                        <div className="m-3">
                            <label className="form-label">Username { PopoverPositionedExample("top", "( Country / State / City )")} </label>
                            <input type="number" className="form-control bgMajorColor" id="whatsapp_no" placeholder="enter username" required />
                        </div>
                        <div className="m-3">
                            <label for="formGroupExampleInput" className="form-label">Write your security code</label>
                            <input type="text" className="form-control bgMajorColor" id="security_code" placeholder="enter security code" required />
                            <b>forgot? <a href="https://wa.me/+15483333597?text=Hi, I forgot my security code." target='_blank'>click here to chat with us</a></b>
                        </div>
                        <div className="m-3">
                            <label for="formGroupExampleInput" className="form-label">Password</label>
                            <input type="password" className="form-control bgMajorColor" id="password" placeholder="enter password" required />
                        </div>
                        <div className="m-3">
                            <label for="formGroupExampleInput" className="form-label">Confirm password</label>
                            <input type="password" className="form-control bgMajorColor" id="confirm_password" placeholder="enter confirm password" required />
                        </div>
                        {/* <div className="m-3">
                            <label for="inputState" className="form-label">Select security question</label>
                            <select id="inputState" className="form-select">
                                <option selected>What is your first school?</option>
                                <option>What is your favorite subject?</option>
                                <option>What is your favorite game?</option>
                                <option>What is your favorite teacher?</option>
                                <option>What is your favorite player?</option>
                                <option>What was your first pet's name?</option>
                                <option>What is your favorite movie?</option>
                                <option>In which city were you born?</option>
                                <option>What is your mother's maiden name?</option>
                                <option>What was the name of your first school?</option>
                                <option>What is your favorite book?</option>
                                <option>What is your favorite food?</option>
                                <option>What is your favorite vacation spot?</option>
                                <option>What is your favorite color?</option>
                                <option>What is the name of your best childhood friend?</option>
                            </select>
                        </div> */}
                        {/* <div className="m-3">
                            <label for="formGroupExampleInput2" className="form-label">Write your answer</label>
                            <input type="text" className="form-control bgMajorColor" id="formGroupExampleInput2" placeholder="" />
                        </div> */}
                        <div className="m-3">
                            <button type="submit" id='set_new_pass_btn' className='btn btn-success'>Set New Password</button>
                        </div>
                        <div className="m-3">
                            <Link to={'/login'}>Login?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forgot_Password