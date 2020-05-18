<template>
  <div>
    <h1 class="subheading grey--text">Login</h1>
    <v-container class="my-5">
      <v-layout
        align-center
        justify-center
      >
        <v-flex
          xs12
          sm8
          md4
        >
          <v-card>
            <v-toolbar
              flat
              color="light"
            >
              <v-toolbar-title>Sign In</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @keyup.enter.native="handleLogin">
                <v-text-field
                  v-model="user.username"
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="user.password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
              <v-alert
                :value="validationerror"
                color="error"
                v-html="error.message"
              ></v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="primary"
                @click="handleLogin"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import User from '../models/user';

export default {
	name: 'Login',
	data() {
		return {
			user: new User('', ''),
			error: '',
			validationerror: false
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		}
	},
	created() {
		if (this.loggedIn) {
			this.$router.push('/home').catch(err => {
				throw new Error(`Problem handling something: ${err}.`);
			});
		}
	},
	methods: {
		handleLogin() {
			if (this.user.username && this.user.password) {
				this.$store.dispatch('auth/login', this.user).then(
					() => {
						this.$router.push('/booking').catch(err => {
							throw new Error(`Problem handling something: ${err}.`);
						});
					},
					error => {
						this.validationerror = true;
						this.error =
							(error.response && error.response.data) ||
							error.error ||
							error.toString();
					}
				);
			}
		}
	}
};
</script>
