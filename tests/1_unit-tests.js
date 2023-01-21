const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Basic Assertions', function(){
        test('convertHandler should correctly read a whole number input.', function(){
            let input = '10L';
            assert.equal(convertHandler.getNum(input), 10, "Failed!");
        });
        test('convertHandler should correctly read a decimal number input.', function(){
            let input = '10.5kg';
            assert.equal(convertHandler.getNum(input), 10.5, "Failed!");
        });
        test('convertHandler should correctly read a fractional input.', function(){
            let input = '10/7gal';
            assert.equal(convertHandler.getNum(input), 10/7, "Failed!");
        });
        test('convertHandler should correctly read a fractional input with a decimal.', function(){
            let input = '10.3/3.7mi';
            assert.equal(convertHandler.getNum(input), 10.3/3.7, "Failed!");
        });
        test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function(){
            let input = '3/2/3';
            assert.equal(convertHandler.getNum(input), 'invalid', "Failed!");
        });
        test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.',function(){
            let input = 'kg';
            assert.equal(convertHandler.getNum(input), 1, "Failed!");
        });
        test('convertHandler should correctly read each valid input unit.', function(){
            let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
            input.forEach(unit => {
                if (unit === 'l' || unit === 'L') assert.equal(convertHandler.getUnit(unit), 'L', "Failed on 'l'!");
                else assert.equal(convertHandler.getUnit(unit), unit.toLowerCase(), `Failed on ${unit}`);
            });
        });
        test('convertHandler should correctly return an error for an invalid input unit.', function(){
            let input = 'invUnit';
            assert.equal(convertHandler.getUnit(input), 'invalid', "Failed!");
        });
        test('convertHandler should return the correct return unit for each valid input unit.', function(){
            let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
            input.forEach(unit => {
                switch (unit) {
                    case 'gal' :
                    case 'GAL' : assert.equal(convertHandler.getReturnUnit(unit), 'L', `Failed on ${unit}`); break;
                    case 'l' : 
                    case 'L' : assert.equal(convertHandler.getReturnUnit(unit), 'gal', `Failed on ${unit}`); break;
                    case 'mi' : 
                    case 'MI' : assert.equal(convertHandler.getReturnUnit(unit), 'km', `Failed on ${unit}`); break;
                    case 'km' : 
                    case 'KM' : assert.equal(convertHandler.getReturnUnit(unit), 'mi', `Failed on ${unit}`); break;
                    case 'lbs' : 
                    case 'LBS' : assert.equal(convertHandler.getReturnUnit(unit), 'kg', `Failed on ${unit}`); break;
                    case 'kg' : 
                    case 'KG' : assert.equal(convertHandler.getReturnUnit(unit), 'lbs', `Failed on ${unit}`); break;
                    default: assert.fail("Wrong input!"); break;
                  }
            });
        });
        test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function(){
            let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
            input.forEach(unit => {
                switch(unit.toLowerCase()){
                    case 'gal' : assert.equal(convertHandler.spellOutUnit(unit), 'gallons', `Failed on ${unit}`); break;
                    case 'l' : assert.equal(convertHandler.spellOutUnit(unit), 'liters', `Failed on ${unit}`); break;
                    case 'mi' : assert.equal(convertHandler.spellOutUnit(unit), 'miles', `Failed on ${unit}`); break;
                    case 'km' : assert.equal(convertHandler.spellOutUnit(unit), 'kilometers', `Failed on ${unit}`); break;
                    case 'lbs' : assert.equal(convertHandler.spellOutUnit(unit), 'pounds', `Failed on ${unit}`); break;
                    case 'kg' : assert.equal(convertHandler.spellOutUnit(unit), 'kilograms', `Failed on ${unit}`); break;
                    default : assert.equal(convertHandler.spellOutUnit(unit), 'invalid', `Failed on ${unit}`); break;
                }
            });
        });
        test('convertHandler should correctly convert gal to L.', function(){
            let initUnit = 'gal';
            assert.equal(convertHandler.getReturnUnit(initUnit), 'L', "Failed!");
        });
        test('convertHandler should correctly convert L to gal.', function(){
            let initUnit = 'L';
            assert.equal(convertHandler.getReturnUnit(initUnit), 'gal', "Failed!");
        });
        test('convertHandler should correctly convert mi to km.', function(){
            let initUnit = 'mi';
            assert.equal(convertHandler.getReturnUnit(initUnit), 'km', "Failed!");
        });
        test('convertHandler should correctly convert km to mi.', function(){
            let initUnit = 'km';
            assert.equal(convertHandler.getReturnUnit(initUnit), 'mi', "Failed!");
        });
        test('convertHandler should correctly convert lbs to kg.', function(){
            let initUnit = 'lbs';
            assert.equal(convertHandler.getReturnUnit(initUnit), 'kg', "Failed!");
        });
        test('convertHandler should correctly convert kg to lbs.', function(){
            let initUnit = 'kg';
            assert.equal(convertHandler.getReturnUnit(initUnit), 'lbs', "Failed!");
        });
    });
});