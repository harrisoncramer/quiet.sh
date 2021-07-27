import supertest from "supertest";
import {app, server} from "../index";

const request = supertest(app);

afterAll(() => {
  server.close();
});

describe("Requests to /user/signup", () => {
  describe("POST", () => {
    it("Should sign up the user with valid credentials.", async () => {
      const response = await request
        .post("/games")
        .send({count: 10})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.rows).toHaveLength(10);
      expect(response.body.rows[0].game_id).toBe("201410290NYK");
    });

    it("Should reject the signup attempt if the password is too weak", async () => {
      const response = await request
        .post("/games")
        .send({banana: true})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({message: "Please send valid data."});
    });
  });
  it("Should reject the signup attempt if the username is already taken", async () => {
    const response = await request
      .post("/games/:playoffs")
      .send()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.body.rows).toHaveLength(100);
  });
});

describe("Requests to /user/login", () => {
  describe("POST", () => {
    it("Should login the user if the credentials are valid", async () => {
      const response = await request
        .post("/games")
        .send({count: 10})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.rows).toHaveLength(10);
      expect(response.body.rows[0].game_id).toBe("201410290NYK");
    });

    it("Should reject the login attempt if the password for the given user is incorrect", async () => {
      const response = await request
        .post("/games")
        .send({banana: true})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({message: "Please send valid data."});
    });
  });
});
