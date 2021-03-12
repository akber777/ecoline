import React, { useLayoutEffect, useState } from "react";

// css

import "./css/_loginLocation.scss";

// tools
import { NavLink } from "react-router-dom";

// reactstrap
import { Container, Input } from "reactstrap";

// axios
import axios from "axios";

// react query
import { useQuery, useMutation } from "react-query";

// api
import { baseUrl } from "../../api/api";

// jquery
import $ from "jquery";

// map
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// mapStyle
import mapStyle from "../map/mapStyle";

// sweet alert
import swal from "sweetalert";

// react i18
import { useTranslation } from "react-i18next";

const LoginLocation = () => {
  const { t } = useTranslation();

  let { data, isLoading } = useQuery(
    ["infoLocation"],
    async (key) => {
      const res = axios.get(baseUrl + "selectable?include=cities");

      return res;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const mutationUpdated = useMutation(
    (update) => axios.put(baseUrl + "address", update),
    {
      onSuccess: function () {
        $(".formItem input").val("");
      },
    }
  );

  let [id, setId] = useState(null);
  let [name, setName] = useState();
  let [phone, setPhone] = useState();
  let [address, setAddress] = useState();
  let [lati, setLati] = useState(40.34126114625568);
  let [lang, setLang] = useState(48.83849702929688);
  let [city_id, setCity] = useState();
  let [checkedCity, setCheckedCity] = useState();

  let params = {
    name: name,
    phone: phone,
    address: address,
    city_id: city_id,
    id: id,
    lat: lati,
    lang: lang,
  };

  // register
  const mutationAdd = useMutation(
    (add) => axios.post(baseUrl + "address/add", add),
    {
      onSuccess: function (succ) {
        if (succ.status === 200) {
          setId();
          setName();
          setPhone();
          setAddress();
          setLang();
          setLati();
          $(".openAddPopup input").val("");
        }
      },
      onError: function (error) {
        swal({
          title: "Inputlari Doldurmaniz Lazimdir!",
          icon: "error",
          button: "Bağla",
        });
      },
    }
  );

  // address

  let addressApi = useQuery(
    ["addressApi", mutationAdd.data, mutationUpdated.data],
    async (key) => {
      const res = axios.get(baseUrl + "address");

      return res;
    },
    {
      refetchOnWindowFocus: false,
      cacheTime:
        localStorage.getItem("token") && localStorage.getItem("user") === null
          ? 0
          : 5000,
    }
  );

  useLayoutEffect(() => {
    setCity(
      isLoading === false &&
        data !== undefined &&
        data.data.data.cities.data[0].id
    );

    $(".sendInfo").on("click", function () {
      $(".infoPopup").hide();
    });

    $(".sendInfoMap").on("click", function () {
      $(".infoPopup").css({
        opacity: 1,
        zIndex: 55555,
      });

      $(".openMapPopup").hide();
    });

    $(".showPin").on("click", function () {
      $(".openMapPopup").show();

      $(".infoPopup").css({
        opacity: 0,
        zIndex: -1,
      });

      $(".openMapPopup").css({
        opacity: 1,
        zIndex: 5555,
      });
    });

    $(".closeModalMap").on("click", function () {
      $(".infoPopup").css({
        opacity: 1,
        zIndex: 55555,
      });

      $(".openMapPopup").hide();
    });
  }, [addressApi.data]);

  // myMap

  const [state, setState] = useState({
    showingInfoWindow: false,
    activeMarker: "",
    zoomMap: 7,
    selectedPlace: "",
    center: {
      lat: Number(lati),
      lng: Number(lang),
    },
    show: false,
    positions: "",
    langlat: null,
  });

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

  return (
    <main className="info loginLocation">
      <div className="rules__banner">
        <img src={require("../../images/rules.png").default} alt="" />
        <Container>
          <h4 className="rules__title">ONLİNE SİFARİŞ</h4>
        </Container>
      </div>
      <Container>
        <div className="info__top">
          <div className="info__topItem">
            <NavLink to={"/loginorder"}>Sifarişlərim</NavLink>
            <NavLink to={"/loginlocation"} className="activeMenu">
              Ünvanlarım
            </NavLink>
            <NavLink to={"/logininformation"}>Məlumatlarım</NavLink>
            <NavLink to={"/passwordupdate"}>Şifrəni yenilə</NavLink>
            <NavLink
              to={"/index"}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }}
            >
              Çıxış
            </NavLink>
          </div>
        </div>
        <div className="info__content">
          {/* map popup */}
          <div className="infoPopup openMapPopup">
            <div className="info__WrapperModal">
              <button
                className="closeModal closeModalMap"
                onClick={(event) => {
                  document.querySelector(".openMapPopup").style.display =
                    "none";
                }}
              >
                x
              </button>
              <h4>Xəritə</h4>
              <LoadScript googleMapsApiKey="AIzaSyANektuMKczEQdzMI82zHlFnMTVSmT55Vw">
                <GoogleMap
                  id="mapCoordinate"
                  mapContainerStyle={mapContainerStyle}
                  zoom={state.zoomMap}
                  center={state.center}
                  options={mapOptions}
                >
                  <Marker
                    draggable={true}
                    onDrag={(event) => {
                      setLang(event.latLng.lng());
                      setLati(event.latLng.lat());
                    }}
                    icon={{
                      url: require("../../images/pin.png").default,
                      // size: { width: 30, height: 30, }
                    }}
                    position={{
                      lat: Number(lati),
                      lng: Number(lang),
                    }}
                    animation={2}
                  />
                </GoogleMap>
              </LoadScript>
              <div className="mapInp">
                <div>
                  <p>Lat</p>
                  <Input
                    value={lati}
                    onChange={(event) => {
                      setLati(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <p>Lang</p>
                  <Input
                    value={lang}
                    onChange={(event) => {
                      setLang(event.target.value);
                    }}
                  />
                </div>
              </div>
              <button className="sendInfoMap">Yadda Saxla</button>
            </div>
          </div>
          {/* mupdated popup */}
          <div className="infoPopup openUpdatedPopup">
            <div className="info__WrapperModal">
              <button
                className="closeModal"
                onClick={(event) => {
                  document.querySelector(".openUpdatedPopup").style.display =
                    "none";
                }}
              >
                x
              </button>
              <h4>YENILE</h4>
              <div className="formBox">
                <div className="formItem">
                  <span>Ad:</span>
                  <Input
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem">
                  <span>Telefon:</span>
                  <Input
                    type="phone"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem fromLocate">
                  <span>Ünvan:</span>
                  <Input
                    type="text"
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem">
                  <span>Xəritədə göstər:</span>
                  <p className="showPin">
                    <img
                      src={require("../../images/newPin.png").default}
                      alt=""
                    />
                  </p>
                </div>
                <div className="formItem">
                  <span>Şəhər:</span>
                  <select
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  >
                    {isLoading === false &&
                      data !== undefined &&
                      data.data.data.length !== 0 &&
                      data.data.data.cities.data.map((item, index) => (
                        <option
                          key={item.id}
                          value={item.id}
                          defaultValue={city_id}
                          selected={
                            checkedCity !== undefined &&
                            item.id === checkedCity.city.data.id
                              ? "selected"
                              : ""
                          }
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <button
                className="sendInfo"
                onClick={(event) => {
                  mutationUpdated.mutate(params);
                }}
              >
                ƏLAVƏ ET
              </button>
            </div>
          </div>

          {/* add */}
          <div className="infoPopup openAddPopup">
            <div className="info__WrapperModal">
              <button
                className="closeModal"
                onClick={(event) => {
                  document.querySelector(".openAddPopup").style.display =
                    "none";
                }}
              >
                x
              </button>
              <h4>Yeni Ünvan Əlavə et</h4>
              <div className="formBox">
                <div className="formItem">
                  <span>Ad:</span>
                  <Input
                    type="text"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem">
                  <span>Telefon:</span>
                  <Input
                    type="phone"
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem fromLocate">
                  <span>Ünvan:</span>
                  <Input
                    type="text"
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem">
                  <span>Xəritədə göstər:</span>
                  <p className="showPin">
                    <img
                      src={require("../../images/newPin.png").default}
                      alt=""
                    />
                  </p>
                </div>
                <div className="formItem">
                  <span>Şəhər:</span>
                  <select
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  >
                    {isLoading === false &&
                      data !== undefined &&
                      data.data.data.length !== 0 &&
                      data.data.data.cities.data.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              <button
                className="sendInfo"
                onClick={() => {
                  if (address !== undefined) {
                    mutationAdd.mutate(params);
                  } else {
                    swal({
                      title: t("Bütün inputları doldurmanız lazımdır!"),
                      icon: "error",
                      button: "Bağla",
                    });
                  }
                }}
              >
                ƏLAVƏ ET
              </button>
            </div>
          </div>

          <div className="formBox">
            {addressApi.isLoading === false &&
            addressApi.data !== undefined &&
            addressApi.data.data.data.length !== 0 ? (
              addressApi.data.data.data.map((item, index) => (
                <div className="location__content" key={item.id}>
                  <div className="location__contentLeft">
                    <p>
                      Ev ünvanım:
                      <span>{item.address}</span>
                    </p>
                    {/* <p>
                            <img src={require('../../images/newPin.png').default} alt='' />
                        </p> */}
                  </div>
                  <div className="location__contentRight">
                    <span
                      className="changeInfo"
                      data-id={item.id}
                      data-index={index}
                      onClick={(event) => {
                        document.querySelector(
                          ".openUpdatedPopup"
                        ).style.display = "block";
                        setId(Number(event.target.getAttribute("data-id")));
                        setName(
                          addressApi.isLoading === false
                            ? addressApi.data.data.data[
                                event.target.getAttribute("data-index")
                              ].name
                            : ""
                        );
                        setPhone(
                          addressApi.isLoading === false
                            ? addressApi.data.data.data[
                                event.target.getAttribute("data-index")
                              ].phone
                            : ""
                        );
                        setAddress(
                          addressApi.isLoading === false
                            ? addressApi.data.data.data[
                                event.target.getAttribute("data-index")
                              ].address
                            : ""
                        );
                        setCheckedCity(
                          isLoading === false
                            ? addressApi.data.data.data[
                                event.target.getAttribute("data-index")
                              ]
                            : ""
                        );
                        setLang(
                          addressApi.isLoading === false
                            ? addressApi.data.data.data[
                                event.target.getAttribute("data-index")
                              ].lang
                            : ""
                        );
                        setLati(
                          addressApi.isLoading === false
                            ? addressApi.data.data.data[
                                event.target.getAttribute("data-index")
                              ].lat
                            : ""
                        );
                      }}
                    >
                      DÜZƏLİŞ ET
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  height: 200,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  id="preloader"
                  aria-busy="true"
                  aria-label="Loading, please wait."
                  role="progressbar"
                ></div>
              </div>
            )}
          </div>
          <div className="login__sendBtn infoSend">
            <button
              onClick={() => {
                document.querySelector(".openAddPopup").style.display = "block";
                setCity(
                  isLoading === false ? data.data.data.cities.data[0].name : ""
                );
                setAddress();
              }}
            >
              ÜNVAN ƏLAVƏ ET
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default LoginLocation;
