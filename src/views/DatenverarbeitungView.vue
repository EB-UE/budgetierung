<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="text-h4"
          >Welche Lizenzen werden in deiner Abteilung genutzt?</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="lizenzHeader"
          :items="lizenzenMitGruppen"
          :search="lizenzeSearch"
          :items-per-page="5"
          :group-by="sachkostenunterart"
        >
          <template v-slot:top>
            <v-text-field
              v-model="lizenzeSearch"
              append-icon="mdi-magnify"
              label="Suche"
              single-line
              hide-details
            >
            </v-text-field>
          </template>

          <template v-slot:item.Anzahl="{ item }">
            <v-autocomplete
              v-model="antworten[item[lizenzname]]"
              label="Anzahl der Lizenzen"
              hint="sowohl aktiv genutzt, als auch passiv"
              auto-select-first
              :items="[...Array(16).keys()]"
            >
            </v-autocomplete>
          </template>
          <template v-slot:item.Gesamtkosten="{ item }">
            {{ item[kostenProLizenz] * antworten[item[lizenzname]] || 0
            }}{{ " €" }}
          </template>

          <template v-slot:footer>
            <p class="text-right">
              {{ `Kosten aller Lizenzen: ${kostenAllerLizenzen()} €` }}
            </p>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const lizenzname = "Lizenzname";
const kostenProLizenz = "Kosten pro Lizenz";
const anzahl = "Anzahl";
const gesamtkosten = "Gesamtkosten";
const sachkostenunterart = "Sachkostenunterart";

export default {
  methods: {
    kostenAllerLizenzen() {
      return this.licenses
        .map((x) => x.einzelkosten * this.antworten[x.name] || 0)
        .reduce((prev, next) => prev + next, 0);
    },
  },
  data: () => ({
    lizenzeSearch: null,
    lizenzname,
    kostenProLizenz,
    anzahl,
    gesamtkosten,
    sachkostenunterart,
    antworten: {},
    lizenzHeader: [
      { text: lizenzname, value: lizenzname },
      { text: kostenProLizenz, value: kostenProLizenz },
      { text: anzahl, value: anzahl },
      { text: gesamtkosten, value: gesamtkosten },
    ],

    lizenzenMitGruppen: [
      {
        [lizenzname]: "Asana",
        [kostenProLizenz]: 13.49 * 12,
        [sachkostenunterart]: "Softwarelizenzen Drittanbieter",
      },
      {
        [lizenzname]: "agree21VPN",
        [kostenProLizenz]: 19 * 12,
        [sachkostenunterart]: "Softwarelizenzen Atruvia",
      },
      {
        [lizenzname]: "Basispaket Cloud",
        [kostenProLizenz]: 212.64,
        [sachkostenunterart]: "Softwarelizenzen Atruvia",
      },
      {
        [lizenzname]: "Microsoft Office 365",
        [kostenProLizenz]: 140.64,
        [sachkostenunterart]: "Softwarelizenzen Drittanbieter",
      },
      {
        [lizenzname]: "Doksharing",
        [kostenProLizenz]: 30,
        [sachkostenunterart]: "Softwarelizenzen Atruvia",
      },
      {
        [lizenzname]: "Bloomberg Terminal",
        [kostenProLizenz]: 20_000,
        [sachkostenunterart]: "Leitungskosten Miet und Wartungsscheine",
      },
    ],
    licenses: [
      {
        [lizenzname]: "Asana",
        [kostenProLizenz]: 13.49 * 12,
      },
      {
        [lizenzname]: "agree21VPN",
        [kostenProLizenz]: 19 * 12,
      },
      {
        [lizenzname]: "Basispaket Cloud",
        [kostenProLizenz]: 212.64,
      },
      {
        [lizenzname]: "Microsoft Office 365",
        [kostenProLizenz]: 140.64,
      },
      {
        [lizenzname]: "Doksharing",
        [kostenProLizenz]: 30,
      },
      {
        [lizenzname]: "Bloomberg Terminal",
        [kostenProLizenz]: 20_000,
      },
    ],
  }),
};
</script>

<style>
</style>
