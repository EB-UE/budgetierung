<template>
  <v-btn @click="downloadAsCSV">
    Budgetierung als CSV-Datei herunterladen</v-btn
  >
</template>

<script>
import { store } from "@/components/store";
export default {
  methods: {
    downloadAsCSV() {
      const csvString = [
        ["\"Frage\"", "\"Antwort\"", "\"Kosten\""],
        ...store.antworten.map((item) => [
          `"${item.titel}"`,
          `"${item.antwort}"`,
          `"${item.kosten}"`,
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