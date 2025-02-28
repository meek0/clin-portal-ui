/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitFilesPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
  cy.showColumn('Taille', 0);
  cy.showColumn('Hash', 0);
  cy.showColumn('Lot', 0);
  cy.showColumn('Type', 0);
});

describe('Page des fichiers d\'un patient - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 0, '16776.hard-filtered.gvcf.gz');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 1, 'VCF');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 2, epCHUSJ_ldmCHUSJ.patientFthId);
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 3, epCHUSJ_ldmCHUSJ.requestFthId);
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 4, epCHUSJ_ldmCHUSJ.sampleFthId);
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 5, epCHUSJ_ldmCHUSJ.bioAnalFthId);
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 6, epCHUSJ_ldmCHUSJ.stampDate.substring(0, 7));
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 7, 'Fichier');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 7, 'Index');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 8, '156.52 MB');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 9, 'ZDgwMThjMjkxYjA2OTM1NzQzMzMxM2Q1ZTY1YmM4YjM=');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 10, 'A00516_0169');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 11, 'SNV');
  });
 
  it('Valider les liens disponibles Lien Requête', () => {
    cy.get('tr[data-row-key="16776.hard-filtered.gvcf.gz"]').contains(epCHUSJ_ldmCHUSJ.requestFthId).clickAndWait({force: true});

    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    cy.get('div[aria-selected="true"]').contains('Détails').should('exist');
  });
 
  it('Valider les liens disponibles Lien Analyse bioinfo', () => {
    cy.intercept('POST', '**/$graphql*').as('getPOSTgraphql');
    cy.get('tr[data-row-key="16776.hard-filtered.gvcf.gz"]').contains(epCHUSJ_ldmCHUSJ.bioAnalFthId).clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');

    cy.contains('Analyse bioinformatique : '+epCHUSJ_ldmCHUSJ.bioAnalFthId).should('exist');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Format', () => {
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('BED', 1);
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('VCF', 1);
    cy.sortTableAndWait('Format');
  });

  it('Valider les fonctionnalités du tableau - Tri Patient', () => {
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.patientProbId, 2);
    cy.sortTableAndWait('Patient');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.patientFthId, 2);
    cy.sortTableAndWait('Patient');
  });

  it('Valider les fonctionnalités du tableau - Tri Requête', () => {
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Requête');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 3);
    cy.sortTableAndWait('Requête');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestFthId, 3);
  });

  it('Valider les fonctionnalités du tableau - Tri Échantillon (LDM)', () => {
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Échantillon (LDM)');
    cy.validateTableFirstRow('NA24143_A', 4);
    cy.sortTableAndWait('Échantillon (LDM)');
    cy.validateTableFirstRow('NA24835_A', 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Analyse bioinfo', () => {  
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Patient');  
    cy.sortTableAndWait('Analyse bioinfo');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.bioAnalProbId, 5);
    cy.sortTableAndWait('Analyse bioinfo');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.bioAnalFthId, 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Date', () => {  
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Patient');  
    cy.sortTableAndWait('Date');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 7), 6);
    cy.sortTableAndWait('Date');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 7), 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Taille', () => {    
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Taille');
    cy.validateTableFirstRow('242 B', 8);
    cy.sortTableAndWait('Taille');
    cy.validateTableFirstRow('3.11 GB', 8);
  });

  it('Valider les fonctionnalités du tableau - Tri Lot', () => {    
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Lot');
    cy.validateTableFirstRow('A00516_0169', 10);
    cy.sortTableAndWait('Lot');
    cy.validateTableFirstRow('A00516_0169', 10);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {    
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('ALIR', 11);
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('SSUP', 11);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Taille');
    cy.validateTableFirstRow('374 B', 8);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validateTableResultsCount('Résultats 1 - ', false);
  });
});
