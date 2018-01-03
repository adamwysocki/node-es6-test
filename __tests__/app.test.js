const request = require("supertest");
const app = require("../index.js");
const diff = require("jest-diff");
const _ = require("lodash");

describe("index route", () => {
  expect.extend({
    toLookLike(received, expected) {
      received = JSON.parse(received);
      const pass = _.isEqual(received, expected);

      const message = pass
        ? () =>
            `${this.utils.matcherHint(".not.toLookLike")}
            \n\n
            Expected value to not be (using Object.is):\n
              ${this.utils.printExpected(expected)}\n
            Received:\n
              ${this.utils.printReceived(received)}`
        : () => {
            const diffString = diff(expected, received, {
              expand: this.expand
            });
            return `${this.utils.matcherHint(".toLookLike")} 
              \n\n
              Expected value to be (using Object.is):
                ${this.utils.printExpected(expected)}
                Received:
                ${this.utils.printReceived(received)}
              ${diffString} ? \n\nDifference:\n\n${diffString}}`;
          };

      return { actual: received, message, pass };
    }
  });

  afterAll(() => {
    app.server.close();
  });

  it("should respond with a 200 with no query parameters", () => {
    return request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(response => {
        expect(response.text).toMatch(/hello/);
        expect(response.text).toMatch(/world/);
        expect(response.text).toLookLike({ hello: "world" });
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
        expect(response.text).toLookLike({ hello: "world", name: "adam", skillz: "onpoint" });
      });
  });
});
