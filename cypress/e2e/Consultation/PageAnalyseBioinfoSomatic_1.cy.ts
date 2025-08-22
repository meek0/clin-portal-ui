/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'une analyse bioinformatique (somatic) - Vérifier les informations affichées', () => {
  let presc_SOMATIC: any;
  const setupTest = () => {
    presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
    cy.visitBioinformaticsAnalysisPage(presc_SOMATIC.bioAnalProbId);
  };

  it('Panneau Analyse', () => {
    setupTest();
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(0).contains(presc_SOMATIC.bioAnalProbId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(1).contains('Analyse bioinformatique d\'exomes tumoraux (TEBA').should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(2).contains(presc_SOMATIC.prescriptionId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(3).contains(presc_SOMATIC.stampDate).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(4).contains(presc_SOMATIC.patientProbId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(5).contains('LDM-CHUSJ').should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(6).contains('CQGC').should('exist');
  });
  
  it('Panneau Pipeline bioinformatique', () => {
    setupTest();
    cy.get('[data-cy="BioInfoPipelineCard_Card"] [class="ant-descriptions-item-content"]').eq(0).contains('Dragen').should('exist');
    cy.get('[data-cy="BioInfoPipelineCard_Card"] [class="ant-descriptions-item-content"]').eq(1).contains('3.10.4').should('exist');
    cy.get('[data-cy="BioInfoPipelineCard_Card"] [class="ant-descriptions-item-content"]').eq(2).contains('GRCh38').should('exist');
  });
  
  it('Panneau Séquençage', () => {
    setupTest();
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(0).contains(presc_SOMATIC.requestProbId).should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(1).contains('WXS').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(2).contains('--').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(3).contains('3_data_to_import').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(4).contains('test_extum').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(5).contains('Illumina').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(6).contains('RocheKapaHyperExome-1.0').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(7).contains('A00516').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(8).contains('2023-04-27').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(9).contains(presc_SOMATIC.aliquotProbId).should('exist');
  });
  
  it('Panneau Échantillons', () => {
    setupTest();
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(0).contains(presc_SOMATIC.sampleProbId).should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(1).contains('DNA').should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(2).contains(presc_SOMATIC.specimenProbId).should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(3).contains('TUMOR').should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau Fichiers de données', () => {
    setupTest();
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(0).contains(presc_SOMATIC.aliquotProbId+'.cram').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(1).contains('ALIR').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(2).contains('CRAM').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(3).contains(presc_SOMATIC.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(4).contains('7.01 GB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cram"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(0).contains(presc_SOMATIC.aliquotProbId+'.hard-filtered.gvcf.gz').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(1).contains('SSNV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(2).contains('VCF').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(3).contains(presc_SOMATIC.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(4).contains('730.12 MB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.hard-filtered.gvcf.gz"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.dragen.WES_somatic-tumor_only.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(0).contains(presc_SOMATIC.aliquotProbId+'.dragen.WES_somatic-tumor_only.cnv.vcf.gz').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.dragen.WES_somatic-tumor_only.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(1).contains('SCNV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.dragen.WES_somatic-tumor_only.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(2).contains('VCF').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.dragen.WES_somatic-tumor_only.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(3).contains(presc_SOMATIC.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.dragen.WES_somatic-tumor_only.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(4).contains('14.69 KB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.dragen.WES_somatic-tumor_only.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.dragen.WES_somatic-tumor_only.cnv.vcf.gz"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.extra.tgz"] [class="ant-table-cell"]`).eq(0).contains(presc_SOMATIC.aliquotProbId+'.extra.tgz').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.extra.tgz"] [class="ant-table-cell"]`).eq(1).contains('SSUP').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.extra.tgz"] [class="ant-table-cell"]`).eq(2).contains('TGZ').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.extra.tgz"] [class="ant-table-cell"]`).eq(3).contains(presc_SOMATIC.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.extra.tgz"] [class="ant-table-cell"]`).eq(4).contains('20.54 MB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.extra.tgz"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.extra.tgz"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cnv.calls.png"] [class="ant-table-cell"]`).eq(0).contains(presc_SOMATIC.aliquotProbId+'.cnv.calls.png').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cnv.calls.png"] [class="ant-table-cell"]`).eq(1).contains('CNVVIS').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cnv.calls.png"] [class="ant-table-cell"]`).eq(2).contains('PNG').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cnv.calls.png"] [class="ant-table-cell"]`).eq(3).contains(presc_SOMATIC.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cnv.calls.png"] [class="ant-table-cell"]`).eq(4).contains('333.66 KB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cnv.calls.png"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.cnv.calls.png"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.coverage_by_gene.GENCODE_CODING_CANONICAL.csv"] [class="ant-table-cell"]`).eq(0).contains(presc_SOMATIC.aliquotProbId+'.coverage_by_gene.GENCODE_CODING_CANONICAL.csv').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.coverage_by_gene.GENCODE_CODING_CANONICAL.csv"] [class="ant-table-cell"]`).eq(1).contains('COVGENE').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.coverage_by_gene.GENCODE_CODING_CANONICAL.csv"] [class="ant-table-cell"]`).eq(2).contains('CSV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.coverage_by_gene.GENCODE_CODING_CANONICAL.csv"] [class="ant-table-cell"]`).eq(3).contains(presc_SOMATIC.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.coverage_by_gene.GENCODE_CODING_CANONICAL.csv"] [class="ant-table-cell"]`).eq(4).contains('2.52 MB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.coverage_by_gene.GENCODE_CODING_CANONICAL.csv"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.coverage_by_gene.GENCODE_CODING_CANONICAL.csv"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.QC_report.json"] [class="ant-table-cell"]`).eq(0).contains(presc_SOMATIC.aliquotProbId+'.QC_report.json').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.QC_report.json"] [class="ant-table-cell"]`).eq(1).contains('QCRUN').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.QC_report.json"] [class="ant-table-cell"]`).eq(2).contains('JSON').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.QC_report.json"] [class="ant-table-cell"]`).eq(3).contains(presc_SOMATIC.sampleProbId).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.QC_report.json"] [class="ant-table-cell"]`).eq(4).contains('8 KB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.QC_report.json"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="${presc_SOMATIC.aliquotProbId}.QC_report.json"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
  });
  
  it('Panneau Analyses connexes', () => {
    setupTest();
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"]').contains('Aucune donnée disponible').should('exist');
  });
});
