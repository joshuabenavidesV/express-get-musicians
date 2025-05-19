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




    
})
