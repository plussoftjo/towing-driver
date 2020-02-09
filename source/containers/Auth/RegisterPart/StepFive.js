import React from 'react';
import {View,Image,TouchableOpacity,ScrollView,Platform} from 'react-native';
import {Text, Button,Icon,Content} from'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Colors,Images} from '../../../commons';
import * as Animatable from 'react-native-animatable';
import {inject,observer} from 'mobx-react';
import axios from 'axios';

@inject('auth')
@inject('settings')
@observer
export default class StepFive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          image:Images.avatar,
          vaild:true,
          driver_id:[],
          selected_image:null,
          car_license:[],
          driver_license:[],
        }
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
      _pickImage = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64:true
        });
        
        if (!result.cancelled) {
          if(type == 'image') {
            this.setState({ image: result });
            axios.post(this.props.settings.serverUri + 'api/driver/auth/upload/avatar',{image:result.base64,user_id:this.props.auth.user.id}).then(response => {
              this.props.auth.user.avatar = response.data.image;
            }).catch(err => {
              console.log(err.response)
            });
          }
          if(type=='driver_id') {
            let images = this.state.driver_id;
            images.push(result);
            this.setState({driver_id:images});
            axios.post(this.props.settings.serverUri + 'api/driver/auth/upload/image',{image:result.base64,type:'driver_id',user_id:this.props.auth.user.id}).then(response => {

            }).catch(err => {
              console.log(err.response)
            });
          }
          if(type=='car_license') {
            let images = this.state.car_license;
            images.push(result);
            this.setState({car_license:images});
            axios.post(this.props.settings.serverUri + 'api/driver/auth/upload/image',{image:result.base64,type:'car_license',user_id:this.props.auth.user.id}).then(response => {

            }).catch(err => {
              console.log(err)
            });
          }
          if(type=='driver_license') {
            let images = this.state.driver_license;
            images.push(result);
            this.setState({driver_license:images});
            axios.post(this.props.settings.serverUri + 'api/driver/auth/upload/image',{image:result.base64,type:'driver_license',user_id:this.props.auth.user.id}).then(response => {

            }).catch(err => {
              console.log(err.response)
            });
          }
        }
      }
    render() {
      return (
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1,paddingTop:'30%' }}>
          <View style={{position:'absolute',left:0,top:50,paddingHorizontal:10}}>
              <Icon onPress={() => {
                  this.props.onBack();
              }} type="AntDesign" name="leftcircleo" style={{color:'white',fontSize:38}}></Icon>
          </View>
          <ScrollView contentContainerStyle={{justifyContent:'center'}}>
                <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>Driver information</Text>
                <TouchableOpacity onPress={() => {this._pickImage('image');}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',position:'relative'}}>
                    <Image source={this.state.image} style={{width:90,height:90,borderRadius:90 /2}} />
                    <View style={{position:'absolute',left:0,top:0,justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%'}}>
                      <View style={{width:90,height:90,borderRadius:90/2,backgroundColor:'rgba(0,0,0,0.3)',flexDirection:'column',justifyContent:'flex-end',paddingBottom:3}}>
                          <Text style={{color:'white',textAlign:'center',fontSize:12}}>Change</Text>
                      </View>
                    </View>
                </TouchableOpacity>
                <View style={{height:30}}></View>
                <View style={{paddingHorizontal:50}}>
                  <Button danger onPress={() => {
                    this._pickImage('driver_id');
                  }}><Text style={{fontWeight:'500'}} >Add Driver ID</Text></Button>
                  <ScrollView style={{paddingVertical:20,paddingTop:2}} horizontal={true}>
                    {this.state.driver_id.map((trg,index) => 
                    <TouchableOpacity key={index} onPress={() => {
                      this.setState({selected_image:{image:trg,type:'driver_id',index:index}})
                    }}>
                     <Animatable.Image animation="bounceInLeft" style={{width:50,height:50,borderRadius:3,borderColor:'white',borderWidth:1,marginRight:5}} source={trg}></Animatable.Image>
                    </TouchableOpacity>
                    )}
                  </ScrollView>
                  </View>
                  <View style={{paddingHorizontal:50}}>
                  <Button danger onPress={() => {
                    this._pickImage('driver_license');
                  }}><Text>Add a driver license</Text></Button>
                 <ScrollView style={{paddingVertical:20,paddingTop:2}} horizontal={true}>
                    {this.state.driver_license.map((trg,index) => 
                    <TouchableOpacity key={index} onPress={() => {
                      this.setState({selected_image:{image:trg,type:'driver_license',index:index}})
                    }}>
                     <Animatable.Image animation="bounceInLeft" style={{width:50,height:50,borderRadius:3,borderColor:'white',borderWidth:1,marginRight:5}} source={trg}></Animatable.Image>
                    </TouchableOpacity>
                    )}
                  </ScrollView>
                  </View>
                  <View style={{paddingHorizontal:50}}>
                  <Button danger onPress={() => {
                    this._pickImage('car_license');
                  }}><Text>Add a car license</Text></Button>
                 <ScrollView style={{paddingVertical:20,paddingTop:2}} horizontal={true}>
                    {this.state.car_license.map((trg,index) => 
                    <TouchableOpacity key={index} onPress={() => {
                      this.setState({selected_image:{image:trg,type:'car_license',index:index}})
                    }}>
                     <Animatable.Image animation="bounceInLeft" style={{width:50,height:50,borderRadius:3,borderColor:'white',borderWidth:1,marginRight:5}} source={trg}></Animatable.Image>
                    </TouchableOpacity>
                    )}
                  </ScrollView>
                </View>
                {!this.state.vaild &&
                  <Text style={{color:'red',fontWeight:'500',marginBottom:10}}>There are problem in register please try again later</Text>
                  }
                <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:15}}>
                  <Button success onPress={async() => {
                      this.props.pressed();
                      }} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                      <Text style={{color:'white',fontWeight:'700'}}>Done</Text>
                      <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                  </Button>
                </View>
                <View style={{height:50}}></View>



                {/* View Image Model */}
                {this.state.selected_image && 
                <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                  <View style={{position:'absolute',left:'10%',top:'15%',justifyContent:'center',alignItems:'center'}}>
                    <Icon onPress={() =>{
                      this.setState({selected_image:null})
                    }} type="AntDesign" name="closecircle" style={{color:'white',fontSize:48}} />
                  </View>
                  <View style={{backgroundColor:'white'}}>
                    <Image style={{width:300,height:300}} source={{uri:this.state.selected_image.image}} resizeMode={'cover'}></Image>
                    <View style={{position:'absolute',right:5,top:5}}>
                      <Icon onPress={() => {
                        if(this.state.selected_image.type == 'driver_id') {
                          let images = this.state.driver_id;
                          images.splice(this.state.selected_image.index,1);
                          this.setState({driver_id:images});
                        }
                        if(this.state.selected_image.type == 'car_license') {
                          let images = this.state.car_license;
                          images.splice(this.state.selected_image.index,1);
                          this.setState({car_license:images});
                        }
                        if(this.state.selected_image.type == 'driver_license') {
                          let images = this.state.driver_license;
                          images.splice(this.state.selected_image.index,1);
                          this.setState({driver_license:images});driver_license
                        }
                        this.setState({selected_image:null});
                      }} type="SimpleLineIcons" name="ban" style={{color:'red'}} />
                    </View>
                  </View>
                </View>
                }
                </ScrollView>
            </Content>
        )
    }
}