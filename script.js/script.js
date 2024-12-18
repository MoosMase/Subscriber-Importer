const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
// Input and output file paths
const csvFilePath = path.resolve(__dirname, 'data.csv');
const outputFilePath = path.resolve(__dirname, 'postman-body.json');
// Define the mapping between CSV columns and API fields
const fieldMapping = {
  "Email": "email", // Required
  "First Name": "first_name", // Required
  "Last Name": "last_name", // Optional
  "Source": "source", // Optional
  "Channel ID": "channel_id" // Optional
};
// Function to process the CSV file
function processCSV() {
  const postmanArray = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const requestData = {};
      // Map required fields
      for (const [csvField, apiField] of Object.entries(fieldMapping)) {
        if (row[csvField]) {
          requestData[apiField] = row[csvField];
        }
      }
      // Check if required fields are present
      if (requestData.email && requestData.first_name) {
        postmanArray.push(requestData);
      } else {
        console.warn(
          `Skipping row due to missing required fields: ${JSON.stringify(row)}`
        );
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed.');
      // Save the transformed data to a file
      const postmanBody = JSON.stringify(postmanArray, null, 2);
      fs.writeFileSync(outputFilePath, postmanBody, 'utf-8');
      console.log(`POST request body saved to ${outputFilePath}`);
    })
    .on('error', (error) => {
      console.error('Error reading the CSV file:', error);
    });
}
// Run the function
processCSV();








