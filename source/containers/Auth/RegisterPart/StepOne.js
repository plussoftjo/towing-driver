import React from 'react';
import {View} from 'react-native';
import {inject,observer} from 'mobx-react';
import {Colors,FullCountrys} from '../../../commons';
import {Container,Content,Text,Item,Icon,Input,Button, Form,Picker,CheckBox} from 'native-base';
import {helper} from '../../../service';
@inject('auth')
@observer
export default class StepOne extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            states:[],
            country_code:this.props.auth.country_code,
            vaild:true,
        };
    }
    CountryChange(value) {
        this.setState({
            country_code: value
        });
      }
    
    render() {
        return (
            <Content contentContainerStyle={{ justifyContent: 'center',paddingTop:'50%'}}>
            <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>User information</Text>
            <View key="bottom" style={{padding:30}}>
                <Item regular style={{backgroundColor:'white',flexDirection:'row'}} rounded>
                    <Picker
                        mode="dropdown"
                        style={{ width: '100%' }}
                        placeholder="Code"
                        selectedValue={this.state.country_code}
                        onValueChange={this.CountryChange.bind(this)}
                    >
                        {FullCountrys.map((trg,index) => 
                            <Picker.Item render label={this.state.country_code == ''?trg.name + ' ' +trg.dial_code:trg.code + ' ' +trg.dial_code} value={trg.dial_code} key={index} ></Picker.Item>
                        )}
                    </Picker>
                    <Input placeholder={'Phone Number'} keyboardType="numeric" value={this.props.auth.user_input.phone} onChangeText={(value) => {this.props.auth.user_input.phone = value;}}/>
                </Item>
                <View style={{height:20}}></View>
                <Item regular style={{backgroundColor:'white'}} rounded>
                    <Icon active type="AntDesign" name='key' />
                    <Input placeholder={'password'} secureTextEntry={true} value={this.props.auth.user_input.password} onChangeText={(value) => {this.props.auth.user_input.password = value;}} />
                </Item>
                <View style={{height:20}}></View>
                <Item regular style={{backgroundColor:'white'}} rounded>
                    <Icon active type="AntDesign" name='key' />
                    <Input placeholder={'confirm password'} secureTextEntry={true}/>
                </Item>
                {!this.state.vaild &&
                <Text style={{color:'red',fontWeight:'500',marginBottom:10}}>please complete all the required fields</Text>
                }
            </View>
            <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                <Button success onPress={() => {
                    if(helper.check_values([this.props.auth.user_input.phone,this.props.auth.user_input.password])) {
                        this.props.auth.country_code = this.state.country_code;
                        // this.props.auth.make_sms_vertify();
                        this.props.pressed();
                    }else {
                        this.setState({vaild:false});
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