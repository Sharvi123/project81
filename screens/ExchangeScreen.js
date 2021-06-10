import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      itemName:"",
      reasonToRequest:""
    }
  }



  addRequest =(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    db.collection('requested_items').add({
        "user_id": userId,
        "item_name":itemName,
        "reason_to_request":reasonToRequest,
    })

    this.setState({
        itemName :'',
        reasonToRequest : ''
    })

    return Alert.alert("Item Requested Successfully")
  }


  render(){
    return(
        <View style={{flex:1}}>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter item name"}
                onChangeText={(text)=>{
                    this.setState({
                        itemName:text
                    })
                }}
                value={this.state.itemName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                placeholder={"Why do you want the item"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.itemName,this.state.reasonToRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'black',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#f7faa0",
    marginTop:20
    },
  }
)