require([
  "esri/config",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/widgets/Expand"
],
  function (
    esriConfig,
    WebMap,
    MapView,
    Search,
    Expand) {

    esriConfig.apiKey = "AAPKb9becb95935d4788b35eeba2a1f68e65pLS6pnpLbXOpyzu2WDMoLSqM-ITUCqIMhZ6ySKICKiEuVKdMACfrueVJp_xKC2_X";

    var map = new WebMap({
      portalItem: {
        id: "3a458ddc88c041be988ad59c8bdf6ce9"
      }
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.2437, 34.0522],
      zoom: 10
    });

    const search = new Search();
    view.ui.add(search, "top-right");


    const li = document.createElement("div")
    li.id = "listDiv"

    async function addLi() {
      const frag = document.createDocumentFragment();
      const foundLayer = map.layers.find((layer) => {
        return layer.title == "Aggregation_of_Hospitals_to_California_City_Boundaries"
      });
      foundLayer.queryFeatures().then((results) => {
        graphics = results.features;
        graphics.forEach((item) => {
          const attributes = item.attributes;
          const name = attributes.NAME;
          var city = document.createElement("li");
          city.textContent = name;
          city.classList.add("block");
          city.addEventListener("click", () => {
            view.goTo(item);
            view.popup.open({
              features: [item],
              updateLocationEnabled: true
            });
          })
          frag.appendChild(city);
        }),
          li.appendChild(frag);
      })
    }

    async function secondFun() {
      map.when(() => {
        addLi();
      })
      const listExpand = new Expand({
        expandIconClass: "esri-icon-layer-list",
        content: li
      });
      view.ui.add(listExpand, "top-left");
    }

    secondFun();

  });

