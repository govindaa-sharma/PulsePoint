
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const enquiryRoutes = require('./App/routes/web/enquiryRoutes');

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/web/api/enquiry",enquiryRoutes)

// mongoose.connect(process.env.DBURL).then(()=>{
//     console.log("Connected to MongoDB");
//     app.listen(process.env.PORT, () => {
//         console.log(`Server is running on localhost:${process.env.PORT}`);
//     });
// })

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const enquiryRoutes = require('./App/routes/web/enquiryRoutes');
// require('dotenv').config(); // Add this to load environment variables

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/web/api/enquiry", enquiryRoutes);


// //for blockchain
// const healthRoutes = require('./App/routes/web/healthRoutes');
// app.use("/web/api/health", healthRoutes);



// // Add error handling for MongoDB connection
// mongoose.connect(process.env.DBURL || 'mongodb://localhost:27017/auth-app')
//   .then(() => {
//     console.log("Connected to MongoDB");
//     const port = process.env.PORT || 5000;
//     app.listen(port, () => {
//       console.log(`Server is running on port: ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//   });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const enquiryRoutes = require('./App/routes/web/enquiryRoutes');
const healthRecordRoutes = require('./App/routes/web/healthRecordRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/web/api/enquiry", enquiryRoutes);

app.use("/web/api/health-records", healthRecordRoutes);

mongoose.connect(process.env.DBURL || 'mongodb://localhost:27017/health-records')
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });