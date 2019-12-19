import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';



// const images = [
//     "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
//     "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//     "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
// ];
export default class ListScreen extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     data,
        // }
        this.state = {
            data: [
                { itemcode: 1, item_infor: { image: "https://user-images.githubusercontent.com/52039229/71051331-56e15480-218b-11ea-95e6-48c63d29bd9c.jpg", pic_name: "별이 빛나는 밤", artist_name: "Vincent Willem van Gogh" } },
                { itemcode: 2, item_infor: { image: "https://user-images.githubusercontent.com/52039229/71051446-ae7fc000-218b-11ea-8d9c-34c27df25d4d.jpg", pic_name: "진주귀걸이를 한 소녀", artist_name: "Johannes Jan Vermeer" } },
                { itemcode: 3, item_infor: { image: "https://user-images.githubusercontent.com/52039229/71053438-bcd0da80-2191-11ea-81c1-a3b880b29253.jpg", pic_name: "키스", artist_name: "Gustav Klimt" } },
                { itemcode: 4, item_infor: { image: "https://user-images.githubusercontent.com/52039229/71053673-8d6e9d80-2192-11ea-96e8-31d10ad33de3.PNG", pic_name: "게르니카", artist_name: "Pablo Ruiz y Picasso" } },
                { itemcode: 5, item_infor: { image: "https://user-images.githubusercontent.com/52039229/71053728-bf7fff80-2192-11ea-8255-629477d0fce1.PNG", pic_name: "절규", artist_name: "Edvard Munch" } }
            ]
        }
    }

    renderItem = ({ item }) => {
        return <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Detail", { itemcode: item.itemcode })}
        >
            <View style={styles.renderItem}>
                <Image
                    style={styles.renderItem_image}
                    source={{ uri: item.item_infor.image }}
                />
                <View style={styles.renderItem_name}>
                    <Text style={styles.renderItem_name_art}>{item.item_infor.pic_name}</Text>
                    <Text style={styles.renderItem_name_artist}>{item.item_infor.artist_name}</Text>

                </View>
            </View>
        </TouchableOpacity>
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.topImage}>
                        <Image  style={{ width: '100%', height: 300}} source={{uri : "https://user-images.githubusercontent.com/52039229/71054338-02db6d80-2195-11ea-832e-f4c48b6f9b08.PNG"}}/>
                    </View>
                    <View style={styles.form}>
                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

    componentDidMount() {
        this.getListData();
    }

    getListData = async () => {
        try {
            let response = await fetch('http://localhost:3000/api/item', {
                method: 'GET',
                headers: {
                    'Content-type':'application/json',
                }
            });
            let json = await response.json();
            if (response.ok) {
                let responseData = [];
                for (var i = 0; i < json.length; i++ ) {
                    var jsonMaker = new Object();

                    jsonMaker.itemcode = json[i].itemCode;

                    var item = {image : json[i].item.itemImage, pic_name: json[i].item.itemName, artist_name : json[i].item.artistName};

                    jsonMaker.item_infor = item;

                    responseData.push(jsonMaker);
                }
                this.setState({data: responseData})
            }
        } catch (err) {

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topImage:{
        flex:1,
        // backgroundColor: 'red'
    },
    form: {
        flex:1,
    },
    renderItem: {
        alignItems : 'center',
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e6"
    },
    renderItem_image:{
        width: 300, 
        height: 300,
        borderRadius:500,
        marginTop:50
        // alignItems : 'center'
    },
    renderItem_name :{
        marginTop : 20,
        alignItems : 'center',
    },
    renderItem_name_art:{
        fontSize:20,
        color:'#727278'
    },
    renderItem_name_artist:{
        marginTop : 10,
        marginBottom:20,
        color:'#b0b0b5'
    }
});

