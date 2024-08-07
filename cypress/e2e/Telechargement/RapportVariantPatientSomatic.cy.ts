/// <reference types="cypress"/>
import { Replacement } from '../../support/commands';
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();
let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
});

describe('Télécharger le rapport d\'un variant d\'un patient (somatic)', () => {
  beforeEach(() => {
    cy.get('div[role="tabpanel"]').find('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.get('[data-menu-id*="downloadReport"]').click({force: true});
    cy.waitUntilFile(60*1000);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName(`${presc_SOMATIC.patientProbId}_${presc_SOMATIC.requestProbId}_rs10794716_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: presc_SOMATIC.requestProbId },
      { placeholder: '{{sampleProbId}}', value: presc_SOMATIC.sampleProbId },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatientSomatic.json', replacements);
  });
});

describe('Télécharger le rapport d\'un variant d\'un patient du tiroir (somatic)', () => {
  beforeEach(() => {
    cy.get('[data-cy="drawerCb_chr10:g.1096268T>C"]').click({force: true});
    cy.get('[class="ant-drawer-content-wrapper"] button[class*="ant-btn-default"]').click({force: true});
    cy.waitUntilFile(60*1000);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName(`${presc_SOMATIC.patientProbId}_${presc_SOMATIC.requestProbId}_rs10794716_${strDate}*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestProbId}}', value: presc_SOMATIC.requestProbId },
      { placeholder: '{{sampleProbId}}', value: presc_SOMATIC.sampleProbId },
    ];
    cy.validateXlsxFileContent('DownloadVariantPatientSomatic.json', replacements);
  });
});