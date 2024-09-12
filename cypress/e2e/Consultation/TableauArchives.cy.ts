/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page d\'archives - Consultation du tableau', () => {

  beforeEach(() => {
    cy.visitArchivesPatientPage(epCHUSJ_ldmCHUSJ.patientProbId);

    cy.showColumn('URL', 0);
    cy.showColumn('Taille', 0);
    cy.showColumn('Hash', 0);
    cy.showColumn('Lot', 0);
  });

  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 0, 'https://ferload.qa.cqgc.hsj.rtss.qc.ca/');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 1, '16774.exomiser.variants.tsv');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 2, 'EXOMISER');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 3, 'TSV');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 4, epCHUSJ_ldmCHUSJ.patientProbId);
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 5, epCHUSJ_ldmCHUSJ.requestProbId);
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 6, epCHUSJ_ldmCHUSJ.sampleProbId);
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 7, epCHUSJ_ldmCHUSJ.bioAnalProbId);
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 8, epCHUSJ_ldmCHUSJ.stampDate);
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 9, '30.08 KB');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 10, '-');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 11, 'A00516_0169_16774');
    cy.validateTableDataRowKeyContent('16774.exomiser.variants.tsv', 12, 'Fichier');
  });
 
  it('Valider les liens disponibles Lien Requête', () => {
    cy.intercept('POST', '**/$graphql*').as('getPOSTgraphql');
    cy.get('tr[data-row-key="16774.exomiser.variants.tsv"]').contains(epCHUSJ_ldmCHUSJ.requestProbId).clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');

    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
  });
 
  it('Valider les liens disponibles Lien Analyse bioinfo', () => {
    cy.intercept('POST', '**/$graphql*').as('getPOSTgraphql');
    cy.get('tr[data-row-key="16774.exomiser.variants.tsv"]').contains(epCHUSJ_ldmCHUSJ.bioAnalProbId).clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');

    cy.contains('Analyse bioinformatique : '+epCHUSJ_ldmCHUSJ.bioAnalProbId).should('exist');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Patient', () => {
    cy.sortTableAndWait('Patient');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.patientProbId, 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Format', () => {
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('BED', 3);
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('VCF', 3);
  });

  it('Valider les fonctionnalités du tableau - Tri Requête', () => {
    cy.sortTableAndWait('Requête');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 5);
    cy.sortTableAndWait('Requête');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Analyse bioinfo', () => {
    cy.sortTableAndWait('Analyse bioinfo');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.bioAnalProbId, 7);
    cy.sortTableAndWait('Analyse bioinfo');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.bioAnalProbId, 7);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Format');
    cy.sortTableAndWait('Patient');
    cy.validateTableFirstRow('BED', 3);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validateTableResultsCount('Résultats 1 - ', false);
  });
});

describe.skip('Footer position on scroll', () => {
  it('should keep the footer at the bottom when scrolling', () => {
    cy.visitArchivesPatientPage(epCHUSJ_ldmCHUSJ.patientProbId);

    // Obtenez la position initiale du footer
    cy.get('[id="footer"]').then(($footer) => {
      const initialFooterPosition = $footer[0].getBoundingClientRect().bottom;
    cy.log('initialFooterPosition: '+initialFooterPosition);

    // Faites défiler vers le bas
    cy.get('[id="footer"]').scrollIntoView();

    // Attendre un peu pour que le défilement soit effectué
    cy.wait(1000);

    // Obtenez la nouvelle position du footer après le défilement
    cy.get('[id="footer"]').then(($footerAfterScroll) => {
      const footerAfterScrollPosition = $footerAfterScroll[0].getBoundingClientRect().bottom;
      cy.log('footerAfterScrollPosition: '+footerAfterScrollPosition);

        // Vérifiez que la position du footer après le défilement est la même qu'avant
//        expect(footerAfterScrollPosition).to.equal(initialFooterPosition);
      });
    });
  });
});