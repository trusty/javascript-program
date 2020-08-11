const request = require('request')
const cheerio = require('cheerio')
const stock_data = ['TCS', 'DRREDDY', 'INDIGO', 'MINDACORP', 'KTKBANK', 'FEDERALBNK', 'SBIN',
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
    for (i = 0; i < stock_data.length; i++) {
        request('https://in.finance.yahoo.com/quote/' + stock_data[i] + '.NS?p=' + stock_data[i] + '.NS&.tsrc=fin-srch', (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                let price = $('span[class="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"]').html()
                stock_price.push(price)
                console.log(price);
                console.log(stock_price);
            }
        });
    }
}

price_data();