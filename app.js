    require([
      "esri/config",
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/widgets/Search"
    ], 
    function (
      esriConfig,
      Map, 
      MapView, 
      FeatureLayer,
      Search) {

      esriConfig.apiKey = "AAPKb9becb95935d4788b35eeba2a1f68e65pLS6pnpLbXOpyzu2WDMoLSqM-ITUCqIMhZ6ySKICKiEuVKdMACfrueVJp_xKC2_X";

      var map = new Map({
        basemap: "gray-vector",
      });

      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.2437, 34.0522],
        zoom: 10
      });

      const countyBoundary = new FeatureLayer({
        url: "https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/California_County_Boundaries/FeatureServer"
      })

      map.add(countyBoundary);

      const search = new Search();
      view.ui.add(search, "top-right");
    });

