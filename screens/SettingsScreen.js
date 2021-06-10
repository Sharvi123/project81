import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SettingsScreen extends Component{
    constructor(){
        super();
        this.state={
            firstName:"",
            lastName:"",
            contact:"",
            address:"",
            emailId:"",
            documentId:"",
        }
    }
    getUserDetails(){
        var user=firebase.auth().currentUser
        var userEmail=user.email
        db.collection("users").where('email','==',userEmail).get()
        .then(snapShot=>{
            snapShot.forEach(doc => {
                var data=doc.data()
                this.setState({
                    emailId:data.email,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    contact:data.mobile_number,
                    address:data.address,
                    documentId:doc.Id
                })
            });
        })
    }
    updateUserDetails(){
        db.collection('users').doc(this.state.documentId).update({
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "mobile_number": this.state.contact,
            "address":this.state.address,
        })
    }
    componentDidMount(){
        this.getUserDetails()
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader 
                title="Settings" 
                navigation={this.props.navigation}/>
                <View style={styles.formContainer}>
                    <TextInput
                    style={styles.formInput}
                    placeholder={"First Name"}
                    maxLength={20}
                    onChangeText={(text)=>{this.setState({firstName:text})}} 
                    value={this.state.firstName}/>
                      <TextInput
                    style={styles.formInput}
                    placeholder={"Last Name"}
                    maxLength={40}
                    onChangeText={(text)=>{this.setState({lastName:text})}} 
                    value={this.state.lastName}/>
                      <TextInput
                    style={styles.formInput}
                    placeholder={"Contact"}
                    maxLength={10}
                    keyboardType={'numeric'}
                    onChangeText={(text)=>{this.setState({contact:text})}} 
                    value={this.state.contact}/>
                      <TextInput
                    style={styles.formInput}
                    placeholder="Address"
                    multiline={true}
                    onChangeText={(text)=>{this.setState({address:text})}} 
                    value={this.state.address}/>
                    <TouchableOpacity 
                    style={styles.buttonText}
                    onPress={()=>{this.updateUserDetails}}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    formContainer:{
        flex:1,
        width:'100%',
        alignItems: 'center'
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#70bacf',
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
        backgroundColor:"#e8cfcf",
        marginTop:20
      },
      buttonText:{
        fontSize:25,
        fontWeight:"bold",
        color:"#000000"
      }
    })
