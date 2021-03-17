import React, { useLayoutEffect, useState } from "react";

// css
import "./css/_location.scss";

// tools

// rectstrap
import { Container, Input } from "reactstrap";

// react router dom
// import { NavLink } from 'react-router-dom';

// map

import Map from "../map/map";

// react router dom
import { NavLink, useHistory } from "react-router-dom";

// query
import { useQuery, useMutation } from "react-query";

// baseUrl
import { baseUrl } from "../../api/api";

// axios
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

//  jquery
import $ from "jquery";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";

// atoms

import { order } from "../../atoms/atoms";

// sweet alert
import swal from "sweetalert";

// map
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// mapStyle
import mapStyle from "../map/mapStyle";

// react i18
import { useTranslation } from "react-i18next";

const Location = () => {
  let history = useHistory();

  const { t } = useTranslation();

  if (JSON.parse(localStorage.getItem("items")) === null) {
    history.push({
      pathname: "/order",
    });
  }

  // settings
  let settings = useQuery(
    ["settings", ""],
    async () => {
      const res = await axios.get(baseUrl + "setting");

      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const locate =
    settings.isLoading === false &&
    settings.data.data.map_location.map((item) => [
      Number(item.lat),
      Number(item.long),
    ]);

  let [updatedPage, setUpdatedPage] = useState(true);

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

  let [id, setId] = useState(null);
  let [name, setName] = useState();
  let [phone, setPhone] = useState();
  let [address, setAddress] = useState();
  let [city_id, setCity] = useState();
  let [lati, setLati] = useState(40.34126114625568);
  let [lang, setLang] = useState(48.83849702929688);
  let [checkedCity, setCheckedCity] = useState();

  let params = {
    name: name,
    phone: phone,
    address: address,
    city_id: city_id,
    lat: lati,
    lang: lang,
    id: id,
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
          $(".openAddPopup input").val("");
        }
      },
      onError: function (error) {
        swal({
          title: t("Inputlari Doldurmaniz Lazimdir!"),
          icon: "error",
          button: "Bağla",
        });
      },
    }
  );

  const mutationUpdated = useMutation(
    (update) => axios.put(baseUrl + "address", update),
    {
      onSuccess: function (succ) {
        if (succ.status === 200) {
          $(".formItem input").val("");
          setId();
          setName();
          setPhone();
          setAddress();
        }
      },
    }
  );

  let addressApi = useQuery(
    ["addressApi", mutationUpdated.data, mutationAdd.data],
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

  let [allOder, setOrder] = useRecoilState(order);

  let orderValue = useRecoilValue(order);

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  useLayoutEffect(() => {
    setCity(
      isLoading === false &&
        data !== undefined &&
        data.data.data.cities.data[0].id
    );

    $(".changeInfo").on("click", function () {
      setOrder({
        address_id: $(this).attr("data-id"),
        payment_method: orderValue !== null ? orderValue.payment_method : null,
        amount:
          JSON.parse(localStorage.getItem("total")) != null
            ? JSON.parse(localStorage.getItem("total")).reduce(reducer)
            : null,
        is_exspress: null,
        items: JSON.parse(localStorage.getItem("items")),
      });

      $(".changeInfo").show();

      $(".changeInfo").find("input").prop("checked", false);

      $(".changeInfo").next().css({
        opacity: 0,
      });

      $(this).find("input").prop("checked", true);

      $(this).hide();

      $(this).next().css({
        opacity: 1,
      });
    });

    $.each($(".changeInfo"), function (index, item) {
      if (orderValue !== null) {
        if ($(item).attr("data-id") === orderValue.address_id) {
          $(item).hide();
          $(item).next().css({
            opacity: 1,
          });
        }
      }
    });

    $(".sendInfo").on("click", function () {
      $(".openAddPopup").hide();

      $(".openUpdatedPopup").hide();
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
    <main className="location locationCon loginLocation">
      <div className="rules__banner">
        <img src={require("../../images/rules.png").default} alt="" />
        <Container>
          <h4 className="rules__title">ONLİNE SİFARİŞ</h4>
        </Container>
      </div>
      <div className="locationWrapper">
        <Container>
          <div className="order__breadCrumbs">
            <span>SİFARİŞ</span>
            <span>SİFARİŞLƏRİM</span>
            <span className="activCrumbs">ÜNVAN SEÇ</span>
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
            <div className="infoFlexFull">
              <div className="infoPopup openUpdatedPopup">
                <div className="info__WrapperModal">
                  <button
                    className="closeModal"
                    onClick={(event) => {
                      document.querySelector(
                        ".openUpdatedPopup"
                      ).style.display = "none";
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
                          setCity(parseInt(event.target.value));
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
                    onClick={() => {
                      setUpdatedPage(true);
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
                  <h4>YENILE</h4>
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
                          setCity(parseInt(event.target.value));
                        }}
                      >
                        {isLoading === false &&
                          data !== undefined &&
                          data.data.data.length !== 0 &&
                          data.data.data.cities.data.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <button
                    className="sendInfo"
                    onClick={() => {
                      if (address !== undefined) {
                        setUpdatedPage(true);
                        mutationAdd.mutate(params);
                      } else {
                        swal({
                          title: t("Inputlari Doldurmaniz Lazimdir!"),
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
                addressApi.data !== undefined
                 ? (
                  addressApi.data.data.data.map((item, index) => (
                    <div className="location__content" key={item.id}>
                      <div className="location__contentLeft">
                        <p>
                          Ev ünvanım:
                          <span>{item.address}</span>
                        </p>
                        <p
                          className="editIcon"
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
                        ></p>
                      </div>
                      <div className="location__contentRight">
                        <span className="changeInfo" data-id={item.id}>
                          SEÇ
                          <input name="address_id" type="radio" />
                        </span>
                        <i style={{ opacity: 0 }} className="checkedI">
                          <FontAwesomeIcon icon={faCheck} />
                        </i>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      height: 500,
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
            </div>
          </div>
          <div className="order__result noBoxShadow">
            <div className="login__sendBtn infoSend">
              <button
                onClick={() => {
                  document.querySelector(".openAddPopup").style.display =
                    "block";
                  setUpdatedPage(false);
                  setAddress()
                }}
              >
                ÜNVAN ƏLAVƏ ET
              </button>
            </div>

            <div className="btnBoxs">
              <NavLink to={"/ordercomplete"}>
                <button className="success">Geri</button>
              </NavLink>
              <NavLink
                to={
                  orderValue !== null
                    ? orderValue.address_id === null
                      ? "/location"
                      : "/payment"
                    : "/location"
                }
              >
                <button
                  className="success"
                  onClick={() => {
                    if (orderValue === null) {
                      swal({
                        title: "Seçim etməmisiniz!",
                        icon: "error",
                        button: "Bağla",
                      });
                    }
                  }}
                >
                  İrəli
                </button>
              </NavLink>
            </div>
          </div>
        </Container>
      </div>
      {settings.isLoading === false && <Map locations={locate} />}
    </main>
  );
};

export default Location;
