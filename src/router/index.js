import Vue from "vue";
import VueRouter from "vue-router";
import RouterView from '@/views/RouterView.vue'

import HomeView from "../views/HomeView.vue";
import SliderView from "../views/SliderView.vue";
import CSVExportView from "../views/CSVExportView.vue";


Vue.use(VueRouter);

export const routeNames = {
  DatenverarbeitungUndIt: 'DatenverarbeitungUndIt',
  CSVExport: 'CSVExport'
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/slider",
    name: "slider",
    component: RouterView,
    children: [
      {
        name: routeNames.DatenverarbeitungUndIt,
        path: 'Datenverarbeitung',
        component: SliderView,
      },      
    ]
  },
  {
    path: "/reports",
    name: "reports",
    component: RouterView,
    children: [
      {
        name: routeNames.CSVExport,
        path: 'csv-export',
        component: CSVExportView,
      },
    ]
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
