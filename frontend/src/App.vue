<template>
  <div id="app">
    <v-app>
      <app-header />
      <v-content class="mx-2 bg">
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
	name: 'App',
	components: {
		'app-header': Navbar
	}
};
</script>
