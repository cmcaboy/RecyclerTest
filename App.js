import React, {Component} from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import faker from 'faker';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class App extends Component {

  constructor(props) {
    super(props);

    const fakeData = [];
    for(i = 0; i < 100; i+= 1) {
      fakeData.push({
        type: 'NORMAL',
        item: {
          id: i,
          image: faker.image.avatar(),
          name: faker.name.firstName(),
          description: faker.random.words(5),
        },
      });
    }
    this.state = {
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData),
    };

    this.layoutProvider = new LayoutProvider((i) => {
      return this.state.list.getDataForIndex(i).type;
    }, (type, dim) => {
      switch (type) {
        case 'NORMAL': 
          dim.width = SCREEN_WIDTH;
          dim.height = 100;
          break;
        default: 
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  }

  rowRenderer = (type, data) => {
    const { image, name, description } = data.item;
    return (
      <View style={styles.listItem}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.body}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <RecyclerListView
          style={{flex: 1}}
          rowRenderer={this.rowRenderer}
          dataProvider={this.state.list}
          layoutProvider={this.layoutProvider}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    minHeight: 1,
    minWidth: 1,
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
    maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
  },
  image: {
    height: 80,
    width: 80,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    opacity: 0.5,
  },
  listItem: {
    flexDirection: 'row',
    margin: 10,
  },
});
