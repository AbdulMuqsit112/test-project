<template>
  <div class="w-100">
    <header class="header">
      <HeaderComponent />
    </header>
    <div class="row wrapper">
      <div class="col-lg-1 custom-width">
        <leftBar />
      </div>
      <div class="col-lg-8 col-md-6 col-sm-12 mt-2">
        <GraphComponent :dataChanged="isGraphDataChanged"/>
      </div>
      <div class="col-lg-3 mt-2 col-sm-12 sidebar">
        <rightBar @graph-data-change="handleGraphData" />
      </div>
      <div class="col-lg-1 custom-width c-width" />
      <footer class="footer col-lg-8 col-sm-12">
        <FooterComponent />
      </footer>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/layouts/HeaderComponent.vue';
import leftBar from '../components/layouts/leftBar.vue';
import GraphComponent from '../components/layouts/GraphComponent.vue';
import rightBar from '../components/layouts/rightBar.vue';
import FooterComponent from '../components/layouts/FooterComponent.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderComponent,
    leftBar,
    GraphComponent,
    rightBar,
    FooterComponent,
  },
  data() {
    return {
      isGraphDataChanged: false,
    };
  },
  
  methods: {
    handleGraphData(val){
      debugger;
      this.isGraphDataChanged = val;
    },
  },
};
</script>

<style scoped>
.custom-width {
  width: 5%;
  background-color: #131722;
}

.sidebar {
  padding: 0;
}

@media screen and (max-width: 1600px) {
  .c-width {
    width: 5.65%;
  }
}

@media screen and (max-width: 1500px) {
  .c-width {
    width: 5%;
  }
}

@media screen and (max-width: 1024px) {
  .c-width {
    padding-inline: 1.9rem;
  }
}

@media screen and (max-width: 1000px) {
  .c-width {
    display: none;
  }

  .custom-width {
    display: none;
  }

  .header {
    width: 100%;
  }

  .wrapper {
    margin: 2px;
  }
}

@media screen and (min-width: 1000px) {
  .gutter-width {
    --bs-gutter-x: 0rem;
  }

  .sidebar {
    width: 27.5%;
  }
}
</style>