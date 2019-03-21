const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')

const app = express(); 

//express middleware // 
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())  
app.use(cors())


//user routes// 
app.get('/', (req,res) => {
	res.send('spotify test app')
}); 

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Server running on port: ${port}`)})