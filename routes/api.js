'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum;
    let returnUnit;
    if (initNum === 'invalid' && (initUnit === 'invalid' || convertHandler.getReturnUnit(initUnit) === 'invalid')) {
      res.send("invalid number and unit");
    }
    else if (initNum === 'invalid') {
      res.send("invalid number");
    }
    else if (initUnit === 'invalid' || convertHandler.getReturnUnit(initUnit) === 'invalid') {
      res.send("invalid unit");
    }
    else {
      returnNum = convertHandler.convert(initNum, initUnit);
      returnUnit = convertHandler.getReturnUnit(initUnit);

      res.json({
        "initNum": Number(initNum),
        "initUnit": initUnit,
        "returnNum": returnNum,
        "returnUnit": returnUnit,
        "string": convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      });
    }
  });

};
