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
const fetchResponse = await request(app).get(`/musicians/${musicianId}`);
    expect(fetchResponse.statusCode).toEqual(404);
    
});
    
})
