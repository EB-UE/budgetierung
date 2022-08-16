import Vue from "vue";
import VueRouter from "vue-router";
import RouterView from '@/views/RouterView.vue'

import HomeView from "../views/HomeView.vue";
import SliderView from "../views/SliderView.vue";
import LaufendesProjektView from '../views/projektkosten/LaufendesProjektView.vue'
import LaufendesProjektDetailView from '../views/projektkosten/LaufendesProjektDetailView.vue'
import ProjektinitiativeView from '../views/projektkosten/ProjektinitiativeView.vue'

import CSVExportView from "../views/CSVExportView.vue";


Vue.use(VueRouter);

export const routeNames = {
  DatenverarbeitungUndIt: 'DatenverarbeitungUndIt',
  LaufendesProjekt: 'LaufendesProjekt',
  Projektinitiative: 'Projektinitiative',
  CSVExport: 'CSVExport',
  laufendesProjektDetail: 'detail',
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
    name: "projektkosten",
    path: "/projektkosten",
    component: RouterView,
    children: [
      {
        name: routeNames.LaufendesProjekt,
        path: 'laufendes-projekt',
        component: LaufendesProjektView,
      }, {
        name: routeNames.laufendesProjektDetail,
        path: 'laufendes-projekt/detail',
        component: LaufendesProjektDetailView,
      },
      {
        name: routeNames.Projektinitiative,
        path: 'projektinitiative',
        component: ProjektinitiativeView,
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
