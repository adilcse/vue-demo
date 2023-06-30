<template>
    <div class="mb-4">
        <b-form-group
        :id="inputId + 'input-group'"
         :label-for="inputId">
         <template v-slot:label>
            <span v-html="myLabel"></span>
        </template>
        <b-form-select
          :id="inputId"
          v-model="selectedCategory"
          required
          class="w-100 form-control"
        >
        <b-form-select-option :value="''" disabled>Please select an option</b-form-select-option>
        <b-form-select-option  v-for="category in categories" :value="category" :key="category">
            {{ category }}
        </b-form-select-option>
    </b-form-select>
      </b-form-group>
    </div>
</template>
  
<script>
export default {
    name: 'MySelectField',
    props: {
        value: {
            type: String,
            default: '',
        },
        label: String,
        name: String,
        categories: {
            type: Array,
            default: () => ['GENERAL', 'ST', 'SC', 'OBC']
        }
    },
    data() {
        return {
            selectedCategory: this.value,
        };
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
        selectedCategory: {
            handler(newValue) {
                this.$emit('input', newValue);
            },
            deep: true
        },
    },
    methods: {
        handleChange() {
            this.$emit('onKeyUp', this.selectedCategory);
        },
    },
};
</script>
  
<style scoped>
.required {
    color: red;
}
</style>
  