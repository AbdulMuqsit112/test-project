export default {
  data() {
    return {
      isResize: null,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
      currentComponent: '',
      resizeEvent: null
    };
  },
  methods: {
    initResize(event, component) {
      this.isResizing = true;
      this.currentComponent = component;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.setInitDimensions();
      document.addEventListener('mousemove', this.resizeComponent);
      document.addEventListener('mouseup', this.stopResize);
    },
    setInitDimensions() {
      if (this.currentComponent == 'graph') {
        this.startWidth = parseInt(this.getLayoutDimensions.graphComponent.width);
        this.startHeight = parseInt(this.getLayoutDimensions.graphComponent.height);
      } else if (this.currentComponent == 'rightComponent') {
        this.startWidth = parseInt(this.getLayoutDimensions.rightComponent.width);
        this.startHeight = parseInt(this.getLayoutDimensions.rightComponent.height);
      } else if (this.currentComponent == 'bottomComponent') {
        this.startWidth = parseInt(this.getLayoutDimensions.bottomComponent.width);
        this.startHeight = parseInt(this.getLayoutDimensions.bottomComponent.height);
      } else {
        this.startWidth = parseInt(this.getLayoutDimensions.lastComponent.width);
        this.startHeight = parseInt(this.getLayoutDimensions.lastComponent.height);

      }
    },
    resizeComponent(event) {
      this.resizeEvent = event;
      if (!this.isResizing) return;
      if (this.layout == 1){
        this.resizeLayout1();
      } else {
        this.resizeLayout3();
      }
    },
    stopResize() {
      this.isResizing = false;
      document.removeEventListener('mousemove', this.resizeComponent);
      document.removeEventListener('mouseup', this.stopResize);
    },
    resizeLayout1() {
      if (this.currentComponent == 'graph') {
        this.resizeGraphL1();
      } else if (this.currentComponent == 'rightComponent') {
        this.resizeRightComponentL1();
      }
    },
    resizeLayout3() {
      if (this.currentComponent == 'graph') {
        this.resizeGraphL3();
      } else if (this.currentComponent == 'bottomComponent' || this.currentComponent == 'lastComponentBottom') {
        this.resizeComponentHeightsL3();
      }
      else if (this.currentComponent == 'lastComponentRight'){
        this.resizeLastComponentRightL3();
      }
    },
    resizedHeight(max, min) {
      const deltaY = this.resizeEvent.clientY - this.startY;
      const parentHeight = this.$el.parentElement.offsetHeight;
      let heightPercentageChange = ((this.startHeight / 100 * parentHeight) + deltaY) / parentHeight * 100;
      if (heightPercentageChange > max) heightPercentageChange = max;
      if (heightPercentageChange < min) heightPercentageChange = min;
      return heightPercentageChange;
    },
    resizedWidth(max, min, isNegDelta){
      let deltaX = (this.resizeEvent.clientX - this.startX);
      if (isNegDelta) deltaX = -deltaX;
      const parentWidth = this.$el.parentElement.offsetWidth;
      let widthPercentageChange = ((this.startWidth / 100 * parentWidth) + deltaX) / parentWidth * 100;
      if (widthPercentageChange > max) widthPercentageChange = max;
      if (widthPercentageChange < min) widthPercentageChange = min;
      return widthPercentageChange;
    },
    resizeGraphL1() {
      let heightPercentageChange = this.resizedHeight(80, 20);
      const bottomCompHeight = 100 - heightPercentageChange;

      this.$store.commit('setComponentLayout', { component: 'graphComponent', dimensions: { height: `${heightPercentageChange}%`} });
      this.$store.commit('setComponentLayout', { component: 'bottomComponent', dimensions: { height: `${bottomCompHeight}%`, top:`${heightPercentageChange}%`}});
    },
    resizeGraphL3() {
      let widthPercentageChange = this.resizedWidth(80, 20, false);
      const rightComponentWidth = 100 - widthPercentageChange;

      this.$store.commit('setComponentLayout', { component: 'graphComponent', dimensions: { width: `${widthPercentageChange}%`} });
      this.$store.commit('setComponentLayout', { component: 'rightComponent', dimensions: { width: `${rightComponentWidth}%`, left:`${widthPercentageChange}%`}, });
    },
    resizeRightComponentL1() {
      let widthPercentageChange = this.resizedWidth(80, 15, true);
      const leftPos = 100 - widthPercentageChange;

      this.$store.commit('setComponentLayout', { component: 'rightComponent', dimensions: {width: `${widthPercentageChange}%`, left: `${leftPos}%`}});
      this.$store.commit('setComponentLayout', { component: 'graphComponent', dimensions: { width: `${leftPos}%`}});
      this.$store.commit('setComponentLayout', { component: 'bottomComponent', dimensions: { width: `${leftPos}%`}});
    },
    resizeComponentHeightsL3() {
      let heightPercentageChange = this.resizedHeight(70, 30);
      const rightComponentHeight = 100 - heightPercentageChange;

      this.$store.commit('setComponentLayout', { component: 'bottomComponent', dimensions: { height: `${heightPercentageChange}%`}});
      this.$store.commit('setComponentLayout', { component: 'rightComponent', dimensions: { height: `${rightComponentHeight}%`, top:`${heightPercentageChange}%`} });
      this.$store.commit('setComponentLayout', { component: 'lastComponent', dimensions: { height: `${heightPercentageChange}%`} });
      this.$store.commit('setComponentLayout', { component: 'graphComponent', dimensions: { height: `${rightComponentHeight}%`, top:`${heightPercentageChange}%`}});
    },
    resizeLastComponentRightL3() {
      let widthPercentageChange = this.resizedWidth(70, 20, false);
      const bottomComponentWidth = 100 - widthPercentageChange;

      this.$store.commit('setComponentLayout', { component: 'lastComponent', dimensions: { width: `${widthPercentageChange}%`} });
      this.$store.commit('setComponentLayout', { component: 'bottomComponent', dimensions: { width: `${bottomComponentWidth}%`, left:`${widthPercentageChange}%`}});
    }
  },
  computed: {
    getLayoutDimensions(){
      return this.$store.getters.getLayoutDimensions
    },
    layout(){
      return this.$store.getters.getLayoutType;
    }
  },
};
