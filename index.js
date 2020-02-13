const net = require("net");
const fs = require("fs");

const server = net.createServer();

server.on("connection", conn => {
  console.log("New client connected!");

  conn.setEncoding("utf8");

  conn.on("data", data => {
    console.log(data.split(" "));
    let inputArr = data.split(" ");

    for (const fileName of inputArr) {
      fs.readFile(`./server/files/${fileName}`, "utf8", (err, data) => {
        if (data === undefined) {
          console.log("File not found at server.");
        } else {
          try {
            fs.writeFile(`./client/storage/${fileName}`, data, err => {
              try {
                console.log("Server saved the file at local.");
                conn.write("saved");
              } catch (err) {
                console.log(err);
              }
            });
          } catch (err) {
            console.log(`Error: ${err}`);
          }
        }
      });
    }
  });
});

server.listen(8130, () => {
  console.log("Server listening on port 8130!");
});
