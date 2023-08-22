const mongoose = require("mongoose")

const schema_rider_login_1 = new mongoose.Schema({
    
    token1:{
        type: String,
    },
    whatsapp_no:{
        type: String,
        // required: true,
        unique: true
    },
    password:{
        type: String,
        // required: true,
    },
    security_code:{
        type: String,
        // required: true,
    },
    full_name: {
        type: String,
        // required: true,
    },
    subscribed : {
        type: String,
    },
    subscription_expire_date : {
        type : String
    }
    
    
} )

const schema_trip_data_1 = new mongoose.Schema({

    add_time:{
        type: Date,
        default: Date.now
    },
    full_name:{
        type: String,
        // required: true,
    },
    req_fare:{
        type: String,
        // required: true,
    },
    full_pickup_address:{
        type: String,
        // required: true,
    },
    phone_no:{
        type: String,
        // required: true,
    },
    full_drop_address: {
        type: String,
        // required: true,
    },
    arrive_by_time : {
        type: String,
    },
    trip_date : {
        type: String,
    },
    pickup_city : {
        type: String,
    },
    drop_city : {
        type: String,
    }

} )

// const scheme_user_login_1 = new mongoose.model("schema_rider_login", schema_rider_login_1)
let d = new Date();
let current_date = d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate();

let schema = {
    schema_rider_login : new mongoose.model("y_rider_login-2", schema_rider_login_1),
    schema_trip_data : new mongoose.model(`y_trip_data_${current_date}`, schema_trip_data_1)
}
module.exports = schema