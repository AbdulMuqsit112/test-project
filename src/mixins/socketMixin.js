import io from "socket.io-client";

export default {
  data() {
    return {
      socket: null,
      runSocket: false
    };
  },
  methods: {
    connectSocket() {
      this.socket = io("http://localhost:3000");

      this.socket.on("symbolData", (data) => {
        console.log("Received data update:", data);
        this.$emit("symbolDataUpdated", data);
      });

      this.socket.on("stocksData", (data) => {
        console.log("Received data update:", data);
        this.$emit("stocksDataUpdated", data);
      });

      this.socket.on("historyData", (data) => {
        console.log("Received data update:", data);
        this.$emit("historyDataUpdated", data);
      });
      
    },
    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect();
      }
    },
  },
  created() {
    if(this.runSocket) this.connectSocket();
  },
  destroyed() {
    this.disconnectSocket();
  },
};
