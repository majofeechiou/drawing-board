module.exports = function () { 
    
    var exterior = require('JsonExtend');
    var deep = require('DeepExtend');

    return {
        exterior: exterior,
        deep: deep
    }

}()