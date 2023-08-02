///<reference types="cypress"/>
import {employeeId}  from '../../fixtures/employeeIds';
import {assertion}  from '../../fixtures/assertion';
import {locator} from "../../fixtures/locators"

class PIMPage {
    addEmployee(firstName: string, middleName: string, lastName: string) {
        cy.log(`Name: ${firstName} ${middleName} ${lastName}`);
        cy.get(locator.PIM.Add).click({ force: true });
        cy.wait(1000);
        cy.get(locator.PIM.FirstName).type(firstName);
        cy.get(locator.PIM.MiddleName).type(middleName);
        cy.get(locator.PIM.LastName).type(lastName);
        cy.get(locator.PIM.Submit).click();
        cy.wait(8000);
    }

    clickOnEmployeeList(){
        cy.get(locator.PIM.clickOnEmployeeList).click();
        cy.wait(1000);
    }

    searchEmployee(firstName: string){
        cy.get(locator.PIM.SearchFirst).clear().type(firstName, { force: true }).type('{enter}');
        // cy.get(':nth-child(2) > .oxd-input').type(employeeId[index], { force: true }).type('{enter}');
        cy.get(locator.PIM.SearchClick).click({ force: true });
        cy.wait(3000);
    }

    scrollToBottom(){
        cy.scrollTo('bottom')
    }

    scrollToTop(){
        cy.scrollTo('top')
    }

    scrollIntoView() {
        cy.get(locator.PIM.ScrollToAdd).scrollIntoView()
    }

    verifyNameIsPresent(firstName: string, lastName: string){
        cy.get(locator.PIM.NameTable).invoke('text').then((text) => {
            cy.log("Name: "+text);
            expect(text).include(firstName);
        });

        cy.get(locator.PIM.LastNameTable).invoke('text').then((text) => {
            expect(text).include(lastName);
        });

        cy.wait(3000);
    }

    deleteEmployee(){
        cy.get(locator.PIM.ClickOnSelectAllBox).click({ force: true });
        cy.get(locator.PIM.DeleteButton).click({ force: true });
        cy.get(locator.PIM.DeleteAssertion).invoke('text').then((text) => {
            expect(text).include(assertion.Delete);
        });
        cy.get(locator.PIM.DeleteConfirm).click();
    }

    logout(){
        cy.get(locator.PIM.LogoutHover).click();
        cy.get(locator.PIM.Logout).click();
    }
}
export default PIMPage;