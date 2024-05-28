import useKakaoMapLoader, {getKakaoMapKey} from "./services/useKakaoMapLoader"
import KakaoMap from "./components/KakaoMap";
import React, {useEffect, useState} from "react";
import '@radix-ui/themes/styles.css';
import {Theme} from '@radix-ui/themes';
import Menu from './components/Menu';
import { loadVisibleTracks } from "./services/Loaders";
import TrackLine from "./components/TrackLine";
import { Polyline } from "react-kakao-maps-sdk";

function App() {
  const [tracks, setTracks] = useState([]);
  const [open, setOpen] = useState(false);
  const [mapKey, setMapKey] = useState(null);
  const [visibleTracks, setVisibleTracks] = useState([]);

  useEffect(() => {
    async function getVisibibleTracks() {
      try {
        return await loadVisibleTracks();
      } catch (error) {
        console.error(error);
      }
    }
    getVisibibleTracks().then(async list => {
      setVisibleTracks(list);
    });
  }, []);

  // useKakaoMapLoader();

  return (
    <Theme grayColor="auto" radius="large" scaling="100%" className="App">
      <Menu/>
      <KakaoMap center={{ lat: 37.4016529, lng: 126.7102978 }}  style={{ width: "100%", height: "100vh" }}>
        {visibleTracks &&
          visibleTracks.map((track, i) => {
            return (
              <TrackLine key={i} track={track} color={track.color} />
            );
          })
        }
      </KakaoMap>
    </Theme>
  );
}

export default App;
