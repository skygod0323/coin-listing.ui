export function getCountries() {
    return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
}
export function getData(cnt) {
    let countries = getCountries(), data = [];
    for (var i = 0; i < cnt; i++) {
        let country = countries[i % countries.length];
        data.push({
            id: i,
            country: country,
            url: 'https://visit.' + country + '.com',
            downloads: Math.round(Math.random() * 1000),
            sales: Math.random() * 2000,
            expenses: Math.random() * 1000,
            checked: i % 4 == 0,
            history: getValues(3 + Math.random() * 20, 100),
            img: 'https://cdn.grapecity.com/wijmo/images/' + (i % 4 + 1) + '.png',
            rating: Math.floor(Math.random() * 5)
        });
    }
    return data;
}
function getValues(cnt, max) {
    let values = [], val = Math.random() * max;
    for (let i = 0; i < cnt; i++) {
        val = Math.min(max, val + (Math.random() - 0.5) * max / 5);
        values.push(val);
    }
    return values;
}
