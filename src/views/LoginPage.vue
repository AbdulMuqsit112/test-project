<template>
  <div class="w-100 h-100 justify-content-center d-flex align-items-center text-white" :class="{'dark-theme': isDarkMode, 'light-background': !isDarkMode}">
    <div class="language-color-wrapper d-flex gap-4 align-items-center">
      <select name="languages" class="py-1 px-4" v-model="selectedLang" @change="changeLanguage" :class="{'dark-theme': isDarkMode }">
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
    <div class="login-container d-flex flex-column p-4 gap-4 rounded-4" :class="{'dark-color': !isDarkMode }">
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
      this.loginToServer();
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
    isDarkMode(){
      return this.$store.getters.getIsDarkMode;
    }
  }
};
</script>


<style scoped>
.light-background{
  background-color: #dde2e5;
}
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
  color: inherit;
  width: 350px;
  height: 520px;
}
.dark-color{
  color: #111;
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

.login-input {
  border: 1px solid #788388;
  border-radius: 5px;
}
.login-input:focus {
  border: 1px solid #9b9d9e;
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
