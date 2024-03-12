<template>
  <div class="wrapper w-100 h-100 d-flex justify-content-center align-items-center text-white">
    <div class="login-container d-flex flex-column p-4 gap-4 rounded-3">
      <header>
        <h2>User Login</h2>
      </header>
      <main>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit">Login</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
      </main>
    </div>
  </div>
</template>

<script>
import userData from '../assets/user.json';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      if (this.isFakeServer) {
        this.fakeLogin();
      } else {
        this.loginToServer();
      }
    },
    fakeLogin() {
      const user = userData.find(user => user.username === this.username && user.password === this.password);
      if (user) {
        localStorage.setItem('token', user.token);
        this.$router.push({ path: '/dashboard', query: { token: user.token } });
      } else {
        this.error = 'Invalid username or password. Please try again.';
      }
    },
    async loginToServer() {
      let userObj = {
        username: this.username,
        password: this.password
      }
      const response = await this.$http.post(`login`, userObj);
      if (response.status == 200) {
        let token = response.data
        localStorage.setItem('token',token );
        this.$router.push({ path: '/dashboard', query: { token: token } });
      } else {
        this.error = 'Invalid username or password. Please try again.';
      }
    },
  },
  computed: {
    isFakeServer() {
      return this.$store.getters.getServer;
    },
  }
};
</script>


<style scoped>
.wrapper {
  background-color: #3d3c3c;
}

header {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.login-container {
  width: 350px;
  height: 420px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  background-color: rgba(50, 49, 49, 0.8);
  border: 1px solid #09407a;
}

header {
  margin-bottom: 20px;
}

main {
  padding: 0;
}

.form-group {
  margin-top: 20px;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding-block: 8px;
  padding-inline: 6px;
  font-size: 16px;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
}

button {
  background-color: #09407a;
  color: #fff;
  border: none;
  width: 100%;
  padding: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  justify-content: center;
  display: flex;
}

button:hover {
  background-color: #085bb4;
}

.error-message {
  color: red;
}
</style>
