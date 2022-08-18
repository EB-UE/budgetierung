<template>
  <v-container>
    <v-row>
      <v-col cols="11">
        <span class="text-h4">Laufende Projekte</span>
      </v-col>
      <v-col cols="1">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab color="primary" v-bind="attrs" v-on="on">
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span>neues laufendes Projekt anlegen</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-subtitle>Bei einem Klick auf ein Projekt wird die Detailansicht geöffnet.</v-card-subtitle>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="projekte"
              :search="search"
              :items-per-page="5"
              @click:row="handleClick"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Suche"
                  single-line
                  hide-details
                >
                </v-text-field>
              </template>
            </v-data-table>
            <v-alert type="info">
              Themen, die hier (noch) nicht aufgeführt sind, bitte als
              Initiative planen (Tabellenblatt 3-5)
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { routeNames } from "@/router/index.js";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Projektname",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Gesamtkosten", value: "gesamtkosten" },
      ],
      projekte: [
        {
          name: "2020 03 02 TP01 BSM - TP Pfandbrieflizenz",
          gesamtkosten: 159,
        },
        {
          name: "2021 02 01 SRM",
          gesamtkosten: 237,
        },
        {
          name: "2021 03 04 Weiterentwicklung Vertriebssteuerung",
          gesamtkosten: 262,
        },
        {
          name: "2022 03 03 1,5°C",
          gesamtkosten: 305,
        },
        {
          name: "2021 01 02 Geschäftsprozessoptimierung (GPO)",
          gesamtkosten: 356,
        },
        {
          name: "2022 03 01 Wissensmanagement",
          gesamtkosten: 375,
        },
        {
          name: "2021 03 05 Neugestaltung Website",
          gesamtkosten: 392,
        },
        {
          name: "2022 03 02 ESG-Assessment",
          gesamtkosten: 408,
        },
        {
          name: "2022 02 01 Abfrage der Nachhaltigkeitspräferenz",
          gesamtkosten: 452,
        },
        {
          name: "EB-SIM 2021-01 Volley - Einführung PMS SimCorp Dimensions",
          gesamtkosten: 518,
        },
      ],
    };
  },
  methods: {
    handleClick() {
      this.$router.push({ name: routeNames.laufendesProjektDetail });
    },
  },
};
</script>

<style>
</style>