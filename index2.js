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
  console.log(req.body)
  
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

// app.get('/get_device', (req, res) => {
//   const userAgent = req.headers['user-agent'];
//   const parsedUserAgent = useragent.parse(userAgent);
//   const detector = new DeviceDetector({
//     clientIndexes: true,
//     deviceIndexes: true,
//     deviceAliasCode: false,
//   });
//   const userAgent1 = parsedUserAgent.source;
//   const result = detector.detect(userAgent1);
//   // console.log('result parse', result);
//   let data = result.os.name + " " + result.os.family + " " + result.client.name + " " + result.client.family + " " + result.device.type + " " + result.device.brand + " " + result.device.model
//   console.log(data)
// });

app.post('/register_rider', async(req, res) => {

    const hash = await bcrypt.hash(req.body.password, 10);
  
    const user_found = await schema.schema_rider_login.findOne({whatsapp_no : req.body.whatsapp_no});
    if(user_found != null){
      res.json({
        message : "whatsapp no is already present, choose different whatsapp no",
        rider_data : user_found
      })
    }
    else{    
      const add_rider = new schema.schema_rider_login(
        {
          whatsapp_no : req.body.whatsapp_no,
          password : hash,
          security_code : req.body.security_code,
          full_name : req.body.full_name,
          subscribed : req.body.subscribed,
          total_device_online : req.body.total_device_online,
          subscription_expire_date : req.body.subscription_expire_date  // MM-DD-YYYY
        }
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

// app.post('/login_rider1', async(req, res) => {
//   console.log("login_rider")
//     const rider_login_found = await schema.schema_rider_login.findOne({whatsapp_no : req.body.whatsapp_no});
//     // console.log(rider_login_found)
//     if(rider_login_found != null){
//       const result_bool = await bcrypt.compare(req.body.password, rider_login_found.password);
//       // console.log(result_bool)
//       if(result_bool)
//       {
//         // console.log("first")
//         if(rider_login_found.total_device_online == true)
//         {
//           // already login some where, set online status to false
//           const rider_data = await schema.schema_rider_login.findOneAndUpdate(
//             {whatsapp_no : req.body.whatsapp_no},
//             {
//               $set : {
//                 "total_device_online" : false  //------give warning do not login in another device before logout
//                 // "total_device_online" : true
//               }
//             },
//             {
//               new : true
//             }
//           )
//             console.log("1, 2nd time login, did logout")

//             const userAgent = req.headers['user-agent'];
//             const parsedUserAgent = useragent.parse(userAgent);
//             const detector = new DeviceDetector({
//               clientIndexes: true,
//               deviceIndexes: true,
//               deviceAliasCode: false,
//             });
//             const userAgent1 = parsedUserAgent.source;
//             const result = detector.detect(userAgent1);
//             // console.log('result parse', result);
//             let device_data = result.os.name + " " + result.os.family + " " + result.client.name + " " + result.client.family + " " + result.device.type + " " + result.device.brand + " " + result.device.model
//             // console.log(data)
            
//           res.json({
//             // message : "Already Login in Other Device",
//             message : "We logout you from all other devices. Please do Login again",
//             // message : `You are already login at ${device_data}. Please do logout from there`,
//             rider_data : rider_login_found,
//             response : "already"
//           }) 
//         }
//         else if(rider_login_found.total_device_online == false)
//         {
//           // first time login    set online status to true 

//           const rider_data = await schema.schema_rider_login.findOneAndUpdate(
//             {whatsapp_no : req.body.whatsapp_no},
//             {
//               $set : {
//                 "total_device_online" : true
//               }
//             },
//             {
//               new : true
//             }
//           ) 

//           console.log("2, first time login")
//           res.json({
//             message : "rider found, first time login",
//             rider_data : rider_data,
//             response : true
//           }) 
//         }else{
//           console.log("------something went wrong-------")
//         }
        
//       }
//       else
//       {
//         console.log("3, wrong password")
//         res.json({
//           message : "wrong password",
//           rider_data : rider_login_found,
//           response : false
//         }) 
//       }
//     }
//     else
//     {
//       console.log("4, rider whatsapp not found")
//       // null
//       res.json({
//         message : "Rider not found",
//         rider_data : rider_login_found,
//         response : false
//       })
//     }
  
// });

app.post('/login_rider', async(req, res) => {
  const rider_login_found = await schema.schema_rider_login.findOne({whatsapp_no : req.body.whatsapp_no});
  if(rider_login_found != null){
    const result_bool = await bcrypt.compare(req.body.password, rider_login_found.password);
      // console.log(result_bool)
      if(result_bool)
      {
        if(rider_login_found.total_device_online == false){
          // rider is not already online .........so set online true
          console.log("login 1")
          const rider_data = await schema.schema_rider_login.findOneAndUpdate(
            {whatsapp_no : req.body.whatsapp_no},
            {
              $set : {
                "total_device_online" : true,
                "token1" : Date.now()
              }
            },
            {
              new : true
            }
          )
          
          res.json({
            message : "Rider Login Success",
            rider_data : rider_data,
            response : "success"
          })          
        }
        else{
          // rider is already online some where 
          console.log("login 2")

          const rider_data = await schema.schema_rider_login.findOneAndUpdate(
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

          // res.json({
          //   message : "Already logged in somewhere. Can not login here. Can not use this device. Only use that device when you did your first login.",
          //   rider_data : rider_login_found,
          //   response : "already"
          // })

          res.json({
            message : "Previous logout success. Created new login.",
            rider_data : rider_data,
            response : "already"
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
      response : "not found"
    }) 
  }
  
});

// app.post('/get_user', async(req, res) => {
//     const rider_found = await schema.schema_rider_login.findOne({whatsapp_no : req.body.whatsapp_no});
//     if(rider_found.total_device_online == true){
//         res.json({
//             message : "rider is online",
//             rider_data : rider_found,
//             response : true
//         }) 
//     }
//     else if(rider_found.total_device_online == false){
//       // null
//         res.json({
//             message : "rider is offline",
//             rider_data : rider_found,
//             response : false
//         })
//     }
//     else{
//       res.json({
//         message : "rider is not found",
//         rider_data : rider_found,
//         response : "not found"
//     })
//     }
// });

app.post('/get_rider', async(req, res) => {
    const rider_found = await schema.schema_rider_login.findOne({whatsapp_no : req.body.whatsapp_no});

    if(rider_found){
      res.json({
        message : "Rider is found",
        rider_data : rider_found,
        response : "true"
      }) 
    }
    else{
      res.json({
        message : "Rider not found",
        rider_data : rider_found,
        response : "false"
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


// app.patch('/update_login_devices', async(req, res) => {
//     // console.log(req.body)
//     const rider_data = await schema.schema_rider_login.findOneAndUpdate(
//       {whatsapp_no : req.body.whatsapp_no},
//       {
//         $inc : {
//           "total_device_online" : 1
//         }
//       },
//       {
//         new : true
//       }
//     )
    
//     res.json({
//             message : "login device is set "+req.body.total_device_online,
//             rider_data : rider_data,
//             response1 : true
//           }) 

//     // if(rider_data.modifiedCount > 0){
//     //   res.json({
//     //     message : "login device is set "+req.body.total_device_online,
//     //     rider_data : rider_data,
//     //     response1 : true
//     //   }) 
//     // }else{
//     //   res.json({
//     //     message : "login device is FAILED to set "+req.body.total_device_online,
//     //     rider_data : rider_data,
//     //     response1 : false
//     //   }) 
//     // }
// });

// app.patch('/logout_from_all_devices', async(req, res) => {
//     // console.log(req.body)
//     const rider_data = await schema.schema_rider_login.updateOne(
//       {whatsapp_no : req.body.whatsapp_no},
//       {
//         $set : {
//           "total_device_online" : req.body.total_device_online
//         }
//       }
//     )
    
//     if(rider_data.modifiedCount > 0){
//       res.json({
//         message : "rider logout from all devices successfully",
//         rider_data : rider_data,
//         response1 : true
//       }) 
//     }else{
//       res.json({
//         message : "rider logout from all devices is failed",
//         rider_data : rider_data,
//         response1 : false
//       }) 
//     }
// });

app.post('/get_filtered_trips_data', async(req, res) => {
  const start_n = req.body.start_n
  const pickup_city = req.body.pickup_city
  const drop_city = req.body.drop_city
  const trip_date = req.body.trip_date

  console.log("---->",start_n,pickup_city,drop_city,trip_date)

          if(start_n == -2){
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

            console.log("else---",start_n)
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
                .limit(2)

                console.log('----------------filtered_trips')
                console.log(filtered_trips)
                res.json(filtered_trips)
          }
});

app.get('*', (req, res) => {
    res.json("<h1>404</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening portt ${PORT}`);
});