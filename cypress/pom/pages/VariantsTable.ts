/// <reference types="cypress"/>
import { CommonSelectors } from '../shared/Selectors';
import { CommonTexts } from '../shared/Texts';
import { getDateTime, getUrlLink, isFerlease, scientificToDecimal, stringToRegExp } from '../shared/Utils';
import { getColumnName, getColumnPosition } from '../shared/Utils';
import { oneMinute } from '../shared/Utils';
import { Replacement } from '../shared/Types';

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
    id: 'variant',
    name: 'Variant',
    isVisibleByDefault: true,
    isSortable: true,
    position: 1,
    tooltip: null,
  },
  {
    id: 'type',
    name: 'Type',
    isVisibleByDefault: true,
    isSortable: true,
    position: 2,
    tooltip: null,
  },
  {
    id: 'dbsnp',
    name: 'dbSNP',
    isVisibleByDefault: true,
    isSortable: false,
    position: 3,
    tooltip: null,
  },
  {
    id: 'gene',
    name: 'Gène',
    isVisibleByDefault: true,
    isSortable: true,
    position: 4,
    tooltip: null,
  },
  {
    id: 'consequence',
    name: 'Conséquence',
    isVisibleByDefault: true,
    isSortable: false,
    position: 5,
    tooltip: 'Conséquence la plus délétère',
  },
  {
    id: 'mane',
    name: 'MANE',
    isVisibleByDefault: true,
    isSortable: false,
    position: 6,
    tooltip: null,
  },
  {
    id: 'omim',
    name: 'OMIM',
    isVisibleByDefault: true,
    isSortable: false,
    position: 7,
    tooltip: 'Modes de transmission MIM',
  },
  {
    id: 'clinvar',
    name: 'ClinVar',
    isVisibleByDefault: true,
    isSortable: false,
    position: 8,
    tooltip: null,
  },
  {
    id: 'gnomad',
    name: 'gnomAD',
    isVisibleByDefault: true,
    isSortable: true,
    position: 9,
    tooltip: 'gnomAD Joint 4.1.0 (fréquence)',
  },
  {
    id: 'gnomad_alt',
    name: 'gnomAD ALT',
    isVisibleByDefault: true,
    isSortable: true,
    position: 10,
    tooltip: 'gnomAD Joint 4.1.0 (compte)',
  },
  {
    id: 'rqdm',
    name: 'RQDM G',
    isVisibleByDefault: true,
    isSortable: true,
    position: 11,
    tooltip: 'Nombre d’exomes germinaux comportant ce variant. Seules les occurrences rencontrant les critères Filtre = PASS et QG ≥ 20 sont considérées pour le calcul des fréquences.',
  },
  {
    id: 'cmc',
    name: 'CMC',
    isVisibleByDefault: true,
    isSortable: true,
    position: 12,
    tooltip: 'Nombre d’échantillons dans COSMIC avec cette mutation suivi de son ratio',
  },
  {
    id: 'hotspot',
    name: CommonSelectors.hotspotIcon,
    isVisibleByDefault: true,
    isSortable: true,
    position: 13,
    tooltip: 'Cancer Hotspot',
  },
  {
    id: 'exomiser_var',
    name: 'Exo. (var)',
    isVisibleByDefault: true,
    isSortable: true,
    position: 14,
    tooltip: 'Score calculé par Exomiser en fonction des caractéristiques du variant seulement (sans les phénotypes du patient)',
  },
  {
    id: 'tier',
    name: 'Tier',
    isVisibleByDefault: false,
    isSortable: true,
    position: 15,
    tooltip: 'CMC tier. Signification de la mutation. 1 - haute signification, 2 - signification moyenne, 3 - faible signification, Other - Pas de signification prédite (autres mutations)',
  },
  {
    id: 'max_franklin',
    name: 'Max Fra.',
    isVisibleByDefault: false,
    isSortable: true,
    position: 16,
    tooltip: 'Score Franklin le plus élevé parmi tous les patients pour ce variant',
  },
  {
    id: 'max_exomiser',
    name: 'Max Exo.',
    isVisibleByDefault: false,
    isSortable: true,
    position: 17,
    tooltip: 'Score Exomiser (max)',
  },
  {
    id: 'acmg_franklin',
    name: 'ACMG F.',
    isVisibleByDefault: true,
    isSortable: true,
    position: 18,
    tooltip: 'ACMG de Franklin',
  },
  {
    id: 'acmg_exomiser',
    name: 'ACMG E.',
    isVisibleByDefault: true,
    isSortable: true,
    position: 19,
    tooltip: 'Classification Exomiser ACMG la plus élevée parmi tous les patients pour ce variant',
  },
  {
    id: 'criteria_franklin',
    name: 'Crit. Fra.',
    isVisibleByDefault: true,
    isSortable: false,
    position: 20,
    tooltip: 'Critères ACMG de Franklin',
  },
  {
    id: 'cadd',
    name: 'CADD',
    isVisibleByDefault: false,
    isSortable: false,
    position: 21,
    tooltip: 'CADD (Phred)',
  },
  {
    id: 'revel',
    name: 'REVEL',
    isVisibleByDefault: false,
    isSortable: false,
    position: 22,
    tooltip: null,
  }
];

export const VariantsTable = {
    actions: {
      /**
       * Clicks the download button and waits for the file to be available.
       */
      clickDownloadButton() {
        cy.get(selectors.downloadButton).clickAndWait({force: true});
        cy.waitUntilFile(oneMinute);
      },
      /**
       * Clicks the link in a specific table cell for a given variant and column.
       * @param dataVariant The variant object.
       * @param columnID The ID of the column.
       * @param onPlusIcon Click on the plus icon (default: false).
       */
      clickTableCellLink(dataVariant: any, columnID: string, onPlusIcon: boolean = false) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            switch (columnID) {
              case 'variant':
                cy.get(selectors.tableCell(dataVariant)).contains(dataVariant.variant).invoke('removeAttr', 'target').clickAndWait({force: true});
              break;
              case 'gene':
                const selectorToClick = onPlusIcon ? CommonSelectors.plusIcon : CommonSelectors.link;
                cy.get(selectors.tableCell(dataVariant)).eq(position).find(selectorToClick).clickAndWait({force: true});
              break;
              default:
                cy.get(selectors.tableCell(dataVariant)).eq(position).find(CommonSelectors.link).clickAndWait({force: true});
              break;
            };
          };
        }));
      },
      /**
       * Hides a specific column in the table.
       * @param columnID The ID of the column to hide.
       */
      hideColumn(columnID: string) {
        cy.hideColumn(getColumnName(tableColumns, columnID));
      },
      /**
       * Shows all columns in the table.
       */
      showAllColumns() {
        tableColumns.forEach((column) => {
          if (!column.isVisibleByDefault) {
            cy.showColumn(stringToRegExp(column.name, true/*exact*/), 0);
          };
        });
      },
      /**
       * Shows a specific column in the table.
       * @param columnID The ID of the column to show.
       */
      showColumn(columnID: string) {
        cy.showColumn(stringToRegExp(getColumnName(tableColumns, columnID), true/*exact*/), 0);
      },
      /**
       * Sorts a column, optionally using an intercept.
       * @param columnID The ID of the column to sort.
       * @param needIntercept Whether to use an intercept (default: true).
       */
      sortColumn(columnID: string, needIntercept: boolean = true) {
        const columnName = getColumnName(tableColumns, columnID);
        const strORregexpColumnName = columnName.startsWith('[') ? columnName : stringToRegExp(columnName, true/*exact*/);
        if (needIntercept) {
          cy.sortTableAndIntercept(strORregexpColumnName, 1);
        }
        else {
          cy.sortTableAndWait(strORregexpColumnName);
        };
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
          { placeholder: '{{consequence}}', value: dataVariant.consequence.replace('Missense', 'Missense ') },
          { placeholder: '{{maneC}}', value: dataVariant.maneC ? 'Ensembl Canonical' : '' },
          { placeholder: '{{maneM}}', value: dataVariant.maneM ? 'MANE Select' : '' },
          { placeholder: '{{maneP}}', value: dataVariant.maneP ? 'MANE Plus' : '' },
          { placeholder: '{{omim}}', value: dataVariant.omim },
          { placeholder: '{{clinvar}}', value: dataVariant.clinvar.join(',') },
          { placeholder: '{{gnomad}}', value: dataVariant.gnomad },
          { placeholder: '{{gnomad_alt}}', value: dataVariant.gnomad_alt },
          { placeholder: '{{rqdmP}}', value: dataVariant.rqdmP },
          { placeholder: '{{rqdmF}}', value: dataVariant.rqdmF },
          { placeholder: '{{cmcP}}', value: dataVariant.cmcP },
          { placeholder: '{{cmcF}}', value: scientificToDecimal(dataVariant.cmcF) },
          { placeholder: '{{hotspot}}', value: dataVariant.hotspot },
          { placeholder: '{{exomiser}}', value: dataVariant.exomiser },
          { placeholder: '{{tier}}', value: dataVariant.tier },
          { placeholder: '{{max_franklin}}', value: dataVariant.max_franklin },
          { placeholder: '{{max_exomiser}}', value: dataVariant.max_exomiser },
          { placeholder: '{{acmg_franklin}}', value: dataVariant.acmg_franklin === 'ND' ? '-' : dataVariant.acmg_franklin },
          { placeholder: '{{acmg_exomiser}}', value: dataVariant.acmg_exomiser },
          { placeholder: '{{criteria_franklin}}', value: dataVariant.criteria_franklin },
          { placeholder: '{{cadd}}', value: dataVariant.cadd },
          { placeholder: '{{revel}}', value: dataVariant.revel },
        ];
        cy.validateFileContent('ExportTableauVariants.json', replacements);
      },
      /**
       * Validates the headers of the exported file.
       */
      shouldHaveExportedFileHeaders() {
        cy.validateFileHeaders('ExportTableauVariants.json');
      },
      /**
       * Validates the name of the exported file.
       */
      shouldHaveExportedFileName() {
        const {strDate} = getDateTime();
        cy.validateFileName(`SNV_${strDate}T*.tsv`);
      },
      /**
       * Validates the value of the first row for a given column.
       * @param value The expected value (string or RegExp).
       * @param columnID The ID of the column to check.
       */
      shouldHaveFirstRowValue(value: string | RegExp, columnID: string) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            cy.validateTableFirstRow(value, position, true/*hasCheckbox*/);
          };
        }));
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
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            cy.get(selectors.tableCell(dataVariant)).eq(position).find(CommonSelectors.link).should('have.attr', 'href', getUrlLink(columnID, dataVariant));
          };
        }));
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
            cy.get(selectorHead).contains(stringToRegExp(column.name, true/*exact*/)).should(expectedExist);
          };
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
        VariantsTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          if (column.name.startsWith('[')) {
            cy.get(selectors.tableHeadCell).eq(column.position).find(column.name).should('exist');
          } else {
            cy.get(selectors.tableHeadCell).eq(column.position).contains(stringToRegExp(column.name, true/*exact*/)).should('exist');
          };
        });
      },
      /**
       * Validates the presence of tooltips on columns.
       */
      shouldShowColumnTooltips() {
        VariantsTable.actions.showAllColumns();
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
        cy.get(selectors.proTableHeader).contains(/^No Results$/).should('exist');
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
        VariantsTable.actions.showAllColumns();
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
          cy.then(() => getColumnPosition(selectorHead, tableColumns, column.id).then((position) => {
            if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
              switch (column.id) {
                case 'dbsnp':
                  cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, position, 'anticon');
                  break;
                case 'gene':
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant[column.id]);
                  cy.validateTableDataRowKeyAttr(dataVariant.dataRowKey, position, 'data-icon', 'plus');
                  break;
                case 'consequence':
                  cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, position, dataVariant.consequenceImpact);
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant[column.id]);
                  break;
                case 'mane':
                  cy.get(`tr[data-row-key="${dataVariant.dataRowKey}"] td`).eq(position).find('path[d*="M16.7732"]').should(dataVariant.maneC ? 'exist' : 'not.exist');
                  cy.get(`tr[data-row-key="${dataVariant.dataRowKey}"] td`).eq(position).find('path[d*="M8.98279"]').should(dataVariant.maneM ? 'exist' : 'not.exist');
                  cy.get(`tr[data-row-key="${dataVariant.dataRowKey}"] td`).eq(position).find('path[d*="M10.9335"]').should(dataVariant.maneP ? 'exist' : 'not.exist');
                  break;
                case 'omim':
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant[column.id]);
                  cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, position, 'ant-tag-blue');
                  break;
                case 'clinvar':
                  dataVariant[column.id].forEach((value: string | RegExp) => {
                    cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, value);
                  });
                  cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, position, 'ant-tag-green');
                  cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, position, 'ant-tag-lime');
                  break;
                case 'gnomad':
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant[column.id]);
                  cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, position, 'GnomadCell_gnomadIndicator');
                  break;
                case 'rqdm':
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant.rqdmP);
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant.rqdmF);
                  break;
                case 'cmc':
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant.cmcP);
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, `(${dataVariant.cmcF})`);
                  break;
                case 'tier':
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant[column.id]);
                  cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, position, 'ant-tag-default');
                  break;
                case 'acmg_franklin':
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant[column.id]);
                  cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, position, 'ant-tag');
                  break;
                case 'acmg_exomiser':
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant[column.id]);
                  cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, position, 'ant-tag-orange');
                  break;
                default:
                  cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, position, dataVariant[column.id]);
                  break;
              };
            };
          }));
        });
      },
      /**
       * Validates the sorting functionality of a column.
       * @param columnID The ID of the column to sort.
       * @param needIntercept Whether to use an intercept for the sorting action (default: true).
       */
      shouldSortColumn(columnID: string, needIntercept: boolean = true) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            switch (columnID) {
              case 'hotspot':
                VariantsTable.actions.sortColumn(columnID, needIntercept);
                VariantsTable.validations.shouldHaveFirstRowValue('-', 'hotspot');
                VariantsTable.actions.sortColumn(columnID, needIntercept);
                cy.get(CommonSelectors.tableRow).eq(0).shouldCheckAndUncheck();
                cy.get(CommonSelectors.tableRow).eq(0).find('td').eq(position).find('[class*="hotspotFilled"]').should('exist');
              break;
              default:
                VariantsTable.actions.sortColumn(columnID, needIntercept);
                cy.get(CommonSelectors.tableRow).eq(0).shouldCheckAndUncheck();
                cy.get(CommonSelectors.tableRow).eq(0).find('td').eq(position).invoke('text').then((smallestValue) => {
                  const smallest = smallestValue.trim();

                  VariantsTable.actions.sortColumn(columnID);
                  cy.get(CommonSelectors.tableRow).eq(0).shouldCheckAndUncheck();
                  cy.get(CommonSelectors.tableRow).eq(0).find('td').eq(position).invoke('text').then((biggestValue) => {
                    const biggest = biggestValue.trim();
                    if (biggest.localeCompare(smallest) < 0) {
                      throw new Error(`Error: "${biggest}" should be >= "${smallest}"`);
                    };
                  });
                });
              break;
            };
          };
        }));
      },
    },
  };
