const countrySearch = async (country) => {
  const response = await axios.get("https://restcountries.eu/rest/v2/name/"+country+"?fullText=true")
  return response.data
}

const searchResult = countrySearch(country)
console.log(searchResult);
