<template>
  <div class="col-lg-4">
    <div class="accordion" id="accordionExample">
      <div
        class="accordion-item"
        v-for="(section, index) in symbolRows"
        :key="index"
      >
        <h2 class="accordion-header" :id="'heading' + index">
          <button
            class="accordion-button"
            type="button"
            :data-bs-toggle="'collapse'"
            :data-bs-target="'#collapse' + index"
            :aria-expanded="index === 0"
            :aria-controls="'collapse' + index"
          >
            {{ section.title }}
          </button>
        </h2>
        <div
          :id="'collapse' + index"
          class="accordion-collapse collapse"
          :class="{ show: index === 0 }"
          :aria-labelledby="'heading' + index"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th class="text-white fw-semibold">Symbol</th>
                  <th class="text-end">Last</th>
                  <th class="text-end">Change</th>
                  <th class="text-end">Change Percent</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in section.data" :key="idx">
                  <div class="symGroup d-flex gap-2 align-items-center">
                    <img
                      class="symIcon"
                      :src="
                        item.symbolIcon
                          ? require(`../assets/${item.symbolIcon}`)
                          : ''
                      "
                      alt="icon"
                    />
                    <td class="text-white fw-semibold">{{ item.symbol }}</td>
                  </div>
                  <td class="text-end">{{ item.last }}</td>
                  <td class="text-end">{{ item.chg }}</td>
                  <td class="text-end">{{ item.chgPercent }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import symblRow from "../assets/symbolRow.json";
import socketMixin from "../mixins/socketMixin";

export default {
  mixins: [socketMixin],
  data() {
    return {
      symbolRows: [],
      runSocket: false,
    };
  },
  created() {
    if (this.runSocket) {
      this.$on("symbolDataUpdated", this.handleDataUpdated);
    } else {
      this.loadDataFromJson();
    }
  },
  methods: {
    handleDataUpdated(data) {
      this.symbolRows = data;
    },
    async loadDataFromJson() {
      try {
        this.symbolRows = Object.entries(symblRow).map(([title, data]) => ({
          title,
          data,
        }));
      } catch (error) {
        console.error("Error loading data from JSON file:", error);
      }
    },
  },
};
</script>

<style scoped>
.text-white {
  color: #fff;
}

.table {
  margin-bottom: 0;
  color: #6c7293;
}

.table thead th {
  border-top: 0;
  border-bottom-width: 1px;
  font-weight: 500;
  color: #6c7293;
  background-color: #191c24;
}

.table tbody td {
  background-color: #191c24;
  color: #6c7293;
  font-weight: 300;
}

.table thead th {
  vertical-align: middle;
  border-bottom: 2px solid #2c2e33;
}

.table tr {
  border-color: #39404b;
}

.table tr:hover {
  background-color: #212529;
}

.table th {
  vertical-align: middle;
  line-height: 1;
  white-space: nowrap;
}

.table td {
  vertical-align: middle;
  line-height: 1;
  white-space: nowrap;
}

.accordion-button {
  background-color: #191c24;
  color: #6c7293;
}

.accordion-button:focus {
  z-index: 3;
  outline: 0;
  box-shadow: none;
}

.accordion-button:not(.collapsed) {
  background-color: #191c24;
  color: #fff;
}

.accordion-body {
  background-color: #191c24;
  color: #6c7293;
}

.accordion-item {
  border-color: #39404b;
}

.symGroup {
  background-color: #191c24;
}

.symIcon {
  width: 8px;
  height: 8px;
}

@media screen and (max-width: 3000px) {
  .accordion {
    width: 780px;
  }

  .accordion-button {
    height: 60px;
    font-size: small;
  }

  .table {
    height: 130px;
  }

  .table th {
    font-size: small;
  }
  .table td {
    font-size: small;
  }
}

@media screen and (max-width: 2000px) {
  .accordion {
    width: 570px;
  }
}

@media screen and (max-width: 1500px) {
  .accordion {
    width: 420px;
  }
  .accordion-button {
    height: 40px;
    font-size: x-small;
  }

  .table {
    height: 80px;
  }

  .table th {
    font-size: x-small;
  }
  .table td {
    font-size: x-small;
  }
}
@media screen and (max-width: 1300px) {
  .accordion {
    width: 360px;
  }
  .accordion-button {
    height: 40px;
    font-size: x-small;
  }

  .table {
    height: 80px;
  }

  .table th {
    font-size: x-small;
  }
  .table td {
    font-size: x-small;
  }
}

@media screen and (max-width: 1000px) {
  .accordion {
    margin-top: 10px;
    width: 865px;
  }
}

@media screen and (max-width: 900px) {
  .accordion {
    margin-top: 10px;
    width: 820px;
  }
}
</style>
