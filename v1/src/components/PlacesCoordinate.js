import React, { useState} from 'react';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';


  export const hospitalLongLat =  {
    GroupMedical :[ 3.8916618391705153, 7.400992495555293],
    JRapha: [ 7.422346755751506, 3.91450677116402],
    UCH: [7.401870739432132, 3.902048971164021],
    Molly: [7.424677116644111, 3.9126892],
    Oluwayomi :[ 7.398065934776858, 3.888100871164021],
    Skyline : [7.401873799999994,3.9393818711640214],
    Banby : [ 7.433901277315807, 3.9437628576719566],
    ForeMost : [7.417442367116169,3.8941192711640213]
}

function PlacesCoordinate() {

const [coordinate, setCoordinate] = useState({
    lat: null,
    lng: null
})

const getAddressofCoordinate = async address => {
    const results = await geocodeByAddress(address)
    console.log(results)
    const coordinate = await getLatLng(results[0])
    console.log(coordinate);
}


}

export default PlacesCoordinate
