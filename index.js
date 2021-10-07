const dbSetup = require("./db/db-setup");
const express = require("express");
const User = require("./db/models/user");

dbSetup();

const app = express();
app.use(express.json());

// in prod put this in separate files
app.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.query().findById(id).withGraphFetched("channel");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.listen(8080, () => console.log("server runnning on port 8080"));
