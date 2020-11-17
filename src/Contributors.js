import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image } from 'react-native'

function Contributors(props) {
    const [contributors, setContributors] = useState([]);
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
        <Item  login={item.login} avatar={item.avatar_url}/>
    );

    useEffect(() => {
        console.log(props.contributors)
        fetch(props.contributors, {
            method: 'GET',
            headers: 'Accept: application/vnd.github.v3+json'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setContributors({
                    data: responseJson
                })
                console.log(contributors)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (
            <View style={{marginTop:30}}>
            <FlatList
                data={contributors.data}
                renderItem={renderItem}
                keyExtractor={item => item.login}
            />
        </View>
    )
}
export default Contributors