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

const showFunkoCollection = id => {
  return fetch(`${API}/collections/${id}`).then(resp => resp.json());
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

const removeFromCollection = id => {
  return fetch(`${API}/collections/${id}`, {
    method: "DELETE"
  }).then(res => res.json());
};

const searchFunkos = searchTerm => {
  return fetch(`${API}/searchquery?searchterm=${searchTerm}`).then(resp =>
    resp.json()
  );
};

const toggleFunkoOnTrade = (id, availability) => {
  return fetch(`${API}/collections/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ collection: { available_to_trade: availability } })
  }).then(resp => resp.json());
};

const funkosAvailableToTrade = id => {
  return fetch(`${API}/funkos-to-trade?user_id=${id}`).then(resp =>
    resp.json()
  );
};

const myFunkosToTrade = id => {
  return fetch(`${API}/my-funkos-to-trade?user_id=${id}`).then(resp =>
    resp.json()
  );
};

const myOffers = id => {
  return fetch(`${API}/my-offers?user_id=${id}`).then(resp => resp.json());
};

const makeAnOffer = (incomingFunko, outgoingFunko) => {
  return fetch(`${API}/offers`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      offer: {
        incoming_funko_id: incomingFunko,
        outcoming_funko_id: outgoingFunko
      }
    })
  }).then(res => res.json());
};

const showOffer = id => {
  return fetch(`${API}/offers/${id}`).then(resp => resp.json());
};

const toggleOfferStatus = (id, newStatus) => {
  return fetch(`${API}/offers/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ offer: { status: newStatus } })
  }).then(resp => resp.json());
};

const rejectOffer = id => {
  return fetch(`${API}/offers/${id}`, {
    method: "DELETE"
  }).then(res => res.json());
};

const funkosByCategory = searchTerm => {
  return fetch(`${API}/category?searchterm=${searchTerm}`).then(resp =>
    resp.json()
  );
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
  removeFromWishlist,
  removeFromCollection,
  showFunkoCollection,
  searchFunkos,
  toggleFunkoOnTrade,
  funkosAvailableToTrade,
  myFunkosToTrade,
  myOffers,
  makeAnOffer,
  showOffer,
  toggleOfferStatus,
  rejectOffer,
  funkosByCategory
};
