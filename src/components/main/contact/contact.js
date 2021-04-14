import React, { useState } from "react";

// reactstrap
import { Container, Input } from "reactstrap";

// scss
import "./css/_contact.scss";

// components
import WhyUs from "../whyUs/whyUs";

// query
import { useQuery, useMutation } from "react-query";

// baseUrl
import { baseUrl } from "../../api/api";

// axios
import axios from "axios";

// map
import MapContainer from "../map/map";

// sweet alert
import swal from "sweetalert";

// jquery
import $ from "jquery";

// react i18
import { useTranslation } from "react-i18next";

// recaptcha
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const { t } = useTranslation();

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

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [content, setContent] = useState(null);
  const [gRecaptcharesponse, setGRecaptchaResponse] = useState(null);

  let params = {
    name: name,
    surname: surname,
    phone: phone,
    content: content,
    email: email,
    recaptcha: gRecaptcharesponse,
  };

  let mutation = useMutation(
    (form) => axios.post(baseUrl + "contact", params),
    {
      onSuccess: function (data) {
        if (data.status === 200) {
          swal({
            title: t("Təbriklər"),
            text: t("Mesajınız Uğurla göndərildi"),
            icon: "success",
            button: t("Bağla"),
          });

          setName();
          setEmail();
          setSurname();
          setPhone();
          setContent();

          $("#contact input").val("");

          $("#contact .formItem").removeClass("alert alert-danger");
          $("#contact .formItem").removeAttr("role");
          $(".perloaderOrder").removeClass("showPerloader");
        }
      },
      onError: function (error) {
        swal({
          title: "Mesajınız Göndərilmədi!",
          icon: "error",
          button: t("Bağla"),
        });

        $.each($("#contact .formItem"), function (index, item) {
          if ($(item).val() === "") {
            $(item).addClass("alert alert-danger");
            $(item).attr("role", "alert");
          } else {
            $(item).removeClass("alert alert-danger");
            $(item).removeAttr("role", "alert");
          }
        });
      },
    }
  );

  const onVerify = (recaptchaResponse) => {
    setGRecaptchaResponse(recaptchaResponse);
  };

  return (
    <main className="contact">
      <div
        className="rules__banner"
        style={{
          backgroundImage: `url(${require("../../images/rules.png").default})`,
        }}
      >
        <Container>
          <h4 className="rules__title staticH4">{t("ƏLAQƏ")}</h4>
        </Container>
      </div>
      <div className="perloaderOrder">
        <div
          style={{
            height: 300,
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
      </div>
      <Container>
        <div className="container">
          <div id="contact" action="" method="post">
            <div className="info__content">
              <div className="formBox">
                <div className="formItem">
                  <span>{t("Ad")}</span>
                  <Input
                    type="text"
                    tabIndex="1"
                    required
                    autoFocus
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem">
                  <span>{t("SOYAD")}</span>
                  <Input
                    type="email"
                    tabIndex="2"
                    required
                    onChange={(event) => {
                      setSurname(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem">
                  <span>{t("Telefon")}</span>
                  <Input
                    type="tel"
                    className="noString"
                    tabIndex="3"
                    required
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem">
                  <span>{t("Email")}</span>
                  <Input
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="formItem textareaa">
                  <span>{t("Mesajınız")}...</span>
                  <Input
                    tabIndex="5"
                    required
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 25,
                  marginTop: 25,
                }}
              >
                <ReCAPTCHA
                  sitekey="6Ld_GngaAAAAAP83xh6jeeUHJbJM7QXaFOnyQ_uE"
                  onChange={onVerify}
                />
              </div>
              <div className="login__sendBtn infoSend">
                <button
                  type="submit"
                  id="contact-submit"
                  data-submit="...Sending"
                  onClick={() => {
                    if (gRecaptcharesponse !== null) {
                      mutation.mutate(params);
                      document
                        .querySelector(".perloaderOrder")
                        .classList.add("showPerloader");
                    } else {
                      swal({
                        title: t("Mesajınız Göndərilmədi!"),
                        text: t("Google Recaptchani Doldurun!"),
                        icon: "error",
                        button: t("Bağla"),
                      });
                    }
                  }}
                >
                  {t("GÖNDƏR")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <WhyUs />
      <div id="map">
        {settings.isLoading === false && <MapContainer locations={locate} />}
      </div>
    </main>
  );
};

export default Contact;
