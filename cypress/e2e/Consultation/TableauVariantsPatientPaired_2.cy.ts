/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants d\'un patient (paired) - Consultation du tableau', () => {
  let presc_PAIRED: any;
  const setupTest = () => {
    presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);

    cy.showColumn('gnomAD ALT', 0);
    cy.showColumn('QP', 0);
    cy.showColumn(/^A$/, 0);
    cy.showColumn('A+R', 0);
    cy.showColumn('A/(A+R)', 0);
    cy.showColumn('Filtre', 0);
    cy.showColumn('CADD', 0);
    cy.showColumn('REVEL', 0);
  };

  it('Valider les liens disponibles Lien Variant', () => {
    setupTest();
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"]').contains('chr10:g.17617338A>C').invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.get('[data-cy="Summary_Start"]').contains('17 617 338').should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    setupTest();
    cy.get('tr[data-row-key="8f11e237271fa6d6c5b0cab036012fe68fba0e7f"] td').eq(8).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs750458124');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    setupTest();
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(9).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/610467');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    setupTest();
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(9).find('[data-icon="plus"]').clickAndWait({force: true});
    cy.validatePillSelectedQuery('Gène', ['HACD1']);
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    setupTest();
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(12).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/610467');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    setupTest();
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(13).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/1507888');
  });
 
  it('Valider les liens disponibles Lien Tier', () => {
    setupTest();
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(15).find('a[href]')
      .should('have.attr', 'href', 'https://franklin.genoox.com/clinical-db/variant/snpTumor/chr10-17617338-A-C-hg38');
  });
 
  it('Valider les liens disponibles Lien RQDM G', () => {
    setupTest();
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(19).find('a[href]').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Résultat/);
  });
 
  it('Valider les liens disponibles Lien RQDM TN', () => {
    setupTest();
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"] td').eq(20).find('a[href]').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Résultat/);
  });
});
