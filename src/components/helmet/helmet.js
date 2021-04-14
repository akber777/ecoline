import { Helmet } from "react-helmet";
import React from "react";

// recoil
import { useRecoilValue } from "recoil";

// atoms
import { titleHelmet } from "../atoms/atoms";

const HelmetApp = () => {
  let title = useRecoilValue(titleHelmet);

  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="icon" href={require("../images/favicon.jpg").default} />
      </Helmet>
    </div>
  );
};

export default HelmetApp;
