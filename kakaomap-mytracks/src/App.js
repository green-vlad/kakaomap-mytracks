import useKakaoMapLoader, {getKakaoMapKey} from "./services/useKakaoMapLoader"
import KakaoMap from "./components/KakaoMap";
import {useEffect, useState} from "react";
import '@radix-ui/themes/styles.css';
import {Theme} from '@radix-ui/themes';
import Menu from './components/Menu';

function App() {
  const [tracks, setTracks] = useState([]);
  const [open, setOpen] = useState(false);
  const [mapKey, setMapKey] = useState(null);

  useKakaoMapLoader();

  return (
    <Theme grayColor="auto" radius="large" scaling="100%" className="App">
      <Menu/>
      <KakaoMap center={{ lat: 33.450701, lng: 126.570667 }}  style={{ width: "100%", height: "100vh" }}>
      </KakaoMap>
    </Theme>
  );
}

export default App;
