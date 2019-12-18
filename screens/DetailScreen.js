import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '../Components/Slider'

const images = [
  "https://user-images.githubusercontent.com/52039229/71051331-56e15480-218b-11ea-95e6-48c63d29bd9c.jpg",
  "https://user-images.githubusercontent.com/52039229/71058788-3ffb2c00-21a4-11ea-8171-bf9d8296b6f1.png",
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
        this.setState({receivecode : itemcode})
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
                    <Text style={{fontSize:30}}>별이 빛나는 밤</Text>
                    <Text style={{fontSize:20 ,color: "#727278" ,marginTop:10, marginBottom:70}}>Vincent Willem van Gogh</Text>
                </View>
                <View style={styles.image_detail_whole}>
                    <View style={styles.image_detail_tag}>
                        <Text style = {styles.textstyle_tag}>작가</Text>
                    </View>
                    <View style={styles.image_detail_text}>
                        <Text style={styles.textstyle_text} >Vincent Willem van Gogh</Text>
                    </View>
                    <View style={styles.image_detail_tag}>
                        <Text style = {styles.textstyle_tag}>작가 설명</Text>
                    </View>
                    <View style={styles.image_detail_text}>
                        <Text style={styles.textstyle_text}>
                          빈센트 빌럼 반 고흐는 네덜란드 화가로 일반적으로 서양 미술사상 가장 위대한 화가 중 한 사람으로 여겨진다. 그는 그의 작품 전부를 정신질환을 앓고 자살을 감행하기 전인 약 10년 동안에 만들어냈다.
                        </Text>
                    </View>
                    <View style={styles.image_detail_tag}>
                        <Text style = {styles.textstyle_tag}>작품</Text>
                    </View>
                    <View style={styles.image_detail_text}>
                        <Text style={styles.textstyle_text}>별이 빛나는 밤</Text>
                    </View>
                    <View style={styles.image_detail_tag}>
                        <Text style = {styles.textstyle_tag}>작품 설명</Text>
                    </View>
                    <View style={styles.image_detail_text_2}>
                        <Text style={styles.textstyle_text}>
                          밤하늘에 별이 떠 있는 모습으로, 이 작품에 쓰인 특유의 화법은 이후 지금도 다른 화가들에 의하여 많이 사용되고 있다. 반 고흐의 아를 체류시기 밤의 풍경은 '론 강 위로 별이 빛나는 밤'에서도 알 수 있듯이 별에 대한 탐구가 두드러진다. 그가 밤의 풍경을 묘사했을 때 자주 사용했던 코발트 블루가 이 작품에서도 주된 색조를 차지하고 있다.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail = async () => {
        try {
            let response = await fetch('http://localhost:3000/api/item/:itemCode', {
                
            })
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