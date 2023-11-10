const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvFilePath = 'coordinate.csv';

const csvWriter = createCsvWriter({
  path: csvFilePath,
  header: [
    { id: 'longitude', title: 'longitude' },
    { id: 'latitude', title: 'latitude' },
    { id: 'height', title: 'height' }, // Add height column to the CSV header
  ],
  append: true, // Append new records to the existing file
});

let longitude = -122.4194; // Starting longitude
let latitude = 37.7749; // Starting latitude
const increment = 0.0001; // Increment value for longitude and latitude

async function fetchDataAndUpdateCSV() {
  try {
    // Generate a random height value
    const height = Math.random() * 100;

    // Create new data with updated longitude, latitude, and height
    const newData = [
      {
        longitude: longitude.toFixed(4),
        latitude: latitude.toFixed(4),
        height: height.toFixed(2), // Convert height to a fixed 2 decimal places
      },
    ];

    // Append the new data to the CSV file
    await csvWriter.writeRecords(newData);

    console.log('CSV file updated successfully.');

    // Update longitude and latitude for the next iteration
    longitude -= increment;
    latitude += increment;
  } catch (error) {
    console.log('Error updating CSV file:', error);
  }
}

setInterval(fetchDataAndUpdateCSV, 500); // Run the function every 1 second (500 milliseconds)
