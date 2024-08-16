/// <reference types="cypress"/>
import '@testing-library/cypress/add-commands';
import { oneMinute } from '../support/utils';

export interface Replacement {
  placeholder: string;
  value: string;
}

Cypress.Commands.add('checkAndClickApplyFacet', (section: string, facetTitle: string, value: string, isRqdmExpand: boolean = false) => {
  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).clickAndWait({force: true});

  if (isRqdmExpand) {
    cy.get('[data-cy="FilterContainer_Panel RQDM"]').clickAndWait({force: true});
  }

  if (section !== 'Panel RQDM') {
    cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).clickAndWait({force: true});
    cy.waitWhileSpin(oneMinute);
  }

  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__8Dsbs').find('button').then(($button) => {
    if ($button.hasClass('ant-btn-link')) {
      cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__8Dsbs').find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
      cy.waitWhileSpin(1000);
    };
  });

  cy.get(`[data-cy="Checkbox_${facetTitle}_${value}"]`).check({force: true});
  cy.clickAndIntercept(`[data-cy="Apply_${facetTitle}"]`, 'POST', '**/graphql', 4);
});

Cypress.Commands.add('checkValueFacet', (facetTitle: string, valueBack: string) => {
  cy.get(`[aria-expanded="true"] [data-cy="FilterContainer_${facetTitle}"]`).should('exist');
  cy.waitWhileSpin(1000);
  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__8Dsbs').find('button').then(($button) => {
    if ($button.hasClass('ant-btn-link')) {
      cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__8Dsbs').find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
      cy.waitWhileSpin(1000);
    };
  });

  cy.clickAndIntercept(`[data-cy="Checkbox_${facetTitle}_${valueBack}"]`, 'POST', '**/graphql', 2);
});

Cypress.Commands.add('clickAndIntercept', (selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number) => {
  if (!eq) {
    eq = 0;
  }

  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');
  cy.get(selector).eq(eq).clickAndWait({force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: oneMinute});
  };

  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('clickAndWait', { prevSubject: 'element' }, (subject, options) => {
  cy.wrap(subject).click(options);
  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('closePopup', () => {
  cy.get('body').find('button').then(($button) => {
    if ($button.hasClass('close')) {
      cy.get('body').find('button[class="close"]').clickAndWait({force: true});
    };
  });
});

Cypress.Commands.add('createFilterIfNotExists', (filterName: string) => {
  cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
  cy.get('[class*="ant-dropdown-menu-root"]').invoke('text').then((invokeText) => {
    if (!invokeText.includes(filterName)) {
      cy.saveFilterAs(filterName);
    };
  });
});

Cypress.Commands.add('deleteFilter', (filterName: string) => {
  cy.get('[class*="ant-dropdown-menu-title-content"]').contains(filterName).clickAndWait({force: true});
  cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(filterName).should('exist');
  cy.get('[id="query-builder-header-tools"] [class*="anticon-delete"]').clickAndWait({force: true});
  cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-dangerous"]', 'POST', '**/graphql', 1);

  cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
  cy.get('[class*="ant-dropdown-menu-root"]').contains(filterName).should('not.exist');
});

Cypress.Commands.add('deleteFilterIfExists', (filterName: string) => {
  cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
  cy.get('[class*="ant-dropdown-menu-root"]').invoke('text').then((invokeText) => {
    if (invokeText.includes(filterName)) {
      cy.deleteFilter(filterName);
    };
  });
});

Cypress.Commands.add('login', (user: string, password: string, restoreSession: boolean = true) => {
  const strUserSession = restoreSession ? user : Math.random();
  cy.session([strUserSession], () => {
    cy.visit('/');
    cy.waitWhileSpin(oneMinute);
    cy.get('button[class*="ant-btn-primary ant-btn-lg"]').should('exist');
    cy.get('button[class*="ant-btn-primary ant-btn-lg"]').clickAndWait();
    cy.waitWhileSpin(oneMinute);

    cy.get('input[id="username"]').should('exist');

    cy.get('input[id="username"]').type(user);
    cy.get('input[id="password"]').type(password, {log: false});
    cy.get('button[type="submit"]').clickAndWait();
  });
});

Cypress.Commands.add('logout', () => {
    cy.visit('/');
    cy.waitWhileSpin(5*1000);

    cy.get('div').then(($div) => {
        if ($div.hasClass('App')) {
            cy.get('span[class="anticon anticon-down"]').clickAndWait({force: true});
            cy.get('[data-menu-id*="logout"]').clickAndWait({force: true});
        };
    });

  cy.exec('npm cache clear --force');
  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('removeFilesFromFolder', (folder: string) => {
  cy.exec(`/bin/rm ${folder}/*`, {failOnNonZeroExit: false});
});

Cypress.Commands.add('resetColumns', (eq: number) => {
  cy.get('svg[data-icon="setting"]').eq(eq).clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq).then(($button) => {
    cy.wrap($button).clickAndWait({force: true});
    cy.waitWhileSpin(oneMinute);
    cy.wrap($button).clickAndWait({force: true});
    cy.waitWhileSpin(oneMinute);
  });
  
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq).should('be.disabled', {timeout: 20*1000});
  cy.get('svg[data-icon="setting"]').eq(eq).clickAndWait({force: true});
  cy.get('div[class*="Header_ProTableHeader"]').clickAndWait({force: true, multiple: true});
});

Cypress.Commands.add('saveFilterAs', (filterName: string) => {
  cy.get('[class*="Header_QBHActionContainer"] button').clickAndWait({force: true});
  cy.get('[class="ant-modal-content"] input').clear().type(filterName);
  cy.get(`[class="ant-modal-content"] input[value="`+filterName+`"]`).should('exist');
  cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-primary"]', 'POST', '**/saved-filters', 1);

  cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(filterName).should('exist');
});

Cypress.Commands.add('showColumn', (column: string|RegExp, eq: number) => {
  cy.intercept('PUT', '**/user').as('getPOSTuser');

  cy.get('div[class="ant-popover-inner"]').eq(eq).find('div[class="ant-space-item"]').contains(column).find('[type="checkbox"]').check({force: true});
  cy.wait('@getPOSTuser', {timeout: oneMinute});
  cy.get('div[class*="Header_ProTableHeader"]').clickAndWait({force: true, multiple: true});
  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('sortTableAndIntercept', (column: string|RegExp, nbCalls: number, eq: number = 0) => {
  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

  cy.get('thead[class="ant-table-thead"]').eq(eq).contains(column).clickAndWait({force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getPOSTgraphql', {timeout: oneMinute});
  };

  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('sortTableAndWait', (column: string, eq: number = 0) => {
  cy.get('thead[class="ant-table-thead"]').eq(eq).contains(column).clickAndWait({force: true});
  cy.wait(1000);
});

Cypress.Commands.add('typeAndIntercept', (selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).type(text, {force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: oneMinute});
  };

  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('validateClearAllButton', (shouldExist: boolean) => {
  const strExist = shouldExist ? 'exist' : 'not.exist';
  cy.get('[id="query-builder-header-tools"]').contains('Tout effacer').should(strExist);
});

Cypress.Commands.add('validateDictionnaryNewValues', (section: string, facetTitle: string, dictionnary: (string|RegExp)[], moreButton: boolean = false) => {
  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).click({force: true});

  if (section !== 'Panel RQDM') {
    cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).click({force: true});
  }
  
  cy.get(`[data-cy="Button_Dict_${facetTitle}"]`).click({force: true});
  cy.waitWhileSpin(oneMinute);

  if (moreButton) {
    cy.get('[data-cy="FilterContainer_' + facetTitle + '"]').parentsUntil('.FilterContainer_filterContainer__8Dsbs').find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
    cy.waitWhileSpin(oneMinute);
  }
    
  // Aucune nouvelle valeur n'est présente dans la facette
  cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
  cy.waitWhileSpin(2000);
  cy.get(`[data-cy*="Checkbox_${facetTitle}_"]`).its('length').should('eq', dictionnary.length);
});

Cypress.Commands.add('validateDictionnaryPresetValues', (section: string, facetTitle: string, dictionnary: (string|RegExp)[], moreButton: boolean = false) => {
  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).click({force: true});

  if (section !== 'Panel RQDM') {
    cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).click({force: true});
  }
  
  cy.get(`[data-cy="Button_Dict_${facetTitle}"]`).click({force: true});
  cy.waitWhileSpin(oneMinute);

  if (moreButton) {
    cy.get('[data-cy="FilterContainer_' + facetTitle + '"]').parentsUntil('.FilterContainer_filterContainer__8Dsbs').find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
    cy.waitWhileSpin(oneMinute);
  }

  // Toutes les valeurs du dictionnaire sont présentes dans la facette
  for (let i = 0; i < dictionnary.length; i++) {
    cy.get(`[data-cy*="Checkbox_${facetTitle}_"]`).parents('label').contains(dictionnary[i]).should('exist');
    }
});

Cypress.Commands.add('validateExpandCollapse', (section: string, isRqdmExpand: boolean = false) => {
  const eq = isRqdmExpand ? 1 : 0;

  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).clickAndWait({force: true});

  if (section !== 'Panel RQDM') {
    cy.get('div[class="FilterContainer_filterContainer__8Dsbs"]').eq(eq).find('[aria-expanded="false"]').should('exist');
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Tout ouvrir').should('exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true});
  }
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Tout fermer').should('exist');
  cy.get('div[class="FilterContainer_filterContainer__8Dsbs"]').eq(eq).find('[aria-expanded="true"]').should('exist');

  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true});
  cy.get('div[class="FilterContainer_filterContainer__8Dsbs"]').eq(eq).find('[aria-expanded="false"]').should('exist');
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Tout ouvrir').should('exist');
});

Cypress.Commands.add('validateFacetFilter', (section: string, facetTitle: string, valueFront: string|RegExp, valueBack: string, expectedCount: string|RegExp, isRqdmExpand: boolean = false) => {
  cy.checkAndClickApplyFacet(section, facetTitle, valueBack, isRqdmExpand);

  cy.validatePillSelectedQuery(facetTitle, [valueFront]);
  cy.get('body').contains(expectedCount).should('exist');
});

Cypress.Commands.add('validateFacetNumFilter', (section: string, facetTitle: string, value: string, expectedCount: string|RegExp) => {
  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).clickAndWait({force: true});
  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.get(`[data-cy="InputNumber_Max_${facetTitle}"]`).type(value, {force: true});
  cy.waitWhileSpin(oneMinute);
  cy.get(`[data-cy="Checkbox_NoData_${facetTitle}"]`).check({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.get(`[data-cy="Button_Apply_${facetTitle}"]`).clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);

  cy.validatePillSelectedQuery(facetTitle, [value, 'No Data']);
  cy.get('body').contains(expectedCount).should('exist');
});

Cypress.Commands.add('validateFacetRank', (facetRank: number, facetTitle: string) => {
  cy.log(facetTitle);
  cy.get('div[class*="Filters_customFilterContainer"]').eq(facetRank).contains(facetTitle).should('exist');
});

Cypress.Commands.add('validateFileContent', (fixture: string, replacements?: Replacement[]) => {
  const arrReplacements = replacements !== undefined ? replacements : [];
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.readFile(`${filename}`).then((file) => {
        let fileWithData = file;
        arrReplacements.forEach((replacement) => {
          fileWithData = fileWithData.replace(replacement.placeholder, replacement.value);
        });
        expectedData.content.forEach((value: any) => {
          let valueWithData = value
          arrReplacements.forEach((replacement) => {
            valueWithData = valueWithData.replace(replacement.placeholder, replacement.value);
          });
          expect(fileWithData).to.include(valueWithData);
        });
      });
    });
  });
});

Cypress.Commands.add('validateFileHeaders', (fixture: string) => {
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.readFile(`${filename}`).then((file) => {
        expectedData.headers.forEach((header: any) => {
          expect(file).to.include(header);
        });
      });
    });
  });
});

Cypress.Commands.add('validateFileName', (namePattern: string) => {
  cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/`+namePattern).then((result) => {
    const filename = result.stdout.trim();
    cy.readFile(`${filename}`).should('exist');
  });
});

Cypress.Commands.add('validateFilterInManager', (filterName: string, expect: string) => {
  cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
  cy.get('[data-menu-id*="manage-my-filters"]').clickAndWait({force: true});
  cy.get('[class="ant-modal-content"]').contains(filterName).should(expect);
  cy.get('button[class="ant-modal-close"]').invoke('click');
});

Cypress.Commands.add('validatePdfFileContent', (fixture: string, replacements?: Replacement[]) => {
  const arrReplacements = replacements !== undefined ? replacements : [];
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.task('extractTextFromPDF', filename).then((file) => {
        let fileWithData = typeof file === 'string' ? file : '';
        arrReplacements.forEach((replacement) => {
          fileWithData = fileWithData.replace(replacement.placeholder, replacement.value);
        });
        expectedData.content.forEach((value: any) => {
          let valueWithData = value;
          arrReplacements.forEach((replacement) => {
            valueWithData = valueWithData.replace(replacement.placeholder, replacement.value);
          });
          expect(fileWithData).to.include(valueWithData);
        });
      });
    });
  });
});

Cypress.Commands.add('validateXlsxFileContent', (fixture: string, replacements?: Replacement[]) => {
  const arrReplacements = replacements !== undefined ? replacements : [];
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.task('extractTextFromXLSX', filename).then((file) => {
        let fileWithData = typeof file === 'string' ? file : '';
        arrReplacements.forEach((replacement) => {
          fileWithData = fileWithData.replace(replacement.placeholder, replacement.value);
        });
        expectedData.content.forEach((value: any) => {
          let valueWithData = value;
          arrReplacements.forEach((replacement) => {
            valueWithData = valueWithData.replace(replacement.placeholder, replacement.value);
          });
          expect(fileWithData).to.include(valueWithData);
        });
      });
    });
  });
});

Cypress.Commands.add('validateIconStates', (iconName: string, isDisable: boolean, isDirty: boolean) => {
  const strShouldDisable = isDisable ? 'be.disabled' : 'not.be.disabled';
  const strShouldDirty = isDirty ? 'have.class' : 'not.have.class';
  cy.get(`[id="query-builder-header-tools"] [data-icon="`+iconName+`"]`).parentsUntil('button').parent().should(strShouldDisable)
  cy.get(`[id="query-builder-header-tools"] [data-icon="`+iconName+`"]`).parentsUntil('button').parent().should(strShouldDirty, 'dirty');
});

Cypress.Commands.add('validateOperatorSelectedQuery', (expectedOperator: string) => {
  cy.get('[class*="QueryBar_selected"] [class*="Combiner_operator"]').contains(expectedOperator).should('exist');
});

Cypress.Commands.add('validatePaging', (total: string|RegExp, eqSelect: number, eqTab: number = 0) => {
  if (typeof total === 'string') {
    total = new RegExp(total);
  }

  cy.get('span[class*="ant-select-selection-item"]').eq(eqSelect).clickAndWait({force: true});
  cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Résultats 1 - 100 de '+total.source));

  cy.get('span[class*="ant-select-selection-item"]').eq(eqSelect).clickAndWait({force: true});
  cy.get('div[class*="ant-select-item-option-content"]').contains('20 ').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Résultats 1 - 20 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('be.disabled');

  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Suivant').clickAndWait({force: !!eqSelect});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Résultats 21 - 40 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Suivant').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Résultats 41 - 60 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Résultats 21 - 40 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);
  cy.validateTableResultsCount(new RegExp('Résultats 1 - 20 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('be.disabled');
});

Cypress.Commands.add('validatePillSelectedQuery', (facetTitle: string, values: (string|RegExp)[], eq: number = 0) => {
  if (facetTitle == '') {
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').should('not.exist');
  }
  else {
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').eq(eq).contains(facetTitle).should('exist');
  }

  for (let i = 0; i < values.length; i++) {
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_queryValuesContainer"]').eq(eq).contains(values[i]).should('exist');
    }
});

Cypress.Commands.add('validateSelectedFilterInDropdown', (filterName: string) => {
  cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
  cy.get('[class*="ant-dropdown-menu-item-selected"]').contains(filterName).should('exist');
});

Cypress.Commands.add('validateTableDataRowKeyAttr', (dataRowKey: string, eq: number, expectedAttr: string, expectedValue: string) => {
  cy.get('tr[data-row-key="'+dataRowKey+'"]').find('td').eq(eq).find('['+expectedAttr+'="'+expectedValue+'"]').should('exist');
});

Cypress.Commands.add('validateTableDataRowKeyClass', (dataRowKey: string, eq: number, expectedClass: string) => {
  cy.get('tr[data-row-key="'+dataRowKey+'"]').find('td').eq(eq).find('[class*="'+expectedClass+'"]').should('exist');
});

Cypress.Commands.add('validateTableDataRowKeyContent', (dataRowKey: string, eq: number, expectedContent: string|RegExp) => {
  cy.get('tr[data-row-key="'+dataRowKey+'"]').find('td').eq(eq).contains(expectedContent).should('exist');
});

Cypress.Commands.add('validateTableFirstRow', (expectedValue: string|RegExp, eq: number, hasCheckbox: boolean = false, selector: string = '') => {
  cy.get('.ant-spin-container').should('not.have.class', 'ant-spin-blur', {timeout: 5*1000});
  cy.get(selector+' tr[class*="ant-table-row"]').eq(0)
    .then(($firstRow) => {
      cy.wrap($firstRow).find('td').eq(eq).contains(expectedValue).should('exist');
      if (hasCheckbox) {
        cy.wrap($firstRow).find('[type="checkbox"]').check({force: true});
        cy.wrap($firstRow).find('[type="checkbox"]').should('be.checked');
        cy.wrap($firstRow).find('[type="checkbox"]').uncheck({force: true});
      };
    });
});

Cypress.Commands.add('validateTableResultsCount', (expectedCount: string|RegExp, shouldExist: boolean = true) => {
  const strExist = shouldExist ? 'exist' : 'not.exist';
  cy.get('div[class*="ProTableHeader"]').contains(expectedCount).should(strExist);
});

Cypress.Commands.add('validateTotalSelectedQuery', (expectedCount: string|RegExp) => {
  cy.get('[class*="QueryBar_selected"] [class*="QueryBar_total"]').contains(expectedCount).should('exist');
});

Cypress.Commands.add('visitAndIntercept', (url: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.visit(url);
  cy.waitWhileSpin(oneMinute);

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher');
  };

  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('visitArchivesPatientPage', (patientId: string) => {
  cy.visitAndIntercept(`/archive/exploration?search=${patientId}`,
                       'POST',
                       '**/$graphql*',
                       1);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitBioinformaticsAnalysisPage', (bioAnalProbId: string) => {
  cy.visitAndIntercept(`/bioinformatics-analysis/${bioAnalProbId}`,
                       'POST',
                       '**/$graphql*',
                       1);
});

Cypress.Commands.add('visitCNVsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number, sharedFilterOption?: string) => {
  const strSharedFilterOption = sharedFilterOption !== undefined ? sharedFilterOption+'&variantSection=cnv#variants' : '?variantSection=cnv#variants';
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}${strSharedFilterOption}`,
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitCQPatientPage', (prescriptionId: string) => {
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}#qc`,
                       'POST',
                       '**/$graphql*',
                       3);
});

Cypress.Commands.add('visitFilesPatientPage', (prescriptionId: string) => {
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}#files`,
                       'POST',
                       '**/$graphql*',
                       6);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitPrescriptionEntityPage', (prescriptionId: string) => {
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}#details`,
                       'POST',
                       '**/$graphql*',
                       3);
});

Cypress.Commands.add('visitPrescriptionsPage', () => {
  cy.visitAndIntercept('/prescription/search',
                       'POST',
                       '**/graphql',
                       3);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitVariantEntityPage', (locusId: string, nbGraphqlCalls: number) => {
  cy.visitAndIntercept(`/variant/entity/${locusId}/summary`,
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls);
});

Cypress.Commands.add('visitVariantsPage', (sharedFilterOption?: string) => {
  const strSharedFilterOption = sharedFilterOption !== undefined ? sharedFilterOption : '';
  cy.visitAndIntercept('/snv/exploration'+strSharedFilterOption,
                       'POST',
                       '**/graphql',
                       3);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitVariantsPairedPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number) => {
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}?variantSection=snv-tn#variants`,
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls,);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitVariantsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number, sharedFilterOption?: string) => {
  const strSharedFilterOption = sharedFilterOption !== undefined ? '?sharedFilterId='+sharedFilterOption+'&variantSection=snv' : '';
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}${strSharedFilterOption}#variants`,
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls,);
  cy.resetColumns(0);
});

Cypress.Commands.add('waitUntilFile', (ms: number) => {
  const start = new Date().getTime();

  function checkFile(): any {
    const now = new Date().getTime();
    if (now - start > ms) {
      throw new Error(`Timed out after ${ms}ms waiting for file`);
    }

    return cy.task('fileExists', `${Cypress.config('downloadsFolder')}`).then((exists) => {
      if (exists) {
        return true;
      } else {
        return cy.wait(500).then(checkFile);
      }
    });
  }

  cy.wait(2000);
  return checkFile();
});

Cypress.Commands.add('waitWhileSpin', (ms: number) => {
  const start = new Date().getTime();

  function checkForSpinners():any {
    const now = new Date().getTime();
    if (now - start > ms) {
      throw new Error(`Timed out after ${ms}ms waiting for spinners to disappear`);
    };

    return cy.get('body').then(($body) => {
      if ($body.find('.ant-spin-blur').length > 0) {
        return cy.wait(500).then(checkForSpinners);
      };
    });
  };

  return checkForSpinners();
});

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));