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
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Kosten pro Lizenz</th>
              <th></th>
              <th class="text-left">Gesamtkosten</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in licenses" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.einzelkosten }}{{ " €" }}</td>
              <td>
                <v-autocomplete
                  v-model="antworten[item.name]"
                  label="Anzahl der Lizenzen"
                  hint="sowohl aktiv genutzt, als auch passiv"
                  auto-select-first
                  :items="[...Array(16).keys()]"
                >
                </v-autocomplete>
              </td>
              <td>
                {{ item.einzelkosten * antworten[item.name] || 0 }}{{ " €" }}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                Kosten aller Lizenzen:
                <br />
                {{ kostenAllerLizenzen() }}{{ " €" }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    kostenAllerLizenzen() {
      return this.licenses
        .map((x) => x.einzelkosten * this.antworten[x.name] || 0)
        .reduce((prev, next) => prev + next, 0);
    },
  },
  data: () => ({
    antworten: {},
    licenses: [
      {
        name: "Asana",
        einzelkosten: 123,
      },
      {
        name: "agree21VPN",
        einzelkosten: 37,
      },
      {
        name: "Basispaket Cloud",
        einzelkosten: 45,
      },
    ],
  }),
};
</script>

<style>
</style>
