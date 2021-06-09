const mongoose = require("mongoose");

mongoose
    .connect(process.env.DATABASEURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Database"))
    .catch((error) => console.log(`Database not Connect ${error}`));
