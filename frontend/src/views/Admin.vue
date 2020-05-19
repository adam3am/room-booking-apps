<template>
  <div>
    <h1 class="subheading grey--text">Admin</h1>
    <v-container class="my-5">
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-btn
              slot="activator"
              flat
              color="primary"
              class="mb-2"
            >New User</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex
                      xs12
                      sm6
                      md4
                    >
                      <v-text-field
                        v-model="editedItem.username"
                        label="Username"
												placeholder="Nickname"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4
                    >
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
												placeholder="mail@gmail.com"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4
                    >
                      <v-text-field
                        v-model="editedItem.roles[0]"
                        label="Roles"
												placeholder="Admin or User"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4
                    >
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                        type="password"
												placeholder="Password"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary darken-1"
                  flat
                  @click.native="close"
                >Cancel</v-btn>
                <v-btn
                  color="primary darken-1"
                  flat
                  @click.native="save"
                >Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-data-table
            :headers="headers"
            :items="desserts"
            :pagination.sync="pagination"
            hide-actions
          >
            <template
              slot="items"
              slot-scope="props"
            >
              <td>{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.username }}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.roles[0].name }}</td>
              <td class="justify-center layout px-0">
                <v-btn
                  icon
                  class="mx-0"
                  @click="editItem(props.item)"
                >
                  <v-icon color="primary">edit</v-icon>
                </v-btn>
                <v-btn
                  icon
                  class="mx-0"
                  @click="deleteItem(props.item)"
                >
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="no-data">
              <v-btn
                color="primary"
                @click="initialize"
              >Reset</v-btn>
            </template>
          </v-data-table>

          <div class="text-xs-center pt-2">
            <v-pagination
              v-model="pagination.page"
              :length="pages"
            ></v-pagination>
          </div>

          <v-dialog
            v-model="dialogg"
            max-width="500px"
          >
            <v-btn
              slot="activator"
              flat
              color="primary"
              class="mt-4"
            >New Room</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitles }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex
                      xs12
                      sm6
                      md4
                    >
                      <v-text-field
                        v-model="editedItemm.name"
                        label="Title"
												placeholder="Name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4
                    >
                      <v-text-field
                        v-model="editedItemm.description"
                        label="Description"
												placeholder="Information"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4
                    >
                      <v-text-field
                        v-model="editedItemm.capacity"
                        label="Capacity"
												placeholder="20"
												type="number"
												min="0"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4
                    >
                      <v-text-field
                        v-model="editedItemm.assets"
                        label="Assets"
												placeholder="Water"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      sm6
                      md4
                    >
                      <v-text-field
                        v-model="editedItemm.pictures.url"
                        label="Pictures"
												placeholder="https://"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary darken-1"
                  flat
                  @click.native="closee"
                >Cancel</v-btn>
                <v-btn
                  color="primary darken-1"
                  flat
                  @click.native="savee"
                >Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-data-table
            :headers="headerss"
            :items="dessertss"
            :pagination.sync="paginationn"
            hide-actions
          >
            <template
              slot="items"
              slot-scope="props"
            >
              <td>{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.description }}</td>
              <td class="text-xs-left">{{ props.item.capacity }}</td>
              <td class="text-xs-left">{{ props.item.assets }}</td>
              <td class="justify-center layout px-0">
                <v-btn
                  icon
                  class="mx-0"
                  @click="editItemm(props.item)"
                >
                  <v-icon color="primary">edit</v-icon>
                </v-btn>
                <v-btn
                  icon
                  class="mx-0"
                  @click="deleteItemm(props.item)"
                >
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="no-data">
              <v-btn
                flat
                color="primary"
                @click="initialize"
              >Reset</v-btn>
            </template>
          </v-data-table>

          <div class="text-xs-center pt-2">
            <v-pagination
              v-model="paginationn.page"
              :length="pagess"
            ></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
	data: () => ({
		pagination: {},
		paginationn: {},
		dialog: false,
		index: null,
		dialogg: false,
		headerss: [
			{
				text: 'ID',
				align: 'left',
				value: 'id'
			},
			{ text: 'Title', value: 'title', sortable: false },
			{ text: 'Description', value: 'description', sortable: false },
			{ text: 'Capacity', value: 'capacity', sortable: false },
			{ text: 'Assets', value: 'assets', sortable: false },
			{ text: 'Actions', value: 'name', sortable: false }
		],
		headers: [
			{
				text: 'ID',
				align: 'left',
				value: 'id'
			},
			{ text: 'Username', value: 'username', sortable: false },
			{ text: 'Email', value: 'email', sortable: false },
			{ text: 'Roles', value: 'roles', sortable: false },
			{ text: 'Actions', value: 'name', sortable: false }
		],
		desserts: [],
		dessertss: [],
		editedIndexx: -1,
		editedItemm: {
			title: '',
			description: '',
			capacity: '',
			assets: '',
			pictures: {
				url: ''
			}
		},
		defaultItemm: {
			title: '',
			description: '',
			capacity: '',
			assets: '',
			pictures: {
				url: ''
			}
		},
		editedIndex: -1,
		editedItem: {
			username: '',
			email: '',
			roles: [],
			password: ''
		},
		defaultItem: {
			username: '',
			email: '',
			roles: [],
			password: ''
		}
	}),
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'New User' : 'Edit User';
		},
		formTitles() {
			return this.editedIndexx === -1 ? 'New Room' : 'Edit Room';
		},
		pages() {
			if (
				this.pagination.rowsPerPage == null ||
				this.pagination.totalItems == null
			)
				return 0;

			return Math.ceil(
				this.pagination.totalItems / this.pagination.rowsPerPage
			);
		},
		pagess() {
			if (
				this.paginationn.rowsPerPage == null ||
				this.paginationn.totalItems == null
			)
				return 0;

			return Math.ceil(
				this.paginationn.totalItems / this.paginationn.rowsPerPage
			);
		}
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogg(val) {
			val || this.closee();
		}
	},
	created() {
		this.initialize();
	},
	methods: {
		initialize() {
			this.mountedds();
			this.mountedd();
		},
		mountedd() {
			this.$store.dispatch('member/list').then(
				data => {
					this.desserts = data;
					this.pagination.totalItems = data.length;
				},
				error => {
					this.desserts =
						(error.response && error.response.data) ||
						error.contents ||
						error.toString();
				}
			);
		},
		mountedds() {
			this.$store.dispatch('list/getPublicContent').then(
				data => {
					this.dessertss = data;
					this.paginationn.totalItems = data.length;
				},
				error => {
					this.dessertss =
						(error.response && error.response.data) ||
						error.contents ||
						error.toString();
				}
			);
		},
		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		deleteItem(item) {
			const { id } = item;
			const index = this.desserts.indexOf(item);
			confirm('Are you sure you want to delete this item?') &&
				this.desserts.splice(index, 1);

			this.$store.dispatch('member/delete', id).then(
				data => {
					this.message = data;
				},
				error => {
					this.validationerror = true;
					this.message =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
				}
			);
		},
		close() {
			this.dialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300);
		},
		save() {
			if (this.editedIndex > -1) {
				this.$store
					.dispatch('member/update', {
						id: this.editedItem.id,
						data: this.editedItem
					})
					.then(
						data => {
							this.message = data;
						},
						error => {
							this.validationerror = true;
							this.message =
								(error.response && error.response.data) ||
								error.message ||
								error.toString();
						}
					);
				Object.assign(this.desserts[this.editedIndex], this.editedItem);
			} else {
				this.$store.dispatch('auth/register', this.editedItem).then(
					data => {
						this.message = data;
					},
					error => {
						this.validationerror = true;
						this.message =
							(error.response && error.response.data) ||
							error.message ||
							error.toString();
					}
				);
				this.desserts.push(this.editedItem);
			}
			this.close();
		},
		editItemm(itemm) {
			this.editedIndexx = this.dessertss.indexOf(itemm);
			this.editedItemm = Object.assign({}, itemm);
			this.dialogg = true;
		},
		deleteItemm(itemm) {
			const { id } = itemm;
			const index = this.dessertss.indexOf(itemm);
			confirm('Are you sure you want to delete this item?') &&
				this.dessertss.splice(index, 1);

			this.$store.dispatch('list/delPublicContentt', id).then(
				data => {
					this.message = data;
				},
				error => {
					this.validationerror = true;
					this.message =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
				}
			);
		},
		closee() {
			this.dialogg = false;
			setTimeout(() => {
				this.editedItemm = Object.assign({}, this.defaultItemm);
				this.editedIndexx = -1;
			}, 300);
		},
		savee() {
			if (this.editedIndexx > -1) {
				this.$store
					.dispatch('list/putPublicContent', {
						id: this.editedItemm.id,
						data: this.editedItemm
					})
					.then(
						data => {
							this.message = data;
						},
						error => {
							this.validationerror = true;
							this.message =
								(error.response && error.response.data) ||
								error.message ||
								error.toString();
						}
					);
				Object.assign(this.dessertss[this.editedIndexx], this.editedItemm);
			} else {
				this.$store.dispatch('list/postPublicContent', this.editedItemm).then(
					data => {
						this.message = data;
					},
					error => {
						this.validationerror = true;
						this.message =
							(error.response && error.response.data) ||
							error.message ||
							error.toString();
					}
				);
				this.dessertss.push(this.editedItemm);
			}
			this.closee();
		}
	}
};
</script>
