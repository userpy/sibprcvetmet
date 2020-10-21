<template>
  <v-app id="inspire">
    <v-app-bar
            app
            color="white"
            flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
                class="mr-10"
                color="red darken-1"
                size="32"
        ></v-avatar>
        <v-btn text @click="routerPush('/')" >
          Главная
        </v-btn>
        <v-btn text @click="routerPush('/tables')" >
          О нас
        </v-btn>
        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
                  dense
                  flat
                  hide-details
                  rounded
                  solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {

  },
  methods: {
    routerPush: function (route) {
      console.log(route)
      this.$router.push(route
      );
    }
  },
  data: () => ({
    links: [
      'О нас',
      'Messages',
    ],

  }),
};
</script>
