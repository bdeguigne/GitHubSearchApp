import React from 'react';
import { Router, Stack, Scene } from "react-native-router-flux";
import { StyleSheet } from 'react-native';
import Favorites from "./src/Favorites";
import Repositories from "./src/Repositories";
import Users from "./src/Users";
import { RepositoriesTab, UsersTab, FavTab } from "./src/NavigationStyle";

export default function App() {
  return (
    <Router>
      <Stack key="root">
        <Scene key='Tabbar' showLabel={false} tabs={true} tabBarStyle={styles.tabBar} hideNavBar={true} default='Main'>
          <Scene key="repositories" initial={true} component={Repositories} hideNavBar={true} icon={RepositoriesTab} title="Repositories" />
          <Scene key="users" component={Users} hideNavBar={true} icon={UsersTab} title="Users" />
          <Scene key="favorites" component={Favorites} hideNavBar={true} icon={FavTab} title="Favorites" />
        </Scene>
      </Stack>
    </Router>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    opacity: 0.98,
    justifyContent: 'space-between',
    shadowColor: "#000",
  }
});