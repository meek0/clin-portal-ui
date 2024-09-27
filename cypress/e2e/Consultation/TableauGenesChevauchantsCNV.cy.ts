/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.get('span[class*="ant-select-selection-item"]').eq(1).clickAndWait({force: true});
  cy.get('div[class*="ant-select-item-option-content"]').contains('100').clickAndWait({force: true});

  cy.sortTableAndWait('Début');
});

describe('Modal des gènes chevauchant un CNV - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.sortTableAndWait('Début');
    cy.get('tr[data-row-key="28b40e8b80077189d888e6a25040d4595f53d14c"]').contains(/^2$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] tr[data-row-key="OCLN"] td').eq(0).contains('OCLN').should('exist');
    cy.get('div[role="dialog"] tr[data-row-key="OCLN"] td').eq(1).contains('RGDI').should('exist');
    cy.get('div[role="dialog"] tr[data-row-key="OCLN"] td').eq(2).contains('65.6 kb').should('exist');
    cy.get('div[role="dialog"] tr[data-row-key="OCLN"] td').eq(3).contains('6.6 kb').should('exist');
    cy.get('div[role="dialog"] tr[data-row-key="OCLN"] td').eq(4).contains(/^2$/).should('exist');
    cy.get('div[role="dialog"] tr[data-row-key="OCLN"] td').eq(5).contains('10.1 %').should('exist');
    cy.get('div[role="dialog"] tr[data-row-key="OCLN"] td').eq(6).contains('24.2 %').should('exist');
    cy.get('div[role="dialog"] tr[data-row-key="OCLN"] td').eq(7).find('path[d*="M12.4"]').should('exist'); // Gène recoupe le CNV à une de ses extrémités
    cy.get('div[role="dialog"] tr[data-row-key="OCLN"] td').eq(7).find('path[d*="M15.6"]').should('exist');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.sortTableAndWait('Début');
    cy.get('tr[data-row-key="28b40e8b80077189d888e6a25040d4595f53d14c"]').contains(/^2$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] tr[data-row-key="OCLN"]').contains('OCLN')
      .should('have.attr', 'href', 'https://www.omim.org/search?index=entry&start=1&limit=10&sort=score+desc%2C+prefix_sort+desc&search=OCLN');
  });

  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    cy.sortTableAndWait('Début');
    cy.get('tr[data-row-key="28b40e8b80077189d888e6a25040d4595f53d14c"]').contains(/^2$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('Gène').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(0).contains('GTF2H2C').should('exist');
    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('Gène').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(0).contains('OCLN').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri Longueur du gène', () => {
    cy.sortTableAndWait('Début');
    cy.get('tr[data-row-key="28b40e8b80077189d888e6a25040d4595f53d14c"]').contains(/^2$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('Longueur du gène').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(2).contains('35.0 kb').should('exist');
    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('Longueur du gène').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(2).contains('65.6 kb').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri # Bases', () => {
    cy.sortTableAndWait('Début');
    cy.get('tr[data-row-key="28b40e8b80077189d888e6a25040d4595f53d14c"]').contains(/^2$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('# Bases').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(3).contains('6.6 kb').should('exist');
    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('# Bases').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(3).contains('18.6 kb').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri # Exons', () => {
    cy.sortTableAndWait('Début');
    cy.get('tr[data-row-key="28b40e8b80077189d888e6a25040d4595f53d14c"]').contains(/^2$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('# Exons').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(4).contains(/^2$/).should('exist');
    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('# Exons').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(4).contains(/^10$/).should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri % Gène', () => {
    cy.sortTableAndWait('Début');
    cy.get('tr[data-row-key="28b40e8b80077189d888e6a25040d4595f53d14c"]').contains(/^2$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('% Gène').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(5).contains('10.1 %').should('exist');
    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('% Gène').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(5).contains('53.2 %').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri % CNV', () => {
    cy.sortTableAndWait('Début');
    cy.get('tr[data-row-key="28b40e8b80077189d888e6a25040d4595f53d14c"]').contains(/^2$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('% CNV').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(6).contains('24.2 %').should('exist');
    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('% CNV').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(6).contains('68.2 %').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.get('tr[data-row-key="f0b2a5bfad2c43cdb71d4f1535c475e640978e20"]').contains(/^38$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('Type').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(7).find('path[d*="M12.4"]').should('exist'); // Gène recoupe le CNV à une de ses extrémités
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(7).find('path[d*="M15.6"]').should('exist');
    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('Type').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(7).find('path[d*="M10.8"]').should('exist'); // Gène entièrement contenu dans le CNV
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(7).find('path[d*="M13.2"]').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.get('tr[data-row-key="f0b2a5bfad2c43cdb71d4f1535c475e640978e20"]').contains(/^38$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('# Exons').clickAndWait({force: true});
    cy.get('div[role="dialog"] thead[class="ant-table-thead"]').contains('Gène').clickAndWait({force: true});
    cy.get('div[role="dialog"] tr[class*="ant-table-row"]').eq(0).find('td').eq(0).contains('FAM66B').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('tr[data-row-key="f0b2a5bfad2c43cdb71d4f1535c475e640978e20"]').contains(/^38$/).clickAndWait({force: true});

    cy.get('div[role="dialog"] div[class*="ProTableHeader"]').contains('38 Résultats').should('exist');
    cy.get('div[role="dialog"] [class*="ant-pagination-item-2"]').should('not.exist');
    cy.get('div[role="dialog"] [class*="anticon-left"]').should('not.exist');
    cy.get('div[role="dialog"] [class*="anticon-right"]').should('not.exist');
  });
});
  