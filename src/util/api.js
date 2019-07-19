const API = "http://localhost:3000";

const headers = {
  "Content-Type": "application/json",
  Accepts: "application/json"
};

const fetchFunkos = () => {
  return fetch(`${API}/funkos`).then(resp => resp.json());
};

const login = (username, password) => {
  return fetch(`${API}/auth/create`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ username, password })
  }).then(res => res.json());
};

const getCurrentUser = token => {
  return fetch(`${API}/auth/show`, {
    headers: { ...headers, Authorization: token }
  }).then(res => res.json());
};

const createUser = newUser => {
  return fetch(`${API}/api/v1/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newUser)
  }).then(res => res.json());
};

export default {
  fetchFunkos,
  login,
  getCurrentUser,
  createUser
};
