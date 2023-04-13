const app = require("./index");


const PORT = process.env.PORT || 300;

app.listen(PORT, async () => {
  console.log("listening to port", PORT);
});