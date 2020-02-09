import Settings from './Settings';
import Auth from './Auth';
import Locations from './Locations'
import Manger from './Manger'
import SocketManger from './SocketManger'
import Processor from './Processor'
import CarType from './CarType';
import Client from './Client';
import Notification from './Notification'
export default {
    settings: new Settings(),
    auth:new Auth(new Settings()),
    locations:new Locations(new Settings()),
    manger:new Manger(),
    socketmanger:new SocketManger(),
    processor:new Processor(),
    cartype:new CarType(new Settings()),
    client:new Client(new Settings()),
    notification:new Notification(new Settings())
}