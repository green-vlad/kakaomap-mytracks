import useKakaoMapLoader from "./services/useKakaoMapLoader"
import KakaoMap from "./components/KakaoMap";
import {useState} from "react";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import Menu from './components/Menu';

function App() {
  const [tracks, setTracks] = useState([]);
  const [open, setOpen] = useState(false);

  useKakaoMapLoader();

  return (
    <div className="App">
      <Theme grayColor="auto" radius="large" scaling="100%">
        <Menu></Menu>
          <KakaoMap center={{ lat: 33.450701, lng: 126.570667 }}  style={{ width: "100%", height: "100vh" }}>

          </KakaoMap>
      </Theme>
    </div>
  );
}

export default App;
