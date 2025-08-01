/// <reference types="cypress"/>
import { CommonSelectors } from '../pom/shared/Selectors';
import { formatWithSpaceThousands, oneMinute } from '../pom/shared/Utils';
import { Replacement } from '../pom/shared/Types';

Cypress.Commands.add('checkAndClickApplyFacet', (section: string, facetTitle: string, value: string, isRqdmExpand: boolean = false) => {
  cy.openFacet(section, facetTitle, isRqdmExpand);
  cy.get(`[data-cy="Checkbox_${facetTitle}_${value}"]`).check({force: true});
  cy.clickAndIntercept(`[data-cy="Apply_${facetTitle}"]`, 'POST', '**/graphql', 4);
});

Cypress.Commands.add('checkValueFacet', (facetTitle: string, valueBack: string) => {
  cy.url().should('match', /\/prescription\/search/);
  cy.get(`[aria-expanded="true"] [data-cy="FilterContainer_${facetTitle}"]`).should('exist');
  cy.waitWhileSpin(oneMinute);
  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__8Dsbs').find('button').then(($button) => {
    if ($button.hasClass('ant-btn-link')) {
      cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__8Dsbs').find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
      cy.waitWhileSpin(oneMinute);
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
  cy.get('button').then(($button) => {
    if ($button.hasClass('close')) {
      cy.get('button[class="close"]').clickAndWait({force: true});
    };
  });
});

Cypress.Commands.add('createFilterIfNotExists', (filterName: string) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
  cy.get('[class*="ant-dropdown-menu-root"]').invoke('text').then((invokeText) => {
    if (!invokeText.includes(filterName)) {
      cy.saveFilterAs(filterName);
    };
  });
});

Cypress.Commands.add('deleteFilter', (filterName: string) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  cy.get('[class*="ant-dropdown-menu-title-content"]').contains(filterName).clickAndWait({force: true});
  cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(filterName).should('exist');
  cy.get('[id="query-builder-header-tools"] [class*="anticon-delete"]').clickAndWait({force: true});
  cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-dangerous"]', 'POST', '**/graphql', 1);

  cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
  cy.get('[class*="ant-dropdown-menu-root"]').contains(filterName).should('not.exist');
});

Cypress.Commands.add('deleteFilterIfExists', (filterName: string) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
  cy.get('[class*="ant-dropdown-menu-root"]').invoke('text').then((invokeText) => {
    if (invokeText.includes(filterName)) {
      cy.deleteFilter(filterName);
    };
  });
});

/**
 * Returns the table header cell matching the given column name.
 * @param columnName The name of the column.
 * @param eq The index of the table (default: 0).
 */
Cypress.Commands.add('getColumnHeadCell', (columnName: string, eq: number = 0) => {
  cy.get(CommonSelectors.tableHead).eq(eq).find(CommonSelectors.tableCell).then(($tableCells) => {
    let matchedCell: JQuery<HTMLElement> | undefined = undefined;
    $tableCells.each((_index, cell) => {
      if (columnName.startsWith('[')) {
        if (Cypress.$(cell).find(columnName).length > 0) {
          matchedCell = Cypress.$(cell);
          return false;
        };
      } else {
        if (cell.textContent?.includes(columnName)) {
          matchedCell = Cypress.$(cell);
          return false;
        };
      };
    });
    if (matchedCell) {
      return matchedCell;
    };
  });
});

/**
 * Hides a column in the table by unchecking it in the column selector.
 * @param column The column name or RegExp to match.
 * @param eq The index of the table (default: 0).
 */
Cypress.Commands.add('hideColumn', (column: string|RegExp, eq: number = 0) => {
  cy.get('[data-icon="setting"]').eq(eq).clickAndWait({force: true});

  cy.intercept('PUT', '**/user').as('getPOSTuser');
  cy.get('[class*="ColumnSelector_ProTablePopoverColumnListWrapper"]').contains(column).find('[type="checkbox"]').uncheck();
  cy.wait('@getPOSTuser', {timeout: oneMinute});

  cy.get('[class*="Header_ProTableHeader"]').eq(eq).clickAndWait({force: true});
});

Cypress.Commands.add('login', (user: string, password: string, restoreSession: boolean = true) => {
  const strUserSession = restoreSession ? user : Math.random();
  cy.session([strUserSession], () => {
    cy.visit('/');
    cy.waitWhileSpin(oneMinute);
    cy.get('button[class*="ant-btn-primary ant-btn-lg"]').should('exist');
    cy.get('button[class*="ant-btn-primary ant-btn-lg"]').clickAndWait();
    cy.waitWhileSpin(oneMinute);
    
    cy.get('[id="social-CQGC"]').clickAndWait();
    cy.waitWhileSpin(oneMinute);

    cy.get('input[id="username"]').should('exist');

    cy.get('input[id="username"]').type(user);
    cy.get('input[id="password"]').type(password, {log: false});
    cy.get('button[type="submit"]').clickAndWait();
  });
});

Cypress.Commands.add('logout', () => {
    cy.visit('/');
    cy.waitWhileSpin(oneMinute);

    cy.get('div [id="appContainer"]').then(($div) => {
        if ($div.hasClass('App')) {
            cy.get('span[class="anticon anticon-down"]').clickAndWait({force: true});
            cy.get('[data-menu-id*="logout"]').clickAndWait({force: true});
        };
    });

  cy.exec('npm cache clear --force');
  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('openFacet', (section: string, facetTitle: string, isRqdmExpand: boolean = false) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
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
      cy.waitWhileSpin(oneMinute);
    };
  });
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
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  cy.get('[class*="Header_QBHActionContainer"] button').clickAndWait({force: true});
  cy.get('[class="ant-modal-content"] input').clear().type(filterName);
  cy.get(`[class="ant-modal-content"] input[value="`+filterName+`"]`).should('exist');
  cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-primary"]', 'POST', '**/saved-filters', 1);

  cy.get('[id="query-builder-header-tools"] [class*="Header_togglerTitle"]').contains(filterName).should('exist');
});

/**
 * Asserts that the given element is sortable or not.
 * @param subject The element to check.
 * @param isSortable Whether the column should be sortable.
 */
Cypress.Commands.add('shouldBeSortable', { prevSubject: 'element' }, (subject, isSortable: boolean) => {
  const strExpectedSortable = isSortable ? 'have.class' : 'not.have.class';
  cy.wrap(subject).should(strExpectedSortable, 'ant-table-column-has-sorters');
});

/**
 * Checks a checkbox, asserts it is checked, then unchecks it.
 * @param subject The element containing the checkbox (should be chainable).
 */
Cypress.Commands.add('shouldCheckAndUncheck', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).find(CommonSelectors.checkbox).check({ force: true });
  cy.wrap(subject).find(CommonSelectors.checkbox).should('be.checked');
  cy.wrap(subject).find(CommonSelectors.checkbox).uncheck({ force: true });
});

/**
 * Asserts that the given tab is active.
 * @param subject The tab element.
 */
Cypress.Commands.add('shouldHaveActiveTab', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('have.class', 'ant-tabs-tab-active');
});

/**
 * Asserts that the given element has a popover with the specified title and content.
 * @param subject The element to check.
 * @param popoverTitle The expected popover title.
 * @param popoverContent The expected popover content.
 */
Cypress.Commands.add('shouldHavePopover', { prevSubject: 'element' }, (subject, popoverTitle: string, popoverContent: string) => {
  cy.wrap(subject).trigger('mouseover', { eventConstructor: 'MouseEvent', force: true });
  cy.get('[class="ant-popover-title"]').contains(popoverTitle).should('exist');
  cy.get('[class="ant-popover-inner-content"]').contains(popoverContent).should('exist');
});

/**
 * Asserts that the given element has a tooltip with the specified content.
 * @param subject The element to check.
 * @param tooltipContent The expected tooltip content.
 */
Cypress.Commands.add('shouldHaveTooltip', { prevSubject: 'element' }, (subject, tooltipContent: string) => {
  cy.wrap(subject).find('[class*="dotted"]').trigger('mouseover', { eventConstructor: 'MouseEvent', force: true });
  cy.get('body').contains(tooltipContent).should('exist');
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

  if (String(column).startsWith('[')) {
    cy.get('thead[class="ant-table-thead"]').eq(eq).find(String(column)).clickAndWait({force: true});
  } else {
    cy.get('thead[class="ant-table-thead"]').eq(eq).contains(column).clickAndWait({force: true});
  };

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getPOSTgraphql', {timeout: oneMinute});
  };

  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('sortTableAndWait', (column: string|RegExp, eq: number = 0) => {
  cy.get('thead[class="ant-table-thead"]').eq(eq).contains(column).clickAndWait({force: true});
  cy.wait(1000);
});

Cypress.Commands.add('typeAndIntercept', (selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).type(text, {force: true});
  cy.waitWhileSpin(oneMinute);

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: oneMinute});
  };

  cy.waitWhileSpin(oneMinute);
});

Cypress.Commands.add('validateClearAllButton', (shouldExist: boolean) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  const strExist = shouldExist ? 'exist' : 'not.exist';
  cy.get('[id="query-builder-header-tools"]').contains('Tout effacer').should(strExist);
});

Cypress.Commands.add('validateDictionnaryNewValues', (section: string, facetTitle: string, dictionnary: (string|RegExp)[], moreButton: boolean = false) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
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
  cy.waitWhileSpin(oneMinute);
  cy.get(`[data-cy*="Checkbox_${facetTitle}_"]`).its('length').should('eq', dictionnary.length);
});

Cypress.Commands.add('validateDictionnaryPresetValues', (section: string, facetTitle: string, dictionnary: (string|RegExp)[], moreButton: boolean = false) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
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
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
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
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  cy.checkAndClickApplyFacet(section, facetTitle, valueBack, isRqdmExpand);
  cy.waitWhileSpin(oneMinute);

  cy.validatePillSelectedQuery(facetTitle, [valueFront]);
  cy.get('body').contains(expectedCount).should('exist');
});

Cypress.Commands.add('validateFacetNumFilter', (operator: string, section: string, facetTitle: string, value: string, expectedCount: string|RegExp) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).clickAndWait({force: true});
  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);

  if (operator === 'MinMax') {
    cy.get(`[data-cy="InputNumber_Min_${facetTitle}"]`).type(value, {force: true});
    cy.get(`[data-cy="InputNumber_Max_${facetTitle}"]`).type(value, {force: true});
  }
  else {
    cy.get(`[data-cy="InputNumber_${operator}_${facetTitle}"]`).type(value, {force: true});
  };
  cy.waitWhileSpin(oneMinute);

  cy.get(`[data-cy="Checkbox_NoData_${facetTitle}"]`).check({force: true});
  cy.waitWhileSpin(oneMinute);

  cy.get(`[data-cy="Button_Apply_${facetTitle}"]`).clickAndWait({force: true});
  cy.waitWhileSpin(oneMinute);

  cy.validatePillSelectedQuery(facetTitle, [value, 'No Data']);
  cy.get('body').contains(expectedCount).should('exist');
});

Cypress.Commands.add('validateFacetRank', (facetRank: number, facetTitle: string) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
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
          assert.include(fileWithData, valueWithData === '-' ? '--' : '-');
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
          assert.include(file, header);
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
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
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
          assert.include(fileWithData, valueWithData);
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
          assert.include(fileWithData, valueWithData);
        });
      });
    });
  });
});

Cypress.Commands.add('validateIconStates', (iconName: string, isDisable: boolean, isDirty: boolean) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  const strShouldDisable = isDisable ? 'be.disabled' : 'not.be.disabled';
  const strShouldDirty = isDirty ? 'have.class' : 'not.have.class';
  cy.get(`[id="query-builder-header-tools"] [data-icon="`+iconName+`"]`).parentsUntil('button').parent().should(strShouldDisable)
  cy.get(`[id="query-builder-header-tools"] [data-icon="`+iconName+`"]`).parentsUntil('button').parent().should(strShouldDirty, 'dirty');
});

Cypress.Commands.add('validateOperatorSelectedQuery', (expectedOperator: string) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
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

  cy.wait(2000);
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Suivant').click({force: true});
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
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
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
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
  cy.get('[class*="ant-dropdown-menu-item-selected"]').contains(filterName).should('exist');
});

Cypress.Commands.add('validateTableDataRowKeyAttr', (dataRowKey: string, eq: number, expectedAttr: string, expectedValue: string) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  if (dataRowKey !== "*") {
    cy.get('tr[data-row-key="'+dataRowKey+'"] td').eq(eq).find('['+expectedAttr+'="'+expectedValue+'"]').should('exist');
  }
  else {
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(eq).find('['+expectedAttr+'="'+expectedValue+'"]').should('exist');
  };
});

Cypress.Commands.add('validateTableDataRowKeyClass', (dataRowKey: string, eq: number, expectedClass: string) => {
  if (dataRowKey !== "*") {
    cy.get('tr[data-row-key="'+dataRowKey+'"] td').eq(eq).find('[class*="'+expectedClass+'"]').should('exist');
  }
  else {
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(eq).find('[class*="'+expectedClass+'"]').should('exist');
  };
});

Cypress.Commands.add('validateTableDataRowKeyContent', (dataRowKey: string, eq: number, expectedContent: string|RegExp|number) => {
  const strExpectedContent = typeof expectedContent === 'number' ? formatWithSpaceThousands(expectedContent) : expectedContent;
  if (dataRowKey !== "*") {
    cy.get('tr[data-row-key="'+dataRowKey+'"] td').eq(eq).contains(strExpectedContent).should('exist');
  }
  else {
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(eq).contains(strExpectedContent).should('exist');
  };
});

Cypress.Commands.add('validateTableFirstRow', (expectedValue: string|RegExp, eq: number, hasCheckbox: boolean = false, selector: string = '') => {
  cy.waitWhileSpin(oneMinute);
  cy.wait(3000);
  cy.get(selector+' tr[class*="ant-table-row"]').eq(0)
    .then(($firstRow) => {
      cy.wrap($firstRow).find('td').eq(eq).contains(expectedValue).should('exist');
      if (hasCheckbox) {
        cy.wrap($firstRow).shouldCheckAndUncheck();
      };
    });
});

Cypress.Commands.add('validateTableResultsCount', (expectedCount: string|RegExp, shouldExist: boolean = true) => {
  const strExist = shouldExist ? 'exist' : 'not.exist';
  cy.get('div[class*="ProTableHeader"]').contains(expectedCount).should(strExist);
});

Cypress.Commands.add('validateTotalSelectedQuery', (expectedCount: string|RegExp) => {
  cy.url().should('match', /(#variants|\/snv\/exploration)/);
  cy.get('[class*="QueryBar_selected"] [class*="QueryBar_total"]').contains(expectedCount).should('exist');
});

Cypress.Commands.add('visitAndIntercept', (url: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.visit(url);
  cy.waitWhileSpin(oneMinute);

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: oneMinute});
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

Cypress.Commands.add('visitCNVsSomaticPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number, sharedFilterOption?: string) => {
  const strSharedFilterOption = sharedFilterOption !== undefined ? sharedFilterOption+'&variantSection=cnv-to#variants' : '?variantSection=cnv-to#variants';
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
  cy.wait(2000);
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

Cypress.Commands.add('visitPrescriptionsPage', (preselectionParams?: string) => {
  const strPreselectionParams = preselectionParams !== undefined ? preselectionParams : '';
  cy.visitAndIntercept('/prescription/search'+strPreselectionParams,
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
                       nbGraphqlCalls);
  cy.waitWhileSpin(oneMinute);
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
        return cy.wait(1000).then(checkForSpinners);
      };
    });
  };

  return checkForSpinners();
});

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));