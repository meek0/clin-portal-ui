/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.showColumn('M : P', 0);
  cy.showColumn('HC', 0);
  cy.showColumn('HCP', 0);
  cy.showColumn('Trans.', 0);
  cy.showColumn('QP', 0);
  cy.showColumn('OP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('Crit. Exo.', 0);
  cy.showColumn(/^CMC$/, 0);
  cy.showColumn('Tier', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
  cy.showColumn('Crit. Fra.', 0);
});

describe('Page des variants d\'un patient - Consultation du tableau', () => {
   it('Valider les liens disponibles Lien UCSC', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] button[class*="ant-dropdown-trigger"]').clickAndWait({force: true});
    cy.get('[data-menu-id*="UCSC"] a[href]')
      .should('have.attr', 'href', 'https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chrX%3A123403094-123403095');
  });
 
  it('Valider les liens disponibles Lien LitVar', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] button[class*="ant-dropdown-trigger"]').clickAndWait({force: true});
    cy.get('[data-menu-id*="LitVAR"] a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/research/litvar2/docsum?text=rs138817389');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').contains('chrX:g.123403094G>A').invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.get('[data-cy="Summary_Start"]').contains('123 403 094').should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(4).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs138817389');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(5).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/305915');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(5).find('[data-icon="plus"]').clickAndWait({force: true});
    cy.validatePillSelectedQuery('Gène', ['GRIA3']);
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(8).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/305915');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(9).find('a[href]').eq(1)
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/198752');
  });
 
  it('Valider les liens disponibles Lien ACMG F.', () => {
    cy.sortTableAndIntercept('ACMG F.', 1);
    cy.sortTableAndIntercept('ACMG F.', 1);
    cy.get('tr[class*="ant-table-row"]').eq(0).find('td').eq(12).find('a[href]').should('have.attr', 'href', 'https://franklin.genoox.com/clinical-db/variant/snp/chr1-248441241-C-T-HG38');
  });
 
  it('Valider les liens disponibles Lien RQDM G', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(16).find('a[href]').clickAndWait({force: true});
    cy.validateTableResultsCount('6 Résultats');
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(30).find('a[href]')
      .should('have.attr', 'href', 'https://cancer.sanger.ac.uk/cosmic/search?q=COSV52051792&genome=38#');
  });
 
  it('Valider les liens disponibles Lien Tier', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"] td').eq(31).find('a[href]')
      .should('have.attr', 'href', 'https://franklin.genoox.com/clinical-db/variant/snpTumor/chrX-123403094-G-A-hg38');
  });
});
