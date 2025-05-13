/// <reference types="cypress"/>
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    checkAndClickApplyFacet(section: string, facetTitle: string, valueBack: string, isRqdmExpand: boolean = false): cy & CyEventEmitter;
    checkValueFacet(facetTitle: string, valueBack: string): cy & CyEventEmitter;
    clickAndIntercept(selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number): cy & CyEventEmitter;
    clickAndWait(options?: Partial<ClickOptions>): Chainable<Element>;
    closePopup(): cy & CyEventEmitter;
    createFilterIfNotExists(filterName: string): cy & CyEventEmitter;
    deleteFilter(filterName: string): cy & CyEventEmitter;
    deleteFilterIfExists(filterName: string): cy & CyEventEmitter;
    login(user: string, password: string, restoreSession: boolean = true): cy & CyEventEmitter;
    logout(): cy & CyEventEmitter;
    openFacet(section: string, facetTitle: string, isRqdmExpand: boolean = false): cy & CyEventEmitter;
    removeFilesFromFolder(folder: string): cy & CyEventEmitter;
    resetColumns(eq: number): cy & CyEventEmitter;
    saveFilterAs(filterName: string): cy & CyEventEmitter;
    showColumn(column: string|RegExp, eq: number): cy & CyEventEmitter;
    sortTableAndIntercept(column: string|RegExp, nbCalls: number, eq: number = 0): cy & CyEventEmitter;
    sortTableAndWait(column: string|RegExp, eq: number = 0): cy & CyEventEmitter;
    typeAndIntercept(selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    validateClearAllButton(shouldExist: boolean): cy & CyEventEmitter;
    validateDictionnaryNewValues(section: string, facetTitle: string, dictionnary: (string|RegExp)[], moreButton:boolean = false): cy & CyEventEmitter;
    validateDictionnaryPresetValues(section: string, facetTitle: string, dictionnary: (string|RegExp)[], moreButton:boolean = false): cy & CyEventEmitter;
    validateExpandCollapse(section: string, isRqdmExpand: boolean = false): cy & CyEventEmitter;
    validateFacetFilter(section: string, facetTitle: string, valueFront: string|RegExp, valueBack: string, expectedCount: string|RegExp, isRqdmExpand: boolean = false): cy & CyEventEmitter;
    validateFacetNumFilter(operator: string, section: string, facetTitle: string, value: string, expectedCount: string|RegExp): cy & CyEventEmitter;
    validateFacetRank(facetRank: number, facetTitle: string): cy & CyEventEmitter;
    validateFileContent(fixture: string, replacements?: Replacement[]): cy & CyEventEmitter;
    validateFileHeaders(fixture: string): cy & CyEventEmitter;
    validateFileName(namePattern: string): cy & CyEventEmitter;
    validateFilterInManager(filterName: string, expect: string): cy & CyEventEmitter;
    validatePdfFileContent(fixture: string, replacements?: Replacement[]): cy & CyEventEmitter;
    validateXlsxFileContent(fixture: string, replacements?: Replacement[]): cy & CyEventEmitter;
    validateIconStates(iconName: string, isDisable: boolean, isDirty: boolean): cy & CyEventEmitter;
    validateOperatorSelectedQuery(expectedOperator: string): cy & CyEventEmitter;
    validatePillSelectedQuery(facetTitle: string, values: (string|RegExp)[], eq: number = 0): cy & CyEventEmitter;
    validatePaging(total: string|RegExp, eqSelect: number, eqTab: number = 0): cy & CyEventEmitter;
    validateSelectedFilterInDropdown(filterName: string): cy & CyEventEmitter;
    validateTableDataRowKeyAttr(dataRowKey: string, eq: number, expectedAttr: string, expectedValue: string): cy & CyEventEmitter;
    validateTableDataRowKeyClass(dataRowKey: string, eq: number, expectedClass: string): cy & CyEventEmitter;
    validateTableDataRowKeyContent(dataRowKey: string, eq: number, expectedContent: string|RegExp): cy & CyEventEmitter;
    validateTableFirstRow(expectedValue: string|RegExp, eq: number, hasCheckbox: boolean = false, selector: string = ''): cy & CyEventEmitter;
    validateTableResultsCount(expectedCount: string|RegExp, shouldExist: boolean = true): cy & CyEventEmitter;
    validateTotalSelectedQuery(expectedCount: string|RegExp): cy & CyEventEmitter;
    visitAndIntercept(url: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitArchivesPatientPage(patientId: string): cy & CyEventEmitter;
    visitBioinformaticsAnalysisPage(bioAnalysisId: string): cy & CyEventEmitter;
    visitCNVsPatientPage(patientId: string, prescriptionId: string, nbGraphqlCalls: number, sharedFilterOption?: string): cy & CyEventEmitter;
    visitCNVsSomaticPatientPage(patientId: string, prescriptionId: string, nbGraphqlCalls: number, sharedFilterOption?: string): cy & CyEventEmitter;
    visitCQPatientPage(prescriptionId: string): cy & CyEventEmitter;
    visitFilesPatientPage(prescriptionId: string): cy & CyEventEmitter;
    visitPrescriptionEntityPage(prescriptionId: string): cy & CyEventEmitter;
    visitPrescriptionsPage(preselectionParams?: string): cy & CyEventEmitter;
    visitVariantEntityPage(locusId: string, nbGraphqlCalls: number): cy & CyEventEmitter;
    visitVariantsPage(sharedFilterOption?: string): cy & CyEventEmitter;
    visitVariantsPairedPatientPage(patientId: string, prescriptionId: string, nbGraphqlCalls: number): cy & CyEventEmitter;
    visitVariantsPatientPage(patientId: string, prescriptionId: string, nbGraphqlCalls: number, sharedFilterOption?: string): cy & CyEventEmitter;
    waitUntilFile(ms: number): cy & CyEventEmitter;
    waitWhileSpin(ms: number): cy & CyEventEmitter;

    loginByGoogleApi(): cy & CyEventEmitter;
  }
}