/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'une analyse bioinformatique - Vérifier les informations affichées', () => {
  let epCHUSJ_ldmCHUSJ: any;
  const setupTest = () => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitBioinformaticsAnalysisPage(epCHUSJ_ldmCHUSJ.bioAnalProbId);
  };

  it('Panneau Analyse', () => {
    setupTest();
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.bioAnalProbId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(1).contains('Analyse bioinformatique d\'exomes germinaux (GEBA)').should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(2).contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4)).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(4).contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(5).contains('LDM-CHUSJ').should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(6).contains('CQGC').should('exist');
  });
  
  it('Panneau Pipeline bioinformatique', () => {
    setupTest();
    cy.get('[data-cy="BioInfoPipelineCard_Card"] [class="ant-descriptions-item-content"]').eq(0).contains('Dragen').should('exist');
    cy.get('[data-cy="BioInfoPipelineCard_Card"] [class="ant-descriptions-item-content"]').eq(1).contains('3.8.4').should('exist');
    cy.get('[data-cy="BioInfoPipelineCard_Card"] [class="ant-descriptions-item-content"]').eq(2).contains('GRCh38').should('exist');
  });
  
  it('Panneau Séquençage', () => {
    setupTest();
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(1).contains('WXS').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(2).contains('--').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(3).contains('1_data_to_import').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(4).contains('A00516_0169').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(5).contains('Illumina NovaSeq').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(6).contains('RocheKapaHyperExome').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(7).contains('A00516').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(8).contains('2020-11-03').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(9).contains(epCHUSJ_ldmCHUSJ.aliquotProbId).should('exist');
  });
  
  it('Panneau Échantillons', () => {
    setupTest();
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(0).contains(new RegExp(`^${epCHUSJ_ldmCHUSJ.sampleProbId}$`)).should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(1).contains('DNA').should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(2).contains('SP_'+epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(3).contains('NBL').should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau Fichiers de données', () => {
    setupTest();
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.cram').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(1).contains('ALIR').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(2).contains('CRAM').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(4).contains('3.11 GB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('not.exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.hard-filtered.gvcf.gz').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(1).contains('SNV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(2).contains('VCF').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(4).contains('162.01 MB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('not.exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.cnv.vcf.gz').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(1).contains('GCNV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(2).contains('VCF').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(4).contains('9.15 KB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('not.exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.QC.tgz"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.QC.tgz').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.QC.tgz"] [class="ant-table-cell"]`).eq(1).contains('SSUP').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.QC.tgz"] [class="ant-table-cell"]`).eq(2).contains('TGZ').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.QC.tgz"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.QC.tgz"] [class="ant-table-cell"]`).eq(4).contains('23.3 MB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.QC.tgz"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.QC.tgz"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.html"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.exomiser.html').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.html"] [class="ant-table-cell"]`).eq(1).contains('EXOMISER').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.html"] [class="ant-table-cell"]`).eq(2).contains('HTML').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.html"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.html"] [class="ant-table-cell"]`).eq(4).contains('789.46 KB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.html"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.html"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.json"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.exomiser.json').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.json"] [class="ant-table-cell"]`).eq(1).contains('EXOMISER').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.json"] [class="ant-table-cell"]`).eq(2).contains('JSON').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.json"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.json"] [class="ant-table-cell"]`).eq(4).contains('717.71 KB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.json"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.json"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.variants.tsv"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.exomiser.variants.tsv').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.variants.tsv"] [class="ant-table-cell"]`).eq(1).contains('EXOMISER').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.variants.tsv"] [class="ant-table-cell"]`).eq(2).contains('TSV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.variants.tsv"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.variants.tsv"] [class="ant-table-cell"]`).eq(4).contains('30.08 KB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.variants.tsv"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.exomiser.variants.tsv"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.seg.bw"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.seg.bw').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.seg.bw"] [class="ant-table-cell"]`).eq(1).contains('IGV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.seg.bw"] [class="ant-table-cell"]`).eq(2).contains('BW').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.seg.bw"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.seg.bw"] [class="ant-table-cell"]`).eq(4).contains('35.06 KB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.seg.bw"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.seg.bw"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.baf.bw"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.hard-filtered.baf.bw').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.baf.bw"] [class="ant-table-cell"]`).eq(1).contains('IGV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.baf.bw"] [class="ant-table-cell"]`).eq(2).contains('BW').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.baf.bw"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.baf.bw"] [class="ant-table-cell"]`).eq(4).contains('2.24 MB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.baf.bw"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.hard-filtered.baf.bw"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.roh.bed"] [class="ant-table-cell"]`).eq(0).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.roh.bed').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.roh.bed"] [class="ant-table-cell"]`).eq(1).contains('IGV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.roh.bed"] [class="ant-table-cell"]`).eq(2).contains('BED').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.roh.bed"] [class="ant-table-cell"]`).eq(3).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.roh.bed"] [class="ant-table-cell"]`).eq(4).contains('407 B').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.roh.bed"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${epCHUSJ_ldmCHUSJ.aliquotProbId}.roh.bed"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    
  });
  
  it('Panneau Analyses connexes', () => {
    setupTest();
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"]').contains('Aucune donnée disponible').should('exist');
  });
});
