import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

export default {
  data() {
    return {
      socket: null,
      isSocketConnected: false,
    };
  },
  methods: {
    async startConnection() {
      try {
        await this.socket.start();
        console.log("SignalR Connected.");
        this.isSocketConnected = true;
      } catch (err) {
        console.log("Connection failed: ", err);
        this.isSocketConnected = false;
        setTimeout(this.startConnection, 5000);
      }
    },
    createSignalRConnection() {
      this.socket = new HubConnectionBuilder()
      .withUrl("http://185.177.59.169:8090/centroidHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Debug)
      .build();
    },
    setSocketEvents(){
      this.socket.on("ReceiveMessageFromCentro", (data) => {
        // console.log("Received data update:", data);
        this.$emit("symbolDataUpdated", data);
      });
      this.socket.onclose(() => this.startConnection());
    },
  },
  async created() {
    await this.createSignalRConnection();
    await this.startConnection();
    await this.setSocketEvents();
    if(this.isSocketConnected) {
    }
    else{
      console.log("Socket Not Connected");
    }
  },
};
