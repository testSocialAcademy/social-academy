
describe("scripts for index page", function () {
    describe( " ??? ", function () {
        it("should return true  ", function (){
            expect(locStorDel()).to.be.true;
            });

        });
        describe( " ??? ", function () {
        it("should return true  ", function (){
            expect(addItem()).to.be.true;
            });

        });

        describe( " ??? ", function () {
        it("should return true  ", function (){
            expect(divText()).to.be.an('Array');
            });

        });

    });

/*
*

describe("scripts for index page", function () {



    describe("pow", function () {

        before(function () {
         console.log("Test start");
         });

         after(function () {
         console.log("End test");
         });
         };
        function makeTest(x) {
            var expected = x * x * x;

            it("при возведении x в 3ю степень Результат:" + expected, function () {
                assert.equal(pow(x, 3), expected);

            });
        }

        for (var x = 1; x <= 5; x++) {
            makeTest(x);
        }


        it("При возведении в отрицательную степень результат NaN", function () {
            assert(isNaN(pow(2, -1)));
        });

        it("При возведении в дробную степень результат NaN", function () {
            assert(isNaN(pow(2, 1.5)));
        });
    });

    describe( "Check Alpha", function () {
        it("should return true when the string has numeral", function (){
            expect(checkNonAlpha(213)).to.be.true;
        });
        it("Shoud return False when the string is alphabetical", function (){
            expect(checkNonAlpha("dfFSGdf")).to.be.false;
        })
    });

    describe( "Check Too Long", function () {
        it("Empty if no characters ", function () {
            expect(checkTooLong('')).to.be.empty;
        });
        it("If name lenght > 9, should not be true ", function () {
            expect(checkTooLong(7)).to.not.be.true;
        })
    });
    describe( "check First Letter Not Uppercase", function () {
        it("Name without uppercase should be true", function () {
            expect(checkFirstLetterNotUppercase("андрей")).to.be.true;
        })
        it("Name with uppercase should be false", function () {
            expect(checkFirstLetterNotUppercase("Андрей")).to.be.false;
        })
    });

    describe("addition", function () {
        it("find addition between two parameters", function (){
             var mock = sinon.spy(object, "method2");
             object.method(2);

             expect(mock).to.have.been.calledOnce;

            var result = sinon.stub(JQuery, "ajax").returns({farr:"cry"});
        });
    })

});



 })
 it("при возведении 2 в 3ю степень = 8", function (){
 assert.equal(pow(2,3),8);


 })

 it("При возведении 3 в 4ю = 81", function () {
 assert.equal(pow(3,4),81);
 })
 });
*/
