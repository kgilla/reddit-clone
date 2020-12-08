const fetchGetData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "get",
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
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetchPutData = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "put",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetchDeleteData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { fetchGetData, fetchPostData, fetchPutData, fetchDeleteData };
