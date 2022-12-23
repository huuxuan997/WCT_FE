var homepage = require('../../page/homePage')
var loginpage = require('../../page/loginPage')
const URL = 'http://20.239.113.222/'
describe('My First Test',function(){
    it('Access to WCT', function(){
        cy.viewport(1920,1200)
        cy.visit(URL)
        //cy.wait(5000)
        cy.get(homepage.loginInBtn).click()
        cy.get(loginpage.inputUserName).type("mhxdec61@cloud-mail.top")
        cy.get(loginpage.inputPW).type("Xuan@1234")
        cy.get(loginpage.loginBtn).click()
        cy.get(homepage.headerWCT).contains('WeCopyTrade')
    })
    
  
})