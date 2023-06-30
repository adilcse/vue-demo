<template>
  <div class="form-success">
    <div class="alert alert-success" role="alert" style="text-align: center">
      <h4 class="alert-heading">Success!</h4>
      <p>Your request has been served!</p>
      <hr />
      <div @click="goToHome">
        <b-button variant="success">Go to Home</b-button>
      </div>
    </div>
  </div>
</template>
  
<script>

export default {
  name: 'FormSuccess',
  methods: {
    goToHome () {
      this.$store.dispatch("goToHome");
    }
  }
}
</script>
  
  