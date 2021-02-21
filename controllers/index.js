const { apiController } = require('./apiController')
const { errorController } = require('./errorController')
const { viewController } = require('./viewController')
const { publicController } = require('./publicController')
const { logsController } = require('./logsController')

controller = {
    api: apiController,
    error: errorController,
    view: viewController,
    public: publicController,
    logs: logsController,
}

module.exports = {
    controller
}