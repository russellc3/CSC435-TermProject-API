const expect = require('chai').expect
const mongoose = require('mongoose')
const mongoUnit = require('../index')
const service = require('./controllers/product')
const testMongoUrl = process.env.MONGO_URI

describe('service', () => {
    const testData = require('./testData.json')
    beforeEach(() => mongoUnit.initDb(testMongoUrl, testData))
    afterEach(() => mongoUnit.drop())

    it('should find all products', () => {
        return service.read()
            .then(products => {
                expect(products.length).to.equal(1)
                expect(products[0].name).to.equal('test')
            })
    })

    it('should create new product', () => {
        return service.create({ name: 'next', price: 9.99, quantity: 15 })
            .then(products => {
                expect(products.name).to.equal('next')
                expect(products[1].quantity).to.equal(10)
            })
            .then(() => service.read())
            .then(products => {
                expect(products.length).to.equal(2)
                expect(products[1].name).to.equal('next')
            })
    })

    it('should remove task', () => {
        return service.read()
            .then(products => products[1]._id)
            .then(productId => service.remove(productId))
            .then(() => service.read())
            .then(products => {
                expect(products.length).to.equal(0)
            })
    })
})
