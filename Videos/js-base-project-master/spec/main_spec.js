"use strict";
const _data = require('./data.js');
const data = _data.getData();
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("../lib/main.js");


describe("测试结果", function(){
    //sinon.spy(console, 'log');

    it("Describe:input 1, return Last row of Lyrics", function(){
        let number = 1;
        let expect_string = main(number);
        expect(expect_string).to.equal("1 bottle of beer on the wall, 1 bottle of beer.\n" +
            " Take one down and pass it around, no more bottles of beer on the wall.\n" +
            " No more bottles of beer on the wall, no more bottles of beer.\n" +
            " Go to the store and buy some more, 99 bottles of beer on the wall.");

    });
    it("Describe:input 2, return the second line from the bottom of Lyrics", function(){
        let number = 2;
        let expect_string = main(number);
        expect(expect_string).to.equal("2 bottles of beer on the wall, 2 bottles of beer.\n" +
            "Take one down and pass it around, 1 bottle of beer on the wall.\n");

    });
    it("Describe:input 3, Return all the Lyrics", function(){
        let number = 3;
        let result = main(number);
        let expect_string = data;
        expect(expect_string).to.equal(result);

    });
    /*it("2.return correct number", function(){
        let number = 3;
        let expect_string = main(number);
        expect(expect_string).to.equal("Fizz");

    });*/

    /*it("测试用例2", function(){

        main();
        var result = _.flatten(console.log.args).join("\n");
        var expect_string = '';

        expect(expect_string).to.equal(result);
    });*/
});