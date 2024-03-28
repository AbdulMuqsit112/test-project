<template>
  <div class="main__grid">
    <div class="mainBlock" style="width: 100%; height: 12%; top: 0; left: 0;">
      <div class="mainBlock__content">
        <div class="d-flex flex-column mt-1 mx-2 px-2 gap-0">
          <span :class="{ 'setting': isDarkMode, 'light-settings': !isDarkMode }">Settings</span>
          <p class="adj-settings" :class="{ 'adjust': isDarkMode, 'light-adjust': !isDarkMode }">Adjust platform to your need</p>
        </div>
      </div>
    </div>
    <div class="mainBlock" style="width: 100%; height: 88.5%; top: 11.5%; left: 0;">
      <div class="mainBlock__content p-4">
        <div class="d-flex gap-4 w-100 px-5" :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">
          <div class="d-flex p-5 flex-column gap-5 w-50">
            <div class="d-flex flex-column gap-3 px-4">
              <label for="language" :class="{ 'adjust': isDarkMode, 'light-adjust': !isDarkMode }">Languages</label>
              <select name="languages" class="dropdown" v-model="selectedLang" @change="changeLanguage">
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </div>
            <div class="form-check form-switch d-flex justify-content-between px-4">
              <label class="form-check-label" for="">Profit on tab</label>
              <input class="form-check-input" type="checkbox" id="">
            </div>
          </div>
          <div class="d-flex p-5 flex-column gap-5 w-50">
            <div class="d-flex flex-column gap-3 px-4">
              <label for="timezone" :class="{ 'adjust': isDarkMode, 'light-adjust': !isDarkMode }">Time Zone</label>
              <select name="timezone" class="dropdown">
                <option value="English" selected>(GMT+ 3)Europe,Tirane</option>
              </select>
            </div>
            <div class="form-check form-switch d-flex justify-content-between px-4">
              <label class="form-check-label" for="">Hide account bar value</label>
              <input class="form-check-input" type="checkbox" @click="toggleShowAccountBar" v-model="showAccountBar">
            </div>
            <div class="form-check form-switch d-flex justify-content-between px-4">
              <label class="form-check-label" for="">Multi Trade Pannel</label>
              <input class="form-check-input" type="checkbox">
            </div>
            <div class="form-check form-switch d-flex justify-content-between px-4">
              <label class="form-check-label" for="">Multi Chart</label>
              <input class="form-check-input" type="checkbox">
            </div>
          </div>
          <div class="d-flex p-5 flex-column gap-5 w-50">
            <div class="d-flex flex-column gap-3 px-4" id="imageOptions">
              <span :class="{ 'adjust': isDarkMode, 'light-adjust': !isDarkMode }">Skin</span>
              <div class="d-flex gap-2">
                <div :class="!isDarkMode ?  'border border-primary' : ''" @click="changeTheme(false)" class="cursor-pointer p-1">
                  <img src="src/assets/light-theme.png"  class="w-100 h-100" alt="graph">
                </div>
                <div :class="isDarkMode ?  'border border-primary' : ''" @click="changeTheme(true)" class="cursor-pointer p-1">
                  <img src="src/assets/dark-theme.png"  class="w-100 h-100" alt="graph">
                </div>
              </div>
            </div>
            <div class="form-check form-switch d-flex justify-content-between px-4">
              <label class="form-check-label" for="">Restore Default Platform Settings</label>
              <input class="form-check-input" type="checkbox" id="">
            </div>
            <div class="w-100 px-4">
              <button class="btn btn-primary w-100">Reset Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingPage',
  data() {
    return {
      selectedLang: this.$i18n.locale,
      showAccountBar: this.$store.getters.getShowAccountBar
    };
  },
  methods: {
    toggleShowAccountBar(){
      this.$store.commit('toggleShowAccountBar');
    },
    changeTheme(val){
      this.$store.commit('setAppTheme', val);
    },
    changeLanguage() {
      this.$i18n.locale = this.selectedLang;
    },
  },
  computed: {
    isDarkMode(){
      return this.$store.getters.getIsDarkMode;
    }
  },
};
</script>

<style scoped>
.back{
  width: 16px;
  height: 16px;
}
.dropdown {
  background-color: transparent;
  padding-block: 8px;
  color: inherit;
  border: 0.2px solid #3d4e57 !important;
  font-size: smaller;
  padding: 12px;
}
.dark-text {
  color: #2a2e39;
}
.light-text {
  color: white;
}
.form-check-input {
  padding-block: 7px;
  padding-inline: 14px;
}
</style>