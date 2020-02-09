
import React from 'react';
import {View,ScrollView} from 'react-native';
import {Colors,Countrys} from '../../../commons';
import {Container,Content,Text,Item,Icon,Input,Button, Form,Picker,CheckBox} from 'native-base';
import {helper} from '../../../service';
import {inject,observer} from 'mobx-react';


@inject('auth')
@observer
export default class StepThree extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            states:[],
            country:'',
            selected_state:'',
            vaild:true
        };
    }
    CountryChange(value) {
        let list = [];
        value.states.forEach((trg,index) => {
            list.push(<Picker.Item label={trg}  key={index} value={trg}  />);
        });
        this.setState({states:list});
        this.setState({
            country: value
        });
      }
    
      stateChange(value) {
        this.setState({selected_state:value});
      }
    render() {
        let user_profile = this.props.auth.user_profile;
        return (
            <Content contentContainerStyle={{ justifyContent: 'center',paddingTop:'50%' }}>
                <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>Driver information</Text>
                <View style={{position:'absolute',left:0,top:50,paddingHorizontal:10}}>
                    <Icon onPress={() => {
                        this.props.onBack();
                    }} type="AntDesign" name="leftcircleo" style={{color:'white',fontSize:38}}></Icon>
                </View>
                <View key="bottom" style={{padding:30}}>
                    <View style={{flexDirection:'row',width:'100%'}}>
                        <View style={{width:'50%'}}>
                            <Item regular style={{backgroundColor:'white',borderRadius:5,marginBottom:15}} >
                                <Input placeholder={'First Name'} value={user_profile.first_name} onChangeText={(value) => {user_profile.first_name = value;}}/>
                            </Item>
                        </View>
                        <View style={{width:'50%'}}>
                            <Item regular style={{backgroundColor:'white',borderRadius:5,marginBottom:15}} >
                                <Input value={user_profile.last_name} onChangeText={(value) => {user_profile.last_name= value;}} placeholder={'Last Name'}/>
                            </Item>
                        </View>
                    </View>
                    <Item regular picker style={{backgroundColor:'white',borderRadius:5,marginBottom:15}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%' }}
                            placeholder="Country"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.country}
                            onValueChange={this.CountryChange.bind(this)}
                        >
                            {Countrys.map((trg,index) => 
                                <Picker.Item label={trg.value} value={trg} key={index} />
                            )}
                        </Picker>
                    </Item>
                    <Item regular picker style={{backgroundColor:'white',borderRadius:5,marginBottom:15}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%' }}
                            placeholder="State"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected_state}
                            onValueChange={this.stateChange.bind(this)}
                        >
                            {this.state.states}
                        </Picker>
                    </Item>
                    <View style={{flexDirection:'row',width:'100%'}}>
                        <View style={{width:'100%'}}>
                            <Item regular style={{backgroundColor:'white',borderRadius:5,marginBottom:15}} >
                                <Input value={user_profile.address} onChangeText={(value) => {user_profile.address = value;}} placeholder={'Address'}/>
                            </Item>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',width:'100%'}}>
                        <View style={{width:'100%'}}>
                            <Item regular style={{backgroundColor:'white',borderRadius:5,marginBottom:0}} >
                                <Input value={user_profile.zip} onChangeText={(value) => {user_profile.zip = value;}} placeholder={'Zip code'}/>
                            </Item>
                        </View>
                    </View>
                    {!this.state.vaild &&
                    <Text style={{color:'red',fontWeight:'500',marginBottom:10}}>please complete all the required fields</Text>
                    }
                 </View>
                 <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                    <Button success onPress={() => {
                        if(helper.check_values([user_profile.first_name,user_profile.last_name,this.state.country,user_profile.address,user_profile.zip])) {
                            user_profile.country = this.state.country.value;
                            user_profile.state = this.state.selected_state;
                            this.props.pressed();
                        }else {
                            this.setState({vaild:false})
                        }
                        }} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'700'}}>Next Step</Text>
                        <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                    </Button>
                </View>
                </Content>
        )
    }
}