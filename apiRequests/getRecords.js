// getRecords.js - Fetches Kintone records, transforms response, & returns array of list items
/**
 * Notes on Kintone responses:
 * Our response comes back as JSON. We could manipulate the data here, but!
 * The backend will also pass back JSON to our frontend.
 * So we'll simply receive the data and pass it along as is, and parse it on the front.
 */

// Declare the GET endpoint defined in our Express server
const getRecordsEndpoint = 'http://localhost:5000/getData';

export default async function getRecords() {
  const response = await fetch(getRecordsEndpoint);
  const jsonResponse = await response.json();
  return jsonResponse;
};