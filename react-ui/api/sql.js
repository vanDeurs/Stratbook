const sqlite3 = require('sqlite3');

const createStrategyTable = () => {
    return `CREATE TABLE IF NOT EXISTS Strategies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nameValue TEXT default NULL,
        mapValue TEXT default NULL,
        typeValue TEXT default NULL,
        summaryValue TEXT default NULL,
        explanationValue TEXT default NULL,
        created VARCHAR(255)
    );`;
};
module.exports = {
    createStrategyTable,
};


