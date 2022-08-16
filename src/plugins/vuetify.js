import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

import de from 'vuetify/lib/locale/de'

export default new Vuetify({
    lang: {
        locales: { de, },
        current: 'de',
    },
    theme: {
        themes: {
            light: {
                primary: '#5a2873',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
});
