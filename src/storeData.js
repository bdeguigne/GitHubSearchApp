import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from "uuid-random";

var callBackFunction = () => { };

const checkUserExist = async (value) => {
    const data = await getData();
    var check = false;
    data.forEach(element => {
        let userData = JSON.parse(element[1]);
        if (userData.avatarURL === value.avatarURL && userData.login === value.login && userData.userType === value.userType) {
            check = true;
        }
    })
    return check;
}

const checkRepoExist = async (value) => {
    const data = await getData();
    var check = false;
    data.forEach(element => {
        let repoData = JSON.parse(element[1]);
        if (repoData.name === value.name && repoData.isPrivate === value.isPrivate && repoData.isFork === value.isFork && repoData.description === value.description) {
            check = true;
        }
    })
    return check;
}


// STORE
const storeUser = async (login, avatarURL, type) => {
    const value = {
        login,
        avatarURL,
        userType: type,
        type: "user"
    }
    try {
        if (await checkUserExist(value) === false) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("favUser_" + uuid(), jsonValue);
            callBackFunction();
            console.log("Successfully store user : ", value);
        } else {
            console.log("User already exist");
            return false;
        }
    } catch (e) {
        console.log("Store User failed", e);
        return false;
    }
    return true;
}

const storeRepo = async (name, isPrivate, isFork, description, size, branch) => {
    const value = {
        name,
        isPrivate,
        isFork,
        description,
        size,
        branch,
        type: "repo"
    }
    try {
        if (await checkRepoExist(value) === false) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("favRepo_" + uuid(), jsonValue);
            callBackFunction();
            console.log("Successfully store repo : ", value);
        }
        else {
            console.log("Repository already exist");
            return false;
        }
    } catch (e) {
        console.log("Store Repo failed", e);
        return false;
    }
    return true;
}

const setCallbackFunction = (func) => {
    callBackFunction = func;
}

// GET
const getData = async () => {
    const keys = await getkeys();
    let values;

    try {
        values = await AsyncStorage.multiGet(keys);
        if (values == null) {
            return null;
        }
    } catch (e) {
        console.log("Get all fav user failed", e);
        return null;
    }
    return values;
}

const getkeys = async () => {
    let keys = [];
    try {
        keys = await AsyncStorage.getAllKeys();
    } catch (e) {
        console.log(e)
        return null;
    }
    return keys;
}

//Remove
const clearData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        return null;
    }
}

const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log("Cannot Remove Item", e);
        return null;
    }
    return true;
}

export {
    storeUser,
    storeRepo,
    getData,
    clearData,
    removeItem,
    setCallbackFunction
}