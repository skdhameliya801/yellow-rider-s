import React, { useState } from 'react'
import cryptoRandomString from 'crypto-random-string';
import axios from 'axios';
import { CONSTANTS } from '../CONSTANTS';

const random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};
let hexcolor1 = random_hex_color_code()
let random_str = cryptoRandomString({length: 10})

const Register_Rider = () => {

    const [username, setUsername] = useState("")
    const [hexcolor, setHexcolor] = useState("")
    
    // setHexcolor(hexcolor1)
    // console.log(random_str + hexcolor1)

    let rider_register = () => {
        // console.log("Rider Register")
    }

    const handleChange = (event) => {
        // 👇 Get input value from "event"
        setUsername(event.target.value);
    };

    let rider_register_by_admin = (event) => {
        event.preventDefault();

        let data = JSON.stringify({
            "token1": document.getElementById("token1").value,
            "whatsapp_no": document.getElementById("whatsapp_no").value,
            "password": document.getElementById("password").value,
            "security_code": document.getElementById("security_code").value,
            "full_name": document.getElementById("full_name").value,
            "subscribed": document.getElementById("subscribed").value,
            "subscription_expire_date": document.getElementById("subscribed_expiration_date").value
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: CONSTANTS.server_url + '/register_rider',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
        .then((response) => {
            document.getElementById("response").innerHTML = response.data.message;
            // console.log(response.data)
            // alert(response.data);
        })
        .catch((error) => {
            document.getElementById("response").innerHTML = error;
            console.log(error);
        });


    }

    return (
        <>
        
            <form className='mt-5' method='POST' onSubmit={rider_register_by_admin}>
                token : <input type="text" placeholder='any digits uuid' id='token1' required /> <br /> <br />
                whatsapp_no : <input type="text" placeholder='with country code # 6 digits uuid' id='whatsapp_no' required /> <br /> <br />
                password : <input type="password" placeholder='welcome' id='password' required /> <br /> <br />
                security code : <input type="text" placeholder='12 digits uuid' id='security_code' required /> <br /> <br />
                full name : <input type="text" placeholder='Smit Dhameliya' id='full_name' required /> <br /> <br />
                subscribed : <input type="text" placeholder='true' id='subscribed' required /> <br /> <br />
                subscription expire date : <input type="text" placeholder='2023-8-25' id='subscribed_expiration_date' required /> <br /> <br />
                <input type="submit" value="register rider" />
            </form>

            <p id='response'>RESPONSE :</p>
        
        </>
    )
}

export default Register_Rider