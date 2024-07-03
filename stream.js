const fs = require("fs");

// let content = "";

// let readStream = fs.createReadStream("./public/info.txt");

// //listen for the data event. i.e whenever data is available it will listen for that.
// readStream.on("data", (chunk) => {
//   content += chunk;
// });

// //listen for the end event. i.e when no data is left.
// readStream.on("end", () => {
//   console.log(content);
// });

// //listen for error event.
// readStream.on("error", (err) => {
//   console.log(err.message);
// });


// let writeStream= fs.createWriteStream('output.txt');

// //write the data in writeStream
// writeStream.write('I love India');

// //It indicate that no more data is there to write.
// writeStream.end();

// writeStream.on('finish', ()=>{
//     console.log('Writing finished');
// })

// let readStream= fs.createReadStream('output.txt');
// let writeStream= fs.createWriteStream('input.txt');
 
// readStream.pipe(writeStream);
