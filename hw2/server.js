const http = require('http')
const mongoose = require('mongoose')
const qs = require('querystring');
const { UserModel } = require('./user.model')
const { ProjectModel } = require('./project.model')
require('dotenv').config()
var ObjectId = mongoose.Types.ObjectId;

mongoose.connect(
    process.env.db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => console.log('connected to DB')
)

const routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DELETE': {}
}

http.createServer((req, res) => {
    if (routes[req.method]) {
        useRoute(req, res)
    } else {
        res.writeHead(405, { "Content-Type": "text/plain" })
        res.end()
    }
}).listen(8001)
console.log('Server running at http://127.0.0.1:8001')


function useRoute(req, res) {
    if (req.url.slice(-1) == '/') {
        req.url = req.url.slice(0, -1)
    }

    let body = ''
    const route = routes[req.method]
    const [resource, queryString] = req.url.split('?')
    req.queryString = qs.parse(queryString)

    req.on('data', (chunk) => {
        body += chunk
    })

    req.on('end', () => {
        if (body != '')
        {
            try {
                req.body = JSON.parse(body)
            }
            catch {
                res.writeHead(422, { "Content-Type": "text/plain" })
                res.end(JSON.stringify({
                    'message': 'body should have a valid json format!'
                }))
                return
            }
        }

        for (const [regex, controller] of Object.entries(route)) {
            const found = resource.match(regex)

            if (found && found[0] == resource) {
                req.params = {}
                req.params.users = found[1]
                req.params.projects = found[2]
                return controller(req, res)
            }
        }

        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end()
    })
}


function addToRoutes(method, path, callback) {
    path = path.replace(/\//g, '\\/')
    path = path.replace(/{id}/g, '([a-z0-9A-Z]+)')
    routes[method][path] = callback
}

app = {
    get: (path, callback) => addToRoutes('GET', path, callback),
    post: (path, callback) => addToRoutes('POST', path, callback),
    put: (path, callback) => addToRoutes('PUT', path, callback),
    delete: (path, callback) => addToRoutes('DELETE', path, callback),
}

app.get('/users', async (req, res) => {
    try {
        const filter = req.queryString

        let pageSize = 100
        let pageNumber = 0
        if (filter.pageSize) {
            pageSize = parseInt(filter.pageSize)
        }
        if (filter.pageNumber) {
            pageNumber = parseInt(filter.pageNumber)
        }

        delete filter.pageSize
        delete filter.pageNumber

        users = await UserModel.find(filter, {}, {skip: pageSize*pageNumber, limit: pageSize})

        if (!users || users.length == 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))

    } catch (err) {
        console.log(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end([])
    }
})

app.get('/users/{id}', async (req, res) => {
    try {
        const id = req.params.users
        if (!ObjectId.isValid(id)) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }

        const user = await UserModel.findOne({ _id: id })
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(user))

    } catch (err) {
        console.log(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end()
    }
})

app.post('/users', async (req, res) => {
    try {
        const found = await UserModel.findOne({ ...req.body })
        if (found) {
            res.writeHead(409, { 'Content-Type': 'application/json' })
            res.end()
            return
        }

        const user = await UserModel.create({ ...req.body })
        res.writeHead(201, { 'Content-Type': 'application/json', 'Location': `/users/${user._id}` })
        res.end()

    } catch (err) {
        console.log(err)
        if (err._message === 'users validation failed') {
            res.writeHead(422, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                'message': err.message
            }))
        }
        else {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end()
        }
    }
})

app.post('/users/{id}', async (req, res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end()
})

app.put('/users', async (req, res) => {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end()
})

app.put('/users/{id}', async (req, res) => {
    try {
        const id = req.params.users
        if (!ObjectId.isValid(id)) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }

        const found = await UserModel.findOne({ _id: id })
        if (!found) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }

        if (!req.body || req.body === {})
        {
            res.writeHead(204, { 'Content-Type': 'application/json' })
            res.end()
            return
        }

        await UserModel.updateOne(
            { _id : id },
            { $set: req.body }
        )

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end()

    } catch (err) {
        console.log(err)
        if (err.code === 11000) {
            res.writeHead(409, { 'Content-Type': 'application/json' })
            res.end()
        }
        else {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end()
        }
    }
})

app.delete('/users', async (req, res) => {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end()
})

app.delete('/users/{id}', async (req, res) => {
    try {
        const id = req.params.users 
        if (!ObjectId.isValid(id)) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }
    
        const found = await UserModel.findOne({ _id: id })
        if (!found) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }
    
        await UserModel.deleteOne({ _id : id })
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end()

    } catch (err) {
        console.log(err) 
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end()
    }
})

app.post('/users/{id}/projects', async (req, res) => {
    try {
        const id = req.params.users 
        if (!ObjectId.isValid(id)) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }
    
        const foundUser = await UserModel.findOne({ _id: id })
        if (!foundUser) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        } 

        const project = await ProjectModel.create({ ...req.body, owner: foundUser}) 
        res.writeHead(201, { 'Content-Type': 'application/json', 'Location': `/users/${id}/projects/${project._id}` })
        res.end()

    } catch (err) {
        console.log(err)
        if (err._message === 'projects validation failed') {
            res.writeHead(422, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                'message': err.message
            }))
        }
        else {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end()
        }
    }
})  

app.post('/users/{id}/projects/{id}', async (req, res) => {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end()
})

app.get('/users/{id}/projects', async (req, res) => {
    try {
        const id = req.params.users 
        if (!ObjectId.isValid(id)) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }
    
        const foundUser = await UserModel.findOne({ _id: id })
        if (!foundUser) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        } 

        const projects = await ProjectModel.find({}) 
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(projects))

    } catch (err) {
        console.log(err) 
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end() 
    }
})  

app.get('/users/{id}/projects/{id}', async (req, res) => {
    try {
        const id = req.params.users 
        if (!ObjectId.isValid(id)) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }
    
        const foundUser = await UserModel.findOne({ _id: id })
        if (!foundUser) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        } 

        const projectId = req.params.projects 
        if (!ObjectId.isValid(projectId)) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end()
            return
        }

        const projects = await ProjectModel.find({_id: projectId}) 
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(projects))

    } catch (err) {
        console.log(err)  
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end() 
    }
})  