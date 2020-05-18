<template>
  <div>
    <h1 class="subheading grey--text">Register</h1>
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
              <v-toolbar-title>Sign Up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @keyup.enter.native="handleRegister">
                <v-text-field
                  v-model="user.username"
                  prepend-icon="person"
                  name="username"
                  label="Username"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="user.email"
                  prepend-icon="mail"
                  name="email"
                  label="Email"
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
                v-html="message.message"
              ></v-alert>
              <v-alert
                :value="successful"
                color="success"
                v-html="message.message"
              ></v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="primary"
                @click="handleRegister"
              >Register</v-btn>
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
	name: 'Register',
	data() {
		return {
			user: new User('', '', ''),
			successful: false,
			message: '',
			validationerror: false
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		}
	},
	mounted() {
		if (this.loggedIn) {
			this.$router.push('/home').catch(err => {
				throw new Error(`Problem handling something: ${err}.`);
			});
		}
	},
	methods: {
		handleRegister() {
			this.message = '';

			if (this.user.username && this.user.email && this.user.password) {
				this.$store.dispatch('auth/register', this.user).then(
					data => {
						this.message = data;
						this.successful = true;
						this.validationerror = false;
					},
					error => {
						this.validationerror = true;
						this.successful = false;
						this.message =
							(error.response && error.response.data) ||
							error.message ||
							error.toString();
					}
				);
			}
		}
	}
};
</script>
