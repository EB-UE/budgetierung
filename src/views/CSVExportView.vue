<template>
  <v-btn @click="downloadAsCSV">
    Budgetierung als CSV-Datei herunterladen
  </v-btn>
</template>

<script>
import { store } from "@/components/store";
const deutschesZahlenformat = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default {
  methods: {
    downloadAsCSV() {
      const csvString = [
        ['"Frage"', '"Antwort"', '"Kosten"'],
        ...store.antworten.map((item) => [
          `"${item.titel}"`,
          `"${item.antwort}"`,
          `"${deutschesZahlenformat.format(item.kosten)}"`,
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");
      this.$downloadjs(csvString, "Kosten.csv", "text/csv");
    },
  },
};
</script>

<style>
</style>