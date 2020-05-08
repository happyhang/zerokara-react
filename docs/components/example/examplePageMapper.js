// eslint-disable-next-line import/prefer-default-export
export const mapListFromApi = (response) => response.map((item) => ({
  id: item.id,
}));
