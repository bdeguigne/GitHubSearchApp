import React , { Component } from 'react';
import { View, SafeAreaView, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActionSheetIOS } from 'react-native';
import Input from './SearchInput'
import { Actions } from "react-native-router-flux";
import { storeRepo } from './storeData';

const FavIcon = require('./assets/starFocus.png')

let Item =({ name , is_private , is_fork , description, size, default_branch_name , issues_url, contributors_url }) => (
  <View style={styles.item}>
    <Text style={{ fontWeight: "bold",  fontSize: 20}}>{name}</Text>
    <Text>{description}{"\n"}</Text>
    <Text>{size}{" Bytes\n"}</Text>
    <Text>{"Default branch : "}{default_branch_name}{"\n"}</Text>
    <Text>{"("}{is_private ? "private" : "public"}{","}{is_fork ? "fork" : "not a fork"}{")"}</Text>
    <Text style={{ color: 'blue', fontWeight: "bold" }} onPress={() => Actions.issues({ issues : issues_url })}>Issues</Text>
    <Text style={{ color: 'blue', fontWeight: "bold" }} onPress={() => Actions.contributors({ contributors : contributors_url })}>Contributors</Text>
    <TouchableOpacity onPress={() => storeRepo(name, is_private, is_fork, description, size, default_branch_name)}><Image source={FavIcon} style={{width : 20, height: 20}}></Image></TouchableOpacity>
  </View>
);

const renderItem = ({ item }) => (
  <Item name={item.name} is_private={item.private} is_fork={item.fork} description={item.description} size={item.size} default_branch_name={item.default_branch} issues_url={item.issues_url.slice(0,-9)} contributors_url={item.contributors_url} />
);

class Repositories extends Component {
  state = {
    data: ''
  }

  _search = (search) => {
    fetch('https://api.github.com/search/repositories?q=' + search, {
      method: 'GET',
      headers: 'Accept: application/vnd.github.v3+json'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <SafeAreaView>
        <Input placeholder="search repository" onSubmit={this._search} rightButtonText="Search"></Input>
        <FlatList
          data={this.state.data.items}
          renderItem={renderItem}
          keyExtractor={item => item.items}
        />
      </SafeAreaView>
    )
  }
}
  

const styles = StyleSheet.create({
  item: {
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#D1D1D1",
    marginBottom: 5,
    padding: 20
  },
});

export default Repositories