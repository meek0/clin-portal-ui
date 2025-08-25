/// <reference types="cypress"/>
import { CommonSelectors } from '../shared/Selectors';
import { CommonTexts } from '../shared/Texts';
import { Replacement } from '../shared/Types';
import {
  getDateTime,
  getUrlLink,
  isFerlease,
  scientificToDecimal,
  stringToRegExp,
} from '../shared/Utils';
import { getColumnName, getColumnPosition } from '../shared/Utils';
import { oneMinute } from '../shared/Utils';

const selectorHead = CommonSelectors.tableHead;
const selectors = {
  downloadButton: `div[id="content"] ${CommonSelectors.downloadIcon}`,
  pageTitle: '[class*="Header_contentHeader"]',
  proTableHeader: '[class*="Header_ProTableHeader"]',
  tableCell: (dataVariant: any) => `[data-row-key="${dataVariant.dataRowKey}"] td`,
  tableHeadCell: `${selectorHead} ${CommonSelectors.tableCell}`,
};

const tableColumns = [
  {
    id: 'flag',
    name: '[data-icon="flag"]',
    isVisibleByDefault: true,
    isSortable: false,
    position: 2,
    tooltip: 'Identifiez les éléments importants à l’aide de drapeaux',
  },
  {
    id: 'note',
    name: '[data-icon="message"]',
    isVisibleByDefault: true,
    isSortable: false,
    position: 3,
    tooltip: 'Note',
  },
  {
    id: 'interpretation',
    name: '[data-icon="thunderbolt"]',
    isVisibleByDefault: true,
    isSortable: false,
    position: 4,
    tooltip: 'Interprétation clinique',
  },
  {
    id: 'variant',
    name: 'Variant',
    isVisibleByDefault: true,
    isSortable: true,
    position: 5,
    tooltip: null,
  },
  {
    id: 'type',
    name: 'Type',
    isVisibleByDefault: true,
    isSortable: true,
    position: 6,
    tooltip: null,
  },
  {
    id: 'dbsnp',
    name: 'dbSNP',
    isVisibleByDefault: true,
    isSortable: false,
    position: 7,
    tooltip: null,
  },
  {
    id: 'gene',
    name: 'Gène',
    isVisibleByDefault: true,
    isSortable: true,
    position: 8,
    tooltip: null,
  },
  {
    id: 'consequence',
    name: 'Conséquence',
    isVisibleByDefault: true,
    isSortable: false,
    position: 9,
    tooltip: 'Conséquence la plus délétère',
  },
  {
    id: 'mane',
    name: 'MANE',
    isVisibleByDefault: true,
    isSortable: false,
    position: 10,
    tooltip: null,
  },
  {
    id: 'omim',
    name: 'OMIM',
    isVisibleByDefault: true,
    isSortable: false,
    position: 11,
    tooltip: 'Modes de transmission MIM',
  },
  {
    id: 'clinvar',
    name: 'ClinVar',
    isVisibleByDefault: true,
    isSortable: false,
    position: 12,
    tooltip: null,
  },
  {
    id: 'franklin',
    name: 'Fra.',
    isVisibleByDefault: true,
    isSortable: true,
    position: 13,
    tooltip:
      'Score Franklin calculé en fonction des caractéristiques du variant et des phénotypes du patient',
  },
  {
    id: 'exomiser',
    name: 'Exo.',
    isVisibleByDefault: true,
    isSortable: true,
    position: 14,
    tooltip:
      'Score Exomiser calculé en fonction des caractéristiques du variant et des phénotypes du patient',
  },
  {
    id: 'acmg_franklin',
    name: 'ACMG F.',
    isVisibleByDefault: true,
    isSortable: true,
    position: 15,
    tooltip: 'ACMG de Franklin',
  },
  {
    id: 'acmg_exomiser',
    name: 'ACMG E.',
    isVisibleByDefault: true,
    isSortable: true,
    position: 16,
    tooltip: 'ACMG de Exomiser',
  },
  {
    id: 'gnomad',
    name: 'gnomAD',
    isVisibleByDefault: true,
    isSortable: true,
    position: 17,
    tooltip: 'gnomAD Joint 4.1.0 (fréquence)',
  },
  {
    id: 'gnomad_alt',
    name: 'gnomAD ALT',
    isVisibleByDefault: true,
    isSortable: true,
    position: 18,
    tooltip: 'gnomAD Joint 4.1.0 (compte)',
  },
  {
    id: 'rqdm',
    name: 'RQDM G',
    isVisibleByDefault: true,
    isSortable: true,
    position: 19,
    tooltip:
      'Nombre d’exomes germinaux comportant ce variant. Seules les occurrences rencontrant les critères Filtre = PASS et QG ≥ 20 sont considérées pour le calcul des fréquences.',
  },
  {
    id: 'qg',
    name: 'QG',
    isVisibleByDefault: true,
    isSortable: true,
    position: 20,
    tooltip:
      'Qualité du génotype : seules les occurrences rencontrant le critère QG ≥ 20 sont considérées pour le calcul des fréquences',
  },
  {
    id: 'cnvs',
    name: '# CNVs',
    isVisibleByDefault: true,
    isSortable: true,
    position: 21,
    tooltip: 'Nombre de CNVs chevauchant le SNV',
  },
  {
    id: 'zygosity',
    name: 'Zyg.',
    isVisibleByDefault: true,
    isSortable: true,
    position: 22,
    tooltip: 'Zygosité',
  },
  {
    id: 'genotypes',
    name: 'M : P',
    isVisibleByDefault: false,
    isSortable: false,
    position: 23,
    tooltip: 'Génotypes (M : P)',
  },
  {
    id: 'hc',
    name: 'HC',
    isVisibleByDefault: false,
    isSortable: false,
    position: 24,
    tooltip:
      'Hétérozygote composé : seuls les variants dont les occurrences rencontrant les critères QG ≥ 20, gnomAD 4 (fréquence allélique) ≤ 0.01 et Profondeur allélique ALT > 2 sont considérées',
  },
  {
    id: 'hcp',
    name: 'HCP',
    isVisibleByDefault: false,
    isSortable: false,
    position: 25,
    tooltip:
      'Hétérozygote composé potentiel : seuls les variants dont les occurrences rencontrant les critères QG ≥ 20, gnomAD 4 (fréquence allélique) ≤ 0.01 et Profondeur allélique ALT > 2 sont considérées',
  },
  {
    id: 'transmission',
    name: 'Trans.',
    isVisibleByDefault: false,
    isSortable: true,
    position: 26,
    tooltip: 'Transmission',
  },
  {
    id: 'qp',
    name: 'QP',
    isVisibleByDefault: false,
    isSortable: true,
    position: 27,
    tooltip: 'Qualité de profondeur',
  },
  {
    id: 'op',
    name: 'OP',
    isVisibleByDefault: false,
    isSortable: true,
    position: 28,
    tooltip: 'Origine parentale',
  },
  {
    id: 'a',
    name: 'A',
    isVisibleByDefault: false,
    isSortable: true,
    position: 29,
    tooltip: 'Profondeur allélique (ALT)',
  },
  {
    id: 'a_r',
    name: 'A+R',
    isVisibleByDefault: false,
    isSortable: true,
    position: 30,
    tooltip: 'Profondeur totale (ALT+REF)',
  },
  {
    id: 'a_ratio',
    name: 'A/(A+R)',
    isVisibleByDefault: false,
    isSortable: true,
    position: 31,
    tooltip: 'Ratio allélique ALT/(ALT+REF)',
  },
  {
    id: 'filter',
    name: 'Filtre',
    isVisibleByDefault: false,
    isSortable: true,
    position: 32,
    tooltip: 'Filtre',
  },
  {
    id: 'criteria_exomiser',
    name: 'Crit. Exo.',
    isVisibleByDefault: false,
    isSortable: false,
    position: 33,
    tooltip: 'Critères ACMG de Exomiser',
  },
  {
    id: 'cmc',
    name: 'CMC',
    isVisibleByDefault: false,
    isSortable: true,
    position: 34,
    tooltip: 'Nombre d’échantillons dans COSMIC avec cette mutation suivi de son ratio',
  },
  {
    id: 'tier',
    name: 'Tier',
    isVisibleByDefault: false,
    isSortable: true,
    position: 35,
    tooltip:
      'CMC tier. Signification de la mutation. 1 - haute signification, 2 - signification moyenne, 3 - faible signification, Other - Pas de signification prédite (autres mutations)',
  },
  {
    id: 'cadd',
    name: 'CADD',
    isVisibleByDefault: false,
    isSortable: false,
    position: 36,
    tooltip: 'CADD (Phred)',
  },
  {
    id: 'revel',
    name: 'REVEL',
    isVisibleByDefault: false,
    isSortable: false,
    position: 37,
    tooltip: null,
  },
  {
    id: 'criteria_franklin',
    name: 'Crit. Fra.',
    isVisibleByDefault: false,
    isSortable: false,
    position: 38,
    tooltip: 'Critères ACMG de Franklin',
  },
];

export const VariantsPatientTable = {
  actions: {
    /**
     * Clicks the download button and waits for the file to be available.
     */
    clickDownloadButton() {
      cy.get(selectors.downloadButton).eq(1).clickAndWait({ force: true });
      cy.waitUntilFile(oneMinute);
    },
    /**
     * Clicks the link in a specific table cell for a given variant and column.
     * @param dataVariant The variant object.
     * @param columnID The ID of the column.
     * @param onPlusIcon Click on the plus icon (default: false).
     */
    clickTableCellLink(dataVariant: any, columnID: string, onPlusIcon: boolean = false) {
      cy.then(() =>
        getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) {
            // -1 position can only occur in a Ferlease
            switch (columnID) {
              case 'variant':
                cy.get(selectors.tableCell(dataVariant))
                  .contains(dataVariant.variant)
                  .invoke('removeAttr', 'target')
                  .clickAndWait({ force: true });
                break;
              case 'gene':
                if (onPlusIcon) {
                  cy.get(selectors.tableCell(dataVariant))
                    .eq(position)
                    .find('[data-icon="plus"]')
                    .clickAndWait({ force: true });
                } else {
                  cy.get(selectors.tableCell(dataVariant))
                    .eq(position)
                    .find(CommonSelectors.link)
                    .clickAndWait({ force: true });
                }
                break;
              default:
                cy.get(selectors.tableCell(dataVariant))
                  .eq(position)
                  .find(CommonSelectors.link)
                  .clickAndWait({ force: true });
                break;
            }
          }
        }),
      );
    },
    /**
     * Hides a specific column in the table.
     * @param columnID The ID of the column to hide.
     */
    hideColumn(columnID: string) {
      cy.hideColumn(getColumnName(tableColumns, columnID));
    },
    /**
     * Check a specific row in the table.
     * @param dataVariant The variant object containing the data-row-key to check.
     */
    checkRow(dataVariant: any) {
      cy.get(`tr[data-row-key="${dataVariant.dataRowKey}"] ${CommonSelectors.checkbox}`).check({
        force: true,
      });
    },
    /**
     * Shows all columns in the table.
     */
    showAllColumns() {
      tableColumns.forEach((column) => {
        if (!column.isVisibleByDefault) {
          cy.showColumn(stringToRegExp(column.name, true /*exact*/), 0);
        }
      });
    },
    /**
     * Shows a specific column in the table.
     * @param columnID The ID of the column to show.
     */
    showColumn(columnID: string) {
      cy.showColumn(stringToRegExp(getColumnName(tableColumns, columnID), true /*exact*/), 0);
    },
    /**
     * Sorts a column, optionally using an intercept.
     * @param columnID The ID of the column to sort.
     * @param needIntercept Whether to use an intercept (default: true).
     */
    sortColumn(columnID: string, needIntercept: boolean = true) {
      const columnName = getColumnName(tableColumns, columnID);
      const strORregexpColumnName = columnName.startsWith('[')
        ? columnName
        : stringToRegExp(columnName, true /*exact*/);
      if (needIntercept) {
        cy.sortTableAndIntercept(strORregexpColumnName, 1);
      } else {
        cy.sortTableAndWait(strORregexpColumnName);
      }
    },
  },

  validations: {
    /**
     * Checks that a specific column is displayed.
     * @param columnID The ID of the column to check.
     */
    shouldDisplayColumn(columnID: string) {
      cy.get(selectorHead).contains(getColumnName(tableColumns, columnID)).should('exist');
    },
    /**
     * Validates the content of the exported file.
     * @param dataVariant The variant object containing the expected values.
     */
    shouldHaveExportedFileContent(dataVariant: any) {
      const replacements: Replacement[] = [
        { placeholder: '{{variant}}', value: dataVariant.variant },
        { placeholder: '{{type}}', value: dataVariant.type },
        { placeholder: '{{dbsnp}}', value: dataVariant.dbsnp },
        { placeholder: '{{gene}}', value: dataVariant.gene },
        {
          placeholder: '{{consequence}}',
          value: dataVariant.consequence.replace('Missense', 'Missense '),
        },
        { placeholder: '{{maneC}}', value: dataVariant.maneC ? 'Ensembl Canonical' : '' },
        { placeholder: '{{maneM}}', value: dataVariant.maneM ? 'MANE Select' : '' },
        { placeholder: '{{maneP}}', value: dataVariant.maneP ? 'MANE Plus' : '' },
        { placeholder: '{{omim}}', value: dataVariant.omim },
        { placeholder: '{{clinvar}}', value: dataVariant.clinvar.join(',') },
        { placeholder: '{{franklin}}', value: dataVariant.franklin },
        { placeholder: '{{exomiser}}', value: dataVariant.exomiser },
        { placeholder: '{{acmg_franklin}}', value: dataVariant.acmg_franklin },
        { placeholder: '{{acmg_exomiser}}', value: dataVariant.acmg_exomiser },
        { placeholder: '{{gnomad}}', value: dataVariant.gnomad },
        { placeholder: '{{gnomad_alt}}', value: dataVariant.gnomad_alt },
        { placeholder: '{{rqdmP}}', value: dataVariant.rqdmP },
        { placeholder: '{{rqdmF}}', value: dataVariant.rqdmF },
        { placeholder: '{{qg}}', value: dataVariant.qg },
        { placeholder: '{{cnvs}}', value: dataVariant.cnvs },
        { placeholder: '{{zygosity}}', value: dataVariant.zygosity },
        { placeholder: '{{genotypes}}', value: dataVariant.genotypes },
        { placeholder: '{{hc}}', value: dataVariant.hc },
        { placeholder: '{{hcp}}', value: dataVariant.hcp },
        { placeholder: '{{transmission}}', value: dataVariant.transmission },
        { placeholder: '{{qp}}', value: dataVariant.qp },
        { placeholder: '{{op}}', value: dataVariant.op },
        { placeholder: '{{a}}', value: dataVariant.a },
        { placeholder: '{{a_r}}', value: dataVariant.a_r },
        { placeholder: '{{a_ratio}}', value: dataVariant.a_ratio },
        { placeholder: '{{filter}}', value: dataVariant.filter },
        { placeholder: '{{criteria_exomiser}}', value: dataVariant.criteria_exomiser.join(',') },
        { placeholder: '{{cmcP}}', value: dataVariant.cmcP },
        { placeholder: '{{cmcF}}', value: scientificToDecimal(dataVariant.cmcF) },
        { placeholder: '{{tier}}', value: dataVariant.tier },
        { placeholder: '{{cadd}}', value: dataVariant.cadd },
        { placeholder: '{{revel}}', value: dataVariant.revel },
        { placeholder: '{{criteria_franklin}}', value: dataVariant.criteria_franklin },
      ];
      cy.validateFileContent('ExportTableauVariantsPatient.json', replacements);
    },
    /**
     * Validates the headers of the exported file.
     */
    shouldHaveExportedFileHeaders() {
      cy.validateFileHeaders('ExportTableauVariantsPatient.json');
    },
    /**
     * Validates the name of the exported file.
     */
    shouldHaveExportedFileName() {
      const { strDate } = getDateTime();
      cy.validateFileName(`SNV_${strDate}T*.tsv`);
    },
    /**
     * Validates the value of the first row for a given column.
     * @param value The expected value (string or RegExp).
     * @param columnID The ID of the column to check.
     */
    shouldHaveFirstRowValue(value: string | RegExp, columnID: string) {
      cy.then(() =>
        getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) {
            // -1 position can only occur in a Ferlease
            cy.validateTableFirstRow(value, position, true /*hasCheckbox*/);
          }
        }),
      );
    },
    /**
     * Validates the pill in the selected query.
     * @param dataVariant The variant object.
     * @param columnID The ID of the column to check.
     */
    shouldHaveSelectedQueryPill(dataVariant: any, columnID: string) {
      cy.validatePillSelectedQuery(getColumnName(tableColumns, columnID), [dataVariant[columnID]]);
    },
    /**
     * Validates the link in a specific table cell for a given variant and column.
     * @param dataVariant The variant object.
     * @param url The expected url (string or RegExp).
     * @param columnID The ID of the column.
     */
    shouldHaveTableCellLink(dataVariant: any, columnID: string) {
      cy.then(() =>
        getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) {
            // -1 position can only occur in a Ferlease
            cy.get(selectors.tableCell(dataVariant))
              .eq(position)
              .find(CommonSelectors.link)
              .should('have.attr', 'href', getUrlLink(columnID, dataVariant));
          }
        }),
      );
    },
    /**
     * Validates the default visibility of each column.
     */
    shouldMatchDefaultColumnVisibility() {
      tableColumns.forEach((column) => {
        const expectedExist = column.isVisibleByDefault ? 'exist' : 'not.exist';
        if (column.name.startsWith('[')) {
          cy.get(selectorHead).find(column.name).should(expectedExist);
        } else {
          cy.get(selectorHead)
            .contains(stringToRegExp(column.name, true /*exact*/))
            .should(expectedExist);
        }
      });
    },
    /**
     * Checks that a specific column is not displayed.
     * @param columnID The ID of the column to check.
     */
    shouldNotDisplayColumn(columnID: string) {
      cy.get(selectorHead).contains(getColumnName(tableColumns, columnID)).should('not.exist');
    },
    /**
     * Validates that all columns are displayed in the correct order in the table.
     */
    shouldShowAllColumns() {
      VariantsPatientTable.actions.showAllColumns();
      tableColumns.forEach((column) => {
        if (column.name.startsWith('[')) {
          cy.get(selectors.tableHeadCell).eq(column.position).find(column.name).should('exist');
        } else {
          cy.get(selectors.tableHeadCell)
            .eq(column.position)
            .contains(stringToRegExp(column.name, true /*exact*/))
            .should('exist');
        }
      });
    },
    /**
     * Validates the presence of tooltips on columns.
     */
    shouldShowColumnTooltips() {
      VariantsPatientTable.actions.showAllColumns();
      tableColumns.forEach((column) => {
        if (column.tooltip) {
          cy.getColumnHeadCell(column.name).shouldHaveTooltip(column.tooltip);
        }
      });
    },
    /**
     * Checks that the "No Results" message is displayed.
     */
    shouldShowNoResultsMessage() {
      cy.get(selectors.proTableHeader)
        .contains(/^No Results$/)
        .should('exist');
    },
    /**
     * Checks the page title.
     */
    shouldShowPageTitle() {
      cy.get(selectors.pageTitle).contains(CommonTexts.variantsPageTitle).should('exist');
    },
    /**
     * Validates the pagination functionality.
     * @param total The expected total.
     */
    shouldShowPaging(total: string | RegExp) {
      cy.validatePaging(total, 0);
    },
    /**
     * Checks the displayed results count.
     * @param count The expected count (string, number, or RegExp).
     * @param shouldExist Whether the count should exist (default: true).
     */
    shouldShowResultsCount(count: string | number | RegExp, shouldExist: boolean = true) {
      const strPlural = count === '1' ? '' : 's';
      cy.validateTableResultsCount(`${count} Résultat${strPlural}`, shouldExist);
    },
    /**
     * Validates that sortable columns are correctly marked as sortable.
     */
    shouldShowSortableColumns() {
      VariantsPatientTable.actions.showAllColumns();
      tableColumns.forEach((column) => {
        cy.getColumnHeadCell(column.name).shouldBeSortable(column.isSortable);
      });
    },
    /**
     * Validates the content of all columns in the table for a given variant.
     * @param dataVariant The variant object containing the expected values.
     */
    shouldShowTableContent(dataVariant: any) {
      tableColumns.forEach((column) => {
        switch (column.id) {
          case 'flag':
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'FlagDropdown',
            );
            break;
          case 'note':
            cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, 'NoteCell');
            break;
          case 'interpretation':
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'InterpretationCell',
            );
            break;
          case 'dbsnp':
            cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, 'anticon');
            break;
          case 'gene':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.gene,
            );
            cy.validateTableDataRowKeyAttr(
              dataVariant.dataRowKey,
              column.position,
              'data-icon',
              'plus',
            );
            break;
          case 'consequence':
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.consequenceImpact,
            );
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.consequence,
            );
            break;
          case 'mane':
            cy.get(`tr[data-row-key="${dataVariant.dataRowKey}"] td`)
              .eq(column.position)
              .find('path[d*="M16.7732"]')
              .should(dataVariant.maneC ? 'exist' : 'not.exist');
            cy.get(`tr[data-row-key="${dataVariant.dataRowKey}"] td`)
              .eq(column.position)
              .find('path[d*="M8.98279"]')
              .should(dataVariant.maneM ? 'exist' : 'not.exist');
            cy.get(`tr[data-row-key="${dataVariant.dataRowKey}"] td`)
              .eq(column.position)
              .find('path[d*="M10.9335"]')
              .should(dataVariant.maneP ? 'exist' : 'not.exist');
            break;
          case 'omim':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.omim,
            );
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'ant-tag-blue',
            );
            break;
          case 'clinvar':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.clinvar[0],
            );
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.clinvar[1],
            );
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'ant-tag-green',
            );
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'ant-tag-lime',
            );
            break;
          case 'acmg_franklin':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.acmg_franklin,
            );
            cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, 'ant-tag');
            break;
          case 'acmg_exomiser':
            cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, dataVariant.acmg_exomiser);
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'ant-tag-orange',
            );
            break;
          case 'gnomad':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.gnomad,
            );
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'GnomadCell_gnomadIndicator',
            );
            break;
          case 'rqdm':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.rqdmP,
            );
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.rqdmF,
            );
            break;
          case 'qg':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.qg,
            );
            cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, 'GQLine_high');
            break;
          case 'transmission':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.transmission,
            );
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'ant-tag-blue',
            );
            break;
          case 'op':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.op,
            );
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'ant-tag-blue',
            );
            break;
          case 'criteria_exomiser':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.criteria_exomiser[0],
            );
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.criteria_exomiser[1],
            );
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'ant-tag-green',
            );
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'ant-tag-blue',
            );
            break;
          case 'cmc':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.cmcP,
            );
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              `(${dataVariant.cmcF})`,
            );
            break;
          case 'tier':
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant.tier,
            );
            cy.validateTableDataRowKeyClass(
              dataVariant.dataRowKey,
              column.position,
              'ant-tag-default',
            );
            break;
          default:
            cy.validateTableDataRowKeyContent(
              dataVariant.dataRowKey,
              column.position,
              dataVariant[column.id],
            );
            break;
        }
      });
    },
    /**
     * Validates the sorting functionality of a column.
     * @param columnID The ID of the column to sort.
     * @param needIntercept Whether to use an intercept for the sorting action (default: true).
     */
    shouldSortColumn(columnID: string, needIntercept: boolean = true) {
      cy.then(() =>
        getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) {
            // -1 position can only occur in a Ferlease
            switch (columnID) {
              case 'hotspot':
                VariantsPatientTable.actions.sortColumn(columnID, needIntercept);
                VariantsPatientTable.validations.shouldHaveFirstRowValue('-', 'hotspot');
                VariantsPatientTable.actions.sortColumn(columnID, needIntercept);
                cy.get(CommonSelectors.tableRow).eq(0).shouldCheckAndUncheck();
                cy.get(CommonSelectors.tableRow)
                  .eq(0)
                  .find('td')
                  .eq(position)
                  .find('[class*="hotspotFilled"]')
                  .should('exist');
                break;
              default:
                VariantsPatientTable.actions.sortColumn(columnID, needIntercept);
                cy.get(CommonSelectors.tableRow).eq(0).shouldCheckAndUncheck();
                cy.get(CommonSelectors.tableRow)
                  .eq(0)
                  .find('td')
                  .eq(position)
                  .invoke('text')
                  .then((smallestValue) => {
                    const smallest = smallestValue.trim();

                    VariantsPatientTable.actions.sortColumn(columnID);
                    cy.get(CommonSelectors.tableRow).eq(0).shouldCheckAndUncheck();
                    cy.get(CommonSelectors.tableRow)
                      .eq(0)
                      .find('td')
                      .eq(position)
                      .invoke('text')
                      .then((biggestValue) => {
                        const biggest = biggestValue.trim();
                        if (biggest.localeCompare(smallest) < 0) {
                          throw new Error(`Error: "${biggest}" should be >= "${smallest}"`);
                        }
                      });
                  });
                break;
            }
          }
        }),
      );
    },
  },
};
