const request = require("supertest");
const app = require("../index.js");

describe("index route", () => {
  it("should respond with a 200 with no query parameters", () => {
    return request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(response => {
        expect(response.text).toMatch(/hello/);
        expect(response.text).toMatch(/world/);
      });
  });

  it("should return with a 200 with valid query parameters", () => {
    return request(app)
      .get("/?name=adam&skillz=onpoint")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(response => {
        expect(response.text).toMatch(/name/);
        expect(response.text).toMatch(/adam/);
        expect(response.text).toMatch(/skillz/);
        expect(response.text).toMatch(/onpoint/);
      });
  });
});
