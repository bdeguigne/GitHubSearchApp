import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from "react-native";
import { storeUser, getData, clearData, storeRepo } from "./storeData";
import UserCard from "./FavoritesUserCard";
import RepoCard from "./FavoritesRepoCard";

const Favorites = () => {
    const [favUserData, setFavUserData] = useState([]);
    const [favRepoData, setFavRepoData] = useState([]);
    const [navBarStatus, setNavBarStatus] = useState("user");

    useEffect(() => {
        getAllData();
    }, [navBarStatus]);

    const getAllData = async () => {
        const data = await getData();
        if (data !== null) {
            var userDataTmp = [];
            var repoDataTmp = [];
            data.forEach(item => {
                let favData = {
                    key: item[0],
                    data: JSON.parse(item[1])
                }
                if (favData.data.type === "user")
                    userDataTmp.push(favData);
                else
                    repoDataTmp.push(favData);
            });
            setFavUserData(userDataTmp);
            setFavRepoData(repoDataTmp);
        }
    }

    const store = () => {
        storeUser("Brice Deguigne", "https://avatars2.githubusercontent.com/u/47141454?s=460&u=c5f9d2fbbe730d68b27a4d5c3397e9a73c04e99a&v=4", "user1");
        storeUser("login2", "https://cdn.iconscout.com/icon/free/png-512/avatar-369-456321.png", "user2");
        storeUser("login3", "https://www.pngarts.com/files/3/Avatar-PNG-Download-Image.png", "user3");
        storeUser("login4", "https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png", "user4");
        storeUser("login5", "https://image.flaticon.com/icons/png/512/147/147144.png", "user5");
        
        storeRepo("Repo1", true, true, "Description1", "1234", "master");
        storeRepo("Repo2", false, false, "Description2", "5678", "master");

        getAllData();
    }


    const clearList = () => {
        clearData();
        getAllData();
    }

    const printData = () => {
        console.log("PRINT DATA USER", favUserData);
        console.log("PRINT DATA REPO", favRepoData);
    }

    const changeNavBarStatus = (status) => {
        setNavBarStatus(status);
    }

    const renderItem = ({ item }) => {
        if (item.data.type === "user") {
            return (
                <UserCard
                    avatar={item.data.avatarURL}
                    login={item.data.login}
                    type={item.data.userType}
                    id={item.key}
                    getAllData={getAllData}
                />
            );
        }
        if (item.data.type === "repo") {
            return (
                <RepoCard 
                    name={item.data.name}
                    isPrivate={item.data.isPrivate}
                    isFork={item.data.isFork}
                    description={item.data.description}
                    size={item.data.size}
                    branch={item.data.branch}
                    id={item.key}
                    getAllData={getAllData}
                />
            )
        }
    }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity
                style={styles.button}
                onPress={store}>
                <Text>
                    Store User
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={printData}>
                <Text>
                    print data
                 </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={clearList}>
                <Text>
                    Clear list
                </Text>
            </TouchableOpacity> */}

            <View style={styles.navBarContainer}>
                {navBarStatus === "user" ? (
                    <TouchableOpacity style={styles.navBarButtonFocus}>
                        <Text style={styles.focusText}>Users</Text>
                    </TouchableOpacity>
                ) :
                    <TouchableOpacity
                        onPress={() => changeNavBarStatus("user")}
                        style={styles.navBarButtonUnFocus}>
                        <Text style={styles.unFocustext}>Users</Text>
                    </TouchableOpacity>
                }
                {navBarStatus === "repo" ? (
                    <TouchableOpacity style={styles.navBarButtonFocus}>
                        <Text style={styles.focusText}>Repositories</Text>
                    </TouchableOpacity>
                ) :
                    <TouchableOpacity
                        onPress={() => changeNavBarStatus("repo")}
                        style={styles.navBarButtonUnFocus}>
                        <Text style={styles.unFocustext}>Repositories</Text>
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.list}>
                {navBarStatus === "user" ? (
                    <FlatList
                        data={favUserData}
                        extraData={favUserData}
                        renderItem={renderItem}
                    />
                ) : (
                    <FlatList
                    data={favRepoData}
                    extraData={favRepoData}
                    renderItem={renderItem}
                />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
        flex: 1,
    },
    list: {
        marginBottom: 85
        // paddingLeft: 20,
        // paddingRight: 20
    },
    navBarContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 25,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: "#d6d6d6"
    },
    unFocustext: {
        color: "#000000",
        opacity: 0.6,
        textAlign: "center",
        marginBottom: 8,
        fontSize: 16
    },
    focusText: {
        textAlign: "center",
        marginBottom: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#037EE2"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginBottom: 5
    },
    navBarButtonFocus: {
        flex: 0.4,
        textAlign: "center",
        alignContent: "center",
        borderBottomWidth: 3,
        borderBottomColor: "#037EE2",
    },
    navBarButtonUnFocus: {
        flex: 0.4,
        textAlign: "center",
        alignContent: "center",
    }
});


export default Favorites;