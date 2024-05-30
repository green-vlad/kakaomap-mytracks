import React, { useEffect, useState } from 'react';
import { Polyline } from "react-kakao-maps-sdk";
import { getTrackPoints } from "../services/Loaders";

function TrackLine({ track, stroke=5, color="#000000", opacity=0.7, style="solid" }) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    async function getPointsOfTrack(track) {
      try {
        const pp = await getTrackPoints(track.id);
        return pp;
      } catch (error) {
        console.error(error);
      }
    }
    getPointsOfTrack(track).then(res => {
      setPoints(res);
    });
  }, []);
  return (
    <Polyline path={[points]} strokeWeight={stroke} strokeOpacity={opacity} strokeColor={color} strokeStyle={style}  />
  );
}

export default TrackLine;