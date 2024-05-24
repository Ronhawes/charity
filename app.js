require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Set up Cluster
const cluster = require("cluster");
const numCPUs = require("os");
//

// Middlewares
const error = require("./API/Middleware/error");

//

// Routes
const CONFIG = require("./API/Routes/Config");
const RELAX = require("./API/Routes/Relax");
const DOCUMENT = require("./API/Routes/Documents");

const {
  ROLES,
  MEMBER,
  PATIENT,
  FORM,
  SPACE,
  INVESTIGATION,
  PROCEDURE,
  VENDOR,
} = require("./API/Routes/Admin");

//

const PORT = process.env.PORT || 1234;

const LESS_CPU = process.env.CPU || 0;

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.json({ limit: "25mb" }));

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.get("/", (req, res) => {
  res.send("MediGuardianX");
});

app.use("/relax", RELAX);

app.use(`/config`, CONFIG);

app.use("/document", DOCUMENT);

app.use("/role", ROLES);

app.use("/member", MEMBER);

app.use("/patient", PATIENT);

app.use("/form", FORM);

app.use("/space", SPACE);

app.use("/investigation", INVESTIGATION);

app.use("/procedure", PROCEDURE);

app.use("/vendor", VENDOR);

app.use(error);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  console.log(`Number of CPUs is ${numCPUs.cpus().length}`);

  // Fork workers.
  for (let i = 0; i < numCPUs.cpus().length - LESS_CPU; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork(); // Create a New Worker, If Worker is Dead
  });
} else {
  app.listen(PORT, () =>
    console.log(
      `Worker ${process.pid} started and  server starting on port ${PORT} `
    )
  );
}
