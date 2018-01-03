import express from "express";
import morgan from "morgan";
import chalk from "chalk";

const app = express();

app.use(morgan("combined"));

app.get("/", (request, response) => {
  const fixedObject = {
    hello: "world"
  };
  const queryObject = {};

  Object.keys(request.query).forEach(element => {
    queryObject[element] = request.query[element];
  });

  const responseObject = Object.assign({}, fixedObject, queryObject);

  response.status(200).json(responseObject);
});

app.server = app.listen(9090, () => console.log(chalk.red("Example app listening on port 9090!")));

module.exports = app;
