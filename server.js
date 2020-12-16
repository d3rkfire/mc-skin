const http = require("http");
const fs = require("fs");
const formidable = require("formidable");

// Create directories if not exist
fs.mkdir(__dirname + "/capes", (err) => {});
fs.mkdir(__dirname + "/resourcepacks", (err) => {});
fs.mkdir(__dirname + "/skins", (err) => {});

// Server
http.createServer((req, res) => {
    console.log(req.connection.remoteAddress);
    // console.log(__dirname + req.url);
    // if (req.url.startsWith("/skins/") || req.url.startsWith("/capes/")) {}
    if (req.url == "/") {
        // Get index page
        res.statusCode = "200";
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(__dirname + "/index.html").pipe(res);
    } else if (fs.existsSync(__dirname + req.url)) {
        // Get skin, cape and resourcepacks
        res.statusCode = "200";
        if (req.url.startsWith("/capes") || req.url.startsWith("/skins")) res.setHeader("Content-Type", "image/png");
        else if (req.url.startsWith("/resourcepacks")) res.setHeader("Content-Type", "application/zip");
        fs.createReadStream(__dirname + req.url).pipe(res);
    } else if (req.url == "/upload") {
        // Upload
        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname;
        form.parse(req, (err, fields, files) => {
            var path = __dirname + "/skins/";
            if (fields.type == "skin") path = __dirname + "/skins/";
            else if (fields.type == "cape") path = __dirname + "/capes/";
            fs.renameSync(files.image_file.path, path + fields.username);

            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.write("<script>var response = \"File successfully uploaded!\";</script>");
            fs.createReadStream(__dirname + "/success.html").pipe(res);
        });
    } else if (req.url == "/removecape") {
        // Remove cape
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (fields.username == "") return;
            var path = __dirname + "/capes/" + fields.username;
            if (fs.existsSync(path)) fs.unlinkSync(path);

            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.write("<script>var response = \"Cape successfully removed!\";</script>");
            fs.createReadStream(__dirname + "/success.html").pipe(res);
        });
    } else {
        // 404 Not Found
        res.statusCode = "404";
        res.end();
    }
}).listen(80);