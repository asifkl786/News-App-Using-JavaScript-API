const myapikey = "5938e82e5a9042c4b89555e90e9375d2";

const blogContainer = document.getElementById("blog-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");


async function fetchRandomNews(){
    try {
        const url = `http://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${myapikey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news ", error);
        return [];
    }
}
// This function fetch news data acording to user
searchBtn.addEventListener('click', async () => {
   const query = searchInput.value.trim();
   console.log(query);
   if(query !== ""){
      try {
          const articless = await fetchNewsQuery(query);
          displayBlogs(articless);
      } catch (error) {
        console.log("Error fetching news by query",error);
      }
   }
});
// This function solve fetchNewsQuery
async function fetchNewsQuery(query){
    try {
        const url = `http://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${myapikey}`;
        const response = await fetch(url,{
            referrerPolicy: "unsafe-url" 
        });
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news ", error);
        return [];
    }
}
// This function display the data to UI
function displayBlogs(articles){
    blogContainer.innerHTML = '';
    articles.forEach((article) => {
        const blogCard = document.createElement('div');
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        // Thease Line of code title minimum 30 words long
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "...": article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement('p');
         // Thease Line of code title minimum 30 words long
         const truncatedDescription = article.description.length > 100 ? article.description.slice(0,100) + "...": article.description;
         description.textContent = truncatedDescription;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", ()=> {
           window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
    const articles = await fetchRandomNews();
     displayBlogs(articles);
    } catch (error) {
       console.error("Error fetching random news",error);   
    }
})();


