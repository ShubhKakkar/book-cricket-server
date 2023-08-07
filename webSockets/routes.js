const gameControllers = require("../game/controller");
const { v4: uuidv4 } = require("uuid");

function handleWebSocketRoutes(webSocketServer) {
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
      if (result.method === "create") {
        gameControllers
          .create(result)
          .then((response) => {
            console.log("SDfsdda");
            console.log(response);
              if(response?._id) {
                const gameId = response._id;
                connection.send(
                  JSON.stringify({
                    method: "create",
                    game: {
                      gameId: gameId,
                    },
                  })
                );
              }
              else {
                connection.send(JSON.stringify({ data: response }));
              }
            })
          .catch((err) => {
            connection.send(JSON.stringify({ err: err.message }));
            // next(err);
          });
      }
    });
  });
}

module.exports = handleWebSocketRoutes;
