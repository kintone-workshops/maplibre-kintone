// backend - server.js - Routes API requests from the frontend to Kintone
import express from "express";
import ViteExpress from "vite-express";
const PORT = 5000;
const app = express();
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

ViteExpress.config({ mode: "production" })

// Get Kintone credentials from a .env file
const subdomain = process.env.SUBDOMAIN;
const appID = process.env.APPID;
const apiToken = process.env.APITOKEN;

// Parse incoming requests with JSON payloads
app.use(express.json());

// Set Cross-Origin Resource Sharing (CORS) to the frontend server!
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173'
};

// Kintone's records endpoint
const multipleRecordsEndpoint = `https://${subdomain}.cybozu.com/k/v1/records.json?app=${appID}`

// GET data from our Kintone database
app.get('/getData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'X-Cybozu-API-Token': apiToken
    }
  }
  const response = await fetch(multipleRecordsEndpoint, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
});

app.listen(PORT, () => {
  console.log(`\n Backend server listening at http://localhost:${PORT} \n Confirm if Kintone records are being retrieved at \n http://localhost:${PORT}/getData`);
});