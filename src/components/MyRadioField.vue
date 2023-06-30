<template>
    <div class="mb-4">
        <b-form-group :id="inputId + 'input-group'" :label-for="inputId" @keyup="onKeyUp">
            <template v-slot:label>
                <span v-html="myLabel"></span>
            </template>
            <div class="container ">
                <div class="row">
                    <b-form-radio class="col" v-for="option in options" :key="option.value" v-model="selectedOption"
                        :name="name" :value="option.value">{{ option.label }}</b-form-radio>
                </div>
            </div>
        </b-form-group>
    </div>
</template>
  
<script>
export default {
    name: 'RadioGender',
    props: {
        value: {
            type: String,
            default: '',
        },
        label: String,
        name: String,
        options: {
            type: Array,
            default: () => [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
            ],
        }
    },
    computed: {
        inputId() {
            // Generate a unique ID for the input element
            return 'input_' + Math.random().toString(36).substr(2, 9);
        },
        myLabel() {
            return this.label + '<span class="required">*</span>'
        }
    },
    data() {
        return {
            selectedOption: this.value,
        };
    },
    watch: {
        selectedOption: {
            handler(newValue) {
                this.$emit('input', newValue);
            },
            deep: true
        },
    },
    methods: {
        handleChange() {
            this.$emit('change', this.selectedOption);
        },
    },
};
</script>
  
<style scoped>
.required {
    color: red;
}
</style>
  