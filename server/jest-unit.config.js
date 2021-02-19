/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./jest.config')
config.testMatch = ['**/?(*.)+(spec|test).[tj]s?(x)']

module.exports = config
