import {observable,computed,action} from 'mobx';
import axios from 'axios';
export default class Locations {
    /** Observable */
    @observable settings = {};
    /** User Coords -> Current Location coords  */
    @observable user_coords = {
        longitude:0,
        latitude:0
    };
    /** Map Coords -> the coords disable in the map @changeable */
    @observable map_coords = {
        longitude:-0.127758,
        latitude:51.507351
    };

    @observable state = 'online';

    


    /** Actions  */
    @action register_user_coords(coords) {
        this.user_coords = coords;
    }

    @action register_map_coords(coords) {
        this.map_coords = coords;
    }

    @action bind_user_coords_to_map_coords() {
        this.map_coords = this.user_coords;
    }

    @action create_location() {
        let latlng = this.user_coords.latitude + ',' + this.user_coords.longitude;
        axios.post(this.settings.serverUri + 'api/driver/location/create_location', {latlng:latlng,state:this.state}).then(response => {
            
        }).catch(err => {
            console.log(err);
        });
    }

    @action change_state(state) {
        
        axios.post(this.settings.serverUri + 'api/driver/location/change_state',{state:state}).then(response => {

        }).catch(err => {
            console.log(err);
        });
    }

    constructor(settings) {
         this.settings = settings;
    }


} 