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
          :item-class="istBeantwortetClass"
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

          <template v-slot:[itemAnzahl]="{ item }">
            <v-autocomplete
              v-model="item[anzahl]"
              label="Anzahl der Lizenzen"
              hint="sowohl aktiv genutzt, als auch passiv"
              auto-select-first
              :items="[...Array(16).keys()]"
            >
            </v-autocomplete>
          </template>

          <template v-slot:[itemGesamtkosten]="{ item }">
            {{ item[kostenProLizenz] * item[anzahl] || 0 }}{{ " €" }}
          </template>

          <template v-slot:[itemErledigt]="{ item }">
            <v-icon v-if="istBeantwortet(item)" color="green">
              mdi-check-circle
            </v-icon>
            <v-icon v-else color="red">mdi-close-circle</v-icon>
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
const erledigt = "Erledigt";
const sachkostenunterart = "Sachkostenunterart";

export default {
  methods: {
    kostenAllerLizenzen() {
      return this.lizenzenMitGruppen
        .map((x) => x.einzelkosten * this.antworten[x.name] || 0)
        .reduce((prev, next) => prev + next, 0);
    },
    istBeantwortet(item) {
      return (item[erledigt] = item[anzahl] != null);
    },
    // istBeantwortetClass(item) {
    // return this.istBeantwortet(item) ? "grey lighten-1" : "";
    // },
  },
  data: () => ({
    itemAnzahl: `item.${anzahl}`,
    itemGesamtkosten: `item.${gesamtkosten}`,
    itemErledigt: `item.${erledigt}`,
    lizenzeSearch: null,
    lizenzname,
    kostenProLizenz,
    anzahl,
    gesamtkosten,
    sachkostenunterart,
    erledigt,
    antworten: {},
    lizenzHeader: [
      { text: lizenzname, value: lizenzname },
      { text: kostenProLizenz, value: kostenProLizenz },
      { text: anzahl, value: anzahl },
      { text: gesamtkosten, value: gesamtkosten },
      { text: erledigt, value: erledigt },
    ],

    lizenzenMitGruppen: [
      {
        [lizenzname]: "Asana",
        [kostenProLizenz]: 13.49 * 12,
        [sachkostenunterart]: "Softwarelizenzen Drittanbieter",
        [anzahl]: null,
        [erledigt]: false,
      },
      {
        [lizenzname]: "agree21VPN",
        [kostenProLizenz]: 19 * 12,
        [sachkostenunterart]: "Softwarelizenzen Atruvia",
        [anzahl]: null,
        [erledigt]: false,
      },
      {
        [lizenzname]: "Basispaket Cloud",
        [kostenProLizenz]: 212.64,
        [sachkostenunterart]: "Softwarelizenzen Atruvia",
        [anzahl]: null,
        [erledigt]: false,
      },
      {
        [lizenzname]: "Microsoft Office 365",
        [kostenProLizenz]: 140.64,
        [sachkostenunterart]: "Softwarelizenzen Drittanbieter",
        [anzahl]: null,
        [erledigt]: false,
      },
      {
        [lizenzname]: "Doksharing",
        [kostenProLizenz]: 30,
        [sachkostenunterart]: "Softwarelizenzen Atruvia",
        [anzahl]: null,
        [erledigt]: false,
      },
      {
        [lizenzname]: "Bloomberg Terminal",
        [kostenProLizenz]: 20_000,
        [sachkostenunterart]: "Softwarelizenzen Drittanbieter",
        [anzahl]: null,
        [erledigt]: false,
      },
    ],
  }),
};
</script>

<style>
</style>
