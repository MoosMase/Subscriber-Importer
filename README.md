A Node.js application for importing subscriber data from a CSV file and making sequential POST requests to the BigCommerce API.

Features 

-Parses a CSV file containing subscriber information. This will work with the default export columns from BigCommerce as well as "last_name, source, channel_id"

-Converts the data into JSON format. 

-Sends individual POST requests to the BigCommerce API for each subscriber.

Requirements 

-Node.js (v14 or later) 

-A BigCommerce API token and store hash.

Setup

1. Clone the repository:
```
git clone https://github.com/MoosMase/Subscriber-Importer.git
cd Subscriber-Importer
```
2. Install dependencies:
```
npm install
```
3. Add your BigCommerce API token and store hash to postman.js.
4. Place your CSV file in the project directory as data.csv.

Usage

1.Parse the CSV file into JSON:
```
node script.js
```
Outputs: postman-body.json

2. Optionally check the .json file for correct data
3. Send POST requests to the BigCommerce API:
```
node api.js
```
Logs 

-console-log.txt: Logs successful requests. 

-error-log.txt: Logs errors for troubleshooting.

Example CSV Format
```
Email,First Name,Last Name,Source,Channel ID
john.doe@example.com,John,Doe,Newsletter,123
jane.smith@example.com,Jane,,,456
```
