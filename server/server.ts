import * as express from "express";
import { Application } from "express";
import { getAllExercises } from "./get-exercises.route";
import { saveExercise } from "./save-exercise.route";
import { createExercise } from "./create-exercise.route";
import { deleteExercise } from "./delete-exercise.route";

const bodyParser = require("body-parser");

const app: Application = express();

app.use(bodyParser.json());

app.route("/api/exercises").get(getAllExercises);

app.route("/api/exercise").post(createExercise);

app.route("/api/exercise/:id").put(saveExercise);

app.route("/api/exercise/:id").delete(deleteExercise);

const httpServer: any = app.listen(9000, () => {
  console.log(
    "HTTP REST API Server running at http://localhost:" +
      httpServer.address().port
  );
});
