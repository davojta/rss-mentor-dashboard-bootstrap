fetch('./data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(resultJson) {
      const rows = resultJson.map((record) => {
        return `
        <tr>
            <td>${record.name}</td>
            <td>${record.startDate}</td>
            <td>${record.illBegin}</td>
            <td>${record.illEnd}</td>
        </tr>
        
        `
      }).join('')
    const table = `
    <table>
        <tbody>
           ${rows}
        </tbody>
    </table>
    `
    const mainEl = document.querySelector('#main');
    mainEl.innerHTML = table
  });