import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetTrainee($skip: Int, $limit: Int) {
  getTrainee(options: { skip: $skip, limit: $limit}) {
    records{
      name,
      role,
      email,
      originalId
      createdAt,
      _id
    },
    count
    }
  }`;

export { GET_TRAINEE };
