import React from 'react';
import {View,Text,TouchableOpacity,Image,ScrollView} from 'react-native';
import {Container,Content,Header,Left, Body, Right, Button, Icon, Title,Form,H3,Item, Input,Label,Picker} from 'native-base';
import {Colors,Countrys} from '../../../commons';
import {inject,observer} from 'mobx-react';
import {toJS} from 'mobx';
import Camera from './Camera'
import axios from 'axios';
@inject('auth')
@inject('settings')
@observer
export default class CompanyInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open_camera:false,
            image_type:'',
            selected_image:null,
            truck_images:[],
            plate_number:[],
            truck_reg:[],
            truck_insu:[],
            error:false

        };
    }

    upload_image(image,type,cam_type) {
        /** TODO:
         *  Make function for upload image and return the url
         */
        let img = 'data:image/jpg;base64,' + image.base64;
        axios.post(this.props.settings.serverUri + 'api/helper/image/store',{image:img,cam_type:cam_type}).then(response => {
            let image_url = response.data.image;
            if(type == 'truck_image') {
                this.props.auth.user_images.truckImage.push(image_url);
            }
            if(type == 'plate_number') {
                this.props.auth.user_images.plateNumber.push(image_url);
            }
            if(type == 'truck_reg') {
                this.props.auth.user_images.regImage.push(image_url);
            }
            if(type == 'truck_insu') {
                this.props.auth.user_images.insImage.push(image_url);
            }
        }).catch(err => {console.log(err.response);});

        
    }
    render() {
        if(this.state.open_camera) {
            return (
                <Camera close={() => {this.setState({open_camera:false})}} onSelectImage={(image,cam_type) => {
                    if(this.state.image_type == 'truck_images') {
                        let images = this.state.truck_images;
                        images.push(image);
                        this.upload_image(image,'truck_image',cam_type);
                    }
                    if(this.state.image_type == 'plate_number') {
                        let images = this.state.plate_number;
                        images.push(image);
                        this.upload_image(image,'plate_number',cam_type);
                    }
                    if(this.state.image_type == 'truck_reg') {
                        let images = this.state.truck_reg;
                        images.push(image);
                        this.upload_image(image,'truck_reg',cam_type);
                    }
                    if(this.state.image_type == 'truck_insu') {
                        let images = this.state.truck_insu;
                        images.push(image);
                        this.upload_image(image,'truck_insu',cam_type);
                    }
                }}></Camera>
            )
        }else {
            return (
                <Container>
                    <Header>
                        <Left>
                            <Button danger transparent onPress={() => {this.props.navigation.goBack()}}>
                            <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title></Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content padder>
                        <H3 style={{marginVertical:30,marginHorizontal:10}}>Truck Images</H3>
                        <Form>
                        <View style={{flexDirection:'row',marginVertical:10}}>
                            <Button success style={{flexGrow:1,justifyContent:'center'}} onPress={() => {
                                this.setState({open_camera:true,image_type:'truck_images'});
                            }}><Text style={{color:'white',fontFamily:'Roboto',textAlign:'center'}}>4 Images for truck</Text></Button>
                        </View>
                        <ScrollView style={{paddingVertical:20,paddingTop:2}} horizontal={true}>
                            {this.state.truck_images.map((trg,index) => 
                            <TouchableOpacity key={index} onPress={() => {
                                this.setState({selected_image:{image:trg,type:'truck_images',index:index}})
                              }}>
                                    <Image key={index} source={trg} style={{width:50,height:50,borderRadius:3,borderColor:'white',borderWidth:1,marginRight:5}} resizeMode='contain' ></Image>
                            </TouchableOpacity>
                            )}
                        </ScrollView>
                        <View style={{flexDirection:'row',marginVertical:10}}>
                            <Button success style={{flexGrow:1,justifyContent:'center'}} onPress={() => {
                                this.setState({open_camera:true,image_type:'plate_number'});
                            }}><Text style={{color:'white',fontFamily:'Roboto',textAlign:'center'}}>Plate number image</Text></Button>
                        </View>
                        <ScrollView style={{paddingVertical:20,paddingTop:2}} horizontal={true}>
                            {this.state.plate_number.map((trg,index) => 
                            <TouchableOpacity key={index} onPress={() => {
                                this.setState({selected_image:{image:trg,type:'plate_number',index:index}})
                              }}>
                                    <Image key={index} source={trg} style={{width:50,height:50,borderRadius:3,borderColor:'white',borderWidth:1,marginRight:5}} resizeMode='contain' ></Image>
                            </TouchableOpacity>
                            )}
                        </ScrollView>
                        <View style={{flexDirection:'row',marginVertical:10}}>
                            <Button success style={{flexGrow:1,justifyContent:'center'}} onPress={() => {
                                this.setState({open_camera:true,image_type:'truck_reg'});
                            }}><Text style={{color:'white',fontFamily:'Roboto',textAlign:'center'}}>Truck registration image </Text></Button>
                        </View>
                        <ScrollView style={{paddingVertical:20,paddingTop:2}} horizontal={true}>
                            {this.state.truck_reg.map((trg,index) => 
                            <TouchableOpacity key={index} onPress={() => {
                                this.setState({selected_image:{image:trg,type:'truck_reg',index:index}})
                              }}>
                                    <Image key={index} source={trg} style={{width:50,height:50,borderRadius:3,borderColor:'white',borderWidth:1,marginRight:5}} resizeMode='contain' ></Image>
                            </TouchableOpacity>
                            )}
                        </ScrollView>
                        <View style={{flexDirection:'row',marginVertical:10}}>
                            <Button success style={{flexGrow:1,justifyContent:'center'}} onPress={() => {
                                this.setState({open_camera:true,image_type:'truck_insu'});
                            }}><Text style={{color:'white',fontFamily:'Roboto',textAlign:'center'}}>Truck insurance image</Text></Button>
                        </View>
                        <ScrollView style={{paddingVertical:20,paddingTop:2}} horizontal={true}>
                            {this.state.truck_insu.map((trg,index) => 
                            <TouchableOpacity key={index} onPress={() => {
                                this.setState({selected_image:{image:trg,type:'truck_insu',index:index}})
                              }}>
                                    <Image key={index} source={trg} style={{width:50,height:50,borderRadius:3,borderColor:'white',borderWidth:1,marginRight:5}} resizeMode='contain' ></Image>
                            </TouchableOpacity>
                            )}
                        </ScrollView>
                        </Form>
                        <View style={{margin:10}}>
                            {this.state.error && 
                                <Text style={{color:'red',fontWeight:'700',fontSize:14,fontFamily:'Roboto_medium'}}>
                                    There are problem in register please try again later.
                                </Text>
                            }
                        </View>
                            <Button dark block onPress={async() => {
                                let register = await this.props.auth.register(this.props.navigation);
                                if(register) {
                                    this.props.navigation.navigate('RegisterComplate');
                                }else {
                                    this.setState({error:true});
                                }
                            }}><Text style={{color:'white',fontFamily:'Roboto_medium'}}>Register</Text></Button>
                    </Content>

                     {/* View Image Model */}
                    {this.state.selected_image && 
                    <View style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <View style={{position:'absolute',left:'10%',top:'15%',justifyContent:'center',alignItems:'center'}}>
                            <Icon onPress={() =>{
                            this.setState({selected_image:null})
                            }} type="AntDesign" name="closecircle" style={{color:'white',fontSize:48}} />
                        </View>
                        <View style={{backgroundColor:'white'}}>
                            <Image style={{width:300,height:300}} source={this.state.selected_image.image} resizeMode={'cover'}></Image>
                            <View style={{position:'absolute',right:5,top:5}}>
                            <Icon onPress={() => {
                                if(this.state.selected_image.type == 'truck_images') {
                                    let images = this.state.truck_images;
                                    images.splice(this.state.selected_image.index,1);
                                    this.setState({truck_images:images});
                                }
                                if(this.state.selected_image.type == 'plate_number') {
                                    let images = this.state.plate_number;
                                    images.splice(this.state.selected_image.index,1);
                                    this.setState({plate_number:images});
                                }
                                if(this.state.selected_image.type == 'truck_reg') {
                                    let images = this.state.truck_reg;
                                    images.splice(this.state.selected_image.index,1);
                                    this.setState({truck_reg:images});
                                }
                                if(this.state.selected_image.type == 'truck_insu') {
                                    let images = this.state.truck_insu;
                                    images.splice(this.state.selected_image.index,1);
                                    this.setState({truck_insu:images});
                                }
                                this.setState({selected_image:null});
                            }} type="SimpleLineIcons" name="ban" style={{color:'red'}} />
                            </View>
                        </View>
                    </View>
                    }
                </Container>
            )
        }
    }
}