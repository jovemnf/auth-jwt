var auth = require('../index');

var assert = require('assert');
var expect = require('chai').expect;

describe('Verify', function() {

    /*
    it('should be named authorization', function() {
        assert.equal(auth.getAuthHeader(),'authorization');
    });*/

    it('precisa ser falso para funcionar', function() {

        var req = {
            headers : {}
        };

        auth.verify(req, null)
            .then(()=>{
                throw new Error("Retornou verdadeiro");
            })
            .catch((e)=>{
                expect(e.name).to.equal("Error");
            })

    });

    it('precisa ser verdadeiro para funcionar', function() {

        var req = {
            headers : {
                authorization : 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4'
            }
        };

        return auth.verify(req, 'xxx')
            .then((retorno)=>{
                if (retorno.foo != 'bar'){
                    throw new Error("Retornou valor errado");
                }
            })
            .catch((e)=>{
                throw e;
            })

    });

    it('precisa ser JWT ou Bearer para funcionar - teste JWT', function() {

        var req = {
            headers : {
                authorization : 'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4'
            }
        };

        return auth.verify(req, 'xxx')
            .then((retorno)=>{
                throw new Error("Valor errado retornado!")
            })
            .catch((e)=>{
                assert.equal(e.name,'Error');
            })

    });

    it('precisa ser JWT ou Bearer para funcionar - Teste Bearer', function() {

        var req = {
            headers : {
                authorization : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4'
            }
        };

        return auth.verify(req, 'xxx')
            .then((retorno)=>{
                if (retorno.foo != 'bar'){
                    throw new Error("Retornou valor errado");
                }
            })
            .catch((e)=>{
                throw e;
            })

    });

});