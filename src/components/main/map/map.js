import React, { Component } from "react";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

// // renderHtml
// import renderHtml from 'react-render-html';

// mapStyle
import mapStyle from "./mapStyle";

// propTypes
import PropTypes from "prop-types";

// map css
import "./css/_map.scss";

// aos
import AOS from "aos";
import "aos/dist/aos.css";

let currentZoom = 14;

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: "",
    zoomMap: currentZoom,
    selectedPlace: "",
    center: "",
    show: false,
    positions: "",
  };

  componentDidMount() {
    // or simply just AOS.init();
    AOS.init({
      // initialise with other settings
      duration: 1000,
    });

    window.onscroll = () => {
      AOS.refresh();
    };

    let locate =
      this.props.locations !== false
        ? this.props.locations.map((item) =>
            this.setState({
              center: { lat: item[0], lng: item[1] },
            })
          )
        : "";
  }

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        show: false,
      });
    }
  };

  render() {
    const mapContainerStyle = {
      height: "409px",
      width: "100%",
    };

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

    return (
      <div data-aos="fade-up">
        <LoadScript googleMapsApiKey="AIzaSyANektuMKczEQdzMI82zHlFnMTVSmT55Vw">
          <GoogleMap
            id="mapWithClusters"
            mapContainerStyle={mapContainerStyle}
            zoom={this.state.zoomMap}
            center={this.state.center}
            options={mapOptions}
          >
            {this.props.locations !== false
              ? this.props.locations.map((item, index) => (
                  <Marker
                    key={index}
                    onClick={
                      (this.onMarkerClick = () => {
                        this.setState({
                          selectedPlace: item[0],
                          center: { lat: item[0], lng: item[1] },
                          showingInfoWindow: true,
                          positions: this.props.locations,
                          show: true,
                        });
                      })
                    }
                    icon={{
                      url: require("../../images/pin.png").default,
                      // size: { width: 30, height: 30, }
                    }}
                    position={{ lat: item[0], lng: item[1] }}
                    animation={2}
                  >
                    <InfoWindow position={{ lat: item[0], lng: item[1] }}>
                      <div className="contact__footer">
                        <h4> Həsən Əliyev 7C</h4>
                        <p>
                          <a href="tel:+994 12 430 55 99 / +994 50 265 55 99">
                            +994 12 430 55 99 / +994 50 265 55 99
                          </a>
                        </p>
                        <p className="sosial">
                          <a href="https://www.instagram.com/ecoline.az/">
                            <i className="fab fa-instagram"></i>
                          </a>
                          <a href="https://www.facebook.com/ecoline.az/?hc_ref=ARSKrt1lRAa3NzpP5m5rW1ms_NAWleLp5a7ceIGhuVYv43MdUWQ37hp4hzCeY2UCZWk&ref=nf_target&__tn__=kC-R">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </p>
                      </div>
                    </InfoWindow>
                  </Marker>
                ))
              : ""}
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}

MapContainer.propTypes = {
  pathName: PropTypes.object,
  locations: PropTypes.array.isRequired,
};

export default MapContainer;
