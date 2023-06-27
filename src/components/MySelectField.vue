<template>
    <div class="mb-4">
        <label for="floatingMySelectField" class="form-label">
            {{ label }}<span class="required">*</span>
        </label>
        <select class="form-select form-control-lg" v-model="selectedCategory" id="floatingMySelectField"
            aria-label="Select Category" :name="name">
            <option value="">--Select--</option>
            <option v-for="category in categories" :value="category" :key="category">
                {{ category }}
            </option>
        </select>
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
  