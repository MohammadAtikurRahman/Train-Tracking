const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

const url = "https://railspaapi.shohoz.com/v1.0/web/train-routes";
const headers = {
    "Accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE3MTYxMTE3NDUsImV4cCI6MTcxNjE5ODE0NSwiaXNzIjoiaHR0cDovL3RyYWluLWlhbS5zaG9ob3ouY29tIiwiYXVkIjoic2hvaG96LmlhbS50cmFpbiIsImNsaWVudF9pZCI6InRyYWluLXRpY2tldC11c2VyIiwiY2xpZW50X3RlbmFudF9pZCI6IjY3YTUxNjNjLTU2NWQtNGNhMC1iMTE3LTg3YzcwMWY2NTRmOSIsImNsaWVudF92ZXJ0aWNhbF9pZCI6IjA2OGU4MDRmLTJkYjctNDQ4OS05OTYzLTc4OWZiN2UwMmJkZiIsInN1YiI6IjM3MDY4NjdiLWM0MTMtNGE1Yi1hZDlmLWUwMzkyMmViYjRkZCIsImF1dGhfdGltZSI6MTcxNjExMTc0NSwiaWRwIjoibG9jYWwiLCJwaG9uZV9udW1iZXIiOiIwMTc3MjM5MjIzNyIsImVtYWlsIjoiY29udGFjdC5hdGlrdXJyYWhtYW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiIwMTc3MjM5MjIzNyIsImRpc3BsYXlfbmFtZSI6Ik1ELiBBVElLVVIgUkFITUFOIiwibG9jYWxlIjoiYm4tQkQiLCJuaWRuIjoiOTE2NTUwNDQ3NCIsIm5pZG50IjoiTklEIiwicm9sZSI6WyJ1c2VyIiwiYW5vbnltb3VzIl0sInNjb3BlIjpbInNob2hvei5pYW0udHJhaW4iLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.X5d3MhD7C-IGJaVwT2GFx8W20RY0YFcVgSHPLrQjjqqbcV9GGe6A6VVHKFo3Etx6xsFE7iDwSbP4g5kRL59dPMua4jqOub79nbVvsHd5F6QSgDOyd6_MryYvx0Ex10Sjmj54wtaXpbk9mMhCCLnHNjf_Yxp8elfcsXJFQtb7z1OfX5rWnAI1pQviPQ1TDFQ3Zm4dsagMkbr4I3yggrVu_mx9st4I_w5nnYF4akbfNzsI2myM5R0BJOc4KyI7Zec2pzMkyHRBbsKaGq01jAUxRI4Qq9OeHzej5GKHiRIVZD9y2IHLif04GX3Q_eDhcyEQIcGABVv7zxGMLBT_DRrqtA"
};

const trainNumbers = [
    "701", "702", "703", "704", "705", "706", "707", "708", "709", "710", 
    "711", "712", "713", "714", "715", "716", "717", "718", "719", "720", 
    "721", "722", "723", "724", "725", "726", "727", "728", "729", "730", 
    "731", "732", "733", "734", "735", "736", "737", "738", "739", "740", 
    "741", "742", "743", "744", "745", "746", "747", "748", "749", "750", 
    "751", "752", "753", "754", "755", "756", "757", "758", "759", "760", 
    "761", "762", "763", "764", "765", "766", "767", "768", "769", "770", 
    "771", "772", "773", "774", "775", "776", "777", "778", "779", "780", 
    "781", "782", "783", "784", "785", "786", "787", "788", "789", "790", 
    "791", "792", "793", "794", "795", "796", "797", "798", "799", "800", 
    "801", "802", "803", "804", "805", "806", "807", "808", "809", "810", 
    "811", "812", "813", "814", "815", "816", "817", "818", "819", "820"
];

app.get('/train-routes', (req, res) => {
    let responses = [];

    trainNumbers.forEach((number, index) => {
        const postData = JSON.stringify({
            model: number,
            departure_date_time: "2024-05-20"
        });

        const options = {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const apiReq = https.request(url, options, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                responses.push(JSON.parse(data));
                if (responses.length === trainNumbers.length) {
                    res.send(responses);
                }
            });

        }).on('error', (err) => {
            console.error(`Failed to retrieve data: ${err.message}`);
            responses.push({ error: err.message });
            if (responses.length === trainNumbers.length) {
                res.send(responses);
            }
        });

        apiReq.write(postData);
        apiReq.end();
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
