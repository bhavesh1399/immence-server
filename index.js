const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const consola = require("consola");
const UserRoutes = require("./routes/userRoutes.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

//Routes
app.use("/api/user", UserRoutes);

//mongodb connection
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URL;
const startApp = async () => {
  try {
    await connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    consola.success({
      message: `Successfully connected with the Database`,
      badge: true,
    });

    app.listen(PORT, () => {
      consola.success({
        message: `Server started on PORT ${PORT}`,
        badge: true,
      });
    });
  } catch (err) {
    consola.error({
      message: `Unable to connect with the Database ${err}`,
      badge: true,
    });
    startApp();
  }
};
startApp();
