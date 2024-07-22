/// <reference types="cypress"/>
import { Replacement } from '../../support/commands';
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();
let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
});

describe('Télécharger le rapport d\'un variant d\'un patient', () => {
  beforeEach(() => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.get('[data-menu-id*="downloadReport"]').click({force: true});
    cy.waitUntilFile(60*1000);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName(`${epCHUSJ_ldmCHUSJ.patientProbId}_${epCHUSJ_ldmCHUSJ.requestProbId}_rs138817389_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: epCHUSJ_ldmCHUSJ.requestProbId },
      { placeholder: '{{sampleProbId}}', value: epCHUSJ_ldmCHUSJ.sampleProbId },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatient.json', replacements);
  });
});

describe('Télécharger le rapport d\'un variant d\'un patient du tiroir', () => {
  beforeEach(() => {
    cy.get('[data-cy="drawerCb_chrX:g.123403094G>A"]').click({force: true});
    cy.get('[class="ant-drawer-content-wrapper"] button[class*="ant-btn-default"]').click({force: true});
    cy.waitUntilFile(60*1000);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName(`${epCHUSJ_ldmCHUSJ.patientProbId}_${epCHUSJ_ldmCHUSJ.requestProbId}_rs138817389_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: epCHUSJ_ldmCHUSJ.requestProbId },
      { placeholder: '{{sampleProbId}}', value: epCHUSJ_ldmCHUSJ.sampleProbId },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatient.json', replacements);
  });
});
