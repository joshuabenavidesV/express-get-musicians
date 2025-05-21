// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    //Day 1 Test
test("Testing musicians endpoint", async () => {
    // Sends request to `/muscians` endpoint
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
})
test("Testing musicians indvidually", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);
    expect(responseData[0].name).toBe("Mick Jagger")
    expect(responseData[0].instrument).toBe("Voice")
})

test("Testing Bands endpoint", async () => {
    // Sends request to `/muscians` endpoint
    const response = await request(app).get("/bands");
    expect(response.statusCode).toBe(200);
})
test("Testing Band individually", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/bands");
    const responseData = JSON.parse(response.text);
    expect(responseData[0].name).toBe("The Beatles")
    expect(responseData[1].name).toBe("Black Pink")
    expect(responseData[2].name).toBe("Coldplay")
})
//Day 2 Test
test("Testing musicians endpoint day 2", async () => {
    // Sends request to `/muscians` endpoint
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
})
test("Testing musicians with specific id", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/musicians/2");
    const responseData = JSON.parse(response.text);
    expect(responseData.name).toBe("Drake")
    expect(responseData.instrument).toBe("Voice")
})
// Test for POST(creating)
test("Testing creating new musicians", async () => {
    const newmusicians = {
        name: 'Josh',
        instrument: 'Guitar'
    }
    const response = await request(app).post("/musicians").send(newmusicians)
    expect(response.body.name).toEqual("Josh")
    expect(response.body.instrument).toEqual("Guitar")
})

//Test for PUT (updating)
test("Testing updating new musicians", async () => {
    let newMusician = {
        name: 'Josh',
        instrument: 'Guitar'
    }
     let response = await request(app)
        .post("/musicians")
        .send(newMusician);
    let musicianId = response.body.id;
    let updatedMusician = {
        name:"jeff",
        instrument: 'Bass'
    }
    let updatedResponse = await request(app)
        .put(`/musicians/${musicianId}`)
        .send(updatedMusician);
    expect(updatedResponse.statusCode).toEqual(200);
    expect(updatedResponse.body.instrument).toEqual("Bass");
});

// Test for delete (Deleting)
test("Testing deleting new musicians", async () => {
    let newMusician = {
        name: 'Josh',
        instrument: 'Guitar'
    }
     let response = await request(app)
        .post("/musicians")
        .send(newMusician);
let musicianId = response.body.id;
const deletedResponse = await request(app).delete(`/musicians/${musicianId}`)
expect(deletedResponse.statusCode).toEqual(200);

});
    // DAY 4
    test("should return 400 if name is missing", async () => {
    const response = await request(app)
      .post("/musicians")
      .send({ instrument: "Guitar"});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(Array.isArray(response.body.error)).toBe(true);
  });

  test("should create a restaurant if all fields are valid", async () => {
    const response = await request(app)
      .post("/musicians")
      .send({ name: "Luigi", instrument: "Chello"});
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("name", "Luigi");
    expect(response.body).toHaveProperty("instrument", "Chello");
  });

  test("returns 400 if name is too short", async () => {
  const response = await request(app)
    .put(`/musicians/1`)
    .send({ name: "B", instrument: "Guitar" });
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("error");
});

 test("updates musician successfully with valid data", async () => {
  const newMusician = await request(app)
    .post("/musicians")
    .send({ name: "JIM", instrument: "Guitar" });
  const id = newMusician.body.id;
  const response = await request(app)
    .put(`/musicians/${id}`)
    .send({ name: "Jimmy", instrument: "Bass" });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("name", "Jimmy");
  expect(response.body).toHaveProperty("instrument", "Bass");
});
});

