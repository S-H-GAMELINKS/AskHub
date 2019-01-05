import Vue from 'vue/dist/vue.esm';
import Router from '../router/router';
import Store from '../store/store';
import Header from '../components/layouts/Header.vue';
import * as  Bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'highlight.js/styles/default.css';
import Highlight from 'vue-markdown-highlight';

Vue.use(Highlight);
Vue.use(Bootstrap);

const app = new Vue({
    router: Router,
    store: Store,
    el: '#app',
    components: {
        'nav-bar': Header
    }
})