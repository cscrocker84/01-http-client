#!/usr/bin/env node

const { get } = require('http');
let [,,input] = process.argv;
const apiStock = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/JSON?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"${input}","Type":"price","Params":["c"]}]}`;

const getJSON = url => {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` +
          `Status Code: ${statusCode}`);
      } else if (!/^text\/javascript/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.log(error.message);
        res.resume();
        return;
      }
  })
};
