// smitdhameliya801
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://smit801:smit801@cluster0.hotxn1c.mongodb.net/yellow-ride-2", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("connection success...")).catch((error) => console.log(error))