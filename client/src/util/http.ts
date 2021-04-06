const handleHttpErrors = async (response: Response) => {
  if (!response.ok) {
    throw Error(`${response.status} - ${await response.text()}`);
  }
  return response;
};

export default handleHttpErrors;
