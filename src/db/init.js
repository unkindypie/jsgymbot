const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL + '/' + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db');
  });
