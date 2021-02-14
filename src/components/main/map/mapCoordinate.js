import React, { useState } from 'react';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';




// // renderHtml
// import renderHtml from 'react-render-html';

// mapStyle
import mapStyle from './mapStyle';

// map css
import './css/_map.scss';



let currentZoom = 14;


const MapContainer = () => {

    const [state, setState] = useState({
        showingInfoWindow: false,
        activeMarker: '',
        zoomMap: currentZoom,
        selectedPlace: '',
        center:
        {
            lat: 40.409264,
            lng: 49.867092
        },
        show: false,
        positions: '',
        langlat: null
    });



    const mapContainerStyle = {
        height: '409px',
        width: '100%',

    }


    // map style and checkking controls
    const mapOptions = {
        styles: mapStyle,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,

    };


    // Clusters options

    // const optionsClusters = {
    //     styles: [{
    //         textColor: 'white',
    //         height: 53,
    //         url: require('../../images/clusters.svg'),
    //         'width': 50,
    //         'line-height': 42
    //     }]
    // }

    let [myMap, setMymap] = useState(null)

    const changeCoor = (event) => {

        setMymap({
            lat: event.latLng.lat(),
            lang: event.latLng.lng()
        })

        localStorage.setItem('map', JSON.stringify(myMap))
    }


    return (
        <div>
            <LoadScript
                googleMapsApiKey='AIzaSyANektuMKczEQdzMI82zHlFnMTVSmT55Vw'>
                <GoogleMap
                    id='mapCoordinate'
                    mapContainerStyle={mapContainerStyle}
                    zoom={state.zoomMap}
                    center={state.center}
                    options={mapOptions}
                >
                    <Marker
                        draggable={true}
                        onDrag={(event) => {
                            changeCoor(event)
                        }}
                        icon={{
                            url: require('../../images/pin.png').default,
                            // size: { width: 30, height: 30, }
                        }}

                        position={state.center}
                        animation={2}
                    />
                </GoogleMap>
            </LoadScript>
        </div >
    )

}



// MapContainer.propTypes = {
//     pathName: PropTypes.object,
//     locations: PropTypes.array.isRequired
// }


export default MapContainer