import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils/constants";

//this is our custom function . arguments are the url and second is a object with body and rest will be custom configurations
//custom config can contain method and headers , customFetch function will handle all the API calls

const customFetch = async (url, { body, ...customConfig }) => {
  //we get token from localstorage if it exists
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  //we are defining headers below
  const headers = {
    "content-type": "application/json",
    Accept: "application/json",
  };
  //if token exists we are adding it to our Authorizations header bcz some apis likecreate Post will require a token to verifiy our identy
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  //creating a assimilation of config with what we get as argument and what we defined in headers
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  //if we get body we are stringifying it as body will be a object
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    //here we are making a simple api call and converting it to json
    const response = await fetch(url, config);
    const data = await response.json();

    console.log("data", data);

    // if status of the fetch is a success, then returning the data
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    //else throw the error
    throw new Error(data.message);

  } catch (error) {
    console.error("error",error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: "GET",
  });
};
