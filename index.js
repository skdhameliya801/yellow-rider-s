const mongoose = require("mongoose")
const useragent = require('useragent');
const os = require('os');
const DeviceDetector = require('node-device-detector');

const cors = require('cors')
const bcrypt = require("bcrypt")
const express = require("express");
const app = express();
app.use(cors())
app.use(express.json());

require("./db-connection.js")
const schema = require("./models/yellow_ride_models.js")


app.get('/', (req, res) => {
    res.json("<h1>...yellow ride..</h1>");
});

app.patch('/forgot_password_rider', async(req, res) => {
  // console.log(req.body)
  
  const hash = await bcrypt.hash(req.body.password, 10);
  
  const rider_data = await schema.schema_rider_login.updateOne(
      { whatsapp_no : req.body.whatsapp_no,
        security_code : req.body.security_code
      },
      {
        $set : {
          "password" : hash
        }
      }
    );
    // console.log(rider_data)
    if(rider_data.modifiedCount > 0){
      res.json({
        message : "Password set successfully. You can login now.",
        user_data : rider_data,
        response : true
      }) 
    }else{
      res.json({
        message : "Failed to set password. Please check WhatsApp no or Security code.",
        user_data : rider_data,
        response : false
      }) 
    }
});

app.post('/register_rider', async(req, res) => {

    const hash = await bcrypt.hash(req.body.password, 10);

    let body = req.body
    body["password"] = hash
    // console.log(body)
  
    const user_found = await schema.schema_rider_login.findOne({whatsapp_no : req.body.whatsapp_no});
    if(user_found != null){
      res.json({
        message : "whatsapp no is already present, choose different whatsapp no",
        rider_data : user_found
      })
    }
    else{    
      const add_rider = new schema.schema_rider_login(
        body
      )
      let response = await add_rider.save();
      res.json({
        message : "Rider is added successfully.",
        rider_data : response
      })
    }
});

app.post('/trip_data', async(req, res) => {

  // const user_found = await schema.schema_trip_data.findOne({whatsapp_no : req.body.whatsapp_no});
  // if(user_found != null){
  //   res.json({
  //     message : "whatsapp no is already present, choose different whatsapp no",
  //     rider_data : user_found
  //   })
  // }
  // else{    
    const add_trip = new schema.schema_trip_data(
      req.body
    )
    let response = await add_trip.save();
    res.json({
      message : "We got your Trip details as mentioned below. You will soon get whatsapp messages from riders.",
      rider_data : response,
      response : "trip added"
    })
  // }
});

app.post('/login_rider', async(req, res) => {
  const rider_login_found = await schema.schema_rider_login.findOne({whatsapp_no : req.body.whatsapp_no});
  if(rider_login_found != null){
    const result_bool = await bcrypt.compare(req.body.password, rider_login_found.password);
      if(result_bool)
      {
        if(rider_login_found.subscribed == "true"){
          if(req.body.token1 == rider_login_found.token1){
            // old device login
            res.json({
              rider_data : rider_login_found,
              response : "old_l"  // old login
            })
          }
          else{
            // new device login
            const updated_rider_data = await schema.schema_rider_login.findOneAndUpdate(
              {whatsapp_no : req.body.whatsapp_no},
              {
                $set : {
                  "token1" : Date.now()
                }
              },
              {
                new : true
              }
            )
            res.json({
              rider_data : updated_rider_data,
              response : "new_l" //new login
            })          
          }

          
        }
        else {
          res.json({
            message : "Rider has not subscribed or Subscription has been expired",
            rider_data : rider_login_found,
            response : "n_subscribe"
          })
        }
      }
      else{
        res.json({
          message : "Wrong password",
          rider_data : rider_login_found,
          response : "wrong"
        }) 
      }
  }
  else{
    res.json({
      message : "Rider not found",
      rider_data : rider_login_found,
      response : "n_found"
    }) 
  }
  
});

app.post('/get_rider', async(req, res) => {
  // console.log("------------get_rider")
    const rider_found = await schema.schema_rider_login.findOne({whatsapp_no : req.body.whatsapp_no});

    if(rider_found){
      res.json({
        message : "Rider is found",
        rider_data : rider_found,
        response : "r_f" //rider found
      }) 
    }
    else{
      res.json({
        message : "Rider not found",
        rider_data : rider_found,
        response : "r_n_f" //rider not found
      }) 
    }

    /* if(req.body.token1 != rider_found.token1){
      // new device login
        res.json({
          message : "please do login",
          rider_data : rider_found,
          response : "n_l" //New Login
        }) 
    }
    else{
      // old device
      res.json({
        message : "cool",
        rider_data : rider_found,
        response : "o_l" // Old Login
      }) 
    }  */




    /* if(rider_found.total_device_online == true){
        res.json({
            message : "rider is online",
            rider_data : rider_found,
            response : true
        }) 
    }
    else if(rider_found.total_device_online == false){
      // null
        res.json({
            message : "rider is offline",
            rider_data : rider_found,
            response : false
        })
    }
    else{
      res.json({
        message : "rider is not found",
        rider_data : rider_found,
        response : "not found"
    })
    }   */
});

app.post('/get_filtered_trips_data', async(req, res) => {
  console.log("get_filtered_trips_data")
  console.log(req.body)
  const start_n = req.body.start_n
  const pickup_city = req.body.pickup_city
  const drop_city = req.body.drop_city
  const trip_date = req.body.trip_date

  // console.log("---->",start_n,pickup_city,drop_city,trip_date)

          if(start_n == -10){
            // console.log("if---",start_n)
            // .sort({$natural:-1})
            // {pickup_city : new RegExp(pickup_city, 'i')},
                  // {drop_city : new RegExp(drop_city, 'i')},
                  // {trip_date : new RegExp(trip_date, 'i')}
            // const filtered_trips = await schema.schema_trip_data.find(  
            //   {
            //     $and: [
                  
            //       {pickup_city : pickup_city},
            //       {drop_city : drop_city},
            //       {trip_date : trip_date}
            //     ]
            //   })
            //     .sort({ "add_time":-1 })
            //     .limit(2)
                // let filtered_trips = null
                res.json([])
          }
          else{
            // {pickup_city : new RegExp(pickup_city, 'i')},
            //       {drop_city : new RegExp(drop_city, 'i')},
            //       {trip_date : new RegExp(trip_date, 'i')}

            //       .sort({$natural:-1})

            // console.log("else---",start_n)
            const filtered_trips = await schema.schema_trip_data.find(  
              {
                $and: [
                  {pickup_city : pickup_city},
                  {drop_city : drop_city},
                  {trip_date : trip_date}
                ]
              })
                .sort({ "add_time":-1 })
                .skip(start_n)
                .limit(10)

                // console.log('----------------filtered_trips')
                // console.log(filtered_trips)
                res.json(filtered_trips)
          }
});

app.post('/get_filtered_trips_data_2', async(req, res) => {
  console.log("get_filtered_trips_data_2")
  console.log(req.body)
  const start_n = req.body.start_n
  const pickup_city = req.body.pickup_city
  const drop_city = req.body.drop_city
  const trip_date = req.body.trip_date

  // console.log("---->",start_n,pickup_city,drop_city,trip_date)



            // {pickup_city : new RegExp(pickup_city, 'i')},
            //       {drop_city : new RegExp(drop_city, 'i')},
            //       {trip_date : new RegExp(trip_date, 'i')}

            //       .sort({$natural:-1})

            // console.log("else---",start_n)
            /*const filtered_trips = await schema.schema_trip_data.find(  
              {
                $and: [
                  {pickup_city : pickup_city},
                  {drop_city : drop_city},
                  {trip_date : trip_date}
                ]
              })
                .sort({ "add_time":-1 })
                .skip(start_n)
                .limit(10)*/

                const filtered_trips = await schema.schema_trip_data.find(  
                  {
                    pickup_city : pickup_city,
                    drop_city : drop_city,
                    trip_date : trip_date                    
                  })
                    .sort({ "add_time":-1 })
                    .skip(start_n)
                    .limit(10)

                // console.log('----------------filtered_trips')
                console.log(filtered_trips)
                res.json(filtered_trips)

});

app.delete('/delete_trips_on_specific_date', async(req, res) => {
  console.log(req.body)

  try{
      const trip_date = req.body.trip_date //  YYYY-MM-DD
      const response = await schema.schema_trip_data.deleteMany({trip_date: trip_date})
      console.log(response)
      
      if(response.deletedCount == 0){
          // res.status(200).json(" - Delete Failed")
          res.json(
            {
              message : response.deletedCount + " - Delete Failed",
              deletedCount : response.deletedCount
            }
          )
      }else{
          // res.status(200).json(" - Delete Success")
          res.json(
            {
              message : response.deletedCount + " - Delete Success",
              deletedCount : response.deletedCount
            }
          )
      }
  }
  catch (error){
      res.json(error)
  }
});

app.get('*', (req, res) => {
    res.json("<h1>404</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening portt ${PORT}`);
});