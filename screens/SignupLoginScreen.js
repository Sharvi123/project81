import * as React from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView, Modal} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignupLoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
          emailId : '',
          password: '',
          firstName:'',
          lastName:'',
          address:'',
          contact:'',
          confirmPassword:'',
          isModalVisible:'false'
        }
      }
    
      userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
          return Alert.alert("Successfully Loged In")
          this.props.navigation.navigate('HomeScreen')
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }
    
      userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }
      showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confrim Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
      }
    
      render(){
        return(
          <View style={styles.container}>
              <KeyboardAvoidingView>
              <View>
              <Text style={styles.title}>Barter App</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TextInput
              style={styles.loginBox}
              placeholder="example@barter.com"
              keyboardType ='email-address'
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
            />
    
            <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              placeholder="password"
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
              <TouchableOpacity
                style={[styles.button,{ marginTop:20, marginBottom:20}]}
                onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
                >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.setState({ isModalVisible:true})}
                >
                <Text style={styles.buttonText}>SignUp</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </View>
        )
      }
    }
    
    
    const styles = StyleSheet.create({
      container:{
        flex:1,
        backgroundColor:'#b4edeb'
      },
      title :{
        fontSize:40,
        fontWeight:'500',
        margin:50,
        color : '#8b0eeb'
      },
      loginBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 2,
        borderColor : '#000000',
        fontSize: 20,
        margin:15,
        paddingLeft:10
      },
      button:{
        width:130,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#1b0f4d",
      },
      buttonText:{
        fontWeight:'300',
        fontSize:20,
        color:'white'
      },
      buttonContainer:{
        flex:1,
        alignItems:'center',
        margin:60,
      },
      KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
     
    })
    