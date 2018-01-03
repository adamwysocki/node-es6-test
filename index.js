import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("combined"));

app.get("/", function(request, response) {
  const fixedObject = {
    hello: "world"
  };
  let queryObject = {};

  Object.keys(request.query).forEach(function(element) {
    queryObject[element] = request.query[element];
  });

  let responseObject = Object.assign({}, fixedObject, queryObject);

  response.status(200).json(responseObject);
});

app.listen(9090, () => console.log("Example app listening on port 9090!"));
