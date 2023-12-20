const app = require("../index");
const mongoose = require("mongoose");
const supertest = require("supertest");
const uri="mongodb://localhost:27017/JestDB";
const sendEmail = require("../helper/email")
const cronjob = require("../helper/cronjob")
let id=""

beforeAll((done) => {
  mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    console.log("beforeEach done");
    done()
  });
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase()
  .then(() => {
    mongoose.connection.close()
    .then(() => done())
  });
});

let scheduleData = {
    "to":"pratik848586@gmail.com",
    "emailText":"demo",
    "subject":"this is testing",
    "date":1704969123468
}

jest.mock('../helper/cronjob', () => ({
  // sendEmail: jest.fn()
  job: jest.fn()
}));

test("POST /api/schedule", async () => {
  await supertest(app).post("/api/schedule")
  .send(scheduleData)
  .expect(200)
  .then((response) => {
    expect(response.body.success).toEqual(true);
    expect(response.statusCode).toEqual(200);
    id=response?.body?.data?._id;
  });
});

test("GET /api/schedule/list", async () => {
    await supertest(app).get("/api/schedule/list")
    .expect(200)
    .then((response) => {
      expect(response.body.success).toEqual(true);
      expect(response.statusCode).toEqual(200);
      expect(Array.isArray(response.body.data.list)).toBeTruthy();
      expect(response.body.data.totalCount).toEqual(expect.any(Number));
      // console.log(response.body.data.list)
    });
    
});

test("GET /api/schedule/<id>", async () => {
  await supertest(app).get("/api/schedule/"+id)
  .expect(200)
  .then((response) => {
    expect(response.body.success).toEqual(true);
    expect(response.statusCode).toEqual(200);
    expect(response.body.data.emailText).toEqual(scheduleData.emailText);
    expect(response.body.data.to).toEqual(scheduleData.to);
    expect(response.body.data.subject).toEqual(scheduleData.subject);
  });
});

test("GET /api/schedule/<Wrong ID>", async () => {
  await supertest(app).get("/api/schedule/6582b52088c66f0fdd7612b1")
  .expect(404)
  .then((response) => {
    expect(response.body.success).toEqual(false);
    expect(response.statusCode).toEqual(404);
  });
});

test("PATCH /api/schedule/<id>>", async () => {
  await supertest(app).patch("/api/schedule/"+id)
  .send(scheduleData)
  .expect(200)
  .then((response) => {
    expect(response.body.success).toEqual(true);
    expect(response.statusCode).toEqual(200);
  });
});

test("PATCH /api/schedule/<Wrong ID>>", async () => {
  await supertest(app).patch("/api/schedule/6582b52088c66f0fdd7612b1")
  .send(scheduleData)
  .expect(404)
  .then((response) => {
    expect(response.body.success).toEqual(false);
    expect(response.statusCode).toEqual(404);
  });
});

test("DELETE /api/schedule/<ID>>", async () => {
  await supertest(app).patch("/api/schedule/"+id)
  .expect(200)
  .then((response) => {
    expect(response.body.success).toEqual(true);
    expect(response.statusCode).toEqual(200);
  });
});