"use strict";

var request = require("supertest");
var app = require("../index.js");

describe("index route", function () {
  it("should respond with a 200 with no query parameters", function () {
    return request(app).get("/").expect("Content-Type", /json/).expect(200).expect(function (response) {
      expect(response.text).toMatch(/hello/);
      expect(response.text).toMatch(/world/);
    });
  });

  it("should return with a 200 with valid query parameters", function () {
    return request(app).get("/?name=adam&skillz=onpoint").expect("Content-Type", /json/).expect(200).expect(function (response) {
      expect(response.text).toMatch(/name/);
      expect(response.text).toMatch(/adam/);
      expect(response.text).toMatch(/skillz/);
      expect(response.text).toMatch(/onpoint/);
    });
  });
});