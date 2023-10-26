//Volta a URL
const axios = require("axios");
const jsonwebtoken = require("jsonwebtoken");

const apiKey = "4bzrNwxsQn2x7kKDfS3utn";
const apiSecret = "wyX0/y7vo/qq39REOD4KGwI007F3OH2cH5n/4nfx";

let date = new Date();
let now_utc = Date.UTC(
  date.getUTCFullYear(),
  date.getUTCMonth(),
  date.getUTCDate(),
  date.getUTCHours(),
  date.getUTCMinutes(),
  date.getUTCSeconds()
);

const jwtToken = jsonwebtoken.sign(
  {
    uid: apiKey,
    exp: Math.floor(new Date(now_utc).getTime() / 1000) + 600,
    iat: Math.floor(new Date(now_utc).getTime() / 1000),
  },
  apiSecret
);

const url = `https://api.pub2.passkit.io/eventTickets/pass`;
const requestBody = {
  ticketId: {
    id: "2M7jDwtcb83Fcnhe8z7Iqf",
  },
//   ticketNumber: {
//     productionId: "2yMRIgLzrbHgeBW8rYO9JD",
//     //productionUid: "2yMRIgLzrbHgeBW8rYO9JD",
//     ticketNumber: "002"
//   },
//   orderNumber: {
//     productionId: "2yMRIgLzrbHgeBW8rYO9JD",
//     //"productionUid": "string",
//     orderNumber: "002"
//   },
  format: ["PASS_URL"],
};

axios
  .post(url, requestBody, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
  .then((response) => {
    console.log("Status da resposta:", response.status);
    console.log("Resposta:", response.data);
  })
  .catch((error) => {
    console.error("Erro ao fazer a requisição:", error);
  });
