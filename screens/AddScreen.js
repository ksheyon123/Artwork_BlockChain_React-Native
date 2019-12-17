import React, { Component } from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {FontAwesome } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system';

export default class AddScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : [],
            selected: true,
            selected2: true
        }
    }

    state = {
        artName : '',
        artistName : '',
        imageUri: '',
        certification: '',
        ArtistDescription: '',
        ArtDescription : '',
        img_base64 : '',
        cer_base64 : ''
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [70,102],
        });

        if (!result.cancelled) {
            this.setState({ 
                imageUri: result.uri,
                selected: false 
            });
        }
        const base64 = await FileSystem.readAsStringAsync(this.state.imageUri, { encoding: 'base64' });
        splitBase64(this.state.img_base64);
        this.setState({img_base64 : base64})
    };

    _pickCertification = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [70,102],
        });

        if (!result.cancelled) {
            this.setState({ 
                certification: result.uri,
                selected2: false 
            });
        }
        const base64 = await FileSystem.readAsStringAsync(this.state.certification, { encoding: 'base64' });
        this.setState({cer_base64 : base64})
    };
    
    _onTextContentSizeChange = (event) => {
        this.setState({
        inputHeight: Math.min(event.nativeEvent.contentSize.height, 100)
         });
    }
    
    render() {
        return (
            <ScrollView style = {styles.container}>
                <View>
                    <Text style = {styles.greeting}>작품 등록 양식</Text>
                    <View style = {styles.form}>
                        <View style = {{marginTop : 24}}>
                            <Text style = {styles.inputTitle}>작품명</Text>
                            <TextInput
                                style = {styles.input} placeholder = "작품명을 입력하세요." autoCapitalize = "none" onChangeText={artName => this.setState({artName})} value={this.state.artName}
                            />
                        </View>
                    
                        <View style = {{marginTop : 24}}>
                            <Text style = {styles.inputTitle}>작가명</Text>
                            <TextInput
                                style = {styles.input} placeholder = "작가명을 입력하세요." autoCapitalize = "none" onChangeText={artistName => this.setState({artistName})} value={this.state.artistName}
                            />
                        </View>

                        <View style = {{marginTop : 24}}>
                            <Text style = {styles.inputTitle}>작가설명</Text>
                            <TextInput
                                style = {styles.inputDescription} placeholder = "작가에대한 설명을 입력하세요" autoCapitalize = "none" onChangeText={ArtistDescription => this.setState({ArtistDescription})} value={this.state.ArtistDescription}
                            />
                        </View>
                        
                        <View style = {{marginTop : 24}}>
                            <Text style = {styles.inputTitle}>작품설명</Text>
                            <TextInput
                                style = {styles.inputDescription} multiline={true} numberOfLines = {4} placeholder = "작품에대한 설명을 입력하세요" autoCapitalize = "none" onChangeText={ArtDescription => this.setState({ArtDescription})} value={this.state.ArtDescription}
                            />
                        </View>
                        
                        <View style = {{marginTop : 24}}>
                            <Text style = {styles.inputTitle}>작품 이미지</Text>
                            <View style= {{ flex:1, alignItems:'center'}}>
                                <TouchableOpacity onPress={this._pickImage}>
                                    <View style={{height: 400,  borderWidth: 0.5, width:330, justifyContent: 'center', alignItems: 'center',marginTop:32 }}>
                                    {
                                        this.state.selected
                                            ?(<View style={{alignItems:'center',justifyContent:'center'}}>
                                              <FontAwesome name="camera" size={80} color="gray"></FontAwesome>
                                                <Text>사진등록</Text></View>)
                                            :(<View><Image source={{uri:this.state.imageUri}} style={{height:200,width:150}}/></View>)
                                    }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style = {{marginTop : 24}}>
                            <Text style = {styles.inputTitle}>인증서 이미지</Text>
                            <View style= {{ flex:1, alignItems:'center'}}>
                                <TouchableOpacity onPress={this._pickCertification}>
                                    <View style={{height: 400,  borderWidth: 0.5, width:330, justifyContent: 'center', alignItems: 'center',marginTop:32 }}>
                                    {
                                        this.state.selected2
                                            ?(<View style={{alignItems:'center',justifyContent:'center'}}>
                                                <FontAwesome name="camera" size={80} color="gray"></FontAwesome>
                                                    <Text>인증서 등록</Text></View>)
                                              :(<View><Image source={{uri:this.state.certification}} style={{height:200,width:150}}/></View>)
                                    }
                                        </View>
                                  </TouchableOpacity>
                            </View>
                        </View>              
                    </View>

                    <TouchableOpacity style={styles.under_button} onPress={this.handleRegister}>
                        <Text style = {{color:"#FFF", fontWeight: "500"}}>작성 완료</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    splitBase64 = async (data) => {
        console.log(data.length);
    }

    handleRegister = async () => {
        try {
          let response = await fetch('http://localhost:3000/api/setitem', {
            method: 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({artistName: this.state.artistName, ItemImage: this.state.img_base64, ItemCertificate: this.state.cer_base64, ItemName: this.state.artName, ItemDetails: this.state.ArtDescription, ArtistIntro: this.state.ArtistDescription}),
          });
          if (response.ok) { 
            alert('등록 완료');
          } 
        } catch (err) {
          console.log(err);
        }
        
      }
}

const styles = StyleSheet.create({
    container : {
        flex :1
    },
    greeting: {
        marginTop : 32,
        fontSize : 18,
        fontWeight : "400",
        textAlign : "center"
    },
    form: {
        marginBottom : 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color : "#8A8F9E",
        fontSize : 12,
        textTransform : "uppercase"
    },
    input: {
        borderBottomColor : "#8A8F9E",
        borderBottomWidth : StyleSheet.hairlineWidth,
        height : 40,
        fontSize : 15,
        color : "#161F3D"
    },
    inputDescription: {
      borderBottomColor : "#8A8F9E",
      borderBottomWidth : StyleSheet.hairlineWidth,
      height : 120,
      fontSize : 15,
      color : "#161F3D",
      marginRight : 30
    },
    halfinput: {
        borderBottomColor : "#8A8F9E",
        borderBottomWidth : StyleSheet.hairlineWidth,
        width : '40%',
        height : 40,
        fontSize : 15,
        color : "#161F3D",
    },
    littleinput: {
        marginTop : 12,
        borderBottomColor : "#8A8F9E",
        borderBottomWidth : StyleSheet.hairlineWidth,
        width : '40%',
        height : 40,
        fontSize : 15,
        color : "#161F3D",
    },
    image:{
      flexDirection: 'row',
      alignItems : "stretch",
      marginTop : 24
      
    },
    input_image:{
        marginTop : 24,
        borderBottomColor : "#8A8F9E",
        borderBottomWidth : StyleSheet.hairlineWidth,
        height : 40,
        fontSize : 15,
        
        color : "#161F3D",
        flex :9
    },
    button : {
        marginTop : 24,
        marginHorizontal : 100,
        backgroundColor: "#0C00AF",
        borderRadius : 4,
        height : 52,
        alignItems : "flex-end",
        justifyContent : "center",
        marginLeft:8,
        marginRight:0,
        marginBottom : 0,
        flex:1
    },
    under_button:{
        marginHorizontal : 30,
        backgroundColor: "#0C00AF",
        borderRadius : 4,
        height : 52,
        alignItems : "center",
        justifyContent : "center",
        marginBottom : 32
    }
});