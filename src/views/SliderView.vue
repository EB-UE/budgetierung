<template>
  <v-carousel v-model="model" hide-delimiters>
    <v-carousel-item v-for="n in 25" :key="n">
      <v-card>
        <v-card-title> Wie viel Geld für {{ n }} </v-card-title>
        <v-card-subtitle>
          Denk dran, dass für den VPN auch kosten anfallen
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            label="kosten für Arbeitsplatz"
            suffix="€"
          ></v-text-field>

          <v-card-actions>
            <v-btn @click="model--">vorherige Frage</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="model++">nächste Frage</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data: () => ({
    model: null,
  }),
};
</script>

<style></style>


