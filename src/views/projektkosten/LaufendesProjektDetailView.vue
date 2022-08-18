<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row class="text-left">
      <v-col>
        <span class="text-h4">2020 03 02 TP01 BSM - TP Pfandbrieflizenz</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span>Externe Beratungskosten</span>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogBeratungskosten" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  class="mx-2"
                  fab
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">neue Beratungskosten hinterlegen</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueBeraterkosten[beratunsunternehmen]"
                          label="Beratungsunternehmen"
                          hint="Name des Beratungsunternehmens"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueBeraterkosten[beratungstätigkeit]"
                          label="Inhalte"
                          hint="Inhalte und Thema der Beratung"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueBeraterkosten[geplanteTage]"
                          label="Beratungstage"
                          hint="Anzahl der Beratungstage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueBeraterkosten[tagessatz]"
                          label="Kosten Pro Tag"
                          hint="Kosten Pro Tag ink Spesen und MwSt."
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueBeraterkosten[summe]"
                          label="Summe"
                          hint="Summe der geschätzten Kosten, falls kein Angebot vorliegt"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueBeraterkosten[jahr]"
                          label="Jahr"
                          hint="Das Jahr, in dem die Kosten anfallen"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-switch
                          v-model="neueBeraterkosten[genehmigung]"
                          label="Genehmigung"
                          hint="Wurden Aufwände für diese Beratung berets im Rahmen des Projektantrags oder eines separaten Beschlusses genehmigt?"
                          persistent-hint
                        ></v-switch>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueBeraterkosten[beschlussnummer]"
                          label="Beschlussnummer"
                          hint="Bitte Beschlussnummer der Genehmigung eintragen."
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="beratungskostenSchliessen">
                    abbrechen
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="neueBeratungskostenSpeichern"
                  >
                    hinterlegen
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="beraterHeader"
              :items="beraterkosten"
              :search="beraterSuche"
              :items-per-page="5"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="beraterSuche"
                  append-icon="mdi-magnify"
                  label="Suche"
                  single-line
                  hide-details
                >
                </v-text-field>
              </template>
              <template v-slot:item.Genehmigung="{ item }">
                <v-icon v-if="!!item.Genehmigung" color="green">
                  mdi-check-circle
                </v-icon>
                <v-icon v-else color="red">mdi-close-circle</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span>Sonstige Kosten</span>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogSonstigeKosten" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  small
                  fab
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">neue Sonstige Kosten hinterlegen</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-autocomplete
                          v-model="neueSonstigeKosten[kostenart]"
                          label="Kostenart"
                          hint="Auswahl der entsprechenden Kostenart"
                          auto-select-first
                          :items="[
                            'Investition (Kauf von Hardware)',
                            'Investition (Kauf sonst. Anlagegüter)',
                            'Investition (Kauf von Software)',
                            'Investition (Entwicklung von Individualsoftware)',
                            'Lizenzkosten (SaaS Lösung)',
                            'Bewirtung',
                          ]"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueSonstigeKosten[erläuterungen]"
                          label="Erläuterungen"
                          hint="Beschreibung der Sonstigen Ausgaben"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueSonstigeKosten[kosten]"
                          label="Kosten"
                          hint="Kosten inkl. Mwst. (einmalig)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueSonstigeKosten[folgekosten]"
                          label="Folgekosten"
                          :hint="'Folgekosten inkl. MwSt. p.a. (außerhalb des Projekts) (z.\u00A0B. Lizenzgebühren, die später in der Linie berücksichtigt werden müssen)'"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          v-model="neueSonstigeKosten[kostenstelle]"
                          label="Kostenstelle"
                          hint="Kostenstelle bzw. Direktion/ Abteilung, die voraussichtlich diese Folgekosten einplanen müssen"
                          auto-select-first
                          :items="[
                            'Kommunikation & Marketing (600316)',
                            'Kundenveranstaltungen (499970)',
                            'Change Unit (600111)',
                            'Revision (600113)',
                            'Strategie & Nachhaltigkeit Leitung & Stab (610131)',
                            'CSR & Sustainable Finance (610111)',
                          ]"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueSonstigeKosten[jahr]"
                          label="Jahr"
                          hint="Das Jahr, in dem die Kosten anfallen"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-switch
                          v-model="neueSonstigeKosten[genehmigung]"
                          label="Genehmigung"
                          hint="Wurde die sonst. Kosten bereits im Rahmen des Projektantrags oder eines separaten Beschlusses genehmigt?"
                          persistent-hint
                        ></v-switch>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueSonstigeKosten[beschlussnummer]"
                          label="Beschlussnummer"
                          hint="Bitte Beschlussnummer. der Genehmigung eintragen."
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialogSonstigeKosten = false">
                    abbrechen
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="dialogSonstigeKosten = false"
                  >
                    hinterlegen
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="sonstigeKostenHeader"
              :items="sonstigeKosten"
              :search="sonstigeKostenSuche"
              :items-per-page="5"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="sonstigeKostenSuche"
                  append-icon="mdi-magnify"
                  label="Suche"
                  single-line
                  hide-details
                >
                </v-text-field>
              </template>
              <template v-slot:item.Genehmigung="{ item }">
                <v-icon v-if="!!item.Genehmigung" color="green">
                  mdi-check-circle
                </v-icon>
                <v-icon v-else color="red">mdi-close-circle</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span>Ressourcen</span>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogRessourcen" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  small
                  fab
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">neue Ressource hinterlegen</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-autocomplete
                          v-model="neueRessource[abteilung]"
                          label="Abteilung"
                          hint="Auswahl der entsprechenden Abteilung"
                          auto-select-first
                          :items="[
                            'Strategieentwicklung',
                            'CSR & SF',
                            'Gesamtbanksteuerung',
                            'Comliance',
                            'Recht',
                            'Gremien',
                          ]"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="neueRessource[personentage]"
                          label="Personentage"
                          hint="Anzhal der Personentage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          v-model="neueRessource[jahr]"
                          label="Jahr"
                          hint="Das Jahr, in dem die Kosten anfallen"
                          :items="[
                            new Date().getFullYear() + 0,
                            new Date().getFullYear() + 1,
                            new Date().getFullYear() + 2,
                            new Date().getFullYear() + 3,
                          ]"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialogRessourcen = false">
                    abbrechen
                  </v-btn>
                  <v-btn color="primary" text @click="dialogRessourcen = false">
                    hinterlegen
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="ressourcenHeader"
              :items="ressourcen"
              :search="ressourcenSuche"
              :items-per-page="5"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="ressourcenSuche"
                  append-icon="mdi-magnify"
                  label="Suche"
                  single-line
                  hide-details
                >
                </v-text-field>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const beratunsunternehmen = "Beraterunternehmen";
const beratungstätigkeit = "Beratungstätigkeit";
const geplanteTage = "GeplanteTage";
const tagessatz = "Tagessatz";
const summe = "Summe";
const jahr = "Jahr";
const genehmigung = "Genehmigung";
const beschlussnummer = "Beschlussnummer";

const kostenart = "Kostenart";
const erläuterungen = "Erläuterungen";
const kosten = "Kosten";
const folgekosten = "Folgekosten";
const kostenstelle = "Kostenstelle";

const abteilung = "Abteilung";
const personentage = "personentage";
export default {
  data: () => ({
    dialogBeratungskosten: false,
    beratunsunternehmen,
    beratungstätigkeit,
    geplanteTage,
    tagessatz,
    summe,
    jahr,
    genehmigung,
    beschlussnummer,
    neueBeraterkosten: {},
    beraterSuche: "",
    beraterHeader: [
      { text: "Beraterunternehmen", value: beratunsunternehmen },
      { text: "Inhalte", value: beratungstätigkeit },
      { text: "Beratungstage", value: geplanteTage },
      { text: "Kosten pro Tag", value: tagessatz },
      { text: "Summe", value: summe },
      { text: "Jahr", value: jahr },
      { text: "Genehmigung", value: genehmigung },
      { text: "Beschlussnummer", value: beschlussnummer },
    ],
    beraterkosten: [
      {
        [beratunsunternehmen]: "Beispiel Consult GmbH",
        [beratungstätigkeit]:
          "Beratung bezüglich der Darstellung dieser Tabelle.",
        [geplanteTage]: 2,
        [tagessatz]: "1000\u00A0€",
        [summe]: "2000\u00A0€",
        [jahr]: 2022,
        [genehmigung]: true,
        [beschlussnummer]: "0815",
      },
      {
        [beratunsunternehmen]: "EB – Einfache Beratung",
        [beratungstätigkeit]: "Einfache Beratung in extravaganten Bereichen.",
        [geplanteTage]: 52,
        [tagessatz]: "5252\u00A0€",
        [summe]: "273104\u00A0€",
        [jahr]: 2022,
        [genehmigung]: false,
        [beschlussnummer]: "",
      },
    ],

    dialogSonstigeKosten: false,
    kostenart,
    erläuterungen,
    kosten,
    folgekosten,
    kostenstelle,
    neueSonstigeKosten: {},
    sonstigeKostenSuche: "",
    sonstigeKostenHeader: [
      { text: "Kostenart", value: kostenart },
      { text: "Erläuterungen", value: erläuterungen },
      { text: "Kosten", value: kosten },
      { text: "Folgekosten", value: folgekosten },
      { text: "Kostenstelle", value: kostenstelle },
      { text: "Jahr", value: jahr },
      { text: "Genehmigung", value: genehmigung },
      { text: "Beschlussnummer", value: beschlussnummer },
    ],
    sonstigeKosten: [
      {
        [kostenart]: "Investition (Kauf von Hardware)",
        [erläuterungen]: "Wir haben zu wenig Hardware",
        [kosten]: "5\u00A0€",
        [folgekosten]: "5000\u00A0€",
        [kostenstelle]: "Revision (600113)",
        [jahr]: "2022",
        [genehmigung]: true,
        [beschlussnummer]: "1337",
      },
    ],

    dialogRessourcen: false,
    abteilung,
    personentage,
    neueRessource: {},
    ressourcenSuche: "",
    ressourcenHeader: [
      { text: "Abteilung", value: abteilung },
      { text: "Personentage", value: personentage },
      { text: "Jahr", value: jahr },
    ],
    ressourcen: [
      {
        [abteilung]: "Recht",
        [personentage]: "2\u00A0PT",
        [jahr]: "2022",
      },
    ],
  }),
  methods: {
    neueBeratungskostenSpeichern() {
      this.beraterkosten.push({ ...this.neueBeraterkosten });
      this.neueBeraterkosten = {};
      this.dialogBeratungskosten = false;
    },
    beratungskostenSchliessen() {
      this.dialogBeratungskosten = false;
    },
  },
};
</script>

<style>
</style>