import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left, Body, Right, Button, Icon, Title,Form,H3,Item, Input,Label,Picker} from 'native-base';
import {Colors,Countrys} from '../../../commons';
import {inject,observer} from 'mobx-react';
import {helper} from '../../../service';
import {Alertx} from '../../../components';
@inject('auth')
@observer
export default class CompanyInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {error:false,error_text:''};
    }
    componentDidMount() {
        this.setState({error:false,error_text:''});
    }
    render() {
        let auth = this.props.auth;
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
                    <H3 style={{marginVertical:30,marginHorizontal:10}}>Company Information</H3>
                    <Form>
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Company Name</Label>
                            <Input value={auth.company_input.name} onChangeText={(value) => {auth.company_input.name = value;}} />
                        </Item>
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>City</Label>
                            <Input value={auth.company_input.city} onChangeText={(value) => {auth.company_input.city = value;}}  />
                        </Item>
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>State</Label>
                            <Input value={auth.company_input.state} onChangeText={(value) => {auth.company_input.state = value;}}  />
                        </Item>
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Zip Code</Label>
                            <Input value={auth.company_input.zip_code} onChangeText={(value) => {auth.company_input.zip_code = value;}}  />
                        </Item>
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Phone</Label>
                            <Input value={auth.company_input.phone} onChangeText={(value) => {auth.company_input.phone = value;}} />
                        </Item>
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Tax ID</Label>
                            <Input value={auth.company_input.tax_id} onChangeText={(value) => {auth.company_input.tax_id = value;}} />
                        </Item>
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Owner or Manger Full Name</Label>
                            <Input value={auth.company_input.owner_name} onChangeText={(value) => {auth.company_input.owner_name = value;}} />
                        </Item>
                    </Form>
                    {this.state.error &&
                        <Alertx>
                            {this.state.error_text}
                        </Alertx>
                    }
                    <View style={{height:30}}></View>
                        <Button dark block onPress={() => {
                            if(helper.check_values([auth.company_input.name,auth.company_input.city,auth.company_input.state,auth.company_input.zip_code,auth.company_input.phone,auth.company_input.tax_id,auth.company_input.owner_name])) {
                                this.props.navigation.navigate('UserInformation');
                                this.setState({error:false,error_text:''});
                            }else {
                                this.setState({error:true,error_text:'please fill all required fields'});
                            }
                        }}><Text style={{color:'white',fontFamily:'Roboto_medium'}}>Next Step</Text></Button>
                </Content>
            </Container>
        )
    }
}