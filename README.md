
# Room Booking Apps

- Mengetahui ruangan yang memiliki proyektor dengan mem-filter room yang tidak memiliki proyektor.
- Jika Room Sudah Di-Book Pada Tanggal Dan Waktu Tertentu, Maka User Lain Tidak Dapat Booking Room Tersebut.
- Admin Bisa Mengakses Page Admin. User Selain Admin Tidak Dapat Akses. Komunikasi Endpoint Menggunakan Token.

## A Beginner's Journey

Pengalaman saya mengikuti final project dari HACKTIV8 online program.

### Features

BOOKAPP adalah sebuah aplikasi yang memungkinkan User untuk melihat semua ruangan meeting atau konferensi
atau dengan memilih ruangan yang ingin di pesan pada waktu dan tanggal tertentu. Di Bagian backend menggunakan postgreSQL database
dan di setiap komunikasi endpoint juga menggunakan JSON Web Token (JWT):

* Guest Bisa register.
* User Bisa login.
* User Bisa Melakukan Booking Room.
* Admin Dapat menambah gedung, lantai, room, serta aset.
* Admin Dapat Menambah User Baru.
* Admin Dapat Memperbaharui Room.
* Admin Dapat Memperbaharui informasi User.
* Admin Dapat Menghapus Room Yang Tersedia.
* Admin Dapat Menghapus User Yang Sudah Terdaftar.

### Prerequisites

Mungkin perlu menginstal beberapa tools berikut sebelum menjalankan project:
* nodejs
```sh
https://nodejs.org/en/download/
```
* postgresql
```sh
https://www.postgresql.org/download
```

### Frontend

1. Di dalam project
```sh
cd frontend
```

2. BOOKAPP memiliki component Login.vue dan Register.vue untuk Member user baru
```html
<template>
  <div>
    <h1 class="subheading grey--text">Login</h1>
    <v-container class="my-5">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar flat color="light">
              <v-toolbar-title>Sign In</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @keyup.enter.native="handleLogin">
                <v-text-field v-model="user.username" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                <v-text-field id="password" v-model="user.password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
              </v-form>
              <v-alert :value="validationerror" color="error" v-html="error.message"></v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="handleLogin">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
```
```html
<template>
  <div>
    <h1 class="subheading grey--text">Register</h1>
    <v-container class="my-5">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar flat color="light">
              <v-toolbar-title>Sign Up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @keyup.enter.native="handleRegister">
                <v-text-field v-model="user.username" prepend-icon="person" name="username" label="Username" type="text"></v-text-field>
                <v-text-field v-model="user.email" prepend-icon="mail" name="email" label="Email" type="text"></v-text-field>
                <v-text-field id="password" v-model="user.password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
              </v-form>
              <v-alert :value="validationerror" color="error" v-html="message.message"></v-alert>
              <v-alert :value="successful" color="success" v-html="message.message"></v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="handleRegister">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
```

3. Navbar.vue yang berisikan Homepage, Login, Register, Logout, Status booking Serta tombol Admin (jika Admin login)
```html
<template>
  <nav id="navbar">
    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Book</span>
        <span>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <v-btn slot="activator" flat color="grey">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-if="!currentUser" router :to="{name: 'Register'}">
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-if="showAdmin" router :to="{name: 'Admin'}">
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn v-if="!currentUser" flat color="grey" :to="{name: 'Login'}">
        <span>Sign In</span>
      </v-btn>
      <v-btn v-if="currentUser" flat color="grey">
        <span @click="logOut">Log Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-layout v-if="currentUser" column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/avatar-1.png"/>
          </v-avatar>
        </v-flex>
        <p class="white--text subheading mx-auto">{{currentUser.username}}</p>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="showAdmin" router :to="{name: 'Admin'}">
          <v-list-tile-action>
            <v-icon class="white--text">https</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Admin</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!currentUser" router :to="{name: 'Register'}">
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
```

4. Komponen Home.vue Menampilkan Daftar Room dan Search form yang berisikan: Date Time, Kapasitas dan Aset
```html
<template>
  <div>
    <h1 class="subheading grey--text">Home</h1>
    <v-container class="my-5">
      <v-layout>
        <v-flex xs12 lg6>
          <v-menu ref="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
            <v-text-field slot="activator" label="Date" placeholder="Select Date" persistent-hint></v-text-field>
            <v-date-picker no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs11 sm5>
          <v-menu ref="menu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
            <v-text-field slot="activator" label="Time" placeholder="Select Time" readonly></v-text-field>
            <v-time-picker></v-time-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-text-field label="Capacity" placeholder="Input Capacity" type="number"></v-text-field>
      </v-layout>
      <v-layout row wrap>
        <v-list-tile v-for="filter in possibleFilters" :key="filter">
          <v-checkbox color="primary" :checked="filters.includes(filter)" :label="filter" @change="toggleFilter(filter)"></v-checkbox>
        </v-list-tile>
      </v-layout>
      <v-layout row wrap>
        <v-flex>
          <v-btn flat class="primary" @click="initialize">
            <span>Search</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap mt-4>
        <v-flex v-for="content in matchedContents" :key="content.name" xs12 sm6 md4 lg3>
          <v-card flat class="text-xs-center ma-2">
            <v-img class="white--text" height="170px" :src="content.pictures && content.pictures[0].url"></v-img>
            <v-card-text>
              <h3 class="subheading mb-2">{{ content.name }}</h3>
              <div class="grey--text">{{ content.description }}. {{ content.name }} Mempunyai {{ content.capacity }} Kapasitas dan {{content.assets}}</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn :to="{name: 'Room', params: {id: content.id}}" flat>
                <v-icon small left>meeting_room</v-icon>
                <span>Book Now</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
```

5. Admin Bisa Mengakses page Admin.vue. Peran Admin: Membuat (create). Meng-update (update). Menghapus (delete)

### Backend

1. Masuk ke dalam project
```sh
cd backend
```
2. File setting db dan token secret key berada di dalam folder config
```JS
module.exports = {
  HOST: "localhost",
  DB: "H8_Room_Booking",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```
```JS
module.exports = {
  secret: "secret-key"
};
```

3. API endpoint di Test menggunakan Postman
<table>
<tr><th>HTTP</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/auth/signup</td>  <td>Everyone can signup</td></tr>

<tr><td>POST</td> <td>/api/auth/login</td>  <td>User can login</td></tr>

<tr><td>POST</td> <td>/api/api/room</td>  <td>Admin can create a room with token</td></tr>

<tr><td>POST</td> <td>/api/booking</td>  <td>Users can book a room with token</td></tr>

<tr><td>GET</td> <td>/api/room/all</td>  <td>Everyone can view all rooms</td></tr>

<tr><td>GET</td> <td>/api/test/user/all</td>  <td>Admin can view all users with token</td></tr>

<tr><td>GET</td> <td>/api/booking/all</td>  <td>Users can view all bookings with token</td></tr>

<tr><td>GET</td> <td>/api/room/:id</td>  <td>Users can view a room with token</td></tr>

<tr><td>PUT</td> <td>/api/room/:id</td>  <td>Admin can update a room with token</td></tr>

<tr><td>PUT</td> <td>/api/test/user/:id</td>  <td>Admin can update a user with token</td></tr>

<tr><td>DELETE</td> <td>/api/room/:id</td>  <td>Admin can delete a room with token</td></tr>

<tr><td>DELETE</td> <td>/api/test/user/:id</td>  <td>Admin can delete a user with token</td></tr>

</table>

## Development

Untuk me-maintain project bisa di buka dengan VSCode. CSS dan assets terpisah di setiap Backend dan Frontend folder.

### Backend Node
Buat database baru, Install NPM packages dan seed (users, rooms, bookings)
```sh
createdb H8_Room_Booking
```
```sh
npm install
npm run seed
npm run dev
```
```sh
username: admin
password: admin123
```

### Frontend Vue
Install NPM packages dan serve
```sh
npm install
npm run serve
```

Search input (capacity, date time) dan update users (password, roles) belum berfungsi dengan baik. Silakan kasih masukan:

```html
<v-layout>
	<v-flex xs12 lg6>
		<v-menu ref="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
			<v-text-field slot="activator" label="Date" placeholder="Select Date" persistent-hint></v-text-field>
			<v-date-picker no-title @input="menu1 = false"></v-date-picker>
		</v-menu>
	</v-flex>
	<v-spacer></v-spacer>
	<v-flex xs11 sm5>
		<v-menu ref="menu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
			<v-text-field slot="activator" label="Time" placeholder="Select Time" readonly></v-text-field>
			<v-time-picker></v-time-picker>
		</v-menu>
	</v-flex>
</v-layout>
<v-layout>
	<v-text-field label="Capacity" placeholder="Input Capacity" type="number"></v-text-field>
</v-layout>
<v-layout row wrap>
	<v-list-tile v-for="filter in possibleFilters" :key="filter">
		<v-checkbox color="primary" :checked="filters.includes(filter)" :label="filter" @change="toggleFilter(filter)"></v-checkbox>
	</v-list-tile>
</v-layout>
<v-layout row wrap>
	<v-flex>
		<v-btn flat class="primary" @click="initialize">
			<span>Search</span>
		</v-btn>
	</v-flex>
</v-layout>
```

```js
exports.update = function (req, res) {
  const id = parseInt(req.params.id);
  if (Number.isInteger(id) == false) {
    return res.status(400).send('id parameter should be an integer');
  }
  db.user
    .findByPk(id, { attributes: { exclude: ['password'] } })
    .then(user => {
      const { username, email } = req.body;
      user
        .update({ username, email })
        .then((user) => {
          return res.status(201).send(user);
        })
        .catch(err => {
          console.log('Error updating contact', JSON.stringify(err));
          return res.status(400).send(err);
        });
    })
};
```

## Built With

* [Vue](https://vuejs.org)
* [Express](https://expressjs.com)
* [PostgreSQL](https://www.postgresql.org)
* [jsonwebtoken](https://jwt.io)
* [bcryptjs](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [pg](https://www.webpagefx.com/tools/emoji-cheat-sheet)

## Authors

- **Adam Maulana**
