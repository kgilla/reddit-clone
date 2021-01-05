const fetchGetData = async (url, token = "") => {
  try {
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetchPostData = async (url, body, token) => {
  try {
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetchPutData = async (url, body, token) => {
  try {
    const response = await fetch(url, {
      method: "put",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.log({ error: err });
  }
};

const fetchDeleteData = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (body, token) => {
  const response = await fetchPostData(
    `http://localhost:3000/api/s/${body.sub}/posts/create`,
    body,
    token
  );
  return response;
};

export {
  fetchGetData,
  fetchPostData,
  fetchPutData,
  fetchDeleteData,
  createPost,
};
