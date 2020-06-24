import { gql } from 'apollo-boost';

const UPDATED_TRAINEE_SUB = gql`
subscription {
  traineeUpdated{
    name,
    email,
    originalId
  }
  }
`;

const DELETED_TRAINEE_SUB = gql`
subscription {
  traineeDeleted
}
`;
export { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB };
