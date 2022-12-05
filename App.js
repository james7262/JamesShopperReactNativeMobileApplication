import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import Router from './src/navigation/Router';
/* bcrypt is a secure way to save passwords in a database, its algorithms encrypt a password
into a long string of characters, called a hash, that is almost impossible to decrypt.
It makes a database more secure - if someone hacks into it, they won't be able to steal
the user's passwords. */
import bcrypt from 'react-native-bcrypt';
import { openDatabase } from "react-native-sqlite-storage";

const database = require('./src/components/Handlers/database.js');

const shopperDB = openDatabase({name: 'Shopper.db'});
const usersTableName = 'users';

/* Create a salt that will be used by bcrypt when creating the hash.
A salt is a random value that will be appended to the password before
it is encrypted to make it more secure. */
let salt = bcrypt.genSaltSync(10);

const App: () => Node = () => {
  try {
    database.createListsTable();
  } catch (error) {
    console.log('Failed to create lists table ' + error);
  }

  try {
    database.createItemsTable();
  } catch (error) {
    console.log('Failed to create items table ' + error);
  }

  try {
    database.createListItemsTable();
  } catch (error) {
    console.log('Failed to create list items table ' + error);
  }

  try {
    database.createUsersTable();
  } catch (error) {
    console.log('Failed to create users table ' + error);
  }

  try {
    // Create the hash using bcrypt.
    let hash = bcrypt.hashSync('Ginger001!', salt);
    //database.addUser('bachrachj', hash);
  } catch (error) {
    console.log('Failed to create user ' + error);
  }
  
  return <Router />;
};

export default App;
