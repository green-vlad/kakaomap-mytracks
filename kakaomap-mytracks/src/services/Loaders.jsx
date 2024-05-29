import axiosClient from "./axios-client";

export async function loadTracks(props) {
  await axiosClient.get("/tracks")
    .then((response) => {
      props._setTracks(response.data);
    })
    .catch(error => {
      console.log(error);
    })
}

export async function loadVisibleTracks() {
  try {
    let r = await axiosClient.get("/tracks/to-display");
    return r.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTrackPoints(props) {
  let points = [];
  try {
    const r = await axiosClient.get(`/tracks/${props}/points`);
    points = (await r.data).map(pp => {
      return {lat: pp.lat, lng: pp.lng};
    })
  } catch (error) {
    console.log(error);
  }
  return points;
}

export async function updateTrack(props) {
  await axiosClient.patch("/tracks/update", props)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    })
}
