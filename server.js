const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

// Config mongoose to express
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('🚀Connect to DB successfuly!');
    console.log('🚀ENV =', process.env.NODE_ENV);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
