// axios
import axios from "axios";

// router dom
import { useHistory, useLocation } from "react-router-dom";

// query
import { useQuery } from "react-query";

// atoms
import { userInfo } from "../atoms/atoms";

// recoil
import { useRecoilState } from "recoil";

// queries
import { user } from "../queries/queries";

// atoms
import { error } from "../atoms/atoms";

function useQueryData() {
  return new URLSearchParams(useLocation().search);
}

export function SetToken() {
  let [err, setError] = useRecoilState(error);

  let history = useHistory();

  let { pathname } = useLocation();

  let query = useQueryData();

  let [userData, setUserData] = useRecoilState(userInfo);

  useQuery(["user", ""], user, {
    refetchOnWindowFocus: false,
    cacheTime:
      localStorage.getItem("token") && localStorage.getItem("user") === null
        ? 0
        : 5000,
    onSuccess: function (succ) {
      if (succ) {
        setUserData(succ.data);
      }
    },
  });

  if (query.get("token") !== null) {
    localStorage.setItem("token", query.get("token"));
  }

  axios.interceptors.request.use(function (config) {
    let token =
      localStorage.getItem("token") === null
        ? query.get("token")
        : localStorage.getItem("token");

    config.headers["locale"] = localStorage.getItem("i18nextLng");

    if (token) {
      config.headers["Authorization"] = "Bearer " + JSON.parse(token);
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  });

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      setError(error);

      // localStorage.removeItem("token");
      // localStorage.removeItem("user");
      // history.push({
      //   pathname: "/",
      // });

      // location.reload()

      if (error.response !== undefined) {
        if (error.response.status === 401) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user");

          if (
            pathname === "loginorder" ||
            pathname === "loginlocation" ||
            pathname === "logininformation" ||
            pathname === "passwordupdate"
          ) {
            history.push({
              pathname: "/signin",
            });
          }
        }

        if (error.response.status === 400) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user");

          if (
            pathname === "loginorder" ||
            pathname === "loginlocation" ||
            pathname === "logininformation" ||
            pathname === "passwordupdate"
          ) {
            history.push({
              pathname: "/signin",
            });
          }
        }
      }
    }
  );
}
