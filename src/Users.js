import React, { Component } from 'react'
import { Actions } from "react-native-router-flux";
import { View, SafeAreaView, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import Input from './SearchInput'
import { storeUser } from './storeData'

const FavIcon = require('./assets/starFocus.png')

const Item = ({ type, login, avatar, followers, repos }) => (
  <View style={{
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#D1D1D1",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding: 20
  }}>
    <Image source={{ uri: avatar }} style={{ width: 50, height: 50 }}></Image>
    <Text style={{ fontWeight: "bold" }}>{login}</Text>
    <Text style={{ fontWeight: "bold" }}>{type}</Text>
    <Text style={{ color: 'blue', fontWeight: "bold" }}
      onPress={() => Actions.followers({ followers })}>Followers</Text>
    <Text style={{ color: 'blue', fontWeight: "bold" }}
      onPress={() => Actions.repos({ repos })}>Repos</Text>
    <TouchableOpacity onPress={() => storeUser(login, avatar, type)}><Image source={FavIcon} style={{ width: 20, height: 20 }}></Image></TouchableOpacity>
  </View>
);

const renderItem = ({ item }) => (
  // console.log(item.followers_url),
  <Item type={item.type} login={item.login} avatar={item.avatar_url}
    followers={item.followers_url} repos={item.repos_url} />
);

class UserReq extends Component {
  state = {
    data: ''
  }

  launchSearch = (usrname) => {
    fetch('https://api.github.com/search/users?q=' + usrname, {
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
        <Input placeholder="enter name" onSubmit={this.launchSearch} rightButtonText="Search"></Input>
        <FlatList
          data={this.state.data.items}
          renderItem={renderItem}
          keyExtractor={item => item.items}
        />
      </SafeAreaView>
    )
  }
}
export default UserReq