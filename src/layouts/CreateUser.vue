<template>
    <div>
        <InputName label="Name" placeholder="Enter your full name" name="name" :value="userData.name"
            v-on:input="(value) => handleInputChange('name', value)"></InputName>
        <SelectCategory name="catagory" label="Catagory" :value="userData.catagory"
            v-on:input="(value) => handleInputChange('catagory', value)"></SelectCategory>
        <RadioGender name="type" label="Gender" :value="userData.type"
            v-on:input="(value) => handleInputChange('type', value)"></RadioGender>
    </div>
</template>
  
<script>
import InputName from '../components/MyInputField.vue';
import SelectCategory from '../components/MySelectField.vue';
import RadioGender from '../components/MyRadioField.vue';

export default {
    name: 'CreateUser',
    components: {
        InputName,
        SelectCategory,
        RadioGender,
    },
    props: {
        mode: String,
        userData: Object,
    },
    methods: {
        onKeyUp() {
            console.log("key up")
        },
        handleInputChange(type, value) {
            this.$emit('input', { type, value });
        },
    },
};
</script>
  
<style scoped>
.required {
    color: red;
}
</style>
  