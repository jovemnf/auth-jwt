let auth = require('../index');
let assert = require('assert');
let expect = require('chai').expect;

describe('Verify', () => {

    /*
    it('should be named authorization', function() {
        assert.equal(auth.getAuthHeader(),'authorization');
    });*/

    it('needs to be false to work', () => {

        let req = {
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

    it('needs to be true to work', () => {
    
        let req = {
            headers : {
                authorization : 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4'
            }
        };

        return auth.verify(req, 'xxx')
            .then((retorno)=>{
                if (retorno.foo !== 'bar'){
                    throw new Error("Retornou valor errado");
                }
            })
            .catch((e)=>{
                throw e;
            })

    });

    it('needs to be JWT or Bearer to work - JWT', () => {

        let req = {
            headers : {
                authorization : 'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4'
            }
        };

        return auth.verify(req, 'xxx')
            .then(() => {
                throw new Error("Valor errado retornado!")
            })
            .catch((e)=>{
                assert.equal(e.name,'Error');
            })

    });

    it('needs to be JWT or Bearer to work - Bearer', function() {

        let req = {
            headers : {
                authorization : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4'
            }
        };

        return auth.verify(req, 'xxx')
            .then((retorno)=>{
                if (retorno.foo !== 'bar'){
                    throw new Error("Retornou valor errado");
                }
            })
            .catch((e)=>{
                throw e;
            })

    });
    
    it('needs to be true to work with getToken', () => {
        
        let req = {
            headers : {
                authorization : 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4'
            }
        };
        
        return auth.getToken(req)
            .then((retorno)=>{
                if (retorno !== 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4'){
                    throw new Error("Retornou valor errado");
                }
            })
            .catch((e)=>{
                throw e;
            })
        
    });

});