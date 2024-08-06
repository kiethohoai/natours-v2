const app = require('./app');

const port = 5173;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
