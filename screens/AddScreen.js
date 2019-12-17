import React, { Component } from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

export default class AddScreen extends Component {

  constructor(props){
    super(props);
    this.state = { data : [] }
  }

  state = {
      artName : '',
      ArtistCode : '',
      imageUri: '',
      certification: '',
      ArtistDescription: '',
      ArtDescription : '',
      key : ''
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
                    style = {styles.input} placeholder = "작가명을 입력하세요." autoCapitalize = "none" onChangeText={artistName => this.setState({ArtistCode})} value={this.state.artistName}
                  />
                </View>
                <View style ={styles.image}>
                  <Text style = {styles.inputTitle}>이미지</Text>
                  <TextInput
                    style = {styles.input_image} placeholder = "이미지를 첨부하세요." autoCapitalize = "none" onChangeText={image => this.setState({image})} value={this.state.image}
                  />
                  <TouchableOpacity style={styles.button} onPress = {() => {
                    this.props.navigation.navigate("Register")
                }} >
                    <Text style = {{color:"#FFF", fontWeight: "500"}}>파일첨부</Text>
                </TouchableOpacity>
                </View>
                <View style ={styles.image}>
                  <Text style = {styles.inputTitle}>인증서</Text>
                  <TextInput
                    style = {styles.input_image} placeholder = "인증서를 첨부하세요." autoCapitalize = "none" onChangeText={image => this.setState({image})} value={this.state.image}
                  />
                  <TouchableOpacity style={styles.button} onPress = {() => {
                    this.props.navigation.navigate("Register")
                }} >
                    <Text style = {{color:"#FFF", fontWeight: "500"}}>파일첨부</Text>
                </TouchableOpacity>
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
                    style = {styles.inputDescription} placeholder = "작품에대한 설명을 입력하세요" autoCapitalize = "none" onChangeText={ArtDescription => this.setState({ArtDescription})} value={this.state.ArtDescription}
                  />
                </View>
            </View>
            <TouchableOpacity style={styles.under_button} onPress={this.handleRegister}>
                            <Text style = {{color:"#FFF", fontWeight: "500"}}>작성 완료</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }a
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
    color : "#161F3D"
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
})