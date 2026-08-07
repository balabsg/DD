// Import required modules 
const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 
// Define the port 
const PORT = 3000; 
// Create the server 
const server = http.createServer((req, res) => { 
// Build file path based on request URL 
let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url); 
// Get file extension 
let extname = path.extname(filePath); 
// Default content type 
let contentType = 'text/html'; 
// Set content type based on file extension 
switch (extname) { 
case '.css': 
contentType = 'text/css'; 
break; 
case '.js': 
contentType = 'text/javascript'; 
break; 
case '.json': 
contentType = 'application/json'; 
break; 
case '.png': 
contentType = 'image/png'; 
break; 
case '.jpg': 
contentType = 'image/jpg'; 
break; 
} 
// Read and serve the file               
fs.readFile(filePath, (err, content) => { 
if (err) { 
if (err.code === 'ENOENT') { 
// File not found → serve 404 page 
res.writeHead(404, { 'Content-Type': 'text/html' }); 
res.end('<h1>404 Not Found</h1>', 'utf-8'); 
} else { 
// Server error 
res.writeHead(500); 
res.end(`Server Error: ${err.code}`); 
} 
} else { 
// Success → serve file 
res.writeHead(200, { 'Content-Type': contentType }); 
res.end(content, 'utf-8'); 
} 
}); 
}); 
// Start the server 
server.listen(PORT, () => { 
console.log(`Server running at http://localhost:${PORT}/`); 
}); 