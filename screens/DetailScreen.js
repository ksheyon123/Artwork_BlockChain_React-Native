import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '../Components/Slider'

const images = [
  "https://user-images.githubusercontent.com/52039229/71051331-56e15480-218b-11ea-95e6-48c63d29bd9c.jpg",
  "https://user-images.githubusercontent.com/52039229/71058788-3ffb2c00-21a4-11ea-8171-bf9d8296b6f1.png",
];

export default class DetailScreen extends Component {

    constructor(props) {
        super(props);
        var data = props.navigation.state.params;
        // console.log('hi', data.itemcode);
        this.state = {
            receivecode : data.itemcode,
        }
    }

    componentDidMount() {
        this.getDetail();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.image_image}>
                    <Slider
                    images = {images}
                    />
                </View>
                <View style={styles.image_text}>
                    <Text>{this.state.receivecode}</Text>
        <Text style={{fontSize:30}}>{this.state.itemName}</Text>
                    <Text style={{fontSize:20 ,color: "#727278" ,marginTop:10, marginBottom:70}}>Vincent Willem van Gogh</Text>
                </View>
                <View style={styles.image_detail_whole}>
                    <View style={styles.image_detail_tag}>
                        <Text style = {styles.textstyle_tag}>작가</Text>
                    </View>
                    <View style={styles.image_detail_text}>
        <Text style={styles.textstyle_text} >{this.state.artistName}</Text>
                    </View>
                    <View style={styles.image_detail_tag}>
                        <Text style = {styles.textstyle_tag}>작가 설명</Text>
                    </View>
                    <View style={styles.image_detail_text}>
                        <Text style={styles.textstyle_text}>
                          {this.state.artistIntro}
                        </Text>
                    </View>
                    <View style={styles.image_detail_tag}>
                        <Text style = {styles.textstyle_tag}>작품</Text>
                    </View>
                    <View style={styles.image_detail_text}>
        <Text style={styles.textstyle_text}>{this.state.itemName}</Text>
                    </View>
                    <View style={styles.image_detail_tag}>
                        <Text style = {styles.textstyle_tag}>작품 설명</Text>
                    </View>
                    <View style={styles.image_detail_text_2}>
                        <Text style={styles.textstyle_text}>
                          {this.state.itemDescription}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }

    getDetail = async () => {
        try {
            let response = await fetch(`http://localhost:3000/api/item/:${this.state.receivecode}`, {
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
            });

            let json = await response.json();
            if (response.ok) {
                this.setState ({
                    itemInfo: [json.itemImage, json.itemCertificate],
                    itemName: json.itemName,
                    itemDate: json.itemDate,
                    itemDescription: json.itemDescription,
                    artistName: json.artistName,
                    artistIntro: json.artistIntro,
                })
                console.log('?', this.state.itemInfo)
            }
        } catch (err) {

        }
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    image_image: {
      flex: 1,
      marginTop:30,
      // marginHorizontal : '5%'
    },
    image_text: {
      flex:1,
      marginTop:30,
      // marginLeft:30,
      // marginRight:30,
      alignItems:"center",
    },
    image_detail_whole:{
      
    },
    image_detail_tag:{
      marginVertical:10,
      marginHorizontal:30
    },
    image_detail_text:{
      marginBottom:10,
      marginHorizontal:30
    },
    image_detail_text_2:{
      marginBottom:50,
      marginHorizontal:30
    },
    textstyle_tag : {
      fontSize : 16
    },
    textstyle_text:{
      color : "#727278",
      marginHorizontal:30,
      textAlign:'justify'
    }
});