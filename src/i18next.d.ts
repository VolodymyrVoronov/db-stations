import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: {
        "autocomplete.loading": string;
        "autocomplete.placeholder": string;
        "sidebar.empty.title": string;
        "sidebar.empty.description": string;
        "error.title": string;
        "error.button": string;
        "error.message": string;
        "nothing.found": string;
        "theme.toggle": string;
        "theme.dark": string;
        "theme.light": string;
        "theme.system": string;
        "selected.station.amenity.parking": string;
        "selected.station.amenity.bicycleParking": string;
        "selected.station.amenity.wiFi": string;
        "selected.station.amenity.publicFacilities": string;
        "selected.station.amenity.steplessAccess": string;
        "selected.station.id": string;
        "selected.station.ril": string;
        "selected.station.category": string;
        "selected.station.management": string;
        "selected.station.controlCenter": string;
        "selected.station.federalState": string;
        "selected.station.weight": string;
        "selected.station.googleMaps": string;
      };
    };
  }
}
