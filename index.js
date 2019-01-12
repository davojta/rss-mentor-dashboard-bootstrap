const fs = require("fs");

if (typeof require !== "undefined") XLSX = require("xlsx");

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

  return rows.map(row => {
    return getWorker(sheet, row);
  });
};

// const worker = {
//   name: "Иванова Ольга Пеонидовна",
//   tabNumber: "1519",
//   startDate: "10/11/1993"
// };
const sheet = workerListWorkboox.Sheets["Sheet1"];
// console.log('values', workerListWorkboox.Sheets['Sheet1']['B2']['v'])
const workers = getWorkers(sheet);
// console.log("worker");

// ===============================
var illnessWorkbook = XLSX.readFile("_data/rss-stream/Заболеваемость.xlsx");

const getRecord = (sheet, currentRow) => {
  const fieldMapping = {
    name: "B",
    tabNumber: "D",
    begin: "K",
    end: "L"
  };

  const record = {
    name: sheet[fieldMapping.name + currentRow].v,
    tabNumber: sheet[fieldMapping.tabNumber + currentRow].v,
    begin: sheet[fieldMapping.begin + currentRow].w,
    end: sheet[fieldMapping.end + currentRow].w
  };

  return record;
};

const getRecords = sheet => {
  const rows = [2, 3, 4, 5, 6, 7];

  return rows.map(row => {
    return getRecord(sheet, row);
  });
};
const records = getRecords(illnessWorkbook.Sheets['Sheet1']);
// console.log("records", records);

const results = records.map((record) => {
    console.log('record', record);
    
    const worker = workers.find(w => w.tabNumber === record.tabNumber);

    if (!worker) return ;

    return {
        name: worker.name,
        startDate: worker.startDate,
        illBegin: record.begin,
        illEnd: record.end
    }
});

console.log('results', results.filter(r => r));

const json = JSON.stringify(results, 0, 2);

fs.writeFile("data.json", json, "utf8", () => {
  console.log("writing is done!");
});

