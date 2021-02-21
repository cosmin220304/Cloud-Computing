const { apiController } = require('./apiController')
const { errorController } = require('./errorController')
const { viewController } = require('./viewController')
const { publicController } = require('./publicController')

controller = {
    api: apiController,
    error: errorController,
    view: viewController,
    public: publicController,
}

module.exports = {
    controller
}