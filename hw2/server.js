const http = require('http');
const mongoose = require('mongoose');
const { UserModel } = require('./user.model');
const { ProjectModel } = require('./project.model');

mongoose.connect(
    asdasd,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => console.log('connected to DB')
);
 
const routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DELETE': {}
};

http.createServer((req, res) => {  
    if (routes[req.method]) {
        useRoute(req, res);
    } else {
        res.writeHead(405, {"Content-Type": "text/plain"});
        res.end();
    }
}).listen(8001)
console.log('Server running at http://127.0.0.1:8001') ;


function useRoute(req, res) {
    let ok = false;
    let body = '';
    const resource = req.url;
    const route = routes[req.method];
    
    req.on('data', (chunk) => {
        body += chunk;
    });
    
    req.on('end', () => {

        if (body !== '')  {
            try {
                req.body = JSON.parse(body);
            }
            catch {
                res.writeHead(422, {"Content-Type": "text/plain"});
                res.end();
            }
        }
        
        for (const [regex, controller] of Object.entries(route)) {
            const found = resource.match(regex); 

            if (found)
            {
                req.params = {};
                req.params.users = found[1];
                req.params.projects = found[2];
            }

            if (found && found[0] == resource) {
                ok = true;
                return controller(req, res);
            }
        } 
        
        if (!ok) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end();
        } 
    });
}


function addToRoutes(method, path, callback) {
    path = path.replace(/\//g, '\\/');
    path = path.replace(/{id}/g, '([a-z0-9A-Z]+)'); 
    routes[method][path] = callback;
}

app = { 
    get: (path, callback) => addToRoutes('GET', path, callback),
    post: (path, callback) => addToRoutes('POST', path, callback),
    put: (path, callback) => addToRoutes('PUT', path, callback),
    delete: (path, callback) => addToRoutes('DELETE', path, callback),
}

app.get('/users', async (req, res) => {
    try {
        users = await UserModel.find({})
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users)) 
    } catch(err) {
        console.log(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end() 
    }
});

app.get('/users/{id}', async (req, res) => { 
    try {
        const id = req.params.users
        const user = await UserModel.findOne({
            _id: id
        })
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(user)) 
    } catch(err) {
        console.log(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end() 
    }
});

// app.get('/users/{id}/projects', (req, res) => {
     
// });

// app.get('/users/{id}/projects/{id}', (req, res) => {
     
// });

app.post('/users', async (req, res) => { 
    try {
        const {username, email} = req.body
        console.log(username)
        console.log(email)
        await UserModel.create({
            username,
            email,
        });
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end() 
    } catch(err) {
        console.log(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end() 
    }
})
 