import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://countries.trevorblades.com/';
const client = new GraphQLClient(endpoint);

const COUNTRY_QUERY = gql`
  query Country($code: ID!) {
  country(code: $code) {
    code
    name
    native
    capital
    currency
    languages {
      code
      name
      native
    }
    continent {
      code
      name
    }
  }
}
`;

export const fetchCountry = async (code: string) => {
  try {
    const data: any = await client.request(COUNTRY_QUERY, { code });
    return data.country;
  } catch (error) {
    console.error('Error fetching country details:', error);
    throw error;
  }
};
