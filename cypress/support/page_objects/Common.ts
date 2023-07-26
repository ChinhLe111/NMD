import slug from 'slug';
export default class Common {
  elements = {
    messageSwal2: () => cy.get('div#swal2-html-container').should('be.visible'),
    textButton: (text: string) => cy.get('button.button').contains(text).should('be.visible'),
    textMenu: (text: string) => cy.get('li.menu').contains(text).should('be.visible'),
    textSubMenu: (text: string) => cy.get('a.sub-menu').contains(text).should('be.visible'),

    checkboxWrapper: (text: string) => cy.get(`.ant-checkbox-wrapper`).contains(text).should('be.visible'),
    buttonRightTransfer: () => cy.get(`.ant-transfer-operation button`).eq(1).should('be.visible'),
    forItemByName: (name: string) =>
      cy.contains('.ant-form-item-label > label', name).parent().parent().should('be.visible'),
    inputByName: (name: string) => this.elements.forItemByName(name).find('input').should('be.visible'),
    errorByName: (name: string) =>
      this.elements.forItemByName(name).find('.ant-form-item-explain-error').should('be.visible'),
    switchByName: (name: string) => this.elements.forItemByName(name).find('nz-switch').should('be.visible'),
    treeSelectByName: (name: string) => this.elements.forItemByName(name).find('nz-tree-select').should('be.visible'),
    treeSelectSelectionTitle: (title: string) =>
      cy.get(`.ant-select-tree-node-content-wrapper[title='${title}']`).should('be.visible'),
    treeByName: (val: any) => cy.get('nz-tree-node-title[title="' + val + '"]  > .group'),
    removeTreeByName: (val: any) => this.elements.treeByName(val).find('.la-trash'),
    buttonConfirmPopover: () => cy.get('.ant-popover-buttons .ant-btn-primary').should('be.visible'),
  };

  verifyMessageSwal2 = (message: string) => this.elements.messageSwal2().should('have.text', message);
  clickTextButton = (text: string) => this.elements.textButton(text).click();
  clickTextMenu = (text: string) => this.elements.textMenu(text).click();
  clickTextSubMenu = (text: string, url: string) => {
    this.elements.textSubMenu(text).click();
    cy.url().should('include', url);
  };

  clickCheckboxWrapper = (list: string) => {
    list.split(', ').forEach((item: string) => this.elements.checkboxWrapper(item).click());
    this.elements.buttonRightTransfer().click();
  };
  typeInputByName = (type: 'text' | 'words' | 'number' | 'email' | 'format', name: string, text: string) =>
    this.elements.inputByName(name).typeRandom(text, type).invoke('val').as(slug(name));
  verifyErrorByName = (name: string, text: string) => this.elements.errorByName(name).should('have.text', text);
  clickSwitchByName = (name: string) => this.elements.switchByName(name).click();
  clickTreeSelectByName = (name: string, text: string) => {
    this.elements.treeSelectByName(name).type(text);
    this.elements.treeSelectSelectionTitle(text).click();
  };
  typeTreeByName = (name: string) => cy.get(`@${slug(name)}`).then((val) => this.elements.treeByName(val).click());
  clickRemoveTreeByName = (name: string) => {
    cy.get(`@${slug(name)}`).then((val) => this.elements.removeTreeByName(val).click({ force: true }));
    this.elements.buttonConfirmPopover().click();
  };
}
