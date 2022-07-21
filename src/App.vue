<template>
  <v-app>
    <v-navigation-drawer app flat clipped>
      <v-list nav>
        <!-- <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/11.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Doe</v-list-item-title>
      </v-list-item> -->
        <v-list-group
          v-for="(group, index) in navigation"
          :key="index"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="group.name"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(child, index) in group.children"
            :key="index"
            :to="child.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#5a2873" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAaVBMVEX////+/f75+Pr59/n6+fv+/v7y8PTo5Orn5Onl3eni2ebp4uz8/P3Cs8p2VolxToXe1OPm3ur8+/27q8RiN3laKHNhN3je1ePm3+pjOXlbKnTs5u79/P3KvtGOdp2KcZn+/v/18/b08/WUonskAAAAAW9yTlQBz6J3mgAAAcVJREFUeNrt27uS2kAQQFE0CAnQAwMyCyzv//9IB6g2kRN3qcq12nPzmdYhIpiezSRJGqEszSPli/54US4DlUX2Pr/IQ+NTNoCk1TpSVb+P5027CdQ2+ft8XYXGr9IAMl//irTd9b/DvvsdqNv3X7Lbhsav5+NDDhHIAQQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE5H9CPo5fkNM50OkLcvwYCZJX20DHz0t//Hq7B7pd+1eml89jZH6VDyCLehepd8we6fkK9EyP/oJLaHy9mEnS9y7LU6T8Mc74R3D8cO2iaPaRrinw1X8pXUPjm2JwU9l2h3/vdHuOA3neToHxXVsOblpuIn/6zvfXOJDX/RyZv1mCgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIBMCzKZx5mTeS47mQfMkvS9msz63mQWKiez4vrDl45BQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH48pItAuvEhabWOVNXv43nTbgK1Tf9MtK5C41fDrY8szSPl/cPbrCiXgcqi35tY5KHxydqFJGmU/gCyJTGaOIxw7wAAAABJRU5ErkJggg=="
          transition="scale-transition"
          width="40"
        />

        <span>EB – Effiziente Budgetierung</span>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { routeNames } from "@/router/index.js";
import { store } from "@/components/store";

export default {
  name: "App",
  mounted() {
    this.$root.$on(
      "antworten",
      (newAntworten) => (store.antworten = newAntworten)
    );
  },
  data: () => ({
    //
    navigation: [
      {
        name: "Sachkosten",
        children: [
          { name: "Räume und Gebäude" },
          { name: "Geschäftsausstattung" },
          { name: "Bürokosten" },
          { name: "Outsourcing" },
          {
            name: "Datenverarbeitung und IT",
            to: { name: routeNames.DatenverarbeitungUndIt },
          },
          { name: "Beratung" },
          { name: "Leasing und Betrieb Kfz" },
          { name: "Marketing und Öffentlichkeitsarbeit" },
          { name: "AfA Software" },
          { name: "Umgelegte Fiduciakosten" },
          { name: "Umgelegte Standortkosten" },
          { name: "Reise und Bewirtung" },
          { name: "Weiterbildung" },
        ],
      },
      {
        name: "Personalkosten",
        children: [{ name: "Personalanwerbung" }, { name: "Löhne & Gehälter" }],
      },
      {
        name: "Projektkosten",
        children: [],
      },
      {
        name: "Reports",
        children: [{ name: "CSV Export", to: { name: routeNames.CSVExport } }],
      },
    ],
  }),
};
</script>
