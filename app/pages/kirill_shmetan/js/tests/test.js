mocha.setup ('bdd');
var expect = chai.expect;

describe("check newsDisplay()", function() {
    it("not false if news display", function (){
        expect(newsDisplay()).to.not.be.false;
    });
    it("undefined if request complete", function() {
        expect(newsDisplay()).to.be.undefined;
    });
    it("not return error if function complete", function() {
        expect(newsDisplay()).to.not.be.a('error');
    });
});

describe("check displayHobbies()", function() {
    it("not undefined if hobbies display", function() {
        expect(hobbyOpen()).to.not.be.undefined;
    });
    it("not return false if massive length is 6 ", function () {
        expect(hobbyOpen()).to.have.lengthOf(6);
    });
    it("not false if massive display", function (){
        expect(hobbyOpen()).to.not.be.false;
    });
    it("return empty if massive length is 0 :) ", function () {
        expect(hobbyOpen()).to.not.be.empty;
    });
   });

mocha.run();
