<template>
    <div class="mb-4">
        <label class="form-label">
            {{ label }} <span class="required">*</span>
        </label>
        <div class="w-100 d-flex gap-3">
            <span v-for="option in options" :key="option.value">
                <input :name="name" type="radio" :id="option.value" :value="option.value" v-model="selectedOption"
                    @change="handleChange" />
                <label :for="option.value">{{ option.label }}</label>
            </span>
        </div>
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
  