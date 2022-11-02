import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import List from '../../components/List'; 
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
// Import openDatabase hook.
import { openDatabase } from "react-native-sqlite-storage";

// Use hook to create database.
const shopperDB = openDatabase({name: 'Shopper.db'});
const listsTableName = 'lists';

const ListsScreen = props => {

  const navigation = useNavigation();

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // Declare an empty array that will store the results of the SELECT.
      let results = [];
      // Declare a transaction that will execute the SELECT.
      shopperDB.transaction(txn => {
        // Execute the SELECT statement.
        txn.executeSql(
          `SELECT * FROM ${listsTableName}`,
          [],
          // Callback function to handle the results from the SELECT statement.
          (_, res) => {
            // Get number of rows of data selected.
            let len = res.rows.length;
            console.log('Length of lists ' + len);
            // If more than one row was returned.
            if (len > 0) {
              // Loop through the rows
              for (let i = 0; i < len; i++) {
                // Push a row of data at a time onto the results array.
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  name: item.name,
                  store: item.store,
                  date: item.date,
                });
              }
              // Assign the results array to the lists state variable
              setLists(results);
              /*
              [
                {
                  id: 1
                  name: Grocery List
                  store: Giant
                  date: 2022-11-02
                },
                {
                  id: 2
                  name: Back to School List
                  store: Staples
                  date: 2022-11-02
                },
                {
                  id: 3
                  name: Pet Supplies List
                  store: PetSmart
                  date: 2022-11-02
                }
              ]
              */
            } else {
              // If no rows of data were returned, set lists state variable to an empty array.
              setLists([]);
            }
          },
          error => {
            console.log('Error getting lists ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={lists}
          renderItem={({item}) => <List post={item} />}
          keyExtractor = {item => item.id}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add List')}
                >
                <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
        </View>  
    </View>
  );
};

export default ListsScreen;