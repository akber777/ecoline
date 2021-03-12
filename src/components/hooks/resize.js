import React, { useLayoutEffect } from "react";

// jquery
import $ from "jquery";

// router dom
import { useLocation } from "react-router-dom";

const Resize = () => {
  let { pathname } = useLocation();

  useLayoutEffect(() => {
    var footer_height = $("footer").height(),
      header_height = $("header").height(),
      plus_height = footer_height + header_height,
      window_height = $(window).height(),
      new_height = window_height - plus_height;

    if ($("main").height() < window_height) {
      $("main").css({
        "min-height": new_height,
      });
    }
  }, [pathname]);

  return <></>;
};

export default Resize;
