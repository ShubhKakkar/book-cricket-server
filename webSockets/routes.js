const gameControllers = require("../game/controller");
const clientControllers = require("../client/controller");
const { v4: uuidv4 } = require("uuid");

function handleWebSocketRoutes(webSocketServer) {
  const connections = {}; // Store connections with a client_id
  webSocketServer.on("request", (request) => {
    const connection = request.accept(null, request.origin);
    connection.on("open", () => {
      clientControllers
        .changeStatus()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          connection.send(JSON.stringify({ err: err.message }));
        });
    });

    connection.on("close", () => {
      // clientControllers
      //   .changeStatus(request.client_id)
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     connection.send(JSON.stringify({ err: err.message }));
      //   });
      console.log("Connection closed");
    });

    connection.on("message", (message) => {
      const result = JSON.parse(message.utf8Data);
      if (result.method === "connect") {
        clientControllers
          .create(result, connection)
          .then((response) => {
            connections[connection] = response.client_id;
            const payLoad = {
              method: "connect",
              clientId: response.client_id,
            };
            // Send back the client connect
            connection.send(JSON.stringify(payLoad));
          })
          .catch((err) => {
            console.log(err);
            connection.send(JSON.stringify({ err: err.message }));
          });
      }
      if (result.method === "create") {
        gameControllers
          .create(result)
          .then((response) => {
            if (response?._id) {
              const gameId = response._id;
              connection.send(
                JSON.stringify({
                  method: "create",
                  game: {
                    gameId: gameId,
                  },
                })
              );
            } else {
              connection.send(JSON.stringify({ data: response }));
            }
          })
          .catch((err) => {
            connection.send(JSON.stringify({ err: err.message }));
            // next(err);
          });
      }
      if (result.method === "active-players") {
        clientControllers.getLivePlayers().then((players) => {
          connection.send(
            JSON.stringify({
              method: "active-players",
              game: {
                livePlayers: players,
              },
            })
          );
        });
      }
    });
  });
}

module.exports = handleWebSocketRoutes;
