import React, { useState } from "react";

// reactstrap
import { Container } from "reactstrap";

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
  const [phone, setPhone] = useState(null);
  const [content, setContent] = useState(null);
  const [gRecaptcharesponse, setGRecaptchaResponse] = useState(null);

  let params = {
    name: name,
    surname: surname,
    phone: phone,
    content: content,
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
          setSurname();
          setPhone();
          setContent();

          $("#contact input,textarea").val("");

          $("#contact input,textarea").removeClass("alert alert-danger");
          $("#contact input,textarea").removeAttr("role");
        }
      },
      onError: function (error) {
        swal({
          title: "Mesajınız Göndərilmədi!",
          icon: "error",
          button: t("Bağla"),
        });

        $.each($("#contact fieldset input,textarea"), function (index, item) {
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
      <Container>
        <div className="container">
          <h1>{t("ƏLAQƏ")}</h1>
          <div id="contact" action="" method="post">
            <fieldset>
              <input
                placeholder={t("Ad")}
                type="text"
                tabIndex="1"
                required
                autoFocus
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </fieldset>
            <fieldset>
              <input
                placeholder={t("SOYAD")}
                type="email"
                tabIndex="2"
                required
                onChange={(event) => {
                  setSurname(event.target.value);
                }}
              />
            </fieldset>
            <fieldset>
              <input
                placeholder={t("NÖMRƏ")}
                type="tel"
                className="noString"
                tabIndex="3"
                required
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </fieldset>
            <fieldset>
              <textarea
                placeholder={t("Mesajınız...")}
                tabIndex="5"
                required
                onChange={(event) => {
                  setContent(event.target.value);
                }}
              ></textarea>
            </fieldset>
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
            <fieldset>
              <button
                type="submit"
                id="contact-submit"
                data-submit="...Sending"
                onClick={() => {
                  if (gRecaptcharesponse !== null) {
                    mutation.mutate(params);
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
            </fieldset>
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
