import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

// App.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyBPMY2ZLtMUs3JDz3wYYMgtxEZkKaOWLSc",
//     libraries: "places",
//     v: 3.38,
//   },
// })

createApp(App).use(store).use(router).mount("#app")
