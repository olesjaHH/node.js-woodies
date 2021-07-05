const fs = require('fs');
const http = require('http');
const path = require('path')

console.log("work")

const server = http.createServer((req, res) => {
    let filePath = path.join('./public', req.url === "/" ? "index.html" : req.url)
    console.log("Pfad", filePath)

    let extName = path.extname(filePath)
    console.log("Endung", extName)

    let contentType = "text/html"
    switch (extName) {
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.ico':
            contentType = 'image/x-icon'
            break;
        // Hier alle Dateitypen, die ihr auf der HP habt, anlegen
    }
    console.log("contentType", contentType)

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err)
            if (err.code === "ENOENT") {
                fs.readFile('./public/404.html', (err, data) => {
                    res.writeHead(200, {'Content-Type' : "text/html"})
                    res.end(data)
                })
            } else {
                res.writeHead(500)
                res.end(`Some Error: ${err.code}`)
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(data)
        }
    })
})

server.listen(3002, () => console.log("Server running on port 3002"))