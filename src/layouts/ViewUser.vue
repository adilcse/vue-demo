<template>
    <div>
        <div v-if="!usersList?.length">
            <h2>User list is currently empty! please add a user.</h2>
        </div>
        <div v-else class="card p-2 mb-2" v-for="user in usersList" :key="user.id">
        <ViewRow title="Name" :data="user.name" />
        <ViewRow title="Category" :data="user.catagory" />
        <ViewRow title="Gender" :data="user.type" />
        <MyButton label="Edit" :classes="['btn', 'edit-btn']" :buttonClick="() => onEditClick(user)" />
        <MyButton label="Delete" :classes="['btn', 'delete-btn']" :buttonClick=" () => deleteItem(user)"/>
        </div>
    </div>
  </template>
  
  <script>
  import ViewRow from '../components/ViewRow.vue';
  import MyButton from '../components/MyButton.vue';
  
  export default {
    name: 'VueUser',
    props: {
      usersList: Array,
      loading: Boolean,
    },
    components: {
      ViewRow,
      MyButton,
    },
    methods: {
      onEditClick(user) {
        console.log(user);
        this.$emit('onEditClick', user);
      },
      deleteItem(item) {
        this.$emit('onDeleteItem', item)
      },
    },
  };
  </script>
  