import { registerEnumType } from '@nestjs/graphql';

// eslint-disable-next-line no-shadow
export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(Order, {
  name: 'order',
  description: 'The type of Order By.',
  valuesMap: {
    ASC: {
      description: 'Ascending',
    },
    DESC: {
      description: 'Descending',
    },
  },
});
