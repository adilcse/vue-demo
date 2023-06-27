<template>
    <div class="mb-4">
        <label :for="inputId" class="form-label">
            {{ label }} <span class="required">*</span>
        </label>
        <input :name="name" type="text" @keyup="onKeyUp" v-model="myValue" class="form-control form-control-lg"
            :id="inputId" :placeholder="placeholder" maxlength="100" />
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
  