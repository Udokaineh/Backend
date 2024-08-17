const http = require('http')
const path = require('path')
const fs = require('fs')

const port = 8080


const server = http.createServer((req, res) => {
  let filePath = ""

  switch (req.url) {
    case "/":
      filePath = "index.html"
      break;
    case "/about":
      filePath = "about.html"
      break;
    case "/contact-me":
      filePath = "contact-me.html"
      break;
    default:
      filePath = "404.html"
      break;
  }

  const absolutePath = path.join(__dirname, filePath)
  fs.readFile(absolutePath, (error, data) => {
    if (error) {
      res.writeHead(500, {"Content-Type" : "text/html"})
      res.end('500 - Internal Server Error')
    } else {
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end(data)
    }
  })
})

server.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})