import React, { useRef, useEffect } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Expand from "@arcgis/core/widgets/Expand";
import Search from "@arcgis/core/widgets/Search";
import Legend from "@arcgis/core/widgets/Legend";
import Home from "@arcgis/core/widgets/Home";
import "./MapContainer.css";

const MapContainer = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const webmap = new WebMap({
        portalItem: {
          // autocasts as new PortalItem()
          id: "10f5128431d44f9180d9936834100ac5",
        },
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
      });

      const searchWidget = new Search({
        view: view,
      });

      const homeBtn = new Home({
        view: view,
      });

      // add a legend widget instance to the view
      // and set the style to 'card'. This is a
      // responsive style, which is good for mobile devices

      const legend = new Expand({
        content: new Legend({
          view: view,
          style: "card", // other styles include 'classic'
        }),
        view: view,
        expanded: true,
      });

      // Add the home button to the top left corner of the view
      view.ui.add(homeBtn, "top-left");

      // Add Legend to the bottom left corner of the view
      view.ui.add(legend, "bottom-left");

      // Add the search widget to the top right corner of the view
      view.ui.add(searchWidget, { position: "top-right" });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
};

export default MapContainer;
