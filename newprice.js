const request = require('request')
const cheerio = require('cheerio')
const stock_quotes = ['TCS', 'DRREDDY', 'INDIGO', 'MINDACORP', 'KTKBANK', 'FEDERALBNK', 'SBIN',
    'MANAPPURAM',
    'INDUSINDBK',
    'TATAMETALI',
    'SOUTHBANK',
    'IOLCP',
    'KEC - EQ',
    'SUBROS',
    'LT',
    'CHOLAFIN',
    'DEEPAKNTR',
    'TECHM'
]
var stock_price = []


function price_data() {
    for (stock of stock_quotes) {
        
        (function (stock) {
        request('https://in.finance.yahoo.com/quote/' + stock + '.NS?p=' + stock + '.NS&.tsrc=fin-srch', (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                let price = $('span[class="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"]').html()
                stock_price.push(price)
                console.log(stock);
            }
        });
        }(stock));
    }
}

price_data();
