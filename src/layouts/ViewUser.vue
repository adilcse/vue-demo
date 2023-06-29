<template>
    <div>
      <div v-if="!userList || userList.length === 0">
        <h2>User list is currently empty! Please add a user.</h2>
      </div>
      <div v-else>
        <div class="card p-2 mb-2" v-for="user in userList" :key="user.id">
        <ViewRow title="Name" :data="user.name" />
        <ViewRow title="Category" :data="user.category" />
        <ViewRow title="Gender" :data="user.type" />
        <MyButton label="Edit" :classes="['btn', 'edit-btn']" :buttonClick="() => onEditClick(user)" />
        <MyButton label="Delete" :classes="['btn', 'delete-btn']" :buttonClick="() => deleteItem(user)" />
      </div>
      </div>
    </div>
  </template>
  
  
<script>
import ViewRow from '../components/ViewRow.vue';
import MyButton from '../components/MyButton.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'VueUser',
    props: {
        loading: Boolean,
    },
    components: {
        ViewRow,
        MyButton,
    },
    computed: {
    ...mapGetters([ 'userList']),
  },
    methods: {
        onEditClick(user) {
            this.$store.commit('onEditClick', user);
        },
        deleteItem(item) {
            this.$store.dispatch('deleteItem', item);
        },
    },
};
</script>
  