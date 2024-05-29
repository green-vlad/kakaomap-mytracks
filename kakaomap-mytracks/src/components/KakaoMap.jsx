import React from 'react';
import { Map } from "react-kakao-maps-sdk"

export default function KakaoMap({ center, style, children }) {
    return (
        <Map id="map" center={ center } style={ style } level={ 7 }>
            {children}
        </Map>
    );
}
