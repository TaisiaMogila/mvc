const URL = 'https://docs.google.com/spreadsheets/u/0/d/1Eb5z9BrgaJ9FZPMOZI4h0VHmGrr2-JZqen6symQJiHI/export?format=tsv&id=1Eb5z9BrgaJ9FZPMOZI4h0VHmGrr2-JZqen6symQJiHI&gid=0'
const SEP_LINE = '\r\n'
const SEP_CELL = '\t'
const DOM_TABLE = document.querySelector('.holidays')

function loadData() {
    fetch(URL)
        .then(response => response.text())
        .then(body => parseData(body))
        .then(data => render(data));
}

function parseData(body) {
    const table = body
        .split(SEP_LINE)
        .map(element => element.split(SEP_CELL));
    const headers = table.shift();

    return {
        headers: headers,
        holidays: table.map(element => {
                const holiday = {};
                headers.forEach((header, i) => holiday[header] = element[i])
                return holiday
            }
        )
    };
}

function render(data) {
    DOM_TABLE.innerHTML = `
    ${header(data.headers)}
    <tbody>
        ${body(data.holidays)}
    </tbody>`;
}

function header(headers) {
    return `
    <thead>
    <tr>
        <th scope="col">${headers[0]}</th>
        <th scope="col">${headers[1]}</th>
        <th scope="col">${headers[2]}</th>
        <th scope="col">${headers[3]}</th>
    </tr>
    </thead>`;
}

function body(holidays) {
    return `
    <tbody>
        ${holidays.map(it => row(it)).join("")}
    </tbody>`;
}

function row(holiday) {
    return `
    <tr>
        <th scope="row">${holiday.number}</th>
        <td>${holiday.holiday}</td>
        <td>${holiday['date(day)']}</td>
        <td>${holiday['date(month)']}</td>
    </tr>`;
}

loadData();
