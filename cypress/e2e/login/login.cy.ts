/// <reference types="cypress" />

import HomeScreen from "../../src/web/HomeScreen";
import PIMPage from "../../src/web/PIMPage";

const homeScreen = new HomeScreen();
const pimPage = new PIMPage();

describe('E2E flow for add the Employees', () => {
    before(() => {
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
      })

      this.employeesDetails.forEach(element => {
        pimPage.searchEmployee(element.firstName)
        pimPage.scrollToBottom();
        pimPage.verifyNameIsPresent(element.firstName,element.lastName)
        pimPage.scrollToTop();
      })

      this.employeesDetails.forEach(element => {
        pimPage.searchEmployee(element.firstName)
        pimPage.deleteEmployee();
        pimPage.scrollToTop();
      })

    })

    after(() => {
      pimPage.logout();
    })
        
  })
  