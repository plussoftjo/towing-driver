import axios from 'axios';
import {Keys} from '../commons';
import PolyLine from '@mapbox/polyline';
const googleapi = {
    directions:async function(text,coords) {
        let result = null;
        //fetch directions from diretctions.google maps 
        /**
         * Directions url : 
         * @input_one {lat&lng} from the starting place
         * @input_tow description
         * @input_three api key
         */
        let fetch = await axios.get(Keys.google_directions_url + 
            coords.latitude + ',' + coords.longitude + 
            '&destination=' + text + 
            '&key=' + Keys.google_place_api).then(response => {
            const points = PolyLine.decode(response.data.routes[0].overview_polyline.points);
            const pointCoords = points.map(point => {
                return {latitude:point[0],longitude:point[1]}
            });
            result =  pointCoords;
        }).catch(err => {
            console.log(err);
        });
        
        /** Just Example */
        return result;
    },
    direction_with_coords:async function(origin_coords,destination_coords) {
        let result = null;
        //fetch directions from diretctions.google maps 
        /**
         * Directions url : 
         * @input_one {lat&lng} from the starting place
         * @input_tow {lat&lng} from driver_coords
         * @input_three api key
         */
        let fetch = await axios.get(Keys.google_directions_url + 
            origin_coords.latitude + ',' + origin_coords.longitude + 
            '&destination=' + destination_coords.latitude + ',' + destination_coords.longitude + 
            '&key=' + Keys.google_place_api).then(response => {
            const points = PolyLine.decode(response.data.routes[0].overview_polyline.points);
            const pointCoords = points.map(point => {
                return {latitude:point[0],longitude:point[1]}
            });
            result =  pointCoords;
        }).catch(err => {
            console.log(err);
        });
        
        /** Just Example */
        return result;
        
    },
    distance_matrix:async function(description,coords) {
        let distance =null;
        await axios.get(Keys.google_distance_url + coords.latitude + ',' + coords.longitude + '&destinations=' + description + '&key=' + Keys.google_place_api).then(async(response) => {
            distance = response.data.rows[0].elements[0];
        }).catch(err => {
            console.log(err)
        });
        return distance;
    },
    distance_matrix_with_coords:async function(origin_coords,destination_coords) {
        let distance = null;
        await axios.get(Keys.google_distance_url + origin_coords.latitude + ',' + origin_coords.longitude + '&destinations=' + destination_coords.latitude + ',' + destination_coords.longitude  + '&key=' + Keys.google_place_api).then(async(response) => {
            distance = response.data.rows[0].elements[0];
        }).catch(err => {
            console.log(err)
        });
        return distance;
    },
    geocoding:async function(coords) {
        let geocoding = null;
        await axios.get(Keys.google_geocoding_url + coords.latitude + ','+coords.longitude + '&key=' + Keys.google_place_api).then(response => {
            if(response.data.results.length > 0) {
                geocoding = response.data.results[0];
            }else {
                geocoding = {
                    formatted_address:'Unnamed Road'
                };
            }
        }).catch(err => {
            console.log(err)
        });
        return geocoding;
    }
}

export default googleapi;