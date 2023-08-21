const gameControllers = require("../game/controller");
const clientControllers = require("../client/controller");

const clients = {}; // Store connections with a client_id
const games = {}; // To store complete games data

function handleWebSocketRoutes(webSocketServer) {
  webSocketServer.on("request", (request) => {
    const connection = request.accept(null, request.origin);
    connection.on("open", () => {
      clientControllers
        .changeStatus()
        .then((data) => {
          // console.log(data);
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

      // Permanent code
      if (result.method === "connect") {
        clientControllers
          .create(result, connection)
          .then((response) => {
            clients[response.client_id] = {
              connection: connection,
            };
            console.log(clients);
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
              const clientId = result.clientId;
              const gameId = response._id;
              games[gameId] = {
                id: gameId,
                createdBy: clientId,
                clients: [],
              };
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
        // Inside the create method or similar, after adding the new player
        clientControllers.getLivePlayers().then((players) => {
          Object.keys(clients).forEach((key) => {
            const connection = clients[key].connection;
            connection.send(
              JSON.stringify({
                method: "active-players",
                game: {
                  livePlayers: players,
                },
              })
            );
          });
        });
      }
      if (result.method === "invite") {
        if(!result.client_id || !result.gameId) {
          return "incomplete information";
        }
        const user_id = result?.user_id;
        const client_id = result?.client_id;
        const gameId = result?.gameId;
        clientControllers.getLivePlayerByClientId(client_id).then((player) => {
          if (
            clients[client_id]
          ) {
            clients[client_id].connection.send(
              JSON.stringify({
                method: "invite-confirmation",
                data: {
                  user_id: user_id,
                  client_id: client_id,
                  gameId: gameId,
                },
              })
            );
          } else {
            // Handle the case when the connection is not open
            console.log("not opened");
          }
        });
      }
      if (result.method === "invite-answer") {
        // Check if invite result is true, false or anything else and send result to p1 and p2
        if (result?.answer || result?.answer === "yes") {
          const answer = result?.answer;
          const player1 = result?.player1;
          const player2 = result?.player2;
          const gameId = result.gameId;
          console.log(games, gameId);
          // Join the game
          games[gameId].clients.push({
            id: player1,
            totalRuns: 0,
            outCount: 0,
            numberOfBallsPlayed: 0,
          });
          games[gameId].clients.push({
            id: player2,
            totalRuns: 0,
            outCount: 0,
            numberOfBallsPlayed: 0,
          });
          const arr = [player1, player2];
          for (i = 0; i < arr.length; i ++) {
            console.log(arr);
            // generate a gameClient document
            clients[arr[i]].connection.send(
              JSON.stringify({
                method: "open-play-modal",
                data: {
                  player1: player1,
                  player2: player2,
                  gameId: gameId,
                  answer: answer,
                },
              })
            );
          }
        }
      }
      if (result.method === "play") {
        updateGameState();
        let cId = result.clientId;
        let gId = result.gameId;
        let rScored = result.runsScored;
        console.log(cId, gId, rScored, games);
        const clientIndex = games[gId].clients.findIndex(
          (client) => client.id === cId
        );
        if (rScored === 0) {
          if (clientIndex !== -1) {
            if (games[gId].clients[clientIndex].outCount !== 3) {
              games[gId].clients[clientIndex].totalRuns += 0;
              games[gId].clients[clientIndex].outCount += 1;
              games[gId].clients[clientIndex].numberOfBallsPlayed += 1;
            }
          }
        } else if (rScored === 1 || rScored === 2) {
          if (clientIndex !== -1) {
            if (games[gId].clients[clientIndex].outCount !== 3) {
              games[gId].clients[clientIndex].totalRuns += 2;
              games[gId].clients[clientIndex].numberOfBallsPlayed += 1;
            }
          }
        } else if (rScored === 3 || rScored === 4) {
          if (clientIndex !== -1) {
            if (games[gId].clients[clientIndex].outCount !== 3) {
              games[gId].clients[clientIndex].totalRuns += 4;
              games[gId].clients[clientIndex].numberOfBallsPlayed += 1;
            }
          }
        } else if (rScored === 5 || rScored === 6) {
          if (clientIndex !== -1) {
            if (games[gId].clients[clientIndex].outCount !== 3) {
              games[gId].clients[clientIndex].totalRuns += 6;
              games[gId].clients[clientIndex].numberOfBallsPlayed += 1;
            }
          }
        } else if (rScored === 7 || rScored === 8) {
          if (clientIndex !== -1) {
            if (games[gId].clients[clientIndex].outCount !== 3) {
              games[gId].clients[clientIndex].totalRuns += 1;
              games[gId].clients[clientIndex].numberOfBallsPlayed += 1;
            }
          }
        }
      }
    });

    // Here you need to update this using mongodb
    function updateGameState() {
      const gamesList = Object.keys(games);
      for (const g of gamesList) {
        let updatePayload = {
          method: "update",
          game: games[g],
        };
        console.log(games[g]);
        Object.values(games[g].clients).forEach((c) => {
          clients[c.id].connection.send(JSON.stringify(updatePayload));
        });
      }
      setTimeout(updateGameState, 500);
    }
  });
}

module.exports = handleWebSocketRoutes;
