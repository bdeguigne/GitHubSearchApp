import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from "uuid-random";

var callBackFunction = () => {};

// STORE
const storeUser = async (login, avatarURL, type) => {
    const value = {
        login,
        avatarURL,
        userType: type,
        type: "user"
    }
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("favUser_" + uuid(), jsonValue);
        callBackFunction();
        console.log("Successfully store user : ", value);
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
       type:"repo"
    }
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("favRepo_" + uuid(), jsonValue);
        callBackFunction();
        console.log("Successfully store repo : ", value);
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
    } catch(e) {
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