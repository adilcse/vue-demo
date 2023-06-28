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
                    <form v-else @submit.prevent="onSubmit" method="post" role="form" class="php-email-form">
                        <ViewUser v-if="mode === 'view'" @onDeleteItem="deleteItem" @onEditClick="onEditClick"
                            @onLoading="updateLoading" :users-list="usersList" />
                        <CreateUser v-else :mode="mode" :userData="userData" v-on:input="handleInputChange" />
                        <ErrorAlert :hasError="hasError" :errorMessage="errorMessage" />
                        <div v-if="mode == 'create' || mode == 'edit'" class="text-right" style="text-align: right">
                            <MyButton label="Create" :classes="['btn', 'next_button']" type="submit" />
                        </div>
                    </form>
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
import axios from 'axios';
import { required, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate';

export default {
    name: 'MainForm',
    mixins: [validationMixin],
    data() {
        return {
            usersList: [],
            loading: false,
            success: false,
            hasError: false,
            userData: {
                id: null,
                name: '',
                catagory: '',
                type: ''
            },
            mode: 'view',
            errorMessage: ''
        }
    },
    components: {
        FormLoading,
        ViewUser,
        CreateUser,
        MyButton,
        FormSuccessVue,
        ErrorAlert
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
            if (mode == 'view') {
                this.userData = {
                    id: null,
                    name: '',
                    catagory: '',
                    type: ''
                },
                    this.mode = 'view';
            } else if (mode == 'create') {
                this.userData = {
                    id: null,
                    name: '',
                    catagory: '',
                    type: ''
                },
                    this.mode = 'create';
            }
        },
        updateLoading(data) {
            this.loading = data
        },
        onEditClick(item) {
            this.userData.id = item.id;
            this.userData.name = item.name;
            this.userData.catagory = item.catagory;
            this.userData.type = item.type;
            this.mode = 'edit';
        },
        deleteItem(item) {
            if (item?.id) {
                this.loading = true;
                axios.delete('http://localhost:3000/api/v1/demo/' + item.id)
                    .then(() => this.getList())
                    .catch((error) => console.error(error))
                    .finally(() => this.loading = false)
            }
        },
        createItem(data) {
            this.loading = true;
            axios.post("http://localhost:3000/api/v1/demo", data)
                .then((response) => {
                    if (response.status == 201) {
                        this.mode = 'view';
                        this.loading = false;
                        this.success = true;
                        this.getList()
                    } else {
                        throw new Error(response)
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    this.errorMessage = error?.response?.data?.message;
                    this.hasError = true;
                    console.error("There was an error!", error);
                });
        },
        updateItem(data) {
            this.loading = true;
            axios.patch("http://localhost:3000/api/v1/demo/" + data.id, data)
                .then(async () => {
                    this.loading = false;
                    this.success = true;
                })
                .catch((error) => {
                    this.loading = false;
                    this.errorMessage = error?.response?.data?.message;
                    this.hasError = true;
                    console.error("There was an error!", error);
                });
        },

        onSubmit() {
            this.errorMessage = "All fields are required! Name must be atleast 3 charecters";
            this.hasError = false;

            if (this.mode == 'create') {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.hasError = true;
                } else {
                    this.createItem({
                        name: this.userData.name,
                        catagory: this.userData.catagory,
                        type: this.userData.type,
                    });
                }
            } else if (this.mode == 'edit') {
                if (
                    !this.userData.name ||
                    !this.userData.catagory ||
                    !this.userData.type
                ) {
                    this.hasError = true;
                } else {
                    this.updateItem({
                        id: this.userData.id,
                        name: this.userData.name,
                        catagory: this.userData.catagory,
                        type: this.userData.type,
                    });
                }
            }
        },
        getList() {
            this.loading = true;
            axios.get('http://localhost:3000/api/v1/demo')
                .then(resp => {
                    console.log(resp)
                    if (resp.status == 200) {
                        this.hasError = false;
                        this.usersList = resp.data;
                    } else {
                        this.errorMessage = resp.statusText;
                        this.hasError = true;
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => this.loading = false)
        },
        handleInputChange(userData) {
            this.userData = { ...this.userData, [userData.type]: userData.value };
        }
    },
    beforeMount() {
        this.getList()
    }
};
</script>
  
<style scoped>
.form-loading {
    margin-top: 1rem;
}
</style>
  