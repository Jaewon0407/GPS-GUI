const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(cors());

let fetchedData = null; // Variable to store the fetched data

function fetchData() {
  fs.createReadStream('../coordinate.csv')
    .pipe(csv()) // Convert the CSV data into JavaScript objects
    .on('data', (data) => {
      fetchedData = data; // Update fetchedData with a single value
    })
    .on('end', () => {
      console.log('Data fetched successfully');
    })
    .on('error', (error) => {
      console.log('Error occurred while reading CSV file:', error);

      // In case of an error, use the last successfully fetched data 
      console.log('Using the last successfully fetched data', fetchData);
    });
}

// Initial data fetch
fetchData();

setInterval(fetchData, 500); // Fetch the data every .5 seconds (Adjust if needed)

app.get('/coordinate', (req, res) => {
  res.json(fetchedData);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
