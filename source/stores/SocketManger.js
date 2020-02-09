import {observable,computed,action} from 'mobx';
import io from 'socket.io-client';

export default class SocketManger {
    /*--Global Value--*/
    /*--Static Value--*/
    @observable socket = null;

    @action subscripe_driver(user_id,has_request) {
        this.socket.emit('subscripe',user_id);

        /**
         * Send Request to driver from the client
         * 
         */
        this.socket.on('send_request_to_driver',function(data) {
            has_request(data);
        });
    }

    @action send_approve(user,coords,state) {
        this.socket.emit('send_approve_from_driver',{room:user.id,user:user,coords:coords,state:state});
    }

    @action start_service(user_id) {
        this.socket.emit('send_start_service_from_the_driver',{room:user_id});
    }

    @action start_route(user_id) {
        this.socket.emit('send_start_route_from_the_driver',{room:user_id});
    }

    @action end_route(user_id) {
        this.socket.emit('send_end_route_from_the_driver',{room:user_id});
    }

    @action send_real_time_location(coords,user_id) {
        this.socket.emit('send_real_time_location_from_driver',{room:user_id,coords:coords});
    }

   constructor() {
    /*--When-Fire--*/
    this.socket = io('http://3.16.160.3:3000/');
   }
}