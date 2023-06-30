<template>
  <b-button variant="outline-primary" :class="btnClasses" @click="buttonClick" :type="type">
    {{ label }}
  </b-button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    label: String,
    classes: Array,
    buttonClick: {
      type: Function,
      default: () => { }
    },
    submit: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    btnClasses() {
      return {
        ...this.classes.reduce((obj, className) => {
          obj[className] = true;
          return obj;
        }, {}),
      };
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .btn {
    width: 100%;
  }
}

.next_button {
  color: #fff;
  background-color: #0d6efd;
}

.edit-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: fit-content;
}

.edit-btn:hover {
  background-color: #0d6efd;
  color: white;
}

.delete-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: fit-content;
}

.delete-btn:hover {
  background-color: red;
  color: white;
}
</style>
