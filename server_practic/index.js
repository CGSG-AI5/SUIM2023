const http = require("http") 
const fs = require("fs").promises

const requestListener = async(req, res) =>{
    console.log(req.url)
    const data = await fs.readFile(__dirname + "/index.html")
    res.setHeader("Content-Type", "text/html")
    res.writeHead(200);
    const object = {
        message: "Hello",
    }
    res.end(data);
}

const server = http.createServer(requestListener);

const host = "localhost";
const port = 8002

server.listen(port, host, () =>{
    console.log(`Server is running on http://${host}:${port}`);
})