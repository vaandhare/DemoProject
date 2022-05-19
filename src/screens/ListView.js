import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

const ListView = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);

  const getDataFromApi = () => {
    return fetch(`https://dummyapi.io/data/v1/post?limit=${limit}`, {
      method: 'GET',
      headers: {
        'app-id': '628498f581037a1102979d94',
      },
    })
      .then(response => response.json())
      .then(json => {
        setLimit(limit + 10);
        setData(json.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        onEndReached={getDataFromApi}
        onEndReachedThreshold={0.9}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.itemContainer} key={item.id}>
            <Image source={{uri: `${item.image}`}} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
  text: {
    paddingTop: 10,
    fontSize: 16,
    color: '#000',
  },
  image: {
    width: '100%',
    height: 200,
  },
});
