/* 
1. Use the inquirer npm package to get user input.


*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        name: 'url',
        message: 'Enter the URL you want to convert to QR code',
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url=answers.url;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr-img.png'));
    fs.writeFile('message.txt', url, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("error");
    } else {
      // Something else went wrong
      console.log("error");
    }
  });

  //2. Use the qr-image npm package to turn the user entered URL into a QR code image.
