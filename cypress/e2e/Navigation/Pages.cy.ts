/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

let epCHUSJ_ldmCHUSJ: any;

describe('Affichage de toutes les pages et modals', () => {

  beforeEach(() => {
    epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  });

  it('Accueil', () => {
    cy.visit('/');
    cy.waitWhileSpin(oneMinute);
    cy.contains('Rechercher une prescription').should('exist');
    cy.contains('Rechercher par numéro de prescription, requête, échantillon, dossier, numéro de patient et numéro de lot:').should('exist');
    cy.contains('Rechercher un variant').should('exist');
    cy.contains('Rechercher par locus, dbSNP, ClinVar:').should('exist');
    cy.get('[data-cy="ZeppelinLink"]').should('have.attr', 'href', Cypress.env('zeppelin_URL'));
    cy.get('[data-cy="FhirLink"]').should('have.attr', 'href', Cypress.env('fhir_URL'));

    // Page Prescriptions - Onglet Prescriptions
    cy.get('[data-cy="HeaderLinkPrescriptions"]').clickAndWait();
    cy.contains('Rechercher par numéro de prescription, requête, échantillon, dossier, numéro de patient et numéro de lot:').should('exist');

    // Page Prescriptions - Onglet Requêtes
    cy.get('div[id*="tab-requests"]').clickAndWait({force: true});
    cy.contains('Rechercher par numéro de prescription, requête, échantillon, dossier, numéro de patient et numéro de lot:').should('exist');
    
    // Page Archives
    cy.get('[data-cy="HeaderLinkArchives"]').clickAndWait();
    cy.contains('Archives').should('exist');
    cy.contains('Rechercher').should('exist');
    cy.contains('Entrez une valeur dans la barre de recherche').should('exist');
    
    // Page Variants
    cy.get('[data-cy="HeaderLinkVariants"]').clickAndWait();
    cy.contains('Banque de variants du RQDM').should('exist');
    cy.contains('Patient').should('exist');
    cy.contains('Variant').should('exist');
    cy.contains('Gène').should('exist');
    cy.contains('Fréquence').should('exist');
    cy.contains('Pathogénicité').should('exist');
    cy.contains('Filtre sans titre').should('exist');
    cy.contains('Mes filtres').should('exist');
    cy.contains('Utiliser les filtres pour créer une requête').should('exist');
  });
 
  it('Prescription', () => {
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);

    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    cy.contains('Détails').should('exist');
    cy.contains('CQ').should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    cy.contains('Analyse').should('exist');
    cy.contains('Identifiant').should('exist');
    cy.contains('Statut').should('exist');
    cy.contains('Approuvée').should('exist');
    cy.contains('Analyse demandée').should('exist');
    cy.contains('Panel en réflexe').should('exist');
    cy.contains('Créée le').should('exist');
    cy.contains('Médecin prescripteur').should('exist');
    cy.contains('Établissement prescripteur').should('exist');
    cy.contains('LDM').should('exist');
    cy.contains('Patient').should('exist');
    cy.contains('Dossier').should('exist');
    cy.contains('RAMQ').should('exist');
    cy.contains('Nom').should('exist');
    cy.contains('Date de naissance').should('exist');
    cy.contains('Sexe').should('exist');
    cy.contains('Information clinique').should('exist');
    cy.contains('Historique familiale').should('exist');
    cy.contains('Présence de consanguinité').should('exist');
    cy.contains('Ethnicité').should('exist');
    cy.contains('Hypothèse diagnostique').should('exist');
    cy.contains('Requête').should('exist');
    cy.contains('Statut').should('exist');
    cy.contains('Créée le').should('exist');
    cy.contains('Requérant').should('exist');
    cy.contains('Échantillon').should('exist');
    cy.contains('Liens').should('exist');
    cy.contains('Complétée').should('exist');
    cy.contains('Fichiers').should('exist');
    cy.contains('Type').should('exist');
    cy.contains('Mère').should('exist');
    cy.contains('Père').should('exist');
    cy.contains('Statut').should('exist');
  });
 
  it('Analyse bioinformatique', () => {
    cy.visitBioinformaticsAnalysisPage(epCHUSJ_ldmCHUSJ.bioAnalProbId);

    cy.contains('Analyse bioinformatique : '+epCHUSJ_ldmCHUSJ.bioAnalProbId).should('exist');
    cy.contains('ID').should('exist');
    cy.contains('Type d\'analyse').should('exist');
    cy.contains('Date').should('exist');
    cy.contains('Requête').should('exist');
    cy.contains('Patient').should('exist');
    cy.contains('Requérant (LDM)').should('exist');
    cy.contains('Effectuée par').should('exist');
    cy.contains('Pipeline bioinformatique').should('exist');
    cy.contains('Version').should('exist');
    cy.contains('Génome').should('exist');
    cy.contains('Séquençage').should('exist');
    cy.contains('Stratégie expérimentale').should('exist');
    cy.contains('Protocole').should('exist');
    cy.contains('Nom du lot').should('exist');
    cy.contains('Alias du lot').should('exist');
    cy.contains('Plateforme').should('exist');
    cy.contains('Kit de capture').should('exist');
    cy.contains('Séquenceur').should('exist');
    cy.contains('Aliquot').should('exist');
    cy.contains('Échantillons').should('exist');
    cy.contains('Échantillon (LDM)').should('exist');
    cy.contains('Type d’échantillon').should('exist');
    cy.contains('Spécimen (LDM)').should('exist');
    cy.contains('Type de spécimen').should('exist');
    cy.contains('Tissue').should('exist');
    cy.contains('Fichiers de données').should('exist');
    cy.contains('Format').should('exist');
    cy.contains('Taille').should('exist');
    cy.contains('URL').should('exist');
    cy.contains('Hash').should('exist');
  });
 
  it('Rapports CQ d\'un patient', () => {
    cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);

    // Rapport général
    cy.contains('Détails').should('exist');
    cy.contains('CQ').should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    cy.contains('Requête :').should('exist');
    cy.contains('Cas-index ('+epCHUSJ_ldmCHUSJ.requestProbId+')').should('exist');
    cy.contains('Général').should('exist');
    cy.contains('Couverture génique').should('exist');
    cy.contains('Dragen Capture Coverage Metrics').should('exist');
    cy.contains('Dragen Mapping Metrics').should('exist');
    cy.contains('Picard Collect Hs Metrics').should('exist');
    cy.contains('Télécharger le rapport').should('exist');

    // Couverture génique
    cy.get('[data-cy="RadioButton_CouvertureGenique"]').clickAndWait({force: true});
    cy.contains('Détails').should('exist');
    cy.contains('CQ').should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    cy.contains('Requête :').should('exist');
    cy.contains('Cas-index ('+epCHUSJ_ldmCHUSJ.requestProbId+')').should('exist');
    cy.contains('Général').should('exist');
    cy.contains('Couverture génique').should('exist');
    cy.contains('Gène').should('exist');
    cy.contains('Panel').should('exist');
    cy.contains('Télécharger le rapport').should('exist');
    cy.contains('200 / écran').should('exist');
  });
 
  it('Variants d\'un patient', () => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

    cy.contains('Détails').should('exist');
    cy.contains('CQ').should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    cy.contains('Requête :').should('exist');
    cy.contains('Cas-index ('+epCHUSJ_ldmCHUSJ.requestProbId+')').should('exist');
    cy.contains('SNV').should('exist');
    cy.contains('CNV').should('exist');
    cy.contains('Panel RQDM').should('exist');
    cy.contains('Variant').should('exist');
    cy.contains('Gène').should('exist');
    cy.contains('Fréquence').should('exist');
    cy.contains('Pathogénicité').should('exist');
    cy.contains('Occurrence').should('exist');
    cy.contains('Filtre sans titre').should('exist');
    cy.contains('Mes filtres').should('exist');
    cy.contains('Utiliser les filtres pour créer une requête').should('exist');

    // Téléverser une liste de gènes
    cy.get('[data-cy="SidebarMenuItem_Gène"]').clickAndWait({force: true});
    cy.get('button[class*="UploadIdsButton"]').clickAndWait({force: true});
    cy.contains('Téléverser une liste de gènes').should('exist');
    cy.contains('Copier-coller une liste d\'identifiants ou téléverser un fichier').should('exist');
    cy.contains('Téléverser un fichier').should('exist');
    cy.contains('Annuler').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Enregistrer le filtre
    cy.get('[class*="Header_QBHActionContainer"] button').clickAndWait({force: true});
    cy.contains('Sauvegarder ce filtre').should('exist');
    cy.contains('Nom du filtre').should('exist');
    cy.contains('Annuler').should('exist');
    cy.contains('Sauvegarder').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Gérer les filtres
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
    cy.get('[data-menu-id*="manage-my-filters"]').clickAndWait({force: true});
    cy.contains('Gérer les filtres').should('exist');
    cy.contains('Fermer').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('CNVs d\'un patient', () => {
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

    cy.contains('Détails').should('exist');
    cy.contains('CQ').should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    cy.contains('Requête :').should('exist');
    cy.contains('Cas-index ('+epCHUSJ_ldmCHUSJ.requestProbId+')').should('exist');
    cy.contains('SNV').should('exist');
    cy.contains('CNV').should('exist');
    cy.contains('Panel RQDM').should('exist');
    cy.contains('Variant').should('exist');
    cy.contains('Gène').should('exist');
    cy.contains('Occurrence').should('exist');
    cy.contains('Filtre sans titre').should('exist');
    cy.contains('Mes filtres').should('exist');
    cy.contains('Utiliser les filtres pour créer une requête').should('exist');

    // Liste des gènes chevauchants
    cy.get('[data-cy="openGenesModal_LOSS:chr1:9823628-9823687"]').clickAndWait({force: true});
    cy.contains('Liste des gènes chevauchants le CNV').should('exist');
    cy.contains('Gène').should('exist');
    cy.contains('Panel').should('exist');
    cy.contains('Longueur du gène').should('exist');
    cy.contains('Chevauchement avec le CNV').should('exist');
    cy.contains('# Bases').should('exist');
    cy.contains('# Exons').should('exist');
    cy.contains('% Gène').should('exist');
    cy.contains('% CNV').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Variant', () => {
    cy.visitVariantEntityPage('10-1096268-T-C', 3);

    cy.contains('chr10:g.1096268T>C').should('exist');
    cy.contains('GERMLINE').should('exist');
    cy.contains('HIGH').should('exist');
    cy.contains('Benign').should('exist');
    cy.contains('Résumé').should('exist');
    cy.contains('Chromosome :').should('exist');
    cy.contains('Position :').should('exist');
    cy.contains('Allèle ALT :').should('exist');
    cy.contains('Allèle REF :').should('exist');
    cy.contains('Type').should('exist');
    cy.contains('Cytobande').should('exist');
    cy.contains('Génome de référence').should('exist');
    cy.contains('ClinVar').should('exist');
    cy.contains('dbSNP').should('exist');
    cy.contains('Fréquence allélique').should('exist');
    cy.contains('Date d’annotation').should('exist');
    cy.contains('Conséquences géniques').should('exist');
    cy.contains('AA').should('exist');
    cy.contains('ADN codant').should('exist');
    cy.contains('VEP').should('exist');
    cy.contains('Prédiction').should('exist');
    cy.contains('Conservation').should('exist');
    cy.contains('Ensembl ID').should('exist');
    cy.contains('RefSeq ID').should('exist');
    cy.contains('Fréquences').should('exist');
    cy.contains('Cohortes du RQDM').should('exist');
    cy.contains('Analyse').should('exist');
    cy.contains('Tous les patients').should('exist');
    cy.contains('Patients atteints').should('exist');
    cy.contains('Patients non atteints').should('exist');
    cy.contains('Fréquence').should('exist');
    cy.contains('Homo').should('exist');
    cy.contains('Cohortes publiques').should('exist');
    cy.contains('# Allèles ALT').should('exist');
    cy.contains('# Allèles (ALT + REF)').should('exist');
    cy.contains('# Homozygotes').should('exist');
    cy.contains('Fréquence').should('exist');
    cy.contains('TopMed').should('exist');
    cy.contains('gnomAD Genome (v4)').should('exist');
    cy.contains('gnomAD Genome (v3)').should('exist');
    cy.contains('gnomAD Genome (v2.1.1)').should('exist');
    cy.contains('gnomAD Exome (v2.1.1)').should('exist');
    cy.contains('1000 Genomes').should('exist');
    cy.contains('Associations cliniques').should('exist');
    cy.contains('Interprétation').should('exist');
    cy.contains('Gène - Phénotype').should('exist');
    cy.contains('Source').should('exist');
    cy.contains('Conditions').should('exist');
    cy.contains('Héritages').should('exist');

    // Onglet Patient
    cy.get('div[id*="rc-tabs-0-tab-patients"]').clickAndWait({force: true});
    cy.contains('chr10:g.1096268T>C').should('exist');
    cy.contains('GERMLINE').should('exist');
    cy.contains('HIGH').should('exist');
    cy.contains('Benign').should('exist');
    cy.contains('Résumé').should('exist');
    cy.contains('Patients').should('exist');
    cy.contains('Sexe').should('exist');
    cy.contains('Analyse').should('exist');
    cy.contains(/^Filtre$/).should('exist');
    cy.contains('Requête').should('exist');
    cy.contains('Analyse').should('exist');
    cy.contains('Sexe').should('exist');
    cy.contains('Statut').should('exist');
    cy.contains('Filtre').should('exist');
    cy.contains('QP').should('exist');
    cy.contains('ALT').should('exist');
    cy.contains('ALT+REF').should('exist');
    cy.contains('ALT/(ALT+REF)').should('exist');
    cy.contains('QG').should('exist');
  });
});
