"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)("combined"));

app.get("/", function (request, response) {
  var fixedObject = {
    hello: "world"
  };
  var queryObject = {};

  Object.keys(request.query).forEach(function (element) {
    queryObject[element] = request.query[element];
  });

  var responseObject = Object.assign({}, fixedObject, queryObject);

  response.status(200).json(responseObject);
});

app.listen(9090, function () {
  return console.log("Example app listening on port 9090!");
});