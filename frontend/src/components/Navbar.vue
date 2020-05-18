<template>
  <nav id="navbar">
    <v-toolbar
      flat
      app
    >
      <v-toolbar-side-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Book</span>
        <span>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <v-btn
          slot="activator"
          flat
          color="grey"
        >
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-if="!currentUser"
            router
            :to="{
              name: 'Register'
            }"
          >
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-if="showAdmin"
            router
            :to="{
              name: 'Admin'
            }"
          >
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn
        v-if="!currentUser"
        flat
        color="grey"
        :to="{
              name: 'Login'
            }"
      >
        <span>Sign In</span>
      </v-btn>
      <v-btn
        v-if="currentUser"
        flat
        color="grey"
      >
        <span @click="logOut">Log Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      app
      class="primary"
    >
      <v-layout
        v-if="currentUser"
        column
        align-center
      >
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img
              class="text-lg-center"
              src="/avatar-1.png"
            />
          </v-avatar>
        </v-flex>
        <p class="white--text subheading mx-auto">{{currentUser.username}}</p>
      </v-layout>
      <v-list>
        <v-list-tile
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="showAdmin"
          router
          :to="{
              name: 'Admin'
            }"
        >
          <v-list-tile-action>
            <v-icon class="white--text">https</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Admin</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="!currentUser"
          router
          :to="{
              name: 'Register'
            }"
        >
          <v-list-tile-action>
            <v-icon class="white--text">how_to_reg</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Sign Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			links: [
				{ icon: 'dashboard', text: 'Home', route: '/home' },
				{ icon: 'folder', text: 'Booking', route: '/booking' }
			]
		};
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		},
		showAdmin() {
			if (this.currentUser && this.currentUser.roles) {
				return this.currentUser.roles.includes('ROLE_ADMIN');
			}

			return false;
		}
	},
	methods: {
		logOut() {
			this.$store.dispatch('auth/logout');
			this.$router.push('/login').catch(err => {
				throw new Error(`Problem handling something: ${err}.`);
			});
		}
	}
};
</script>
