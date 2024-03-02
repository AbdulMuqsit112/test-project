<template>
  <div class="w-100">
    <header class="header">
      <HeaderComponent />
    </header>
    <div class="row wrapper">
      <div class="col-lg-1 custom-width">
        <leftBar />
      </div>
      <div class="col-lg-8 col-sm-12 mt-2">
        <GraphComponent />
      </div>
      <div class="col-lg-3 mt-2 col-sm-12 sidebar">
        <SideBar />
      </div>
      <div class="col-lg-1 custom-width"></div>
      <footer class="footer col-lg-8 col-sm-12">
        <FooterComponent />
      </footer>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import leftBar from '@/components/leftBar.vue';
import GraphComponent from '../components/GraphComponent.vue';
import SideBar from '@/components/SideBar.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderComponent,
    leftBar,
    GraphComponent,
    SideBar,
    FooterComponent,
  },
};
</script>
<style scoped>

.custom-width{
  width: 5%;
  background-color: #131722;
}
@media screen and (max-width: 1000px) {
  .custom-width{
    display: none;
  }
  .header{
    width: 100%;
  }
  .wrapper{
    margin: 2px;
  }
}

@media screen and (min-width: 1000px) {
  .gutter-width{
    --bs-gutter-x: 0rem;
  }
  .sidebar{
    width: 28%;
  }
}
</style>