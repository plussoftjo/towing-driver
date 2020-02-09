import React from 'react';
import {View,TouchableOpacity,Image} from 'react-native';
import {Text,Icon,Button,Header,Left,Body,Right,Content,Textarea} from 'native-base';
import {  AirbnbRating } from 'react-native-ratings';
import {Images} from '../../../commons'
import {inject,observer} from 'mobx-react';

@inject('manger')
@inject('processor')
@observer
export default class StateThree extends React.Component {
    render() {
        return (
            <View style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',backgroundColor:'white'}}>
                <Header>
                    <Left>
                        {/* <Icon name="close" /> */}
                    </Left>
                </Header>
                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <View style={{backgroundColor:'white',padding:0,borderTopRightRadius:50,borderTopLeftRadius:50,width:'90%'}}>
                        <View style={{padding:10}}>
                            <Text style={{fontWeight:'700',fontSize:20,textAlign:'center'}}>The Trip End</Text>
                        </View>
                        <View style={{padding:10,paddingBottom:0}}>
                        <Text style={{color:'green',fontWeight:'900',fontSize:32,textAlign:'center'}}>${this.props.processor.service.price}</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingLeft:30,paddingRight:30,paddingTop:10,paddingBottom:10,alignItems:'center'}}>
                            <View style={{width:'30%',justifyContent:'center',alignItems:'center'}}>
                                <Image source={Images.avatar} style={{width:60,height:60,borderRadius:60 / 2}} resizeMode="cover" />
                            </View>
                            <View style={{flexDirection:'column',width:'80%',justifyContent:'center'}}>
                                <TouchableOpacity>
                                    <Text style={{fontWeight:'700',fontSize:18,color:'rgba(0,0,0,0.4)'}}>{this.props.processor.client.name}</Text>
                                </TouchableOpacity>
                                <View style={{height:3}}></View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Icon name="star" style={{fontSize:24,color:'#82B1FF'}} />
                                    <View style={{width:5}}></View>
                                    <Text style={{fontWeight:'600',fontSize:16}}>4.3</Text>
                                </View>
                            </View>
                        </View>
                        <AirbnbRating
                        count={5}
                        reviews={["Bad", "OK", "Good", "Amazing", "Unbelievable"]}
                        defaultRating={4}
                        size={20}
                        selectedColor={'#82B1FF'}
                        reviewColor={'#82B1FF'}
                        />
                        <View style={{height:175}}>
                            <Content padder>
                                <View style={{padding:10,paddingLeft:30,paddingRight:30}}>
                                    <Textarea rowSpan={5} bordered placeholder="Keep comment to the Client" />
                                </View>
                            </Content>
                        </View>
                        <View style={{paddingLeft:30,paddingRight:30,paddingBottom:30}}>
                            <Button onPress={() => {
                                this.props.manger._relayout();
                                this.props.manger.state = 0;
                            }} block dark><Text style={{fontWeight:'700',fontSize:18,color:'white'}}>Done</Text></Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}