const fs = require('fs');
const request = require('request');

const args = process.argv.slice(2);
let adrs = args[0];
let file = args[1];


request(adrs, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  fs.writeFile(file, body, (err) => {
    if (err) throw err;
    let fileSize = fs.statSync(file).size;
    console.log(`Downloaded and saved ${fileSize} bytes to ${file}.`);
  });
});

// const breedDetailsFromFile = function(breed, callback) {
//   console.log('breedDetailsFromFile: Calling readFile...');
//   fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
//     console.log("In readFile's Callback: it has the data.");
    
//     if (!error) callback(data);
//     else callback(undefined);
//   });
// };