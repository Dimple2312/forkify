import * as model from './model.js'; 
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime'; 

///////////////////////////////////////

if(module.hot){
  module.hot.accept();
}

const controlRecipes = async function() {
  try{
    const id = window.location.hash.slice(1);
if(!id) return;
recipeView.renderSpinner();
  
// Loading the recipe
await model.loadRecipe(id);

//Rendering the recipe 
recipeView.render(model.state.recipe);
}catch(err){
    recipeView.renderError();
  }
};

const controlSearchResults = async function (){
  try{
    
    resultsView.renderSpinner();
    console.log(resultsView);

    //1) Get search query
    const query = searchView.getQuery();
    if(!query) return;
  
    //2)Load search results
 await model.loadSearchResults(query);

   //3)Render results

 resultsView.render(model.getSearchResultsPage(1));
  }catch(err){
   console.log(err);
  }
};


const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
//window.addEventListener('hashchange',controlRecipes);
//window.addEventListener('load',controlRecipes);