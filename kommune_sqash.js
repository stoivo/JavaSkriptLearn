
// var Npm = require('node');

var fs = require('fs');
var csv = require('fast-csv');

var stream = fs.createReadStream("kommuner.csv");

var csvStream = csv()
    .on("data", function(data){
         console.log(data);
    })
    .on("end", function(){
         console.log("done");
    });

stream.pipe(csvStream);


let kommuner = [
  [101,"Halden","Østfold Fylke",1,,,,,],
  [104,"Moss","Østfold Fylke",1,,,,,],
  [105,"Sarpsborg","Østfold Fylke",1,,,,,],
  [106,"Fredrikstad","Østfold Fylke",1,,,,,],
  [111,"Hvaler","Østfold Fylke",1,,,,,],
  [118,"Aremark","Østfold Fylke",1,,,,,],
  [119,"Marker","Østfold Fylke",1,,,,,],
  [121,"Rømskog","Østfold Fylke",1,,,,,],
  [122,"Trøgstad","Østfold Fylke",1,,,,,],
  [123,"Spydeberg","Østfold Fylke",1,,,,,],
  [124,"Askim","Østfold Fylke",1,,,,,],
  [125,"Eidsberg","Østfold Fylke",1,,,,,],
  [127,"Skiptvet","Østfold Fylke",1,,,,,],
  [128,"Rakkestad","Østfold Fylke",1,,,,,],
  [135,"Råde","Østfold Fylke",1,,,,,],
  [136,"Rygge","Østfold Fylke",1,,,,,],
  [137,"Våler","Østfold Fylke",1,,,,,],
];

console.log(kommuner);


var request = require('request');
request("http://data.brreg.no/enhetsregisteret/enhet.json?page=0&size=30&$filter=organisasjonsform%20eq%20%27ADOS%27", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
