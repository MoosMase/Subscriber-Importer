A Node.js application for importing subscriber data from a CSV file and making sequential POST requests to the BigCommerce API.

Features -Parses a CSV file containing subscriber information. -Converts the data into JSON format. -Sends individual POST requests to the BigCommerce API for each subscriber.

Requirements -Node.js (v14 or later) -A BigCommerce API token and store hash.

Setup
Clone the repository:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies:
npm install
Add your BigCommerce API token and store hash to postman.js.
Place your CSV file in the project directory as data.csv.
Usage
Parse the CSV file into JSON:
node script.js
Outputs: postman-body.json
Optionally check the .json file for correct data 3.Send POST requests to the BigCommerce API:
node api.js
Logs console-log.txt: Logs successful requests. error-log.txt: Logs errors for troubleshooting.
Example CSV Format
Email,First Name,Last Name,Source,Channel ID
john.doe@example.com,John,Doe,Newsletter,123
jane.smith@example.com,Jane,,,456