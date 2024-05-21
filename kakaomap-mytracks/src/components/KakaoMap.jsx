import React from 'react';
import { Map } from "react-kakao-maps-sdk"

export default function KakaoMap(props) {
    return (
        <Map id="map" center={ props.center } style={ props.style } level={ 7 }></Map>
    );
}
