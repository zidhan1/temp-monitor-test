import "dotenv/config";
import express from "express";
import routes from "../src/routes/index.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
