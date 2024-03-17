<template>
  <div class="login-wrapper w-100 h-100 justify-content-center d-flex align-items-center text-white">
    <div class="login-container d-flex flex-column p-4 gap-4 rounded-4">
      <header>
        <h2>User Login</h2>
      </header>
      <main>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input class="login-input" type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group mt-5">
            <label for="password">Password</label>
            <input class="login-input" type="password" id="password" v-model="password" required>
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
      email: '',
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
      const user = userData.find(user => user.email === this.email && user.password === this.password);
      if (user) {
        localStorage.setItem('token', user.token);
        this.$store.commit('setUserToken', user.token);
        this.$store.commit("setIsAuthenticated", true);
        this.$router.push({ path: '/dashboard', query: { token: user.token } });
      } else {
        this.error = 'Invalid email or password. Please try again.';
      }
    },
    async loginToServer() {
      let userObj = {
        email: this.email,
        password: this.password
      }
      const result = await this.$store.dispatch('loginToServer', { userObj });
      if (result.success) {
        this.$router.push({ path: '/dashboard', query: { token: result.token } });
      } else {
        this.error = result.error;
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
.login-wrapper {
  background-color: #1e222d;
  height: 100vh;
}

header {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.login-container {
  width: 350px;
  height: 520px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  background-color: #131722;
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
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
}

.login-input {
  width: 100%;
  padding-block: 6px;
  padding-inline: 6px;
  font-size: 12px;
  color: #fff;
  border: 1px solid #788388;
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
  font-size: 12px;
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
