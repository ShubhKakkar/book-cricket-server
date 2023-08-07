const controller = require("./controller");
const { v4: uuidv4 } = require("uuid");

function handleClientWebSocketRoutes(webSocketServer) {
  webSocketServer.on("request", (request) => {
    const connection = request.accept(null, request.origin);
    connection.on("open", () => {
      console.log("opened");
    });

    connection.on("close", () => {
      console.log("closed");
    });

    connection.on("message", (message) => {
      const result = JSON.parse(message.utf8Data);
      if (result.method === "connect") {
        const clients = [];
        // controller
        //   .create(req.body)
        //   .then((response) => res.status(200).json({ data: response }))
        //   .catch((err) => {
        //     res.status(500).json({ err: err.message });
        //     // next(err);
        //   });
        // Generate a new client Id -> Will use mongodb next time
        const clientId = uuidv4();
        clients[clientId] = {
          connection: connection,
        };
        const payLoad = {
          method: "connect",
          clientId: clientId,
        };
        // Send back the client connect
        connection.send(JSON.stringify(payLoad));
      }
    });

  });
}

module.exports = handleClientWebSocketRoutes;