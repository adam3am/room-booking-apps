<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <v-btn
      slot="activator"
      flat
      color="primary"
    >
      <v-icon
        small
        left
      >meeting_room</v-icon>
      <span>Booking Room</span>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Booking</h2>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          class="px-3"
        >
          <v-text-field
            v-model.number="user.userId"
            disabled
            label="UserID"
            prepend-icon="people"
            :rules="inputRules"
          ></v-text-field>
          <v-text-field
            v-model.number="user.roomId"
            disabled
            label="RoomID"
            prepend-icon="business_center"
            :rules="inputRules"
          ></v-text-field>
          <v-text-field
            v-model="user.booking_title"
            label="Title"
            prepend-icon="info"
            :rules="inputRules"
          ></v-text-field>
          <v-textarea
            v-model="user.booking_description"
            label="Description"
            prepend-icon="edit"
          ></v-textarea>

          <div>
            <datetime
              v-model="user.date"
              type="datetime"
              placeholder="Pilih Tanggal Waktu:"
              class="example-inputs mx-auto"
              zone="Asia/Jakarta"
              :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }"
              :phrases="{ok: 'Continue', cancel: 'Exit'}"
              :minute-step="30"
              :week-start="7"
              use24-hour
              auto
            ></datetime>
          </div>

          <v-spacer></v-spacer>

          <v-btn
            flat
            class="primary mx-0 mt-3"
            @click="handleRegister"
          >Add Booking</v-btn>
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
    </v-card>
  </v-dialog>
</template>

<script>
import Book from '../models/booking';

export default {
	data() {
		return {
			user: new Book(
				this.$store.state.auth.user.id,
				this.$route.params.id,
				'',
				'',
				''
			),
			successful: false,
			validationerror: false,
			inputRules: [v => !!v || 'This field is required'],
			message: '',
			dialog: false
		};
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		}
	},
	methods: {
		handleRegister() {
			this.message = '';

			if (
				(this.$refs.form.validate(),
				this.user.userId &&
					this.user.roomId &&
					this.user.booking_description &&
					this.user.booking_title &&
					this.user.date)
			) {
				this.$store.dispatch('book/register', this.user).then(
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
