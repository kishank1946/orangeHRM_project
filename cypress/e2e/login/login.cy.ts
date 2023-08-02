/// <reference types="cypress" />

import HomeScreen from "../../src/web/HomeScreen";
import PIMPage from "../../src/web/PIMPage";

const homeScreen = new HomeScreen();
const pimPage = new PIMPage();

describe('E2E flow for add the Employees', () => {
    before(() => {
      // cy.setCookie('orangehrm', 'e046f37f3f2ccd797c75b68de7872b61')

      cy.fixture('employeesDetails').then((employeesDetails) => {
        this.employeesDetails = employeesDetails;
      })
    })
  
    it('E2E flow for add the Employees Spec', () => {
      cy.login();

      homeScreen.clickOnPim();
      cy.wait(1000);

      this.employeesDetails.forEach(element => {
        pimPage.addEmployee(element.firstName,element.middleName,element.lastName);
        pimPage.clickOnEmployeeList();

        pimPage.searchEmployee(element.firstName)
        pimPage.scrollToBottom();
        pimPage.verifyNameIsPresent(element.firstName,element.lastName)
        pimPage.scrollToTop();

        pimPage.searchEmployee(element.firstName)
        pimPage.deleteEmployee();
        pimPage.scrollToTop();
      })

    })

    // it('Hover on PIM and Click', () => {
    //   cy.setCookie('orangehrm', 'e046f37f3f2ccd797c75b68de7872b61')
    //   cy.visit('/web/index.php/dashboard/index');

    //   homeScreen.clickOnPim();
    //   cy.wait(1000);
    // })

    // it('Adding the Employee', () => {
    //   this.employeesDetails.forEach(element => {
    //     pimPage.addEmployee(element.firstName,element.middleName,element.lastName);
    //     pimPage.clickOnEmployeeList();
    //   })
    // })

    
    // it('Adding the Employee', () => {
    //   this.employeesDetails.forEach(element => {
    //     pimPage.searchEmployee(element.firstName)
    //     pimPage.scrollToBottom();
    //     pimPage.verifyNameIsPresent(element.firstName,element.lastName)
    //     pimPage.scrollToTop();
    //   });
    // })

    // it('Deleting the Employee', () => {
    //   this.employeesDetails.forEach(element => {
    //     pimPage.searchEmployee(element.firstName)
    //     pimPage.deleteEmployee();
    //     pimPage.scrollToTop();
    //   });
    // })

    after(() => {
      pimPage.logout();
    })
        
  })
  