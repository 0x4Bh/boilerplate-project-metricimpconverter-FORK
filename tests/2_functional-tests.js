const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    suite('All 5 functional tests', () => {
        test('1. Convert a valid input such as 10L: GET request to /api/convert.', () => {
            chai.request(server)
                .get('/api/convert?input=10L')
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.initNum, 10)
                    assert.equal(res.body.initUnit, "L")
                    assert.equal(res.body.returnNum, 2.64172)
                    assert.equal(res.body.returnUnit, "gal")
                    assert.equal(res.body.string, "10 liters converts to 2.64172 gallons")
                });
        });
        test('2. Convert an invalid input such as 32g: GET request to /api/convert.', () => {
            chai.request(server)
                .get('/api/convert?input=32g')
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.text, "invalid unit")
                });
        });
        test('3. Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', () => {
            chai.request(server)
                .get('/api/convert?input=3/7.2/4kg')
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.text, 'invalid number')
                });
        });
        test('4. Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', () => {
            chai.request(server)
                .get('/api/convert?input=3/7.2/4kilomegagram')
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.text, 'invalid number and unit')
                });
        });
        test('5. Convert with no number such as kg: GET request to /api/convert.', () => {
            chai.request(server)
                .get('/api/convert?input=kg')
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.initNum, 1)
                    assert.equal(res.body.initUnit, "kg")
                    assert.equal(res.body.returnNum, 2.20462)
                    assert.equal(res.body.returnUnit, "lbs")
                    assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds")
                });
        });
    });
});
