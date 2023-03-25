export default function geolocation(location: {
  allowedLatitude: number;
  allowedLongitude: number;
  allowedDistance: number;
}) {
  async function calculateDistance(
    lat1: any,
    lon1: any,
    lat2 = location.allowedLatitude,
    lon2 = location.allowedLongitude
  ) {
    const R = 6371; // radius of earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // distance in km
    const distanceInMeters = d * 1000; // convert to meters
    // console.log('distanceInMeters', distanceInMeters);
    return distanceInMeters;
  }

  function deg2rad(deg: any) {
    // console.log('deg2rad', deg * (Math.PI / 180));
    return deg * (Math.PI / 180);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  return new Promise((resolve: any, reject: any) => {
    navigator.geolocation.getCurrentPosition(
      async (position: any) => {
        const { latitude, longitude } = position.coords;
        const distance = await calculateDistance(latitude, longitude);
        resolve(distance);
      },
      async (error: any) => {
        reject(error);
      },
      options
    );
  });
}
