import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Image,Dimensions } from 'react-native';
import {SliderBox} from 'react-native-image-slider-box'

const images = [
    "https://user-images.githubusercontent.com/52062612/71161799-65b03000-228d-11ea-9fd0-2c26bb89b0f7.PNG"
]

export default class DetailScreen extends Component {

    constructor(props) {
        super(props);
        var data = props.navigation.state.params;
        this.state = {
            receivecode: data.itemcode,
            check_image : false
        }
    }

    componentDidMount() {
        this.getDetail();
        
    }

    render() {
        // this.getDetail();
        return (
            <ScrollView style={styles.container}>
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 10, marginRight: 5 }}>Code {this.state.receivecode}</Text>
                </View>
                <View style={styles.image_image}>
                    {/* <Image
                    style = {{    height : Math.round(Dimensions.get('window').width * 9 / 16),
                    width : Dimensions.get("window").width}}
                    source = {{uri : this.state.check_image? this.state.itemInfo[0] :  images[0]}}
                    /> */}
                    <SliderBox
                        images = {this.state.check_image ? this.state.itemInfo : images}
                        SliderBoxHeight = {Math.round(Dimensions.get('window').width * 9 / 16)}
                        parentWidth = {Dimensions.get("window").width}
                        dotColor="#7d00af"
                        inactiveDotColor="gray"
                        resizeMode = 'stretch'
                        
                        // dotStyle = {{height: 0}}
                        // circleLoop = {true}
                        paginationBoxStyle = {{
                            // marginHorizontal : 10
                            bottom : -30
                        }}
                    />
                </View>
                
                <View style={styles.image_text}>
                    <Text style={{ fontSize: 30 }}>{this.state.itemName}</Text>
                    <Text style={{ fontSize: 20, color: "#727278", marginTop: 10, marginBottom: 70 }}>{this.state.artistName}</Text>
                </View>
                <View style={styles.image_detail_whole}>
                    <View style={styles.image_detail_tag}>
                        <Text style={styles.textstyle_tag}>작가</Text>
                    </View>
                    <View style={styles.image_detail_text}>
                        <Text style={styles.textstyle_text} >{this.state.artistName}</Text>
                    </View>
                    <View style={styles.image_detail_tag}>
                        <Text style={styles.textstyle_tag}>작가 설명</Text>
                    </View>
                    <View style={styles.image_detail_text}>
                        <Text style={styles.textstyle_text}>
                            {this.state.artistIntro}
                        </Text>
                    </View>
                    <View style={styles.image_detail_tag}>
                        <Text style={styles.textstyle_tag}>작품</Text>
                    </View>
                    <View style={styles.image_detail_text}>
                        <Text style={styles.textstyle_text}>{this.state.itemName}</Text>
                    </View>
                    <View style={styles.image_detail_tag}>
                        <Text style={styles.textstyle_tag}>작품 설명</Text>
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
            let response = await fetch(`http://192.168.0.228:3000/api/item/:${this.state.receivecode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let json = await response.json();
            if (response.ok) {
                this.setState({
                    itemInfo: [json.itemImage, json.itemCertificate],
                    itemName: json.itemName,
                    itemDate: json.itemDate,
                    itemDescription: json.itemDescription,
                    artistName: json.artistName,
                    artistIntro: json.artistIntro,
                    check_image : true
                })
                console.log( this.state.itemInfo)
            }
        } catch (err) {

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_image: {
        flex: 1,
        marginTop: 5,
        // marginHorizontal : '5%'
    },
    image_text: {
        flex: 1,
        marginTop: 30,
        // marginLeft:30,
        // marginRight:30,
        alignItems: "center",
    },
    image_detail_whole: {

    },
    image_detail_tag: {
        marginVertical: 10,
        marginHorizontal: 30
    },
    image_detail_text: {
        marginBottom: 10,
        marginHorizontal: 30
    },
    image_detail_text_2: {
        marginBottom: 50,
        marginHorizontal: 30
    },
    textstyle_tag: {
        fontSize: 16
    },
    textstyle_text: {
        color: "#727278",
        marginHorizontal: 30,
        textAlign: 'justify'
    }
});