import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import Item from '../../components/Item';
import styles from './styles';
import { openDatabase } from 'react-native-sqlite-storage';

const shopperDB = openDatabase({name: 'Shopper.db'});
const itemsTableName = 'items';
const listItemsTableName = 'list_items';

const ViewListItemsScreen = props => {

  const post = props.route.params.post;
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      let results = [];
      shopperDB.transaction(txn => {
        txn.executeSql(
          `SELECT items.id, name, price, quantity FROM ${itemsTableName}, ${listItemsTableName} 
          WHERE items.id = item_id AND list_id = ${post.id}`,
          [],
          (_, res) => {
            let len = res.rows.length;
            console.log('Length of list items ' + len);
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
            } else {
              setItems([]);
            }
          },
          error => {
            console.log('Error getting list items ' + error.message);
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

export default ViewListItemsScreen;