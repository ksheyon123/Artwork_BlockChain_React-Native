import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons'

import ListScreen from "./screens/ListScreen"
import AddScreen from "./screens/AddScreen"
import DetailScreen from "./screens/DetailScreen"

console.disableYellowBox = true

const ListStack = createStackNavigator({
    List : {
        screen : ListScreen,
        navigationOptions : {
            headerLeft : <Text style = {{marginLeft : 20}}></Text>,
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>Art List</Text></View>,
            headerRight :  <Text style = {{marginLeft : 20}}></Text>,
        }
    },
    Detail : {
        screen : DetailScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>신청하기</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    }
})

const AddStack = createStackNavigator({
    Add : {
        screen : AddScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>작품 등록</Text></View>,
        }
    }
})

const AppTabNavigator = createBottomTabNavigator(
    {
        List : {
            screen : ListStack,
            navigationOptions : {
                tabBarIcon: ({tintColor}) => <Ionicons name = "ios-albums" size={24} color = {tintColor} ></Ionicons>
            }
        },
        Add : {
            screen : AddStack,
            navigationOptions : {
                tabBarIcon: ({tintColor}) => <Ionicons name = "ios-add-circle" size={24} color = {tintColor} />
            }
        },
    },
    {
        tabBarOptions : {
            activeTintColor : "#0C00AF",
            inactiveTintColor : "#8888C4",
            showLabel : false
        }
    }
)

export default createAppContainer(AppTabNavigator)