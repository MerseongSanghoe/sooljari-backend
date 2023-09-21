// @ts-nocheck
import fetch from 'node-fetch';
import xlsx from "xlsx";
import fs from 'fs';

// @files 엑셀 파일을 가져온다.
const excelFile = xlsx.readFile( "exceldb.xlsx" );
const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];

const jsonData = xlsx.utils.sheet_to_json( firstSheet, { defval : "", raw: false } );

// console.log(jsonData[0]);

const dataConverter = (obj) => {
    const toReturn = {};

    toReturn.title = obj.이름;
    toReturn.category = `${obj.종류2} ${obj.종류1}`;
    toReturn.degree = parseInt(obj.도수, 10);
    toReturn.explanation = obj['설명 전문'];
    toReturn.link = obj.링크;
    toReturn.store_link = obj.구매링크;
    toReturn.sub_link = obj['추가 링크'];
    toReturn.alc_search_keys = [obj.딴이름];

    return toReturn;
}

// strapi에 로그인
let loginString = "";
let jwt = "";
try {
    loginString = fs.readFileSync('./login.txt', 'utf8');
    console.log(`login with ${loginString}`);
} catch (err) {
    console.error(err);
}
const [ ip, id, pw ] = loginString.split("::");
console.log(`${ip} -> ${id} / ${pw}`)

const loginRes = await fetch(`${ip}api/auth/local`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        identifier: id,
        password: pw
    })
});
const loginData = await loginRes.json();
if (!loginRes.ok) {
    console.error(loginString);
    process.exit(loginRes.status)
}
else {
    jwt = loginData.jwt;
}

let currentMakerName = "";
let currentMakerId = -1;
for (let i = 0; i < jsonData.length; ++i) {
    const ele = jsonData[i];
    if (currentMakerName != ele.양조장) {
        currentMakerName = ele.양조장;
        const res = await fetch(`${ip}api/makers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({
                data: {
                    name: ele.양조장,
                    nation: ele.생산지1,
                    location: ele.생산지2,
                }
            })
        });
        if (!res.ok) {
            console.error(await res.json());
            break;
        }

        const makerData = await res.json();
        currentMakerId = makerData.data.id;
    }

    const toSend = dataConverter(ele);
    toSend.maker = ele.양조장.length === 0 ? 88 : currentMakerId;

    const res = await fetch(`${ip}api/alcohols`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({
            data: toSend
        })
    });
    if (!res.ok) {
        console.error(await res.json());
        break;
    }
}
