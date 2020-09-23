const fs = require('fs');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);
let adrs = args[0];
let file = args[1];


request(adrs, (error, response, body) => {
  if (error) {
    console.log('error:', error); // Print the error if one occurred
    
  }
  if (fs.existsSync(file)) {
    rl.question("The file already exists...Overwrite?(y, n)", (answer) => {
      if (answer === 'y' || answer === 'yes' || answer === 'Yes') {
        fs.writeFile(file, body, (err) => {
          if (err) {
            console.log("invalid file path");
            process.exit();
          }
          let fileSize = fs.statSync(file).size;
          console.log(`Downloaded and saved ${fileSize} bytes to ${file}.`);
          process.exit();
        });
      } else {
        console.log("Please choose a new file to write to and rerun... Good bye.");
        process.exit();
      }

    });
  } else {
    fs.writeFile(file, body, (err) => {
      if (err) {
        console.log("invalid file path");
        process.exit();
      }
      let fileSize = fs.statSync(file).size;
      console.log(`Downloaded and saved ${fileSize} bytes to ${file}.`);
      process.exit();
    });
  }
});

