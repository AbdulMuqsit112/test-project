<template>
  <div class="app-footer">
    <div class="app-footer-section"></div>
    <div class="app-footer-section tour_step_4">
      <div class="app-footer-box">
        <div class="app-footer-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-80 -80 672 672">
            <path
              d="M299.476 70.848a31.864 31.864 0 00-32.77 1.583l-137.195 91.466H77.498c-13.339 0-24.299 10.298-25.394 23.358H44.76c-24.681 0-44.76 20.079-44.76 44.76v47.972c0 24.681 20.079 44.76 44.76 44.76h7.343c1.096 13.06 12.057 23.358 25.394 23.358h52.012l137.195 91.466a31.885 31.885 0 0017.704 5.369 31.896 31.896 0 0015.066-3.786 31.87 31.87 0 0016.859-28.145V98.993a31.864 31.864 0 00-16.857-28.145zM51.994 299.418H44.76c-10.714-.001-19.43-8.717-19.43-19.432v-47.972c0-10.714 8.716-19.43 19.43-19.43h7.234v86.834zm68.686 23.357H77.498a.174.174 0 01-.174-.174V189.4c0-.096.078-.174.174-.174h43.182v133.549zm170.326 90.235c0 3.564-2.434 5.252-3.482 5.812-1.047.56-3.802 1.65-6.768-.327l-134.747-89.833V183.34l134.747-89.832c2.967-1.977 5.722-.887 6.768-.327 1.047.56 3.482 2.248 3.482 5.812V413.01zM445.607 95.47c-4.452-4.452-11.668-4.452-16.12 0-4.452 4.452-4.452 11.668 0 16.12 38.509 38.509 59.716 89.795 59.716 144.411 0 54.617-21.209 105.904-59.717 144.412-4.452 4.452-4.452 11.668 0 16.119a11.354 11.354 0 008.06 3.338c2.917 0 5.835-1.113 8.06-3.338C488.421 373.717 512 316.706 512 255.999c0-60.705-23.579-117.716-66.393-160.529zM383.011 158.067c-4.452-4.453-11.668-4.453-16.12-.001s-4.452 11.668 0 16.12c21.815 21.815 33.829 50.871 33.828 81.816 0 30.944-12.014 60.001-33.829 81.816-4.452 4.452-4.452 11.668 0 16.12a11.354 11.354 0 008.06 3.338c2.917 0 5.835-1.113 8.06-3.338 26.121-26.121 40.507-60.902 40.507-97.936 0-37.033-14.385-71.815-40.506-97.935z">
            </path>
          </svg>
        </div>
      </div>
      <div class="app-footer-box">
        <div class="app-footer-time">
          <div class="title">CURRENT TIME:</div>
          <div class="value">{{ currentDateTime }}</div>
        </div>
      </div>
      <div class="app-footer-box">
        <div class="app-footer-icon" @click="toggleDropdown">
          <svg v-if="layout != 3" xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 30" width="23" height="21">
            <g fill="none" stroke="currentColor" transform="translate(.5 .5)">
              <rect width="22" height="20" rx="2"></rect>
              <path d="M0 10h11m0-10v20"></path>
            </g>
          </svg>
          <svg v-if="layout == 3" xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 30" width="23" height="21">
            <g fill="none" stroke="currentColor" transform="translate(.5 .5)">
              <rect width="22" height="20" rx="2"></rect>
              <path d="M0 10h22M11 0v20"></path>
            </g>
          </svg>
        </div>
        <div class="dropdown" v-show="dropdownOpen">
          <div class="icons" @click="changeLayout(1)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 30" width="23" height="21">
              <g fill="none" stroke="currentColor" transform="translate(.5 .5)">
                <rect width="22" height="20" rx="2"></rect>
                <path d="M0 10h11m0-10v20"></path>
              </g>
            </svg>
          </div>
          <div class="icons" @click="changeLayout(2)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 30" width="23" height="21">
              <g fill="none" stroke="currentColor" transform="translate(.5 .5)">
                <rect width="22" height="20" rx="2"></rect>
                <path d="M0 10h11m0-10v20"></path>
              </g>
            </svg>
          </div>
          <div class="icons" @click="changeLayout(3)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 30" width="23" height="21">
              <g fill="none" stroke="currentColor" transform="translate(.5 .5)">
                <rect width="22" height="20" rx="2"></rect>
                <path d="M0 10h22M11 0v20"></path>
              </g>
            </svg>
          </div>
      </div>
      </div>
      <div class="app-footer-box">
        <div class="app-footer-icon">
          <svg width="16" height="16" viewBox="-4 -4 24 24" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" class="fullscreen_svg__bi fullscreen_svg__bi-fullscreen">
            <path fill="currentcolor"
              d="M1.5 1a.5.5 0 00-.5.5v4a.5.5 0 01-1 0v-4A1.5 1.5 0 011.5 0h4a.5.5 0 010 1h-4zM10 .5a.5.5 0 01.5-.5h4A1.5 1.5 0 0116 1.5v4a.5.5 0 01-1 0v-4a.5.5 0 00-.5-.5h-4a.5.5 0 01-.5-.5zM.5 10a.5.5 0 01.5.5v4a.5.5 0 00.5.5h4a.5.5 0 010 1h-4A1.5 1.5 0 010 14.5v-4a.5.5 0 01.5-.5zm15 0a.5.5 0 01.5.5v4a1.5 1.5 0 01-1.5 1.5h-4a.5.5 0 010-1h4a.5.5 0 00.5-.5v-4a.5.5 0 01.5-.5z">
            </path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      dropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    changeLayout(val){
      this.$store.commit('changeLayout', val);
      this.toggleDropdown();
    }
  },
  computed: {
    currentDateTime() {
      const currentDate = new Date();
      const month = currentDate.toLocaleString('default', { month: 'long' });
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      const time = currentDate.toLocaleTimeString();
      return `${month} ${day}, ${year} ${time}`;
    },
    layout() {
      return this.$store.state.layoutType;
    },
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #22252e;
  border: 1px solid #434d51;
  border-radius: 4px;
  position: absolute;
  bottom: 6%;
  z-index: 1100;
}

.dropdown .icons {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown .icons:hover {
  background-color: #434d51;
}
</style>
