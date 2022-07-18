<template>
  <v-carousel v-model="model" hide-delimiters :show-arrows="false">
    <v-carousel-item v-for="(fragenpaar, index) in fragenpärchen" :key="index">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card v-if="fragenpaar[0]" height="100%">
              <v-card-title
                >Wie viele Mitarbeitende haben eine Lizenz für
                {{ fragenpaar[0].titel }}?
              </v-card-title>
              <v-card-subtitle>
                Auch Lizenzen die nicht aktiv genutzt werden – aber in den
                Kosten aufgenommen werden müssen.
              </v-card-subtitle>
              <v-card-text>
                <v-select
                  :items="[...Array(16).keys()]"
                  label="Anzahl Mitarbeitende"
                  v-model="antworten[fragenpaar[0].id]"
                ></v-select>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card v-if="fragenpaar[1]" height="100%">
              <v-card-title
                >Wie viele Mitarbeitende haben eine Lizenz für
                {{ fragenpaar[1].titel }}?
              </v-card-title>
              <v-card-subtitle>
                Auch Lizenzen die nicht aktiv genutzt werden – aber in den
                Kosten aufgenommen werden müssen.
              </v-card-subtitle>
              <v-card-text>
                <v-select
                  :items="[...Array(16).keys()]"
                  label="Anzahl Mitarbeitende"
                  v-model="antworten[fragenpaar[1].id]"
                ></v-select>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-actions>
                <v-btn @click="model--">vorherige Frage</v-btn>
                <v-spacer></v-spacer>
                <span>{{ index + 1 }}/{{ fragenpärchen.length }}</span>
                <v-spacer></v-spacer>
                <v-btn @click="model++">nächste Frage</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  created() {
    this.kostenById = this.kosten.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.id]: {
          id: curr.id,
          titel: curr.titel,
          einzelkosten: curr.einzelkosten,
        },
      };
    }, {});
  },
  data: () => ({
    model: null,
    kostenById: {},
    antworten: {},
    kosten: [
      {
        id: 1,
        titel: "Wie viele Mitarbeitende haben eine Lizenz für Asana?",
        einzelkosten: 132,
      },
      {
        id: 2,
        titel: "Wie viele Mitarbeitende haben eine Lizenz für agree21VPN?",
        einzelkosten: 228,
      },
      {
        id: 3,
        titel:
          "Wie viele Mitarbeitende haben eine Lizenz für Basispaket Cloud?",
        einzelkosten: 212.64,
      },
    ],
  }),
  computed: {
    fragenpärchen() {
      return this.kosten.reduce(function (result, value, index, array) {
        if (index % 2 === 0) {
          result.push(array.slice(index, index + 2));
        }
        return result;
      }, []);
    },
  },
  watch: {
    antworten: {
      handler: function (newValue) {
        const antworten = [];
        Object.entries(newValue).map(([key, value]) => {
          antworten.push({
            id: this.kostenById[key].id,
            titel: this.kostenById[key].titel,
            antwort: value,
            kosten: value * this.kostenById[key].einzelkosten,
          });
        });
        this.$root.$emit("antworten", antworten);
      },
      deep: true,
    },
  },
};
</script>

<style></style>


