/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des CNVs d\'un patient - Valider la requête graphql', () => {
  it('Facette standard', () => {
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
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
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
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

  it('Pagination', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query Cnv(')) {
        req.alias = 'postGraphqlFirst';
      }
    });

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

    cy.wait('@postGraphqlFirst').then((interception) => {
      cy.fixture('RequestBody/CNVsPatientPagingFirst.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', epCHUSJ_ldmCHUSJ.patientProbId)
        .replace('{{prescriptionId}}', epCHUSJ_ldmCHUSJ.prescriptionId)
      );

      expect(interception.request.body.variables).to.deep.equal(updatedFixture.variables);
      });
    });

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query Cnv(')) {
        req.alias = 'postGraphqlNext';
      }
    });

    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Suivant').click({force: true});

    cy.wait('@postGraphqlNext').then((interception) => {
      cy.fixture('RequestBody/CNVsPatientPagingNext.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', epCHUSJ_ldmCHUSJ.patientProbId)
        .replace('{{prescriptionId}}', epCHUSJ_ldmCHUSJ.prescriptionId)
      );

      expect(interception.request.body.variables).to.deep.equal(updatedFixture.variables);
      });
    });

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('query Cnv(')) {
        req.alias = 'postGraphqlPrev';
      }
    });

    cy.get('div[class*="Pagination"]').eq(0).find('button[type="button"]').contains('Précédent').click({force: true});

    cy.wait('@postGraphqlPrev').then((interception) => {
      cy.fixture('RequestBody/CNVsPatientPagingPrev.json').then((fixture) => {

      const updatedFixture = JSON.parse(JSON.stringify(fixture)
        .replace('{{patientProbId}}', epCHUSJ_ldmCHUSJ.patientProbId)
        .replace('{{prescriptionId}}', epCHUSJ_ldmCHUSJ.prescriptionId)
      );

      expect(interception.request.body.variables).to.deep.equal(updatedFixture.variables);
      });
    });
  });
});
