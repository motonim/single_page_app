import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
      this.setTitle('About');
   }

   async getHtml() {
      return `
      <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">About this SPA</h1>
        <p class="col-md-8 fs-4">This single page appication is made for travail pratique 1 for Techniques avancées en programmation Web 582-41F-MA for Session Automne 2022. My group is 21603 and my teacher is Marcos Sanches</p>
        <a href="/" class="btn btn-primary btn-lg">Go Home</a>
      </div>
    </div>
         `
         
   }
}