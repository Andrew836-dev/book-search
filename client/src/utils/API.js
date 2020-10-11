import axios from "axios";
const API = {
  deleteBookByID: async function (id) {
    return axios
      .delete("/api/books/" + id)
      .then(response => {
        return response.data;
      })
      .catch(console.log);
  },
  getSavedBooks: async function () {
    return axios
      .get("/api/books")
      .then(response => {
        if (Array.isArray(response.data))
          return response.data;
        else return [];
      })
      .catch(console.log);
  },
  saveBook: async function (bookData) {
    return axios
      .post("/api/books", bookData)
      .then(response => {
        return response.data;
      })
      .catch(console.log);
  },
  searchForTerm: async function (searchTerm) {
    const requestURL = "https://www.googleapis.com/books/v1/volumes?q=";
    return axios
      .get(requestURL + searchTerm)
      .then(response => {
        const { items, totalItems } = response.data;
        return { items, totalItems };
      })
      .catch(console.log);
  },
  searchForBookWithId: async function (bookId) {
    const requestURL = "https://www.googleapis.com/books/v1/volumes/";
    return axios
      .get(requestURL + bookId)
      .then(response => {
        return response.data;
      })
      .catch(console.log);
  }
}

export default API