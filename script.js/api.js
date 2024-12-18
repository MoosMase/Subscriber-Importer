const fs = require('fs');
const path = require('path');
const axios = require('axios');
// Replace with your actual BigCommerce store hash and API URL
const storeHash = 'z04yvh8lv7'; // Replace with your store hash
const apiEndpoint = `https://api.bigcommerce.com/stores/${storeHash}/v3/customers/subscribers`;
// BigCommerce API headers
const apiHeaders = {
  'X-Auth-Token': 'etdjw73jdgq3rfzvk40owokzb4kvxgl', // Replace with your BigCommerce API token
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};
// Input JSON file path
const jsonFilePath = path.resolve(__dirname, 'postman-body.json');
// Output log file paths
const consoleLogPath = path.resolve(__dirname, 'console-log.txt');
const errorLogPath = path.resolve(__dirname, 'error-log.txt');
// Utility function to log messages
function logMessage(filePath, message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(filePath, `[${timestamp}] ${message}\n`, 'utf-8');
}
// Function to send a POST request for a single subscriber
async function sendPostRequest(subscriber) {
  try {
    const response = await axios.post(apiEndpoint, subscriber, { headers: apiHeaders });
    const successMessage = `POST successful for email: ${subscriber.email} | Response: ${response.status}`;
    console.log(successMessage);
    logMessage(consoleLogPath, successMessage);
  } catch (error) {
    const errorMessage = `POST failed for email: ${subscriber.email} | Error: ${
      error.response ? JSON.stringify(error.response.data) : error.message
    }`;
    console.error(errorMessage);
    logMessage(errorLogPath, errorMessage);
  }
}
// Function to read JSON and make sequential POST requests
async function processSubscribers() {
  const rawData = fs.readFileSync(jsonFilePath, 'utf-8');
  const subscribers = JSON.parse(rawData);
  const startMessage = `${subscribers.length} subscribers to process.`;
  console.log(startMessage);
  logMessage(consoleLogPath, startMessage);
  // Sequentially send POST requests
  for (const subscriber of subscribers) {
    await sendPostRequest(subscriber);
  }
  const endMessage = 'All requests processed.';
  console.log(endMessage);
  logMessage(consoleLogPath, endMessage);
}
// Run the function
processSubscribers().catch((error) => {
  const criticalError = `Critical error: ${error.message}`;
  console.error(criticalError);
  logMessage(errorLogPath, criticalError);
});
