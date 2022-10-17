// Import openDatabase hook.
import { openDatabase } from "react-native-sqlite-storage";

// Use hook to create database.
const shopperDB = openDatabase({name: 'Shopper.db'});
const listsTableName = 'lists';
const itemsTableName = 'items';

module.exports = {
    // Declare function that will create the lists table.
    createListsTable: async function() {
        // Declare a transaction that will execute a SQL statement.
        (await shopperDB).transaction(txn => {
            // Execute the SQL.
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${listsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    store TEXT,
                    date TEXT
                );`,
                // Arguments needed when using an SQL prepared statement.
                [],
                // Callback function to handle results of SQL query.
                () => {
                    console.log('Lists table created successfully');
                },
                error => {
                    console.log('Error creating lists table ' + error.message);
                },
            );
        });
    },

    // Declare a function that will insert a row into the lists table.
    addList: async function (name, store, date) {
        // Declare a transaction that will execute an SQL statement.
        (await shopperDB).transaction(txn => {
            // Execute the SQL.
            txn.executeSql(
                `INSERT INTO ${listsTableName} (name, store, date) VALUES ("${name}", "${store}", "${date}")`,
                // Arguments passed when using SQL prepared statements.
                [],
                // Callback function to handle results of SQL query.
                () => {
                    console.log(name + " added successfully");
                },
                error => {
                    console.log('Error adding list ' + error.message);
                },
            );
        });
    },

    createItemsTable: async function() {
        (await shopperDB).transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${itemsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT(100),
                    price REAL,
                    quantity INTEGER
                );`,
                [],
                () => {
                    console.log('Items table created successfully');
                },
                error => {
                    console.log('Error creating items table ' + error.message);
                },
            );
        });
    }, 
    
    addItem: async function (name, price, quantity) {
        (await shopperDB).transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${itemsTableName} (name, price, quantity) VALUES ("${name}", ${price}, ${quantity})`,
                [],
                () => {
                    console.log(name + " added successfully");
                },
                error => {
                    console.log('Error adding item ' + error.message);
                },
            );
        });
    },
};