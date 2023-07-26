// The step definitions will use the page objects
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import Common from '../page_objects/Common';

const common = new Common();

Given('User go to login page', () => cy.visit('/auth/login'));
When('Enter "{}" in "{}" with "{}"', common.typeInputByName);
When('Click "{}" button', common.clickTextButton);
When('Click "{}" menu', common.clickTextMenu);
When('Click "{}" sub menu to "{}"', common.clickTextSubMenu);
Then('User look message "{}" popup', common.verifyMessageSwal2);
Then('Required message "{}" displayed under "{}" field', common.verifyErrorByName);
When('Click switch "{}" to be activated', common.clickSwitchByName);
When('Click assign list "{}"', common.clickCheckboxWrapper);
When('Click tree select "{}" with "{}"', common.clickTreeSelectByName);
When('Click on the previously created "{}" tree to edit', common.typeTreeByName);
When('Click on the previously created "{}" tree to delete', common.clickRemoveTreeByName);
