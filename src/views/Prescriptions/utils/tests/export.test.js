import {
  convertToPlain,
  customMapping,
  exportAsTSV,
  extractSelectionFromResults,
  makeFilenameDatePart,
} from '../export';

describe('exportAsTSV', () => {
  test('should be robust', () => {
    expect(exportAsTSV(null, null)).toEqual('');
    expect(exportAsTSV([{ foo: 'bar' }], null)).toEqual('');
  });
  test('should export data', () => {
    expect(exportAsTSV([{ foo: 'bar' }], ['foo'])).toEqual('foo\nbar\n');
  });
  test('should export array', () => {
    expect(exportAsTSV([{ foo: ['bar1', 'bar2'] }], ['foo'])).toEqual('foo\nbar1 bar2\n');
  });
  test('should export object leafs', () => {
    expect(exportAsTSV([{ foo: { sub: 'leaf' } }], ['foo'])).toEqual('foo\nleaf\n');
  });
  test('should ignore some leafs', () => {
    expect(exportAsTSV([{ foo: { sub1: 'Variants', sub2: 'cnv' } }], ['foo'])).toEqual('foo\n\n');
  });
  test('should export at least headers', () => {
    expect(exportAsTSV([], ['foo'])).toEqual('foo\n');
  });
  test('should map header', () => {
    expect(
      exportAsTSV([{ colInData: 'bar' }], ['colInHeader'], { colInHeader: 'colInData' }),
    ).toEqual('colInHeader\nbar\n');
  });
});

describe('convertToPlain', () => {
  test('should convert HTML to plain text', () => {
    expect(convertToPlain('<div className="foo"><p>bar</p></div>')).toEqual('bar');
  });
});

describe('customMapping SNV', () => {
  test('should map nothing', () => {
    expect(customMapping(null, null, null)).toEqual(null);
  });
  test('should map hotspot null', () => {
    const row = {
      hotspot: null,
    };
    expect(customMapping('SNV', 'hotspot', row)).toEqual('--');
  });
  test('should map hotspot false', () => {
    const row = {
      hotspot: false,
    };
    expect(customMapping('SNV', 'hotspot', row)).toEqual('false');
  });
  test('should map omim', () => {
    const row = {
      consequences: {
        hits: {
          edges: [
            {
              node: {
                symbol: 'symbol',
                picked: true,
              },
            },
          ],
        },
      },
      genes: {
        hits: {
          edges: [
            {
              node: {
                symbol: 'symbol',
                omim_gene_id: 'id',
                omim: {
                  hits: {
                    edges: [
                      {
                        node: {
                          inheritance_code: ['IC'],
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'omim', row)).toEqual('IC');
  });
  test('should map consequence', () => {
    const row = {
      consequences: {
        hits: {
          edges: [
            {
              node: {
                symbol: 'symbol',
                consequences: 'foo',
                vep_impact: 'impact',
                aa_change: 'bb',
                picked: true,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'consequence', row)).toEqual('F bb');
  });
  test('should map donors.exomiser', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                exomiser: {
                  gene_combined_score: 0.4234,
                  acmg_classification: 'foo_bar',
                  acmg_evidence: null,
                },
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.exomiser.gene_combined_score', row, 'p1')).toEqual('0.423');
    expect(customMapping('SNV', 'donors.exomiser.acmg_classification', row, 'p1')).toEqual(
      'Foo Bar',
    );
    expect(customMapping('SNV', 'donors.exomiser.acmg_evidence', row, 'p1')).toEqual('--');
  });
  test('should map donors.gq', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                gq: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.gq', row, 'p1')).toEqual('42');
  });
  test('should map donors.zygosity', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                zygosity: 'HET',
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.zygosity', row, 'p1')).toEqual('0/1');
  });
  test('should map donors_genotype', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                mother_calls: [0, 1],
                father_calls: [2, 3],
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors_genotype', row, 'p1')).toEqual('0/1 : 2/3');
  });
  test('should map ch', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                hc_complement: {
                  hits: {
                    edges: [
                      {
                        node: {
                          symbol: 's1',
                          locus: 'l1',
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'ch', row, 'p1')).toEqual('s1 ( 2 )');
  });
  test('should map pch', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                possibly_hc_complement: {
                  hits: {
                    edges: [
                      {
                        node: {
                          symbol: 's2',
                          count: 10,
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'pch', row, 'p1')).toEqual('s2 ( 10 )');
  });
  test('should map transmission', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                transmission: 'foo',
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.transmission', row, 'p1')).toEqual('Foo');
  });
  test('should map qd', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                qd: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.qd', row, 'p1')).toEqual('42');
  });
  test('should map parental_origin', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                parental_origin: 'mother',
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.parental_origin', row, 'p1')).toEqual('M');
  });
  test('should map ad_alt', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                ad_alt: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.ad_alt', row, 'p1')).toEqual('42');
  });
  test('should map ad_total', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                ad_total: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.ad_total', row, 'p1')).toEqual('42');
  });
  test('should map ad_ratio', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                ad_ratio: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.ad_ratio', row, 'p1')).toEqual('42.00');
  });
  test('should map filters', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                filters: ['foo', 'bar'],
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.filters', row, 'p1')).toEqual('Foo, Bar');
  });
});

describe('customMapping CNV', () => {
  test('should map nothing', () => {
    expect(customMapping(null, null, null)).toEqual(null);
  });
  test('should map alls', () => {
    const row = {
      calls: [-1, 1],
    };
    expect(customMapping('CNV', 'calls', row)).toEqual('./1');
  });

  test('should map genes', () => {
    const row = {
      genes: {
        hits: {
          edges: [
            {
              node: {
                symbol: 'symbol',
                omim_gene_id: 'id',
                omim: {
                  hits: {
                    edges: [
                      {
                        node: {
                          inheritance_code: ['IC'],
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    };
    expect(customMapping('CNV', 'genes', row)).toEqual('symbol');
  });
});

describe('customMapping PrescriptionTable', () => {
  test('should map nothing', () => {
    expect(customMapping(null, null, null)).toEqual(null);
  });
  test('should map assignments', () => {
    const row = {
      assignments: ['p1', 'p2'],
    };
    expect(customMapping('PR', 'assignments', row)).toEqual('p1,p2');
  });
  test('should map assignments empty array', () => {
    const row = {
      assignments: [],
    };
    expect(customMapping('PR', 'assignments', row)).toEqual('--');
  });
  test('should map tasks', () => {
    const row = {
      tasks: ['TEBA', 'TNEBA', 'GEBA'],
    };
    expect(customMapping('PR', 'tasks', row)).toEqual('TO,TN,G');
  });
  test('should map tasks empty array', () => {
    const row = {
      tasks: [],
    };
    expect(customMapping('PR', 'tasks', row)).toEqual('--');
  });
});

describe('makeFilenameDatePart', () => {
  test('should format datetime', () => {
    const date = new Date(2020, 10, 31, 12, 42, 35);
    // don't check hours since it will yield different result
    //  on different machine with different UTC
    expect(makeFilenameDatePart(date).slice(0, 9)).toEqual('20201201T');
  });
});

describe('extractSelectionFromResults', () => {
  test('should filter by selection', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = ['bar'];
    const expected = [{ field: 'bar' }];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
  test('should return all', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = ['*'];
    const expected = [{ foo: 'bar' }, { field: 'bar' }];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
  test('should return nothing', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = [];
    const expected = [];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
});
