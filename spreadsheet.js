const request = require('request')
const cheerio = require('cheerio')
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('/home/goutham/stockupdation-f8b999b001f4.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('18fJ-T9UeGnGAYo5L-QD5pEZXQ4iM5a8XFYJsrhyYkTc');
var stock_data = []
var stock_price = []
// Authenticate with the Google Spreadsheets API.
function stock() {
  doc.useServiceAccountAuth(creds, function (err) {

    // Get all of the rows from the spreadsheet.
    doc.getRows(1, function (err, rows) {
      for (i = 0; i < rows.length; i++) {
        console.log(rows[i].symbol);
        stock_data.push(rows[i].symbol);
        console.log(stock_data)
        for (i = 0; i < stock_data.length; i++) {
          request('https://in.finance.yahoo.com/quote/' + stock_data[i] + '.NS?p=' + stock_data[i] + '.NS&.tsrc=fin-srch', (error, response, html) => {
            if (!error && response.statusCode == 200) {
              const $ = cheerio.load(html);
              let price = $('span[class="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"]').html()
              console.log(price);
            }
          });
        }
      }
    });
  });
}
stock();
