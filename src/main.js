import Vue from "vue";
import Notifications from "vue-notification";
import router from "./router";
import "animate.css";
import "@/plugins/index.js";
import "@/plugins/bootstrap-vue.js";
import "@/plugins/smartland.js";
// import "@/components/index.js";
import GmapVue from "gmap-vue";
import App from "./App.vue";
import "@/assets/scss/index.scss";
import { getImageURLMixin } from "@/mixins";

Vue.mixin(getImageURLMixin);
Vue.use(Notifications);
Vue.use(GmapVue, {
  load: {
    region: "IT",
    language: "it",
    // [REQUIRED] This is the unique required value by Google Maps API
    key: import.meta.env.VITE_GOOGLE_API_PLACES,
    // [OPTIONAL] This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
    libraries: "places",

    // [OPTIONAL] If you want to set the version, you can do so:
    v: "3.26",

    // This option was added on v3.0.0 but will be removed in the next major release.
    // If you already have an script tag that loads Google Maps API and you want to use it set you callback
    // here and our callback `GoogleMapsCallback` will execute your custom callback at the end; it must attached
    // to the `window` object, is the only requirement.
    customCallback: "MyCustomCallback",
  },

  // [OPTIONAL] If you intend to programmatically custom event listener code
  // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  // you might need to turn this on.
  autoBindAllEvents: false,

  // [OPTIONAL] If you want to manually install components, e.g.
  // import {GmapMarker} from 'gmap-vue/src/components/marker'
  // Vue.component('GmapMarker', GmapMarker)
  // then set installComponents to 'false'.
  // If you want to automatically install all the components this property must be set to 'true':
  installComponents: true,

  // Load the Google Maps API dynamically, if you set this to `true` the plugin doesn't load the Google Maps API
  dynamicLoad: false,
});

new Vue({
  provide() {
    return {
      $bvModal: this.$bvModal,
      callMeBackFormOptions: {
        phoneFieldAttrs: {
          placeholder: "Inserisci il tuo numero di cellulare",
        },
        submitBtnText: "Ti Chiamiamo noi",
        submitBtnVariant: "success",
        submitBtnClasses: "text-uppercase",
        privaciesOptions: {
          uncheckedValue: 0,
          checkedValue: 1,
          checkAllChildren: true,
          uncheckAllChildren: true,
          collapseToggleText: this.$landing.params.get("collapseToggleText"),
        },
      },
    };
  },
  router,
  render: (h) => h(App),
}).$mount("#app");
