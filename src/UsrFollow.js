import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image } from 'react-native'

function ListInfos(props) {
    const [followers, setFollowers] = useState([]);
    const Item = ({ login, avatar }) => (
        <View style={{
            borderRadius:9,
            borderWidth:2,
            borderColor: "#D1D1D1",
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom:5,
            padding:20,
          }}>
             <Image source={{uri:avatar}} style={{width:50, height:50, marginRight:30}}></Image>
            <Text style={{fontWeight:"bold"}}>{login}</Text>
        </View>
    );
    const renderItem = ({ item }) => (
        // console.log(item.followers_url),
        <Item  login={item.login} avatar={item.avatar_url}/>
    );

    useEffect(() => {
        fetch(props.followers, {
            method: 'GET',
            headers: 'Accept: application/vnd.github.v3+json'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setFollowers({
                    data: responseJson
                })
                console.log(followers)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (
            <View style={{marginTop:30}}>
            <FlatList
                data={followers.data}
                renderItem={renderItem}
                keyExtractor={item => item.login}
            />
        </View>
    )
}
export default ListInfos