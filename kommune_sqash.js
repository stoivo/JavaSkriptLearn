
// var Npm = require('node');

var fs = require('fs');
var csv = require('fast-csv');
var request = require('request');
var stream = fs.createReadStream("kommuner.csv");

let kommuner = [];
var csvStream = csv({delimiter: ';'})
    .on("data", function(data){
        kommuner.push(data);
         // console.log(data);
    })
    .on("end", function(){
         console.log("done");
         doLink("http://data.brreg.no/enhetsregisteret/enhet.json?page=0&size=30&$filter=organisasjonsform%20eq%20%27ADOS%27")
    });

stream.pipe(csvStream);

function doLink(url) {
  console.log("Simonsimsonsoimsonsmimon");
  console.log(kommuner);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var data = info.data;
      for (var i = 0; i < data.length; i++) {
        cur_org = data[i];
        for (var j = 0; j < kommuner.length; j++) {
          cur_kom = kommuner[j];

          // console.log("cur_kom[1]")
          // console.log(cur_kom[1])
          // console.log("cur_org.navn")
          // console.log(cur_org.navn)

          if(cur_org.navn.toLowerCase().indexOf(cur_kom[1].toLowerCase()) != -1){
          console.log(cur_kom[1] + " er "+cur_org.navn)
          }

        }
      }
    };
    console.log(info.links);
    if (info.links[info.links.length-1].rel == "next") {
      console.log(" 😇 😇 😇  😇 😇 😇 😇 😇 😇 😇 😇 😇 😇😇   🏊 🏼 🏊 🏼 😇 😇")
      doLink(info.links[info.links.length-1].href)
    }
  })

}
