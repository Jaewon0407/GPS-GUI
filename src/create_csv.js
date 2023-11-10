const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvFilePath = 'coordinate.csv';

function createCoordinateCSV() {
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
      { id: 'longitude', title: 'longitude' },
      { id: 'latitude', title: 'latitude' },
      { id: 'height', title: 'height'},
    ],
  });

  csvWriter.writeRecords([]) // Empty array to create an empty CSV file
    .then(() => {
      console.log('coordinate.csv created with headers: longitude, latitude, height');
    })
    .catch((error) => {
      console.error('Error occurred while creating coordinate.csv:', error);
    });
}

createCoordinateCSV();
