import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { GeneEntity, VariantEntity } from 'graphql/cnv/models';

import GenesModal from '..';

// --- Import Mock Data ---
import mockApiResponse from './mockCnvData.json';

// --- Mock Dependencies ---
// Mock react-intl-universal
jest.mock('react-intl-universal', () => ({
  get: (key: string) => {
    if (key === 'screen.patientcnv.modal.genes.title') return 'Genes for variant:';
    if (key === 'screen.patientcnv.modal.genes.close') return 'Close';
    return `[${key}]`;
  },
}));

// Mock @ferlab/ui/core/components/ProTable
jest.mock('@ferlab/ui/core/components/ProTable', () => {
  const MockProTable = (props: { dataSource?: GeneEntity[] } & any) => (
    <div data-testid="mock-pro-table">
      Mock ProTable - Items: {props.dataSource?.length || 0}
      {/* Render symbols to check data mapping */}
      {props.dataSource?.map((gene: GeneEntity) => (
        <span key={gene.symbol}>{gene.symbol}</span>
      ))}
    </div>
  );
  MockProTable.displayName = 'MockProTable';
  return MockProTable;
});

// --- Prepare Data ---
// Extract the first variant node from the imported JSON
const mockVariantEntity = mockApiResponse.data.cnv.hits.edges[0].node as unknown as VariantEntity;

describe('GenesModal Component (using JSON data)', () => {
  let mockToggleModal: jest.Mock;

  beforeEach(() => {
    mockToggleModal = jest.fn();
  });

  it('should render correctly when open with variant data from JSON', () => {
    render(
      <GenesModal variantEntity={mockVariantEntity} isOpen={true} toggleModal={mockToggleModal} />,
    );

    // Check title construction (using data from the JSON node)
    // Expected title: "Genes for variant: LOSS:chr1:65510-70017 (4508 bp)"
    expect(
      screen.getByText(/Genes for variant: LOSS:chr1:65510-70017 \(4.5 kb\)/),
    ).toBeInTheDocument();

    // Check if the mock ProTable is rendered
    const proTable = screen.getByTestId('mock-pro-table');
    expect(proTable).toBeInTheDocument();

    // Check if the mock ProTable received the correct number of gene items
    expect(proTable).toHaveTextContent(
      `Mock ProTable - Items: ${mockVariantEntity.genes.hits.edges.length}`,
    );
    expect(proTable).toHaveTextContent('Items: 1'); // Specifically for the first variant in JSON

    // Check if the gene symbol from the JSON is rendered within the mock table
    expect(screen.getByText('OR4F5')).toBeInTheDocument();
  });
});
