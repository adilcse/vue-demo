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
                        <div v-if="mode=='create' || mode == 'edit'" class="text-right" style="text-align: right">
                            <MyButton label="Create" :classes="['btn', 'next_button']"
                            type="submit" />
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


export default {
    name: 'MainForm',
    props: {
    },
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
        fetch('http://localhost:3000/api/v1/demo/'+item.id, {
          method: 'DELETE'
        }).then(res => res.json())
        .then(() => this.getList())
        .catch((error) => console.error(error))
        .finally(() => this.loading = false)
        }
      },
        createItem(data) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                dataType: "json",
                body: JSON.stringify(data),
            };
            this.loading = true;
            fetch("http://localhost:3000/api/v1/demo", requestOptions)
                .then(async (response) => {
                    await response.json();
                    this.mode = 'view';
                    this.loading = false;
                    this.success = true;
                    this.getList()
                })
                .catch((error) => {
                    this.loading = false;
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
        },
        updateItem(data) {
            const requestOptions = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                dataType: "json",
                body: JSON.stringify(data),
            };
            this.loading = true;
            fetch("http://localhost:3000/api/v1/demo/" + data.id, requestOptions)
                .then(async (response) => {
                    await response.json();
                    this.mode = 'view';
                    this.loading = false;
                    this.success = true;
                    this.getList()
                })
                .catch((error) => {
                    this.loading = false;
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
        },
        
        onSubmit() {
            this.errorMessage = "All fields are required!";
            this.hasError = false;

            if (this.mode == 'create') {
                if (
                    !this.userData.name ||
                    !this.userData.catagory ||
                    !this.userData.type
                ) {
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
            fetch('http://localhost:3000/api/v1/demo').then(res => res.json())
                .then(resp => {
                    this.usersList = resp;
                    console.log(resp)
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
  