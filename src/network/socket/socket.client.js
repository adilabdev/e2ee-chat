export class SocketClient {
  constructor({
    userId,
    onMessage,
  }) {
    this.userId = userId;

    this.onMessage = onMessage;

    this.ws = null;

    this.connected = false;
  }

  connect() {
    if (
      this.ws &&
      this.ws.readyState === WebSocket.OPEN
    ) {
      return;
    }

    this.ws = new WebSocket(
      "ws://localhost:3000"
    );

    this.ws.onopen = () => {
      this.connected = true;

      console.log(
        "✅ socket connected"
      );

      this.send({
        type: "REGISTER",

        userId: this.userId,
      });
    };

    this.ws.onclose = () => {
      this.connected = false;

      console.log(
        "❌ socket disconnected"
      );
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(
        event.data
      );

      console.log("📩", data);

      this.onMessage(data);
    };
  }

  send(data) {
    if (!this.connected) {
      console.log(
        "socket not connected"
      );

      return;
    }

    this.ws.send(
      JSON.stringify(data)
    );
  }
}