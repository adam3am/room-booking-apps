<template>
  <div>
    <h1 class="subheading grey--text">{{content.name}}</h1>
    <v-container class="my-5">
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-card>
            <v-img
              :src="content.pictures && content.pictures[0].url"
              height="600px"
            ></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="mb-0">{{content.name}}</h3>
                <div>{{content.description}}</div>
                <h4>{{content.assets}}</h4>
                <small>{{content.capacity}} in capacity</small>
              </div>
            </v-card-title>
            <v-card-actions>
              <Book />
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Book from '../components/Book';

export default {
	components: { Book },
	data() {
		return {
			content: ''
		};
	},
	mounted() {
		const { id } = this.$route.params;
		this.$store.dispatch('list/getPublicContentt', id).then(
			data => {
				this.content = data;
			},
			error => {
				this.content =
					(error.response && error.response.data) ||
					error.content ||
					error.toString();
			}
		);
	}
};
</script>
