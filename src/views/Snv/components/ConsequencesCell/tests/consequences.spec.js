import { generateConsequencesDataLines } from '../consequences';

describe('consequences: generateConsequencesDataLines', () => {
  test('Should be robust', () => {
    expect(generateConsequencesDataLines(null)).toEqual([]);
    expect(generateConsequencesDataLines([])).toEqual([]);
  });

  test('Should keep the better impact score', () => {
    const consequences = [
      {
        node: {
          symbol: 's1',
          impact_score: 1,
          consequences: ['c1'],
        },
      },
      {
        node: {
          symbol: 's1',
          impact_score: 2,
          consequences: ['c1'],
        },
      },
    ];

    const expected = [
      {
        node: {
          symbol: 's1',
          impact_score: 2,
          consequences: ['c1'],
        },
      },
    ];

    expect(generateConsequencesDataLines(consequences)).toEqual(expected);
  });

  test('Should return distinct (with higher score) consequences', () => {
    const consequences = [
      {
        node: {
          symbol: 's1',
          impact_score: 1,
          consequences: ['c1'],
        },
      },
      {
        node: {
          symbol: 's1',
          impact_score: 2,
          consequences: ['c1'],
        },
      },
    ];

    const expected = [
      {
        node: {
          symbol: 's1',
          impact_score: 2,
          consequences: ['c1'],
        },
      },
    ];

    expect(generateConsequencesDataLines(consequences)).toEqual(expected);
  });

  test('Should ignore empty consequences', () => {
    const consequences = [
      {
        node: {
          consequences: [],
        },
      },
    ];

    const expected = [];

    expect(generateConsequencesDataLines(consequences)).toEqual(expected);
  });

  test('Should group by symbol', () => {
    const consequences = [
      {
        node: {
          symbol: 's1',
          consequences: ['c1'],
        },
      },
      {
        node: {
          symbol: 's1',
          consequences: ['c3'],
        },
      },
      {
        node: {
          symbol: 's2',
          consequences: ['c2'],
        },
      },
      {
        node: {
          // no symbol
          consequences: ['c3'],
        },
      },
    ];

    const expected = [
      {
        node: {
          symbol: 's1',
          consequences: ['c1'],
        },
      },
      {
        node: {
          symbol: 's2',
          consequences: ['c2'],
        },
      },
      {
        node: {
          // no symbol
          consequences: ['c3'],
        },
      },
    ];

    expect(generateConsequencesDataLines(consequences)).toEqual(expected);
  });
});
