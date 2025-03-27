/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Page des CNVs d\'un patient - Valider la requête graphql', () => {
  it('Facette standard', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query CnvCount')) {
        req.alias = 'postGraphql';
      }
    });

    cy.openFacet('Variant', 'Type de variant');
    cy.get('[data-cy="Checkbox_Type de variant_GAIN"]').check({force: true});
    cy.get('[data-cy="Apply_Type de variant"]').click({force: true});

    cy.wait('@postGraphql').then((interception) => {
      cy.fixture('RequestBody/CNVsPatientFacetteStandard.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', epCHUSJ_ldmCHUSJ.patientProbId)
        .replace('{{prescriptionId}}', epCHUSJ_ldmCHUSJ.prescriptionId)
      );

      expect(interception.request.body).to.deep.equal(updatedFixture);
      });
    });
  });

  it('Facette numérique ou No Data', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query CnvCount')) {
        req.alias = 'postGraphql';
      }
    });

    cy.openFacet('Variant', 'Longueur du CNV');
    cy.get('[data-cy="InputNumber_Min_Longueur du CNV"]').type('1', {force: true});
    cy.get('[data-cy="Checkbox_NoData_Longueur du CNV"]').check({force: true});
    cy.get('[data-cy="Button_Apply_Longueur du CNV"]').clickAndWait({force: true});

    cy.wait('@postGraphql').then((interception) => {
      cy.fixture('RequestBody/CNVsPatientFacetteNumerique.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', epCHUSJ_ldmCHUSJ.patientProbId)
        .replace('{{prescriptionId}}', epCHUSJ_ldmCHUSJ.prescriptionId)
      );

      expect(interception.request.body).to.deep.equal(updatedFixture);
      });
    });
  });
});
