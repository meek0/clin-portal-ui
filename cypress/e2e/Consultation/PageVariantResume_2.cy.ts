/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantEntityPage('1-45508847-C-T', 3);
});

describe('Page d\'un variant (onglet Résumé) - Valider les liens disponibles', () => {
  it('Lien ClinVar de la section Résumé', () => {
    cy.get('[data-cy="Summary_Clinvar_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/95703');
  });

  it('Lien dbSNP de la section Résumé', () => {
    cy.get('[data-cy="Summary_dbSNP_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs370596113');
    cy.get('body').contains(/^rs370596113$/).should('exist');
  });

  it('Lien du gène de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Gene_ExternalLink"]')
      .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=PRDX1');
  });

  it('Lien Omim de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Omim_ExternalLink"]')
      .should('have.attr', 'href', 'https://omim.org/entry/176763');
  });

  it('Lien SpliceAI de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_SpliceAi_ExternalLink"]')
      .should('have.attr', 'href', 'https://spliceailookup.broadinstitute.org/#variant=1-45508847-C-T&hg=38&distance=50&mask=0&precomputed=0');
  });

  it('Lien pLI de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Pli_ExternalLink"]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/gene/ENSG00000117450?dataset=gnomad_r2_1');
  });

  it('Lien LOEUF de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Loeuf_ExternalLink"]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/gene/ENSG00000117450?dataset=gnomad_r2_1');
  });

  it('Lien RefSeq de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_RefSeq_NM_181697.3_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/nuccore/NM_181697.3?report=graph');
  });

  it('Lien \'5 autres transcrits\' de la section Conséquences géniques', () => {
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('5 autres transcrits +').clickAndWait({force: true});
    cy.get('[data-cy="Consequences_PRDX1_Space"] tr[class*="ant-table-row"]').eq(1).should('exist');
    cy.get('[data-cy="Consequences_PRDX1_Space"]').contains('Afficher moins -').clickAndWait({force: true});
    cy.get('[data-cy="Consequences_PRDX1_Space"] tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });

  it('Lien TopMed de la section Cohortes publiques', () => {
    cy.get('[data-cy="FrequencyCard_Cohort_TopMed_ExternalLink"]').should('have.attr', 'href', 'https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/1-45508847-C-T');
  });

  it('Lien gnomAD Joint (v4) de la section Cohortes publiques', () => {
    cy.get('[data-cy="FrequencyCard_Cohort_gnomAD Joint (v4)_ExternalLink"]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-45508847-C-T?dataset=gnomad_r4');
  });

  it('Lien gnomAD Exome (v4) de la section Cohortes publiques', () => {
    cy.get('[data-cy="FrequencyCard_Cohort_gnomAD Exome (v4)_ExternalLink"]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-45508847-C-T?dataset=gnomad_r4');
  });

  it('Lien gnomAD Genome (v4) de la section Cohortes publiques', () => {
    cy.get('[data-cy="FrequencyCard_Cohort_gnomAD Genome (v4)_ExternalLink"]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-45508847-C-T?dataset=gnomad_r4');
  });

  it('Lien de la condition Orphanet de la section Gène - Phénotype', () => {
    cy.get('[data-cy="ClinicalCard_GenePhenotype_Condition_11308_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.orpha.net/consor/cgi-bin/Disease_Search.php?lng=EN&data_id=11308');
  });

  it('Lien OMIM du gène de la section Gène - Phénotype', () => {
    cy.get('[data-cy="ClinicalCard_GenePhenotype_Omim_176763_ExternalLink"]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/176763');
  });

  it('Lien OMIM de la condition de la section Gène - Phénotype', () => {
    cy.get('[data-cy="ClinicalCard_GenePhenotype_OmimCondition_277400_ExternalLink"]').first()
      .should('have.attr', 'href', 'https://www.omim.org/entry/277400');
  });

  it('Lien HPO de la condition de la section Gène - Phénotype', () => {
    cy.get('[data-cy*="ClinicalCard_GenePhenotype_HpoCondition_HP:"]').eq(0)
      .should('have.attr', 'href').and('match', /https:\/\/hpo\.jax\.org\/app\/browse\/term\/HP:*/);
  });

  it('Lien \'See more\' de la condition de la section Gène - Phénotype', () => {
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"]').contains('Voir plus').clickAndWait({force: true});
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"]').contains('Renal insufficiency').should('exist');
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"]').contains('Voir moins').clickAndWait({force: true});
    cy.get('[data-row-key="ClinicalCard_GenePhenotype_HPO_PRDX1"]').contains('Renal insufficiency').should('not.exist');
  });
});
