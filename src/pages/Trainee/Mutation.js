import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
mutation CreateTrainee($name: String!, $email: String!, $password: String!) {
  createTrainee(user: { name: $name, email: $email,password: $password}) {
    name,
    email,
  }
}
`;

const UPDATE_TRAINEE = gql`
mutation UpdateTrainee($id: ID! $name: String, $email: String) {
  updateTrainee(user: { id: $id,name: $name, email: $email})
}
`;

const DELETE_TRAINEE = gql`
mutation DeleteTrainee($id: ID!) {
  deleteTrainee(id: $id)
}
`;

export { DELETE_TRAINEE, UPDATE_TRAINEE, CREATE_TRAINEE };
