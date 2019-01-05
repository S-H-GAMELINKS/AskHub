<template>
<div>
    <h1>{{title}}</h1>
    <div class="input-group">
        <div class="input-group-append">
            <span class="input-group-text">Input talk</span>
        </div>
        <input type="text" class="form-control" v-model="content"> 
    </div>
    <p>
        <button type="button" class="btn btn-primary" v-on:click="createTalk">Submit</button>
    </p>
    <p v-for="(talk, key, index) in talks" :key="index">
        {{talk.content}}
    </p>
</div>
</template>

<script>
import axios from 'axios';
import store from '../../store/store';

export default {
    data: function() {
        return {
            title: "",
            talks: [],
            content: "",
            database: this.$store.state.database
        }
    },
    mounted: function() {
        this.getTalks();
    },
    methods: {
        getTalks: function() {
            const data = this.database.ref('askhub' + String(this.$route.path).replace(/\/chatrooms/, ''));

            data.on("value", (snapshot) => {
                const askhub = Object.entries(snapshot.val());

                this.title = askhub[askhub.length - 1][1];

                this.talks.length = 0;

                for(var i = 0; i < askhub.length; i++) {
                    this.talks.push({id: askhub[i][0], content: askhub[i][1].content});
                }
                this.talks.reverse();
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
            })
        },
        createTalk: function() {
            this.talks.length = 0;

            this.database.ref('askhub' + String(this.$route.path).replace(/\/chatrooms/, '')).push({
                content: this.content,
            });
            this.content = "";
        },
    }
}
</script>
