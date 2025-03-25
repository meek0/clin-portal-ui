/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '1eb2b9a0-9e95-4c77-8a40-8175bef0c25c');
  cy.get('[data-row-key="e2d4a44c27415d43ae2c0bbb1ce3993affcb600e"] button[class*="ant-table-row-expand-icon"]').clickAndWait({force: true});
});

describe('Ligne extensible d\'une occurrence', () => {
  it('Vérifier les informations affichées - En-tête', () => {
    cy.get('[class="ant-card-head-title"]').contains('chr3:g.58159621T>C').should('exist');
    cy.get('[class="ant-card-head-title"]').find('svg[class*="anticon"]').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(0).contains('Interpréter').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(1).contains('Rapport CHUSJ').should('exist');
    cy.get('[class="ant-card-head-title"] button').eq(2).contains('Ouvrir IGV').should('exist');
    cy.get('[class="ant-card-head-title"]').contains('UCSC').should('exist');
    cy.get('[class="ant-card-head-title"]').contains('LitVAR').should('exist');
  });

  it('Vérifier les informations affichées - Transcrit', () => {
    cy.get('[class*="OccurenceVariant_transcript"]').contains('FLNB').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').find('svg[class*="ConsequencesCell_moderateImpact"]').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('Missense').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('p.Ile2319Thr').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('Ensembl').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('NM_001457.4').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').find('path[d*="M16.7732"]').should('exist'); // C
    cy.get('[class*="OccurenceVariant_transcript"]').find('path[d*="M8.98279"]').should('exist'); // M
    cy.get('[class*="OccurenceVariant_transcript"]').find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.get('[class*="OccurenceVariant_transcript"]').contains('Exon').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('42').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('46').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('c.6956T>C').should('exist');
    cy.get('[class*="OccurenceVariant_transcript"]').contains('rs116826041').should('exist');
  });

  it('Vérifier les informations affichées - Section Classifications', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(0).contains('Classifications').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(0).contains('ClinVar').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).contains(/^B$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).contains(/^LB$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-green"]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-lime"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Prédictions', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(1).contains('Prédictions').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(0).contains('Franklin').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('-').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(1).contains('Exomiser').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('VSI').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('PP3').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('PP4').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('BP6_Strong').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).find('[class*="ant-tag-orange"]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).find('[class*="ant-tag-green"]').eq(0).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).find('[class*="ant-tag-green"]').eq(1).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).find('[class="ant-tag"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Gène', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(2).contains('Gène').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(0).contains('pLi').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(0).contains('6.05e-10').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(1).contains('LOEUF').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(1).contains('0.443').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-label"]').eq(2).contains('SpliceAI').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(2).contains('0.01').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(2).contains('AG').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(2).find('[class="ant-tag"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Fréquences', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(3).contains('Fréquences').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-label"]').eq(0).contains('RQDM').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-label"]').eq(0).find('[class*="OccurenceVariant_affected"]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(0).contains(/^5$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(0).contains(/^\d{3}$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(0).contains(/(\d{1}.\d{2}e-2)/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-label"]').eq(1).contains('RQDM').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-label"]').eq(1).find('[class*="OccurenceVariant_unaffected"]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(1).contains(/^2$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(1).contains(/(\d{1}.\d{2}e-1)/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-label"]').eq(2).contains('gnomAD').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(2).contains('9.44e-3').should('exist');
  });

  it('Vérifier les informations affichées - Section Scores de prédictions', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(4).contains('Scores de prédictions').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').eq(0).contains('SIFT').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-content"]').eq(0).contains('Deleterious').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-content"]').eq(0).contains('(0.002)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').eq(1).contains('REVEL').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-content"]').eq(1).contains('7.47e-1').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').eq(2).contains('FATHMM').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-content"]').eq(2).contains('Deleterious').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-content"]').eq(2).contains('(-1.97)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').eq(3).contains('CADD (raw)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-content"]').eq(3).contains('4.13e+0').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-label"]').eq(4).contains('CADD (phred)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(4).find('[class="ant-descriptions-item-content"]').eq(4).contains('2.80e+1').should('exist');
  });

  it('Vérifier les informations affichées - Section Zygosité', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(5).contains('Zygosité').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-label"]').eq(0).contains('Zygosité').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(0).contains('Hétérozygote').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-label"]').eq(1).contains('Hét. composé').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(1).contains('FLNB').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(1).contains('(').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(1).contains('1').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(1).contains(')').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-label"]').eq(2).contains('Hét. composé potentiel').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(2).contains('FLNB').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(1).contains('(').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(2).contains('2').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(1).contains(')').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-label"]').eq(3).contains('Transmission').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(3).contains('-').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-label"]').eq(4).contains('Origine parentale').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(4).contains('Mère').should('exist');
  });

  it('Vérifier les informations affichées - Section Associations cliniques (OMIM)', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(6).contains('Associations cliniques (OMIM)').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').eq(0).contains('Atelosteogenesis, type I').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(0).contains('AD').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-blue"]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').eq(1).contains('Atelosteogenesis, type III').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(1).contains('AD').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(1).find('[class*="ant-tag-blue"]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').eq(2).contains('Boomerang dysplasia').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(2).contains('AD').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-content"]').eq(2).find('[class*="ant-tag-blue"]').should('exist');
    cy.get('[class="ant-card-body"] [class*="OccurenceVariant_seeAll"]').contains('Voir plus').should('exist');
  });

  it('Vérifier les informations affichées - Section Famille', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(7).contains('Famille').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-label"]').eq(0).contains('Génotype Père').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-label"]').eq(0).find('path[d*=M3]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-label"]').eq(0).find('path[d*=M8]').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-content"]').eq(0).contains('0/0').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-content"]').eq(0).contains('(').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-content"]').eq(0).contains('détails').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-content"]').eq(0).contains(')').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-label"]').eq(1).contains('Génotype Mère').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-label"]').eq(1).find('path[d*=M8]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-label"]').eq(1).find('path[d*=M3]').should('not.exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-content"]').eq(1).contains('0/1').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-content"]').eq(1).contains('(').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-content"]').eq(1).contains('détails').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-content"]').eq(1).contains(')').should('exist');
  });

  it('Vérifier les informations affichées - Section Métriques', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-header"]').eq(8).contains('Métriques').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-label"]').eq(0).contains('Qualité de profondeur').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-content"]').eq(0).contains('0.34').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-label"]').eq(1).contains('Profondeur allélique ALT').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-content"]').eq(1).contains('92').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-label"]').eq(2).contains('Profondeur totale ALT + REF').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-content"]').eq(2).contains('176').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-label"]').eq(3).contains('Qualité du génotype').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-content"]').eq(3).find('polygon[points="0,0 5,10 -5,10"]').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-content"]').eq(3).contains('48').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-label"]').eq(4).contains(/^Filtre$/).should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-content"]').eq(4).contains('PASS').should('exist');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(8).find('[class="ant-descriptions-item-label"]').contains('Qualité somatique').should('not.exist');
  });

  it('Valider les liens disponibles - Variant', () => {
    cy.get('[class="ant-card-head-title"]').contains('chr3:g.58159621T>C').invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.get('[data-cy="Summary_Start"]').contains('58 159 621').should('exist');
  });

  it('Valider les liens disponibles - UCSC', () => {
   cy.get('[class="ant-card-head-title"] [class*="OccurenceVariant_linkButton"]').eq(0)
     .should('have.attr', 'href', 'https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr3%3A58159621-58159622');
  });

  it('Valider les liens disponibles - LitVar', () => {
    cy.get('[class="ant-card-head-title"] [class*="OccurenceVariant_linkButton"]').eq(1)
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/research/litvar2/docsum?text=rs116826041');
  });

  it('Valider les liens disponibles - Gène', () => {
    cy.get('[class*="OccurenceVariant_transcript"]').find('a[href]').eq(0)
      .should('have.attr', 'href', 'https://www.omim.org/entry/603381');
  });

  it('Valider les liens disponibles - Ensembl Gene', () => {
    cy.get('[class*="OccurenceVariant_transcript"]').find('a[href]').eq(1)
      .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=ENSG00000136068');
  });

  it('Valider les liens disponibles - Ensembl Transcrit', () => {
    cy.get('[class*="OccurenceVariant_transcript"]').find('a[href]').eq(2)
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/nuccore/NM_001457.4');
  });

  it('Valider les liens disponibles - rsnumber', () => {
    cy.get('[class*="OccurenceVariant_transcript"]').find('a[href]').eq(3)
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs116826041');
  });

  it('Valider les liens disponibles - ClinVar', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).find('a[href]').eq(1)
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/258120');
  });

  it('Valider les liens disponibles - pLi', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(0).find('a[href]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/gene/ENSG00000136068?dataset=gnomad_r2_1');
  });

  it('Valider les liens disponibles - LOEUF', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(1).find('a[href]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/gene/ENSG00000136068?dataset=gnomad_r2_1');
  });

  it('Valider les liens disponibles - SpliceAI', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(2).find('[class="ant-descriptions-item-content"]').eq(2).find('a[href]')
      .should('have.attr', 'href', 'https://spliceailookup.broadinstitute.org/#variant=3-58159621-T-C&hg=38&distance=50&mask=0&precomputed=0');
  });

  it('Valider les liens disponibles - RQDM Atteints', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(0).find('a[href]').invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.validateTableResultsCount('7 Résultats');
  });

  it('Valider les liens disponibles - RQDM Non atteints', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(1).find('a[href]').invoke('removeAttr', 'target').clickAndWait({force: true});
    cy.validateTableResultsCount('7 Résultats');
  });

  it('Valider les liens disponibles - gnomAD', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(3).find('[class="ant-descriptions-item-content"]').eq(2).find('a[href]')
      .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/3-58159621-T-C?dataset=gnomad_r4');
  });

  it('Valider les liens disponibles - Hét. composé', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(1).contains('1').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql1');
    cy.wait('@getPOSTgraphql1');
    cy.contains('2 Résultats').should('exist');
  });

  it('Valider les liens disponibles - Hét. composé potentiel', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(5).find('[class="ant-descriptions-item-content"]').eq(2).contains('2').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql2');
    cy.wait('@getPOSTgraphql2');
    cy.contains('2 Résultats').should('exist');
  });

  it('Valider les liens disponibles - OMIM', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(6).find('[class="ant-descriptions-item-label"]').eq(0).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/108720');
  });

  it('Valider les liens disponibles - OMIM Voir plus', () => {
    cy.get('[class="ant-card-body"] a[href="/variant/entity/3-58159621-T-C/summary"]').should('exist');
  });

  it('Vérifier les informations affichées des métriques de séquençage parental', () => {
    cy.get('[class="ant-card-body"] [class="ant-descriptions-view"]').eq(7).find('[class="ant-descriptions-item-content"]').eq(0).contains('détails').clickAndWait({force: true});

    cy.get('[class="ant-modal-title"]').contains('Métriques de séquençage parental').should('exist');

    cy.get('[class="ant-modal-body"] [class="ant-descriptions-title"]').eq(0).contains('Mère').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(0).contains('Qualité de profondeur').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).contains('0.34').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(1).contains('Profondeur allélique ALT').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('85').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(2).contains('Profondeur totale ALT + REF').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(2).contains('150').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(3).contains('Ratio allélique ALT / (ALT+REF)').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(3).contains('0.57').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(4).contains('Qualité du génotype').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(4).find('polygon[points="0,0 5,10 -5,10"]').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(4).contains('48').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(5).contains(/^Filtre$/).should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(5).contains('PASS').should('exist');

    cy.get('[class="ant-modal-body"] [class="ant-descriptions-title"]').eq(1).contains('Père').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(0).contains('Qualité de profondeur').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('0.34').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(1).contains('Profondeur allélique ALT').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains(/^0$/).should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(2).contains('Profondeur totale ALT + REF').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(2).contains('157').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(3).contains('Ratio allélique ALT / (ALT+REF)').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(3).contains('0.00').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(4).contains('Qualité du génotype').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(4).find('polygon[points="0,0 5,10 -5,10"]').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(4).contains('81').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(5).contains(/^Filtre$/).should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(5).contains('PASS').should('exist');
  });
});