<template>
    <div class="mb-4">
        <b-form-group
        :id="inputId + 'input-group'"
        :label-for="inputId"
        @keyup="onKeyUp"
      >
      <template v-slot:label>
        <span v-html="myLabel"></span>
      </template>
        <b-form-input
          :id="inputId"
          v-model="myValue"
          :placeholder="placeholder" maxlength="100"
          required
        ></b-form-input>
      </b-form-group>
    </div>
</template>
  
<script>
export default {
    name: 'InputName',
    props: {
        placeholder: {
            type: String,
            default: 'Enter your full name',
        },
        label: {
            type: String,
            default: 'Name',
        },
        name: String,
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            myValue: this.value
        }
    },
    computed: {
        inputId() {
            // Generate a unique ID for the input element
            return 'input_' + Math.random().toString(36).substr(2, 9);
        },
        myLabel () {
            return this.label + '<span class="required">*</span>'
        }
    },
    watch: {
        myValue: {
            handler(newValue) {
                this.$emit('input', newValue);
            },
            deep: true
        },
    },
    methods: {
        onKeyUp() {
            this.$emit('onKeyUp');
        },
    },
};
</script>
  
<style scoped>
.required {
    color: red;
}
</style>
  