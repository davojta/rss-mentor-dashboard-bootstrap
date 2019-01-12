const fs = require('fs');

if (typeof require !== "undefined") XLSX = require("xlsx");
var illnessWorkbook = XLSX.readFile("_data/rss-stream/Заболеваемость.xlsx");
const workerListWorkboox = XLSX.readFile(
  "_data/rss-stream/Список работников.xlsx"
);

// console.log('workbook', workbook);
// debugger;
// console.log('values', illnessWorkbook.Sheets['Sheet1']['A1']['v'])
const fieldMapping = {
  name: "B",
  tabNumber: "C",
  startDate: "G"
};

const getWorker = (sheet, currentRow) => {
  const worker = {
    name: sheet[fieldMapping.name + currentRow].v,
    tabNumber: sheet[fieldMapping.tabNumber + currentRow].v,
    startDate: sheet[fieldMapping.startDate + currentRow].w
  };

  return worker;
};

const getWorkers = sheet => {
  const rows = [2, 3, 4, 5];

  return rows.map(getWorker.bind(null, sheet));
};

const worker = {
  name: "Иванова Ольга Пеонидовна",
  tabNumber: "1519",
  startDate: "10/11/1993"
};
const sheet = workerListWorkboox.Sheets["Sheet1"];
// console.log('values', workerListWorkboox.Sheets['Sheet1']['B2']['v'])
const workers = getWorkers(sheet);
// console.log("worker");
const json = JSON.stringify(workers, 0, 2);

fs.writeFile("data.json", json, "utf8", () => {
  console.log("writing is done!");
});
