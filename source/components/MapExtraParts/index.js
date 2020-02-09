import React from 'react';
import DirectionsPoly from '../DirectionsPoly';
import MapsMarker from '../MapsMarker'
import {inject,observer} from 'mobx-react';

@inject('auth')
@inject('manger')
@inject('processor')
@observer
export default class MapExtraParts extends React.Component {
    render() {
        let map = this.props.map;
        return [
            this.props.manger.MapParts.client_directions?<DirectionsPoly key="directionPoly" map={map} points={this.props.processor.direction_polyline} />:null,
            this.props.manger.MapParts.client_icon?<MapsMarker has="icon" data={{type:'FontAwesome',name:'map-pin',color:'#82B1FF',size:30}} key="driver_icon" coords={this.props.processor.direction_polyline[this.props.processor.direction_polyline.length - 1]} />:null
        ]
    }
}