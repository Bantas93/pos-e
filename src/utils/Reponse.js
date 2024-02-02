export const response = async (method, resource, query, body) => {
  const baseUrl = "http://localhost:8080/api/v1";
  const url = `${baseUrl}/${resource}?${query}`;
  const requestOptions = {
    method: method.toUpperCase(),
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(`Failed to fetch data. Status : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const deletedResponse = async (method, resource, body) => {
  const baseUrl = "http://localhost:8080/api/v1";
  const url = `${baseUrl}/${resource}`;
  const requestOptions = {
    method: method.toUpperCase(),
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(`Failed to fetch data. Status : ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const updatedResponse = async (method, resource, body) => {
  console.log(body);
  const baseUrl = "http://localhost:8080/api/v1";
  const url = `${baseUrl}/${resource}`;
  const requestOptions = {
    method: method.toUpperCase(),
    headers: {
      "Content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(`Failed to fetch data. Status : ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
