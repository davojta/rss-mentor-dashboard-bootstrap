if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('_data/rss-stream/Заболеваемость.xlsx');

console.log('workbook', workbook);
debugger;
console.log('sheets', workbook.Sh)