import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"
import axiosClient from "./axios-client";

export default function useKakaoMapLoader(key) {
  useKakaoLoaderOrigin({
    appkey: "e9631963e778632aaf68e374286e70c5",
    libraries: ["clusterer", "drawing", "services"],
  })
}
