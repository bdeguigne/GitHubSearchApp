import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image } from 'react-native'

function ListInfos(props) {
    const [repos, setRepos] = useState([]);
    const Item = ({ name, desc }) => (
        <View style={{
            borderRadius:9,
            borderWidth:2,
            borderColor: "#D1D1D1",
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginBottom:5,
            padding:20
          }}>
            <Text style={{color: 'blue', fontWeight:"bold"}}>Repository name : {name}</Text>
            <Text style={{fontWeight:"bold"}}>Description : {desc}</Text>
        </View>
    );
    const renderItem = ({ item }) => (
        <Item name={item.name} desc={item.description}/>
    );

    useEffect(() => {
        fetch(props.repos, {
            method: 'GET',
            headers: 'Accept: application/vnd.github.v3+json'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setRepos({
                    data: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (
        <View style={{marginTop:30}}>
            <FlatList
                data={repos.data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
export default ListInfos