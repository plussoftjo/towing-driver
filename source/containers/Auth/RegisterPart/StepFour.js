import React from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Colors} from '../../../commons';
import {Container,Content,Text,Item,Icon,Input,Button, Form,Picker,ListItem, CheckBox,Body,List} from 'native-base';
import {helper} from '../../../service';

import {inject,observer} from 'mobx-react';


@inject('auth')
@inject('cartype')
@observer
export default class StepThree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type_selected:undefined,
            services:[
                {title:'Towing',vaild:false},
                {title:'Flat Tire',vaild:false},
                {title:'Jump Start',vaild:false},
                {title:'Gas Delivery',vaild:false},
                {title:'Winch out',vaild:false}
            ],
            car_no:'',
            vaild:true,
            serves:[]
        };
    }

    async onValueChange_type(value) {

        this.setState({
            type_selected: value
        });
        await service 
        let self = this;
        let service = await this.props.cartype._get_service(value);
        let serves = [];
        service.forEach((trg,index) => {
            serves.push({title:trg.title,vaild:false,id:trg.id});
        });
        self.setState({serves:serves})
      }

    render() {
        return (
            <Content contentContainerStyle={{ justifyContent: 'center', paddingTop:'50%' }}>
            <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>Truck information</Text>
            <View style={{position:'absolute',left:0,top:50,paddingHorizontal:10}}>
                <Icon onPress={() => {
                    this.props.onBack();
                }} type="AntDesign" name="leftcircleo" style={{color:'white',fontSize:38}}></Icon>
            </View>
            <View key="bottom" style={{padding:30}}>
                <Item regular picker style={{width:'100%',backgroundColor:'white',borderRadius:10,marginTop:0}}>
                <Icon active name="towing" type="MaterialCommunityIcons" />
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: '100%' }}
                    placeholder="Truck Type"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#bfc6ea"
                    selectedValue={this.state.type_selected}
                    onValueChange={this.onValueChange_type.bind(this)}
                >
                    {this.props.cartype.car_type.map((trg,index) => 
                    <Picker.Item label={trg.title} key={index} value={trg.value} />
                    )}
                </Picker>
                </Item>
                <Item regular style={{width:'100%',backgroundColor:'white',borderRadius:10,marginTop:20}}>
                    <Icon active name="notification-clear-all" type="MaterialCommunityIcons" />
                    <Input placeholder='Plate number' value={this.state.car_no} onChangeText={(value) => {this.setState({car_no:value})}} />
                </Item>
                <List style={{width:'100%',marginTop:20,backgroundColor:'white'}}>
                    {this.state.serves.map((trg,index) =>
                        <ListItem key={index} onPress={() => {
                            let servicess = this.state.serves;
                            servicess[index].vaild = !servicess[index].vaild;
                            this.setState({serves:servicess})
                        }}>
                            <CheckBox checked={trg.vaild} />
                            <Body>
                            <Text>{trg.title}</Text>
                            </Body>
                        </ListItem>
                    )}
                </List>
                {!this.state.vaild &&
                    <Text style={{color:'red',fontWeight:'500',marginBottom:10}}>please complete all the required fields</Text>
                    }
            </View>
            <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                <Button success onPress={async() => {
                    if(helper.check_values([this.state.type_selected,this.state.car_no])) {
                        this.props.auth.driver_car = {
                            type_selected:this.state.type_selected,
                            car_no:this.state.car_no,
                            services:this.state.serves
                        };
                        let register = await this.props.auth.register(this.props.navigation);
                        if(register) {
                            this.props.pressed();
                        }else {
                            this.setState({vaild:false});
                        }
                    }else {
                        this.setState({vaild:false});
                    }
                    
                    }} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontWeight:'700'}}>Register</Text>
                    <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                </Button>
            </View>
            </Content>
        )
    }
}