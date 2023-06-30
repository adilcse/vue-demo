<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h4><b>Vue Demo</b></h4>
            </div>
        </div>
        <div>
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="form-success">
                        <ul>
                            <li>
                                <MyButton label="View" :classes="['btn', mode === 'view' ? 'next_button' : '']"
                                    :buttonClick="() => modeChange('view')" />
                            </li>
                            <li>
                                <MyButton label="Create" :classes="['btn', mode === 'create' ? 'next_button' : '']"
                                    :buttonClick="() => modeChange('create')" />
                            </li>
                        </ul>
                    </div>

                    <FormSuccessVue v-if="success" />
                    <FormLoading v-else-if="loading" />
                    <b-form v-else @submit.prevent="onSubmit" method="post" role="form" class="php-email-form">
                        <ViewUser v-if="mode === 'view'" @onLoading="updateLoading"  />
                        <CreateUser v-else :mode="mode" :userData="userData" />
                        <ErrorAlert :hasError="hasError" :errorMessage="errorMessage" />
                        <div v-if="mode == 'create' || mode == 'edit'" class="text-right" style="text-align: right">
                            <MyButton label="Create" :classes="['btn', 'next_button']" type="submit" />
                        </div>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import FormLoading from '../components/FormLoading.vue';
import MyButton from '../components/MyButton.vue';
import ViewUser from './ViewUser.vue';
import CreateUser from './CreateUser.vue';
import FormSuccessVue from '../components/FormSuccess.vue';
import ErrorAlert from '../components/ErrorAlert.vue';
import { mapState } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate';

export default {
    name: 'MainForm',
    mixins: [validationMixin],
    components: {
        FormLoading,
        ViewUser,
        CreateUser,
        MyButton,
        FormSuccessVue,
        ErrorAlert
    },
    computed: {
    ...mapState(['userData', 'mode', 'success', 'loading', 'errorMessage', 'hasError']),
  },
  validations: {
        userData: {
            name: {
                required,
                minLength: minLength(3)
            },
            catagory: {
                required,
                oneOf: (value) => ['GENERAL', 'ST', 'SC', 'OBC'].indexOf(value) > -1
            },
            type: {
                required,
                oneOf: (value) => ['Male', 'Female'].indexOf(value) > -1
            }
        }
    },

    methods: {
        modeChange(mode) {
            this.$store.commit('modeChange', mode);
        },
        updateLoading(status) {
            this.$store.commit('updateLoading', status);
        },
        onSubmit() {
            this.$v.$touch();
        if (this.$v.$invalid) {
            this.$store.commit('setErrorMessage', 'All fields are required! Name must be at least 3 characters');
            return this.$store.commit('setHasError', true);
        }
            this.$store.dispatch('onSubmit');
        }
    },
};
</script>
  
<style scoped>
.form-loading {
    margin-top: 1rem;
}
</style>
  