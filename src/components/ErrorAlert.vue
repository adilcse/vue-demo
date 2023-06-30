<template>
    <div v-show="hasError">
        <div class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ErrorAlert',
    props: {
        hasError: {
            type: Boolean,
            default: false,
        },
        errorMessage: {
            type: String,
            default: '',
        },
    },
};
</script>
  
<style scoped>
.alert {
    margin-top: 1rem;
}
</style>
  