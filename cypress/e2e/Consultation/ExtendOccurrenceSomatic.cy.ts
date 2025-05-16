/// <reference types="cypress"/>
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.get('[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"] button[class*="ant-table-row-expand-icon"]').clickAndWait({force: true});
});

describe('Ligne extensible d\'une occurrence (somatic)', () => {
  it('Vérifier les informations affichées - En-tête', () => {
    cy.get('[class="ant-card-head-title"]').contains('chr10:g.1096268T>C').should('exist');
    cy.get('[class="ant-card-head-title"]').find('svg[class*="anticon"]').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(0).contains('Interpréter').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(1).contains('Rapport CHUSJ').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(2).contains('Ouvrir IGV').should('exist');
    cy.get('[class="ant-card-head-title"]').contains('UCSC').should('exist');
    cy.get('[class="ant-card-head-title"]').contains('LitVAR').should('exist');
  });

  it('Vérifier les informations affichées - Transcrit', () => {
    cy.get('[class*="OccurenceVariant_transcript"]').contains('WDR37').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').find('svg[class*="ConsequencesCell_highImpact"]').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('Stop Lost').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('p.Ter250Arg').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('Ensembl').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('--').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').find('path[d*="M16.7732"]').should('not.exist'); // C
    cy.get('[class*="OccurenceVariant_transcript"]').find('path[d*="M8.98279"]').should('not.exist'); // M
    cy.get('[class*="OccurenceVariant_transcript"]').find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.get('[class*="OccurenceVariant_transcript"]').contains('Exon').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('9 / 9').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('c.748T>C').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('rs10794716').should('exist');
  });

  it('Vérifier les informations affichées - Section Classifications', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(0).contains('Classifications').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(0).contains('ClinVar').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).contains(/B/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-green"]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(1).contains('COSMIC').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('-').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(2).contains('Hotspot').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(2).find('[class*="hotspotOutlined"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Gène', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(1).contains('Gène').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(0).contains('pLi').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('0.56642').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(1).contains('LOEUF').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('0.412').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(2).contains('SpliceAI').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(2).contains('ND').should('exist');
  });

  it('Vérifier les informations affichées - Section Fréquences', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(2).contains('Fréquences').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(0).contains('RQDM (TO)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(0).contains(/^\d{1}$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(0).contains('(1.00e+0)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(1).contains('RQDM (TN)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(1).contains(/^0$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(1).contains('(0.00e+0)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(2).contains('COSMIC').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(2).contains('-').should('exist');
  });

  it('Vérifier les informations affichées - Section Scores de prédictions', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(3).contains('Scores de prédictions').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-label"]').eq(0).contains('REVEL').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(0).contains('-').should('exist');
  });

  it('Vérifier les informations affichées - Section Zygosité', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(4).contains('Zygosité').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').eq(0).contains('Zygosité').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-content"]').eq(0).contains('Hétérozygote').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').contains('Hét. composé').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').contains('Hét. composé potentiel').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').contains('Transmission').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').contains('Origine parentale').should('not.exist');
  });

  it('Vérifier les informations affichées - Section Associations cliniques (OMIM)', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(5).contains('Associations cliniques (OMIM)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-label"]').eq(0).contains('Neurooculocardiogenitourinary syndrome').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(0).contains('AD').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-blue"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Famille', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').contains('Famille').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').contains('Génotype Père').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').contains('Génotype Mère').should('not.exist');
  });

  it('Vérifier les informations affichées - Section Métriques', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(6).contains('Métriques').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').eq(0).contains('Qualité de profondeur').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(0).contains('-').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').eq(1).contains('Profondeur allélique ALT').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(1).contains('321').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').eq(2).contains('Profondeur totale ALT + REF').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(2).contains('321').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').eq(3).contains('Qualité somatique').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(3).contains('64.73').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').eq(4).contains(/^Filtre$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(4).contains('PASS').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').contains('Qualité du génotype').should('not.exist');
  });

  it('Valider les liens disponibles - Variant', () => {
    cy.get('[class="ant-card-head-title"]').contains('chr10:g.1096268T>C').invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.get('[data-cy="Summary_Start"]').contains('1 096 268').should('exist');
  });

  it('Valider les liens disponibles - UCSC', () => {
   cy.get('[class="ant-card-head-title"] [class*="OccurenceVariant_linkButton"]').eq(0)
     .should('have.attr', 'href', 'https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr10%3A1096268-1096269');
  });

  it('Valider les liens disponibles - LitVar', () => {
    cy.get('[class="ant-card-head-title"] [class*="OccurenceVariant_linkButton"]').eq(1)
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/research/litvar2/docsum?text=rs10794716');
  });

  it('Valider les liens disponibles - Gène', () => {
    cy.get('[class*="OccurenceVariant_transcript"]').find('a[href]').eq(0)
      .should('have.attr', 'href', 'https://www.omim.org/entry/618586');
  });

  it('Valider les liens disponibles - Ensembl Gene', () => {
    cy.get('[class*="OccurenceVariant_transcript"]').find('a[href]').eq(1)
      .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=ENSG00000047056');
  });

  it('Valider les liens disponibles - rsnumber', () => {
    cy.get('[class*="OccurenceVariant_transcript"]').find('a[href]').eq(2)
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs10794716');
  });

  it('Valider les liens disponibles - ClinVar', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/1185321');
  });

  it('Valider les liens disponibles - pLi', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).find('a[href]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/gene/ENSG00000047056?dataset=gnomad_r2_1');
  });

  it('Valider les liens disponibles - LOEUF', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).find('a[href]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/gene/ENSG00000047056?dataset=gnomad_r2_1');
  });

  it('Valider les liens disponibles - SpliceAI', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(2).find('a[href]')
      .should('have.attr', 'href', 'https://spliceailookup.broadinstitute.org/#variant=10-1096268-T-C&hg=38&distance=50&mask=0&precomputed=0');
  });

  it('Valider les liens disponibles - RQDM (TO)', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(0).find('a[href]').invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.validateTableResultsCount('Résultats 1 - 20 de');
  });

  it('Valider les liens disponibles - RQDM (TN)', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(1).find('a[href]').invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.validateTableResultsCount('Résultats 1 - 20 de');
  });

  it('Valider les liens disponibles - OMIM', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-label"]').eq(0).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/618652');
  });
});