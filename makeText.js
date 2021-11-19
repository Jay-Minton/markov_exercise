/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function readText(path) {
    fs.readFile(path,'utf8', function (err, data) {
        if(err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1)
        } else {
            makeText(data);        
        }
    })
}

async function readURLText(url) {
    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Error reading ${url}: ${err}`);
        process.exit(1)
    }
    makeText(resp.data);
}

function makeText(text) {
    let mark = new markov.MarkovMachine(text);
    console.log(mark.makeText());
}

if(process.argv[2]  == "file") {
    readText(process.argv[3]);    
} else if(process.argv[2] == "url") {
    readURLText(process.argv[3]);
} else {
    console.error("Unknown Method");
    process.exit(1);
}