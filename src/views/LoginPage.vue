<template>
  <div class="login-wrapper dark-theme w-100 h-100 justify-content-center d-flex align-items-center text-white">
    <div class="language-color-wrapper d-flex gap-4 align-items-center">
      <select name="languages" class="py-1 px-4 dark-theme" v-model="selectedLang" @change="changeLanguage">
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
      <div class="checkbox-wrapper">
        <input type="checkbox" class="theme-checkbox" id="checkbox" @change="toggleDarkMode" v-model="isDarkModeChecked">
        <label for="checkbox" class="checkbox-label">
          <i class="fas fa-moon"></i>
          <i class="fas fa-sun"></i>
          <span class="ball"></span>
        </label>
      </div>
    </div>
    <div class="login-container d-flex flex-column p-4 gap-4 rounded-4">
      <div class="form-header">
        <h2>{{ $t('Login.Title') }}</h2>
      </div>
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
      error: '',
      selectedLang: this.$i18n.locale,
      isDarkModeChecked: this.isDarkMode
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
    changeLanguage() {
      this.$i18n.locale = this.selectedLang;
    },
    toggleDarkMode(){
      this.$store.commit('toggleIsDarkMode');
      this.isDarkModeChecked = this.isDarkMode;
    },
  },
  computed: {
    isFakeServer() {
      return this.$store.getters.getServer;
    },
    isDarkMode(){
      return this.$store.getters.isDarkMode;
    }
  }
};
</script>


<style scoped>
.checkbox-wrapper{
  border-radius: 20px;
  border: 1px solid;
}
.theme-checkbox {
  opacity: 0;
  position: absolute;
}

.checkbox-label {
  margin: 0;
  background-color: #111;
  width: 50px;
  height: 26px;
  border-radius: 50px;
  position: relative;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fa-moon {color: #f1c40f;}

.fa-sun {color: #f39c12;}

.checkbox-label .ball {
  background-color: #fff;
  width: 22px;
  height: 22px;
  position: absolute;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  transition: transform 0.2s linear;
}

.theme-checkbox:checked + .checkbox-label .ball {
  transform: translateX(24px);
}
.language-color-wrapper {
  position: absolute;
  top: 4%;
  left: 4%;
}
.form-header {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.login-container {
  width: 350px;
  height: 520px;
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
}

.login-input:focus {
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
