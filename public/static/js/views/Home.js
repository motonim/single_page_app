import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
      this.setTitle('Home');
   }

   async getHtml() {

      async function getData(url) {
         const response = await fetch(url);
         return response.json();
      }
        
      const data = await getData('/static/js/views/tweet.json');
      
      let tweets = data.statuses;

      let listPosts =`<div class="row g-4 py-5 row-cols-1 row-cols-lg-3">`;
      
      for(let i = 0; i < tweets.length; i++){
         listPosts += 
         `<div class="feature col">
            <h6 class="fw-semibold bg-light p-2">`+ tweets[i]['user']['screen_name'] +`</h6>
            <p>` + tweets[i]['text'] + `</p>
            <a href='/post/`+tweets[i]['id']+`' data-link class="icon-link d-inline-flex align-items-center">
               Read more
               <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"/></svg>
            </a>
         </div>`
      }


      listPosts +=`</div>`;
         
      return `
      <div class="px-4 py-5 my-5 text-center">
         <i class="d-block mx-auto mb-4 fa-solid fa-ghost"></i>
         <h1 class="display-5 fw-bold">Welcome to Jaeri's SPA</h1>
         <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">In this page, I'm going to show you the tweets from Twitter with a screen name of Montreal!</p>
         </div>
      </div>
      <h1 class="home-border-top py-3">Posts</h1>
      ` + listPosts;
   }
}
