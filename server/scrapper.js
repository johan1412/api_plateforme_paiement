const http = require("http");
const https = require("https");
const querystring = require("querystring");

exports.Scrapper = function ({ url, body, ...options }, processData, saveData) {
  const protocol = url.startsWith("https") ? https : http;
  if (body) {
    options.headers["content-type"] ??= "application/x-www-form-urlencoded";
    if (
      options.headers["content-type"] === "application/x-www-form-urlencoded"
    ) {
      body = querystring.stringify(body);
    }
    if (options.headers["content-type"] === "application/json") {
      body = JSON.stringify(body);
    }
    options.headers["content-length"] = Buffer.byteLength(body);
  }
  const req = protocol.request(url, options, (res) => {
    if (res.statusCode >= 300) throw new Error("Something went wrong");

    let data = [];
    res.on("data", (chunk) => data.push(chunk));

    res.on("end", () => {
      data = Buffer.concat(
        data,
        data.reduce((acc, item) => acc + Buffer.byteLength(item), 0)
      );
      if (res.headers["content-type"].indexOf("json") >= 0) {
        data = JSON.parse(data);
      }
      const dataProcessed = processData(data);
      // Save Data
      saveData(dataProcessed);
    });
  });

  this.scrap = () => {
    if (body) req.write(body);
    req.end();
  };
};

exports.MongooseGenerator = (data, model) => {
    model.insertMany(data)
};
