// Import openDatabase hook.
import { openDatabase } from "react-native-sqlite-storage";

// Use hook to create database.
const shopperDB = openDatabase({name: 'Shopper.db'});
const listsTableName = 'lists';
const itemsTableName = 'items';
const listItemsTableName = 'list_items';
const usersTableName = 'users';

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

    // Function that will create the items table.
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
    
    // Function that adds items into the items table.
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

    // Function that creates list items table.
    createListItemsTable: async function() {
        (await shopperDB).transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${listItemsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    list_id integer,
                    item_id integer
                );`,
                [],
                () => {
                    console.log('List items table created successfully');
                },
                error => {
                    console.log('Error creating list items table ' + error.message);
                },
            );
        });
    },
    
    // Function that adds list items into the list items table.
    addListItem: async function (list_id, item_id) {
        (await shopperDB).transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${listItemsTableName} (list_id, item_id) VALUES (${list_id}, ${item_id})`,
                [],
                () => {
                    console.log("List item added successfully");
                },
                error => {
                    console.log('Error adding list item ' + error.message);
                },
            );
        });
    },

    // Declare function that will create the users table.
    createUsersTable: async function() {
        // Declare a transaction that will execute a SQL statement.
        (await shopperDB).transaction(txn => {
            // Execute the SQL.
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${usersTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT,
                    password TEXT
                );`,
                // Arguments needed when using an SQL prepared statement.
                [],
                // Callback function to handle results of SQL query.
                () => {
                    console.log('Users table created successfully');
                },
                error => {
                    console.log('Error creating users table ' + error.message);
                },
            );
        });
    },

    // Declare a function that will insert a row into the users table.
    addUser: async function (username, password) {
        // Declare a transaction that will execute an SQL statement.
        (await shopperDB).transaction(txn => {
            // Execute the SQL.
            txn.executeSql(
                `INSERT INTO ${usersTableName} (username, password) VALUES ("${username}", "${password}")`,
                // Arguments passed when using SQL prepared statements.
                [],
                // Callback function to handle results of SQL query.
                () => {
                    console.log(username + " " + password + " added successfully");
                },
                error => {
                    console.log('Error adding user ' + error.message);
                },
            );
        });
    },
};