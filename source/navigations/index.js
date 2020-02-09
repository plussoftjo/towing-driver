import * as containers from '../containers';
import {createStackNavigator} from 'react-navigation-stack';
import SignUp from '../containers/Auth/SignUp';
import Login from '../containers/Auth/Login'
import * as SignUpPart from '../containers/Auth/SignUpPart/index.js'
/*--Static-Routes--*/
const AuthStack = createStackNavigator({
    AuthMain:{
        screen:containers.Auth
    },
    Login:{
        screen:Login
    },
    SignUp:{
        screen:SignUp
    },
    UserInformation:{
        screen:SignUpPart.UserInformation
    },
    CompanyInformation:{
        screen:SignUpPart.CompanyInformation
    },
    TruckInformation:{
        screen:SignUpPart.TruckInformation
    },
    TruckImage:{
        screen:SignUpPart.TruckImage
    },
    RegisterComplate:{
        screen:SignUpPart.RegisterComplate
    }
},{headerMode:'none'});


export const Routes = {
    AppLoader:{
        screen:containers.AppLoader
    },
    Auth:{
        screen:AuthStack
    },
    Main:{
        screen:containers.Main
    }
};