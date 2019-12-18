import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Slider from '../Components/Slider'

const images = [
  "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
];

export default class DetailScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
          receivecode : null
        }
    }
    componentDidMount() {
        const {navigation} = this.props
        itemcode = navigation.getParam('itemcode')
        console.log(itemcode)
        this.setState({receivecode : itemcode})
        this.getDetail();
    }

    render() {
        return (
            <View style={styles.container}>
              <Slider
              images = {images}
              />
                <Text>{this.state.receivecode}</Text>
                <Text>작가명 :</Text>
                <Text>작품명 :</Text>
                <Text>제작년도 :</Text>
                <Text>작품설명 :</Text>
            </View>
        )
    }

    getDetail = async () => {
        try {
            let response = await fetch('http://localhost:3000/api/item/:itemCode', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({itemCode: this.state.receivecode}),
            })
            let json = await response.json();
            if (response.ok) {
                console.log(json);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});