const http = require("http");
const https = require("https");
const fs = require("fs/promises");
const querystring = require("querystring");
const { JSDOM } = require("jsdom");

exports.Scrapper = function ({ url, body, ...options }, processData, saveData) {
   const protocol = url.startsWith("https") ? https : http;

   if (body) {
      options.headers["Content-type"] ??= "application/x-www-form-urlencoded";

      if (options.headers["Content-type"] === "application/x-www-form-urlencoded") {
         body = querystring.stringify(body);
      }

      if (options.headers["Content-type"] === "application/json") {
         body = JSON.stringify(body);
      }

      options.headers["Content-Length"] = Buffer.byteLength(body);
   }

   const request = protocol.request(url, options, (response) => {
      let data = [];
      response.on("data", (chunk) => data.push(chunk));

      response.on("end", () => {
         data = Buffer.concat(
            data,
            data.reduce((accumulateur, buff) => accumulateur + Buffer.byteLength(buff), 0)
         );

         // Parsing
         if (response.headers["content-type"].indexOf("json") !== -1) {
            data = JSON.parse(data.toString());
         } else if (response.headers["content-type"].indexOf("html") !== -1) {
            const dom = new JSDOM(data.toString());
            data = dom.window.document;
         }

         // Processing
         data = processData(data);

         // Saving
         saveData(data);
      });
   });

   this.scrap = () => {
      if (body) request.write(body);
      request.end();
   };
};

exports.CSVGenerator = (data, filename = "./exports.csv") => {
   const csvHeaders = Object.keys(data[0]).join(",");
   const csvBody = data.map((it) => Object.values(it).join(","));
   exports.FileGenerator(csvHeaders + "\n" + csvBody.join("\n"), filename);
};

exports.FileGenerator = (data, filename = "./file") => {
   fs.writeFile(filename, data);
};

exports.MongooseGenerator = (data, model) => {
   model
      .insertMany(data)
      .then((_) => console.log("Data saved to collection " + model.collection.name));
};