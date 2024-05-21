import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoMapLoader() {
  useKakaoLoaderOrigin({
    appkey: "e9631963e778632aaf68e374286e70c5",
    libraries: ["clusterer", "drawing", "services"],
  })
}