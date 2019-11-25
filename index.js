#!/usr/bin/env node
console.log("Hello, my name is Michaël Pirali !");

// include all dependencies
const readlineSync = require("readline-sync");
const { getCode, getName } = require('country-list');
const axios = require('axios');

// Ask user to enter a valid country name, the function keep asking until the name is correct
function getUserCountryCode(){
  let countryCode = getCode(readlineSync.question('Enter a country name : '));
  while(countryCode == null){
    console.log('Sorry country not found. Please try again.');
    countryCode = getCode(readlineSync.question('Enter a country name : '));
  }
  return countryCode;
}

// Get the argument given by the user from console command
// Example $ holidates switzerland
let countryCode = getCode(process.argv[2]);

if(countryCode == null){
  countryCode = getUserCountryCode();
}
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
// GET /PublicHolidays/{Year}/{CountryCode}
const request = "https://date.nager.at/api/v2/publicholidays/"+currentYear+"/"+countryCode;

function dateAndName(item, index) {
  console.log(item.date + " : " + item.name);
}

// using request whith axios to get the response of the API
if(countryCode){
  axios.get(request)
    .then(function (response) {
      // handle success
      let countryHolidays = response.data;
      countryHolidays.forEach(dateAndName);
    })
    .catch(function (error) {
      // handle error
      console.log("error");
    })
    .finally(function () {
      // always executed
    });
}
