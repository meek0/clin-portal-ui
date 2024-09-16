import { getPractitionerInfoList, putUserFirst } from 'views/Prescriptions/utils/export';

describe('exportAsTSV', () => {
  test('should return good information', () => {
    const practitionerRolesBundle = [
      {
        resourceType: 'PractitionerRole',
        id: 'PRR01',

        active: true,
        practitioner: {
          reference: 'Practitioner/PR01',
        },
        organization: {
          reference: 'Organization/LDM-CHUSJ',
        },
        telecom: [
          {
            system: 'phone',
          },
          {
            system: 'email',
            value: 'pr01@email.com',
          },
        ],
      },
      {
        resourceType: 'PractitionerRole',
        id: 'PRR02',

        active: true,
        practitioner: {
          reference: 'Practitioner/PR02',
        },
        organization: {
          reference: 'Organization/LDM-CHUSJ',
        },
        telecom: [
          {
            system: 'phone',
          },
          {
            system: 'email',
            value: 'pr02@email.com',
          },
        ],
      },
      {
        resourceType: 'Practitioner',
        id: 'PR01',
        name: [
          {
            family: 'user1',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
      },
      {
        resourceType: 'Practitioner',
        id: 'PR02',
        name: [
          {
            family: 'user2',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
      },
    ];

    const expected = [
      {
        practitioner: 'PR01',
        practitionerRoles_Id: 'PRR01',
        name: [
          {
            family: 'user1',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
        email: 'pr01@email.com',
        ldm: 'LDM-CHUSJ',
      },
      {
        practitioner: 'PR02',
        practitionerRoles_Id: 'PRR02',
        name: [
          {
            family: 'user2',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
        email: 'pr02@email.com',
        ldm: 'LDM-CHUSJ',
      },
    ];
    expect(getPractitionerInfoList(practitionerRolesBundle)).toEqual(expected);
  });

  test('should return user first', () => {
    const infoList = [
      {
        practitionerRoles_Id: 'PRR01',
        name: [
          {
            family: 'user1',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
        email: 'pr01@email.com',
        ldm: 'LDM-CHUSJ',
      },
      {
        practitionerRoles_Id: 'PRR02',
        name: [
          {
            family: 'user2',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
        email: 'pr02@email.com',
        ldm: 'LDM-CHUSJ',
      },
      {
        practitionerRoles_Id: 'PRR03',
        name: [
          {
            family: 'myUser',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
        email: 'pr03@email.com',
        ldm: 'LDM-CHUSJ',
      },
    ];
    const userId = {
      resourceType: 'PractitionerRole',
      id: 'PRR03',

      active: true,
      practitioner: {
        reference: 'Practitioner/PR03',
      },
      organization: {
        reference: 'Organization/LDM-CHUSJ',
      },
      telecom: [
        {
          system: 'phone',
        },
        {
          system: 'email',
          value: 'pr03@email.com',
        },
      ],
    };
    const expected = [
      {
        practitionerRoles_Id: 'PRR03',
        name: [
          {
            family: 'myUser',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
        email: 'pr03@email.com',
        ldm: 'LDM-CHUSJ',
      },
      {
        practitionerRoles_Id: 'PRR01',
        name: [
          {
            family: 'user1',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
        email: 'pr01@email.com',
        ldm: 'LDM-CHUSJ',
      },
      {
        practitionerRoles_Id: 'PRR02',
        name: [
          {
            family: 'user2',
            given: ['name'],
            suffix: ['PhD'],
          },
        ],
        email: 'pr02@email.com',
        ldm: 'LDM-CHUSJ',
      },
    ];
    expect(putUserFirst(infoList, userId)).toEqual(expected);
  });
});
