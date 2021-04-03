const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// First we need to create routes(end points) register login get contacts update contacts
// 1 is Users API end point - Register a user
// 2 is Contacts API end point - CRUD operations on contacts of a user
// 3 is auth API end point - Log in a user / To get pages for a logged in user

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => {
  console.log(`Server started at port no${PORT}`);
});
