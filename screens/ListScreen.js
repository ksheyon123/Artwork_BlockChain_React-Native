import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import Slider from '../Components/Slider'


// const images = [
//     "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
//     "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//     "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
// ];
export default class ListScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : [
                {image : "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", pic_name : "작품명1", artist_name : "작가명1"},
                {image : "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80", pic_name : "작품명2", artist_name : "작가명2"},
                {image : "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", pic_name : "작품명3", artist_name : "작가명3"},
                {image : "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80", pic_name : "작품명4", artist_name : "작가명4"},
                {image : "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", pic_name : "작품명5", artist_name : "작가명5"}
            ]
        }
    }

    renderItem = ({item}) => {
      return <TouchableOpacity
              onPress = {() => this.props.navigation.navigate("Detail")}
              >
                  <View style = {{flexDirection : 'row', marginVertical : 32}}>
                      <Image
                      style = {{width : 128, height : 128}}
                      source = {{uri : item.image}}
                      />
                      <View style = {{marginLeft : 16}}>
                          <Text>작품명 : {item.pic_name}</Text>
                          <Text>작가명 : {item.artist_name}</Text>
                      </View>
                  </View>
            </TouchableOpacity>
    }

    render() {
        return (
            <ScrollView>
                <View style = {styles.form}>
                    <FlatList
                        data = {this.state.data}
                        renderItem = {this.renderItem}
                    />
                </View>
            </ScrollView>
            );
        }
    }

const styles = StyleSheet.create({
  container: {
      flex:1
  },
  form : {
    marginBottom : 48,
    marginHorizontal: 30
  }
});