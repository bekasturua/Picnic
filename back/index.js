import express from "express";
import cors from "cors"
import { getQuestions } from "./services/question.js";
const app = express();
const port = 3000;

app.use(cors());

app.get("/questions", async (req, res) => {
  const questions = await getQuestions();
  res.send(questions);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
