const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE;

// config mongoose to express
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connect to DB successfuly!`));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
