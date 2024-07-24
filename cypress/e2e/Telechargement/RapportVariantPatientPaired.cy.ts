/// <reference types="cypress"/>
import { Replacement } from '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();
let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);
});

describe('Télécharger le rapport d\'un variant d\'un patient (paired)', () => {
  beforeEach(() => {
    cy.get('div[role="tabpanel"]').find('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"]').find('button[class*="ant-dropdown-trigger"]').clickAndWait({force: true});
    cy.get('[data-menu-id*="downloadReport"]').clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName(`${presc_PAIRED.patientProbId}_${presc_PAIRED.requestProbId.TEBA}_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: presc_PAIRED.requestProbId.TEBA },
      { placeholder: '{{sampleProbId}}', value: presc_PAIRED.sampleProbId.TEBA },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatientPaired.json', replacements);
  });
});

describe('Télécharger le rapport d\'un variant d\'un patient du tiroir (paired)', () => {
  beforeEach(() => {
    cy.get('[data-cy="drawerCb_chr10:g.17617338A>C"]').clickAndWait({force: true});
    cy.get('[class="ant-drawer-content-wrapper"] button[class*="ant-btn-default"]').clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName(`${presc_PAIRED.patientProbId}_${presc_PAIRED.requestProbId.TEBA}_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: presc_PAIRED.requestProbId.TEBA },
      { placeholder: '{{sampleProbId}}', value: presc_PAIRED.sampleProbId.TEBA },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatientPaired.json', replacements);
  });
});