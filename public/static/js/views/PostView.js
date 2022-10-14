import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
      this.setTitle("Tweet Post");
   }

   async getHtml() {

      const nu = Number(this.params.id);

      async function getData(url) {
         const response = await fetch(url);
         return response.json();
      }

      const data = await getData('/static/js/views/tweet.json');
      let tweets = data.statuses;

      const article = tweets.find(item => item.id === nu);

      console.log(article);

      let hashtag = "";

      if (article['entities']['hashtags'].length > 0){
         for (let i = 0; i < article['entities']['hashtags'].length; i++){
            hashtag += '#' + article['entities']['hashtags'][i]['text'] + ' ';
         }
      }
      else {
         hashtag = 'none'
      }

      let createdAt = article['created_at'].slice(0, 9);

      return `
         <div class="row">
            <div class="flex p-4 bg-light">
               <i class="fa-brands fa-square-twitter mt-1 me-1"></i>               
               <p>`+article.text+`</p>
            </div>
            <p class="mt-3">Created at: ${createdAt}</p>
            <p>Hashtags: ${hashtag}</p>
            <p>Retweet counts: `+article.retweet_count+`</p>
            <p>Username: `+article['user']['screen_name']+`</p>
         </div>
         `;
   }
}