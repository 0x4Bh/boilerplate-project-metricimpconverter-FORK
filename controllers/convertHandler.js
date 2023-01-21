function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = new String(input).replace(/[a-z]+$/i, '');
    if (result.includes('/') && (result.indexOf('/') === result.lastIndexOf('/'))) {
      let numerator = new Number(result.slice(0, result.indexOf('/')));
      let denominator = new Number(result.slice(result.indexOf('/') + 1));
      result = numerator / denominator;
    }
    else if (result.indexOf('/') !== result.lastIndexOf('/')) {
      result = 'invalid';
    }
    if (result === '') {
      result = 1;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    if (input !== '') result = new String(input).match(/[a-z]+$/i)[0];
    if (result === '' || result === undefined) result = 'invalid';
    switch (result.toLowerCase()) {
      case 'gal' : result = 'gal'; break;
      case 'l' : result = 'L'; break;
      case 'mi' : result = 'mi'; break;
      case 'km' : result = 'km'; break;
      case 'lbs' : result = 'lbs'; break;
      case 'kg' : result = 'kg'; break;
      default: result = 'invalid'; break;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal' : result = 'L'; break;
      case 'l' : result = 'gal'; break;
      case 'mi' : result = 'km'; break;
      case 'km' : result = 'mi'; break;
      case 'lbs' : result = 'kg'; break;
      case 'kg' : result = 'lbs'; break;
      default: result = 'invalid'; break;
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = this.getUnit(unit);
    switch(result.toLowerCase()) {
      case 'gal' : result = 'gallons'; break;
      case 'l' : result = 'liters'; break;
      case 'mi' : result = 'miles'; break;
      case 'km' : result = 'kilometers'; break;
      case 'lbs' : result = 'pounds'; break;
      case 'kg' : result = 'kilograms'; break;
      default: result = 'invalid'; break;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = new Number(initNum);
    switch(initUnit.toLowerCase()) {
      case 'gal' : result = result * galToL; break;
      case 'l' : result = result / galToL; break;
      case 'lbs' : result = result * lbsToKg; break;
      case 'kg' : result = result / lbsToKg; break;
      case 'mi' : result = result * miToKm; break;
      case 'km' : result = result / miToKm; break;
      default : result = 'errorConvert'; break;
    }
    
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${this.getNum(initNum)} ${this.spellOutUnit(initUnit)} converts to ${this.convert(initNum, initUnit)} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
