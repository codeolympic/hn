import Vue from 'vue'
import Vuex from 'vuex'
import News from './components/News'

Vue.use(Vuex);

new Vue({
    el: '#app',
    template: '<News/>',
    components: { News }
});
