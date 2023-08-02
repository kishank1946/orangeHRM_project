///<reference types="cypress"/>
import {locator} from "../../fixtures/locators"

class HomeScreen {
    clickOnPim() {
        //cy.contains('CATALOG')
        cy.get(locator.Home.clickOnPim).invoke('show').click()
    }
}
export default HomeScreen;