/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des prescriptions et requêtes - Filtrer avec l\'url', () => {
  it('Priorité - ASAP', () => {
    cy.visitPrescriptionsPage('?priority=asap');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Priorité_asap"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 1);
  });

  it('Priorité - 2 valeurs', () => {
    cy.visitPrescriptionsPage('?priority=asap&priority=routine');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Priorité_asap"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Priorité_routine"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 2);
  });
  
  it('Analyse - Congenital Myopathies (MYOC)', () => {
    cy.visitPrescriptionsPage('?analysis_code=myoc');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Analyse_MYOC"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 1);
  });
  
  it('Projet de recherche - Care4Rare-Expand', () => {
    cy.visitPrescriptionsPage('?project_code=Care4Rare-Expand');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Projet de recherche_Care4Rare-Expand"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 1);
  });
  
  it('Analyse - 2 valeurs', () => {
    cy.visitPrescriptionsPage('?analysis_code=myoc&analysis_code=rgdi');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Analyse_MYOC"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Analyse_RGDI"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 2);
  });

  it('Bioinfo - TN', () => {
    cy.visitPrescriptionsPage('?tasks=tneba');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Bioinfo_TNEBA"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 1);
  });

  it('Bioinfo - 2 valeurs', () => {
    cy.visitPrescriptionsPage('?tasks=tneba&tasks=geba');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Bioinfo_TNEBA"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Bioinfo_GEBA"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 2);
  });

  it('Statut des prescriptions - Approuvée', () => {
    cy.visitPrescriptionsPage('?status=active');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Statut des prescriptions_active"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 1);
  });

  it('Statut des prescriptions - 2 valeurs', () => {
    cy.visitPrescriptionsPage('?status=active&status=on-hold');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Statut des prescriptions_active"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Statut des prescriptions_on-hold"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 2);
  });
  
  it('Statut des requêtes - Complétée', () => {
    cy.visitPrescriptionsPage('?sequencing_requests__status=completed');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Statut des requêtes_completed"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 1);
  });
  
  it('Statut des requêtes - 2 valeurs', () => {
    cy.visitPrescriptionsPage('?sequencing_requests__status=completed&sequencing_requests__status=on-hold');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Statut des requêtes_completed"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Statut des requêtes_on-hold"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 2);
  });
  
  it('Laboratoire (LDM) - LDM-CHUSJ', () => {
    cy.visitPrescriptionsPage('?ldm=ldm-chusj');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Laboratoire (LDM)_LDM-CHUSJ"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 1);
  });
  
  it('Laboratoire (LDM) - 2 valeurs', () => {
    cy.visitPrescriptionsPage('?ldm=ldm-chusj&ldm=ldm-chus');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Laboratoire (LDM)_LDM-CHUSJ"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Laboratoire (LDM)_LDM-CHUS"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 2);
  });
  
  it('Établissement prescripteur - CHUSJ', () => {
    cy.visitPrescriptionsPage('?ep=chusj');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Établissement prescripteur_CHUSJ"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 1);
  });
  
  it('Établissement prescripteur - 2 valeurs', () => {
    cy.visitPrescriptionsPage('?ep=chusj&ep=chus');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Établissement prescripteur_CHUSJ"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Établissement prescripteur_CHUS"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 2);
  });
  
  it('Prénatal - False', () => {
    cy.visitPrescriptionsPage('?prenatal=false');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', '');
    cy.get('[class*="ant-checkbox-checked"] [data-cy="Checkbox_Prénatal_false"]').should('exist');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 1);
  });
  
  it('Recherche - mrn-283773', () => {
    cy.visitPrescriptionsPage('?s=mrn-283773');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', 'mrn-283773');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').should('not.exist');
  });
  
  it('Recherche - 2 valeurs', () => {
    cy.visitPrescriptionsPage('?s=mrn-283773&s=other');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', 'mrn-283773');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').should('not.exist');
  });
  
  it('Plusieurs paramètres', () => {
    cy.visitPrescriptionsPage('?analysis_code=rgdi&tasks=geba&status=active&sequencing_requests__status=completed&ldm=ldm-chusj&ep=chusj&prenatal=false&s=mrn-283773');

    cy.get('[data-cy="PrescriptionsSearch"]').should('have.attr', 'value', 'mrn-283773');
    cy.get('[class*="ant-checkbox-checked"] [data-cy*="Checkbox"]').its('length').should('eq', 7);
  });
});
