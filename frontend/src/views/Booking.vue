<template>
  <div>
    <h1 class="subheading grey--text">Booking Status</h1>
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content
          v-for="content in contents"
          :key="content.id"
        >
          <div
            slot="header"
            class="py-1"
          >{{ content.name }}</div>
          <v-card
            v-for="contentc in content.bookings"
            :key="contentc.id"
          >
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">{{ contentc.date | date }}</div>
              <div>Booking by UserID {{ contentc.userId }}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
export default {
	data() {
		return {
			contents: []
		};
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		}
	},
	mounted() {
		if (!this.currentUser) {
			this.$router.push('/login').catch(err => {
				throw new Error(`Problem handling something: ${err}.`);
			});
		}
		this.$store.dispatch('book/list').then(
			data => {
				this.contents = data;
			},
			error => {
				this.contents =
					(error.response && error.response.data) ||
					error.contents ||
					error.toString();
			}
		);
	}
};
</script>
