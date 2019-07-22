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

const showFunko = id => {
  return fetch(`${API}/funkos/${id}`).then(resp => resp.json());
};

const showFunkoWishlist = id => {
  return fetch(`${API}/wishlists/${id}`).then(resp => resp.json());
};

const addFunkoToCollection = (userId, funkoId) => {
  return fetch(`${API}/collections`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ collection: { user_id: userId, funko_id: funkoId } })
  }).then(res => res.json());
};

const addFunkoToWishlist = (userId, funkoId) => {
  return fetch(`${API}/wishlists`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ wishlist: { user_id: userId, funko_id: funkoId } })
  }).then(res => res.json());
};

const removeFromWishlist = id => {
  return fetch(`${API}/wishlists/${id}`, {
    method: "DELETE"
  }).then(res => res.json());
};

export default {
  fetchFunkos,
  login,
  getCurrentUser,
  createUser,
  showFunko,
  addFunkoToCollection,
  addFunkoToWishlist,
  showFunkoWishlist,
  removeFromWishlist
};
