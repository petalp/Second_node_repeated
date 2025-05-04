import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';


const app = express();
const PORT = process.env.PORT || 5003

//Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
//Get the directory name from the file path
const __dirname = dirname (__filename);  

// Middleware
app.use(express.json())

//Serves the HTML file from the /public directory 
// Tells express to server all files public folder as static assets file. Any requests for the css files will be resolved to the public directory
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) =>{ 
         res.sendFile (path.join(__dirname, 'public', 'index.html '))
})

// routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)
app.listen(PORT, ()=>{
    console.log(`My server is running on port: ${PORT}`)
})