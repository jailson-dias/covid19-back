import Express from "express";
import cors from "cors";

const app = Express();

// Cors
app.use(cors());

// Desativa o X-Powered-By: Express
app.disable("x-powered-by");

app.get("/teste", (req, res) => {
  res.send("Funcionando :)");
});

app.listen(
  process.env.SERVICE_PORT || 3000,
  process.env.SERVICE_HOST || "0.0.0.0",
  () => console.log("Listening...")
);
