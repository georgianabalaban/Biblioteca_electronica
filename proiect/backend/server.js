var express = require("express")
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")

//connect to mysql database
var sequelize = new Sequelize('biblioteca_electronica', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

//define a new Model
var Categories = sequelize.define('categories', {
    name: Sequelize.STRING,
    description: Sequelize.STRING
})

var Documents = sequelize.define('documents', {
    name: Sequelize.STRING,
    category_id: Sequelize.INTEGER,
    description: Sequelize.STRING,
    author: Sequelize.STRING,
    price: Sequelize.INTEGER,
    file: Sequelize.STRING
})

Documents.belongsTo(Categories, {foreignKey: 'category_id', targetKey: 'id'})
//Categories.hasMany(Products)

var app = express();

app.use('/nodeamin', nodeadmin(app));

//access static files
app.use(express.static('../frontend/build'));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// get a list of categories
app.get('/categories', function(request, response) {
    Categories.findAll().then(function(categories){
        response.status(200).send(categories)
    })
        
})

// get one category by id
app.get('/categories/:id', function(request, response) {
    Categories.findOne({where: {id:request.params.id}}).then(function(category) {
        if(category) {
            response.status(200).send(category)
        } else {
            response.status(404).send()
        }
    })
})

//create a new category
app.post('/categories', function(request, response) {
    Categories.create(request.body).then(function(category) {
        response.status(201).send(category)
    })
})

app.put('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(category) {
        if(category) {
            category.update(request.body).then(function(category){
                response.status(201).send(category)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(category) {
        if(category) {
            category.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/documents', function(request, response) {
    Documents.findAll(
        /*{
            include: [{
                model: Categories,
                where: { id: Sequelize.col('documents.category_id') }
            }]
        }*/
        
        ).then(
            function(documents) {
                response.status(200).send(documents)
            }
        )
})

app.get('/documents/:id', function(request, response) {
    Documents.findById(request.params.id).then(
            function(product) {
                response.status(200).send(product)
            }
        )
})

app.post('/documents', function(request, response) {
    Documents.create(request.body).then(function(product) {
        response.status(201).send(product)
    })
})

app.put('/documents/:id', function(request, response) {
    Documents.findById(request.params.id).then(function(product) {
        if(product) {
            product.update(request.body).then(function(product){
                response.status(201).send(product)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.put('/categories/:aid/documents/:mid', (req, res, next) => {
	Documents.findById(req.params.mid)
		.then((document) => {
			if (document){
				return document.update(req.body, {fields : ['name', 'description']})
			}
			else{
				res.status(404).send('not found')
			}
		})
		.then(() => {
			if (!res.headersSent){
				res.status(201).send('modified')
			}
		})
		.catch((err) => next(err))
})

app.post('/categories/:aid/documents', (req, res, next) => {
	Categories.findById(req.params.aid)
		.then((category) => {
			if (category){
				let document = req.body
				document.category_id = category.id
				return Documents.create(document)
			}
			else{
				res.status(404).send('not found')
			}
		})
		.then((messages) => {
			if (!res.headersSent){
				res.status(200).send('created')
			}	
		})
		.catch((err) => next(err))
	
})

app.delete('/documents/:id', function(request, response) {
    Documents.findById(request.params.id).then(function(product) {
        if(product) {
            product.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/categories/:id/documents', function(request, response) {
    Documents.findAll({where:{category_id: request.params.id}}).then(
            function(products) {
                response.status(200).send(products)
            }
        )
})

app.listen(8080)