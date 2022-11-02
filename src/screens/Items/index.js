import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import Item from '../../components/Item';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { openDatabase } from "react-native-sqlite-storage";

const shopperDB = openDatabase({name: 'Shopper.db'});
const itemsTableName = 'items';

const ItemsScreen = props => {

  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      let results = [];
      shopperDB.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${itemsTableName}`,
          [],
          (_, res) => {
            let len = res.rows.length;
            console.log('Length of items ' + len);
            if (len > 0) {
              for (let i = 0; i < len; i++) {
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                });
              }
              setItems(results);
              /*
              [
                {
                  id: 1
                  name: Milk
                  price: 4.99
                  quantity: 1
                },
                {
                  id: 2
                  name: Bread
                  price: 2.99
                  quantity: 2
                },
                {
                  id: 3
                  name: Dog Food
                  price: 22.99
                  quantity: 1
                },
                {
                  id: 4
                  name: Fish Food
                  price: 7.99
                  quantity: 1
                },
                {
                  id: 5
                  name: Pencils
                  price: 6.55
                  quantity: 1
                },
                {
                  id: 6
                  name: Water Bottle
                  price: 12.99
                  quantity: 1
                }
              ]
              */
            } else {
              setItems([]);
            }
          },
          error => {
            console.log('Error getting items ' + error.message);
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
          data={items}
          renderItem={({item}) => <Item post={item} />}
          keyExtractor = {item => item.id}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add Item')}
                >
                <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
        </View>  
    </View>
  );
};

export default ItemsScreen;