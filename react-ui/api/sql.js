const express = require('express');
const sqlite3 = require('sqlite3');

// Add ID again
const createStrategyTable = () => {
    return `CREATE TABLE Strategies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nameValue TEXT default NULL,
        mapValue TEXT default NULL,
        typeValue TEXT default NULL,
        summaryValue TEXT default NULL,
        explanationValue TEXT default NULL,
        created VARCHAR(255)
    );`;
};

const selectAllStrategies = () => {
    return `SELECT * FROM Strategies;`;
}

module.exports = {
    createStrategyTable,
    selectAllStrategies,
};


