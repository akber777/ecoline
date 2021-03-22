import renderHTML from "react-render-html";

// moment
import * as moment from "moment";
import "moment/locale/az";

// axios
import axios from "axios";

// baseUrl
import { baseUrl } from "../api/api";
import { data } from "jquery";

export const checkType = (data) => {
  // endResult.push(data.replace(myRegex, `<img src=${item} />`))

  if (data !== undefined) {
    let myRegex = /<img.*?src="(.*?)"[^>]+>/g;

    let result = data.search(myRegex);

    if (result > -1) {
      let myData = data.replaceAll(
        "/storage/",
        "http://apiecoline.gocreative.az/storage/"
      );

      return renderHTML(myData);
    } else {
      return renderHTML(data);
    }
  }
};

export function decimalAdjust(type, value, exp) {
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }

  value = +value;
  exp = +exp;
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }

  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));

  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}

let date = moment();

let month = date.format("MMMM");

let year = date.format("YYYY");

export function createDate(date) {
  let day = date.split(" ")[0].split("-")[2];

  let newDate = (() => {
    if (day.split("")[0] === "0") {
      return day.split("")[1];
    } else {
      return day;
    }
  })();

  return {
    newDate,
    month,
    year,
  };
}

export function capitalize(word) {
  if (typeof word !== "string") return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const checkedUrl = (type) => {
  if (type.type === "url") {
    return type.url;
  } else if (type.type === "header") {
    return "#";
  } else if (type.type === "static-page") {
    return `/${type.reference}`;
  } else {
    return "";
  }
};

export function multiTranslate() {
  async function getAllTranslation() {
    const res = await axios.get(baseUrl + "translation/messages");

    if (res.status === 200) {
      localStorage.removeItem("lang");
      localStorage.setItem("lang", JSON.stringify(res.data));
    }
  }

  getAllTranslation();
}
