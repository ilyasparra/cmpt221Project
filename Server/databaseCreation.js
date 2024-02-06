const fs = require('fs');
const mysql = require('mysql2/promise')

// forming the connection creation of the database 

async function createDatabase() {
    const connection  = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ilyasito',
    })
    
    await connection.query('DROP DATABASE IF EXISTS `crypto`;')
    await connection.query('CREATE DATABASE `crypto`')
    await connection.end()

}

async function createShema() {
    const connection2 = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ilyasito',
        database: 'crypto',
    })
    
    await connection2.query('DROP TABLE IF EXISTS `account`;');
    await connection2.query('CREATE TABLE `account` (\
        `username` varchar(45) NOT NULL,\
        `firstname` varchar(45) DEFAULT NULL,\
        `lastname` varchar(45) DEFAULT NULL,\
        `DOB` datetime DEFAULT NULL,\
        `password` varchar(64) DEFAULT NULL,\
        PRIMARY KEY (`username`)\
      );');

    await connection2.query('DROP TABLE IF EXISTS `portfolio`');
    await connection2.query('CREATE TABLE `portfolio` (\
        `username` varchar(45) NOT NULL,\
        `symbol` varchar(3) NOT NULL,\
        `name` varchar(45) DEFAULT NULL,\
        PRIMARY KEY (`username`,`symbol`)\
      );');
      await connection2.query('CREATE TABLE `transaction` (\
        `trans_id` int NOT NULL AUTO_INCREMENT,\
        `username` varchar(45) NOT NULL,\
        `symbol` varchar(10) NOT NULL,\
        `amount` int NOT NULL,\
        `price` varchar(45) NOT NULL,\
        `trans_date` datetime NOT NULL,\
        PRIMARY KEY (`trans_id`,`username`,`symbol`)\
      );');

    await connection2.end()
}
async function makeDatabase(){
    await createDatabase()
    await createShema()
}

makeDatabase()




