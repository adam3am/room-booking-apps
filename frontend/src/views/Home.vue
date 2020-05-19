<template>
  <div>
    <h1 class="subheading grey--text">Home</h1>
    <v-container class="my-5">
      <v-layout>
        <v-flex
          xs12
          lg6
        >
          <v-menu
            ref="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Date"
              placeholder="Select Date"
              persistent-hint
            ></v-text-field>
            <v-date-picker
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex
          xs11
          sm5
        >
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Time"
              placeholder="Select Time"
              readonly
            ></v-text-field>
            <v-time-picker></v-time-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-text-field
          label="Capacity"
          placeholder="Input Capacity"
          type="number"
					min="0"
        ></v-text-field>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-list-tile
          v-for="filter in possibleFilters"
          :key="filter"
        >
          <v-checkbox
            color="primary"
            :checked="filters.includes(filter)"
            :label="filter"
            @change="toggleFilter(filter)"
          ></v-checkbox>
        </v-list-tile>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex>
          <v-btn
            flat
            class="primary"
            @click="initialize"
          >
            <span>Search</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
        mt-4
      >
        <v-flex
          v-for="content in matchedContents"
          :key="content.name"
          xs12
          sm6
          md4
          lg3
        >
          <v-card
            flat
            class="text-xs-center ma-2"
          >
            <v-img
              class="white--text"
              height="170px"
              :src="content.pictures && content.pictures[0].url"
            ></v-img>
            <v-card-text>
              <h3 class="subheading mb-2">{{ content.name }}</h3>
              <div
                class="grey--text"
              >{{ content.description }}. {{ content.name }} Mempunyai {{ content.capacity }} Kapasitas dan {{content.assets}}</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                :to="{
              name: 'Room',
              params: {
                id: content.id
              }
            }"
                flat
              >
                <v-icon
                  small
                  left
                >meeting_room</v-icon>
                <span>Book Now</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			filters: [],
			contents: []
		};
	},
	computed: {
		possibleFilters() {
			return this.contents.map(({ assets }) => assets);
		},
		matchedContents() {
			return (
				(this.filters.length &&
					this.contents.filter(content =>
						this.filters.some(filter => content.assets.match(filter))
					)) ||
				this.contents
			);
		}
	},
	created() {
		this.initialize();
	},
	methods: {
		initialize() {
			this.mounteds();
		},
		toggleFilter(newFilter) {
			this.filters = !this.filters.includes(newFilter)
				? [...this.filters, newFilter]
				: this.filters.filter(filter => filter !== newFilter);
		},
		mounteds() {
			this.$store.dispatch('list/getPublicContent').then(
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
	}
};
</script>
