import React, {useState, useEffect} from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Item from '../../components/Item';
import styles from './styles';
import { openDatabase } from "react-native-sqlite-storage";

const shopperDB = openDatabase({name: 'Shopper.db'});
const itemsTableName = 'items';

const AddListItemScreen = props => {

  const post = props.route.params.post;
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
                  list_id: post.id,
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
                  list_id: 1
                },
                {
                  id: 2
                  name: Bread
                  price: 2.99
                  quantity: 2
                  list_id: 1
                },
                {
                  id: 3
                  name: Dog Food
                  price: 22.99
                  quantity: 1
                  list_id: 3
                },
                {
                  id: 4
                  name: Fish Food
                  price: 7.99
                  quantity: 1
                  list_id: 3
                },
                {
                  id: 5
                  name: Pencils
                  price: 6.55
                  quantity: 1
                  list_id: 2
                },
                {
                  id: 6
                  name: Water Bottle
                  price: 12.99
                  quantity: 1
                  list_id: 2
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
        <FlatList 
          data={items}
          renderItem={({item}) => <Item post={item} />}
          keyExtractor = {item => item.id}
        />
    </View>
  );
};

export default AddListItemScreen;