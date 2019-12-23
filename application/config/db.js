var mysql = require('mysql');

const config = {
	connectionLimit: 100,
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'web_guide'
};
var connection = mysql.createPool(config);
  
module.exports = connection

// const Sequelize = require('sequelize');

// const connection = new Sequelize('web_guide', 'root', null, {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//       },
//   });

//   module.exports = connection