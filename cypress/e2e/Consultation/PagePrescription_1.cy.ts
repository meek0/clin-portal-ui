/// <reference types="cypress"/>
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
});

describe('Page d\'une prescription - Vérifier les informations affichées', () => {
  it('Panneau Analyse', () => {
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(2).contains('Routine').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(3).contains('Approuvée').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(4).contains('Retard global de développement / Déficience intellectuelle (Trio) (RGDI)').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(5).contains('--').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(6).contains(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4)).should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(7).contains(/(--|ALLARD René)/).should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(8).contains('CHUSJ').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(9).contains('LDM-CHUSJ').should('exist');
  });
  
  it('Panneau Patient', () => {
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(1).contains(epCHUSJ_ldmCHUSJ.mrnProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(1).contains('CHUSJ').should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(2).contains(epCHUSJ_ldmCHUSJ.ramqProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.lastNameProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(4).contains(epCHUSJ_ldmCHUSJ.birthdayProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(5).contains(epCHUSJ_ldmCHUSJ.genderProb).should('exist');
  });
  
  it('Panneau Information clinique', () => {
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [class*="ClinicalInformationCard"] [class="ant-descriptions-item-content"]').eq(0).contains('--').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [class*="ClinicalInformationCard"] [class="ant-descriptions-item-content"]').eq(1).contains('--').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [class*="ClinicalInformationCard"] [class="ant-descriptions-item-content"]').eq(2).contains('--').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [class*="ClinicalInformationCard"] [class="ant-descriptions-item-content"]').eq(3).contains('--').should('exist');

    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(0).contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(1).contains('75020').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(2).contains('Complétée').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(3).contains(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4)).should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(4).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(5).contains('Fichiers').should('exist');

    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(0).contains(epCHUSJ_ldmCHUSJ.bioAnalProbId).should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(1).contains('G : Germinale').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(2).contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(3).contains(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4)).should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(4).contains('Fichiers').should('exist');
  });
  
  it('Panneau Mère', () => {
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(1).contains(epCHUSJ_ldmCHUSJ.mrnMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(1).contains('CHUSJ').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(2).contains(epCHUSJ_ldmCHUSJ.ramqMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.lastNameMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.firstNameMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(4).contains(epCHUSJ_ldmCHUSJ.birthdayMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(5).contains('Féminin').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(6).contains(epCHUSJ_ldmCHUSJ.statusMth).should('exist');

    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(0).contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(1).contains('75020').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(2).contains('Complétée').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(3).contains(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4)).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(4).contains(epCHUSJ_ldmCHUSJ.sampleMthId, {matchCase: false}).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(5).contains('Fichiers').should('exist');

    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(0).contains(epCHUSJ_ldmCHUSJ.bioAnalMthId).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(1).contains('G : Germinale').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(2).contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(3).contains(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4)).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(4).contains('Fichiers').should('exist');
  });
  
  it('Panneau Père', () => {
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(1).contains(epCHUSJ_ldmCHUSJ.mrnFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(1).contains('CHUSJ').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(2).contains(epCHUSJ_ldmCHUSJ.ramqFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.lastNameFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.firstNameFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(4).contains(epCHUSJ_ldmCHUSJ.birthdayFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(5).contains('Masculin').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(6).contains(epCHUSJ_ldmCHUSJ.statusFth).should('exist');
    
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(0).contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(1).contains('75020').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(2).contains('Complétée').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(3).contains(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4)).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(4).contains(epCHUSJ_ldmCHUSJ.sampleFthId).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(0).find('[class*="ant-table-cell"]').eq(5).contains('Fichiers').should('exist');

    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(0).contains(epCHUSJ_ldmCHUSJ.bioAnalFthId).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(1).contains('G : Germinale').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(2).contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(3).contains(epCHUSJ_ldmCHUSJ.stampDate.substring(0, 4)).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"]').eq(1).find('[class="ant-table-cell"]').eq(4).contains('Fichiers').should('exist');
  });
});
