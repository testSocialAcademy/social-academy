var assert = chai.assert;
var expect = chai.expect;

describe ("tests for social-academy", function () {
    describe ("tests for createHobbyList function", function () {
        it ("should return true if list present", function () {
            var testHobbyArr = ["Test1","Test2","Test3","Test4","Test5"];
            expect(createHobbyList(testHobbyArr)).to.be.true;
        });
        it ("should return false if nothing", function () {
            expect(createHobbyList()).to.be.false;
        });
    });
    describe ("tests for createNews function", function () {
        it ("should return true if data present", function () {
            var testNews = {"responseData": {"entries": [{"contentSnippet": "TestNews1","link":"https://googleblog.blogspot.com/", "title": "<b>Official Google Blog</b>", "url": "https://googleblog.blogspot.com/feeds/posts/default"}]}};
            expect(createNews(testNews)).to.be.true;
        });
        it ("should return false if nothing", function () {
            expect(createNews()).to.be.false;
        });
    });
});