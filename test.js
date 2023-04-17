const moment = require("moment-timezone");

// Set the timezone to Hong Kong
moment.tz.setDefault("Asia/Hong_Kong");

// Get the current date and time in Hong Kong
const now = moment();

// Format the time as per your requirement
const formattedTime = now.format("YYYY|DD:HH");

console.log(formattedTime);
