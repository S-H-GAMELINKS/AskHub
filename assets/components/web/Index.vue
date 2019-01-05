<template>
<div>
    <h1>Index Pages</h1>
    <p>AskHub is asking programming & code!</p>
    <button v-if="!this.$store.state.session" v-on:click="loginAskHub" class="btn btn-primary">Login to GitHub</button>    
</div>    
</template>

<script>
import router from '../../router/router';
export default {
    moutnted: function() {
        this.userLogin();
    },
    methods: {
        userLogin: function() {
            const firebase = this.$store.state.firebase;
            firebase.auth().onAuthStateChanged((response) => {
                if (response) {
                    this.$store.commit('getSession', true);
                    router.push({path: '/'});
                } else {
                    this.$store.commit('getSession', false);
                    router.push({path: '/'});
                }
            }, (error) => {
                console.log(error);
            });
        },
        loginAskHub: function() {
            const firebase = this.$store.state.firebase;

            const provider = this.$store.state.provider;

            firebase.auth().signInWithPopup(provider).then((response) => {
                this.$store.commit('loginAskHub', response.user.uid);
                this.$store.commit('setUserName', response.additionalUserInfo.profile.name);
            }, (error) => {
                console.log(error)
            })
            this.userLogin();
        }
    }
}
</script>