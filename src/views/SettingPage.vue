<template>
  <div class="main__grid">
    <div class="mainBlock" style="width: 100%; height: 17%; top: 0; left: 0;">
      <div class="mainBlock__content">
        <div class="d-flex gap-1 flex-column p-3">
          <span class="h6">
            <router-link to="/dashboard" class="d-flex align-items-center gap-1">
                <svg class="back" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#f5f5f5" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#f5f5f5" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                Go Back
              </router-link> 
            </span>
          <span class="h3 setting">Settings</span>
          <span class="h6 adjust">Adjust Platform To your need</span>
        </div>
      </div>
    </div>
    <div class="mainBlock" style="width: 100%; height: 83%; top: 17%; left: 0;">
      <div class="mainBlock__content p-4">
        <div class="d-flex gap-4 w-100">
          <div class="d-flex p-5 flex-column gap-5 w-100">
            <div class="d-flex flex-column gap-3">
              <label for="language">Languages</label>
              <select name="languages" class="dropdown">
                <option value="English" selected>English</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
            <div class="form-check form-switch d-flex justify-content-between p-0">
              <label class="form-check-label" for="">Profit on tab</label>
              <input class="form-check-input" type="checkbox" id="">
            </div>
            <div class="form-check form-switch d-flex justify-content-between p-0">
              <label class="form-check-label" for="">Test Mode</label>
              <input class="form-check-input" type="checkbox" @click="toggleTesMode">
            </div>
          </div>
          <div class="d-flex p-5 flex-column gap-5 w-100">
            <div class="d-flex flex-column gap-3">
              <label for="language">Time Zone</label>
              <select name="timezone" class="dropdown">
                <option value="English" selected>(GMT+ 3)Europe,Tirane</option>
              </select>
            </div>
            <div class="form-check form-switch d-flex justify-content-between p-0">
              <label class="form-check-label" for="">Hide account bar value</label>
              <input class="form-check-input" type="checkbox" id="">
            </div>
            <div class="form-check form-switch d-flex justify-content-between p-0">
              <label class="form-check-label" for="">Multi Trade Pannel</label>
              <input class="form-check-input" type="checkbox">
            </div>
            <div class="form-check form-switch d-flex justify-content-between p-0">
              <label class="form-check-label" for="">Multi Chart</label>
              <input class="form-check-input" type="checkbox">
            </div>
          </div>
          <div class="d-flex p-5 flex-column gap-5 w-100">
            <div class="d-flex flex-column gap-3" id="imageOptions">
              <span>skin</span>
              <div class="d-flex gap-2">
                <div :class="`${imgClass}`" @click="selectOption(1)">
                  <img src="image_url_1.jpg" alt="graph">
                </div>
                <div :class="`${secondImgClass}`" @click="selectOption(2)">
                  <img src="image_url_2.jpg" alt="graph">
                </div>
              </div>
            </div>
            <div class="form-check form-switch d-flex justify-content-between p-0">
              <label class="form-check-label" for="">Restore Default Platform Settings</label>
              <input class="form-check-input" type="checkbox" id="">
            </div>
            <button class="btn btn-primary">Reset Settings</button>
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
      secondImgClass :'',
      imgClass: ''
    };
  },
  methods: {
    toggleTesMode() {
      this.$store.commit('toggleTestMode');
    },
    selectOption(opt){
      if (opt === 1){
        this.imgClass = ''
        this.secondImgClass = '';
      } else {
        this.secondImgClass = '';
        this.imgClass = ''
      }
    }
  }
};
</script>

<style scoped>
.back{
  width: 16px;
  height: 16px;
}
.setting {
  color: #d1d5d8;
}

.adjust {
  color: #96a4aa;
}

.dropdown {
  background-color: transparent;
  padding-block: 8px;
  color: #96a4aa;
  border: 1px solid #96a4aa;
}

.form-check-input {
  padding-block: 10px;
  padding-inline: 20px;
}
</style>