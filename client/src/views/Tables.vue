<template>
  <v-row>
    <v-col cols="2">
      <v-sheet rounded="lg">
        <v-list color="transparent">
          <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
          >
            <v-list-item-content>
              <v-list-item-title>
                Таблица 32 {{ n }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item
                  link
                  color="grey lighten-4"
          >
            <v-list-item-content>
              <v-list-item-title>
                Refresh
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>

    </v-col>

    <v-col>
      <v-sheet
              min-height="70vh"
              rounded="lg"
      >
        <!--Центральная часть  -->
        <div class="home">
          <form @submit.prevent="sendData">
            <div class="form-control">
              <label for="name">Name</label>
              <input v-model="name" id="name" type="text">
            </div>
            <div class="form-control">
              <label for="email">Email</label>
              <input v-model="email" id="email" type="email">
            </div>
            <div class="form-control">
              <label for="address">Address</label>
              <input v-model="address" id="address" type="text">
            </div>
            <div class="form-control">
              <label for="gender">Gender</label>
              <span>Male <input v-model="gender" id="gender" type="radio" value="male"></span>
              <span>Female <input v-model="gender" id="gender" type="radio" value="female"></span>
            </div>
            <input type="submit" class="send" value="Send">
          </form>
        </div>

        <v-app id="inspire">
          <v-data-table
                  v-if="desserts.length > 0"
                  :headers="headers"
                  :items="desserts"
                  class="elevation-1"
          >
            <template v-slot:header.name="{ header }">
              {{ header.text.toUpperCase() }}
            </template>
            <template v-slot:item.actions="{ item }">
              <!--v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
              >
                mdi-pencil
              </v-icon-->
              <v-icon
                      small
                      @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-app>
      </v-sheet>
    </v-col>
  </v-row>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'tables',
     components: {},
     data: () => {
       return {name: '',
               email: '',
               address: '',
               gender: '',
         headers: [
           { text: 'имя', align: 'start', value: 'name',},
           { text: 'Почта', value: 'email' },
           { text: 'Адрес', value: 'address' },
           { text: 'Пол', value: 'gender' },
           { text: 'Actions', value: 'actions', sortable: false },
          ],
               desserts: [],
       }
       },
      methods: {
           async realoadTable() {
             let data =await axios({
               url: '/api/records',
               method: 'get',
             })
             this.desserts = data.data
           },
           async sendData() {
             console.log(await axios({
               url: '/api/records',
               method: 'post',
               data: {
                 name: this.name,
                 email: this.email,
                 address: this.address,
                 gender: this.gender
               }
             }));
             await this.realoadTable()

         },
         async deleteItem(item) {
             console.log(`=====>>> ${item._id}`)
             console.log(await axios({
             url: `/api/records/${item._id}`,
             method: 'delete',
           }));
           await this.realoadTable()
         }
       },
      async created() {
        console.log('created....')
        let data =await axios({
          url: '/api/records',
          method: 'get',
        })
        this.desserts = data.data
      }
  }
</script>

 <style scoped>
     .form-control {
       padding: 5px;
     }
     .form-control label {
       display: block;
     }
  
     .send {
       margin: 5px
     }
     .home button, .home input, .home  select, .home  textarea {
       background-color: #e0e0e0;
       border: 1px solid #dcdcdc;
       padding: 1px 15px;
       border-radius: 11px;
     }
     .home  button:focus, .home  input:focus,.home  select:focus,.home  textarea:focus {
       outline:  none;
       padding: 1px 15px;
       background-color: #abd1e0;
       box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
     }
     .home  button:hover, .home  input:hover, .home  select:hover,.home  textarea:hover {
       box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.21);
     }
     label{
       text-transform: uppercase;
       padding-bottom: 2px;
       font-weight: 400;
       color: #272727;
     }

 </style>