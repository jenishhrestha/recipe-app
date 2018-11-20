import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
/**
 * Global state of the app
 * - search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes 
 */

const state = {};


/**
 * Search Controller
 */

const controlSearch = async() => {

    // 1) Get query from view
    const query = searchView.getInput();
    // const query = 'pizza';

    if (query) {

        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results / clear input value after data append

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            // console.log(state.search.result);

            clearLoader();

            //console.log(state.search.result);

            searchView.renderResults(state.search.result);

        } catch (err) {
            alert('something wrong with the search . . .');
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//testing
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// });

// const search = new Search('pizza');
// console.log(search);
// search.getResults();

elements.searchResPages.addEventListener('click', e => {
    //console.log(e.target);
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 9);
        const heightHtml = elements.searchResList.clientHeight;
        elements.searchResList.style.height = `${heightHtml}px`;
        searchView.clearResults();
        renderLoader(elements.searchRes);
        // searchView.renderResults(state.search.result, goToPage);
        // console.log(goToPage);

        setTimeout(function() {
            clearLoader();
            searchView.renderResults(state.search.result, goToPage);
            elements.searchResList.style.height = '';
        }, 1500);
    }
});


/**
 *  Recipe Controller
 */

const controlRecipe = async() => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    // console.log(id);

    if (id) {
        // Prepare UI for changes

        recipeView.clearRecipe();

        //Create new recipe object
        state.recipe = new Recipe(id);

        //testing
        // window.r = state.recipe;

        renderLoader(elements.recipe);

        try {
            //Get recipe data
            await state.recipe.getRecipe();

            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render Recipe

            clearLoader();
            //console.log(state.recipe);
            recipeView.renderRecipe(state.recipe);


        } catch (err) {
            clearLoader();
            alert('Error processing recipe');
            console.log('Error processing recipe', err);
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//UI/UX
elements.searchButton.addEventListener('click', e => {
    document.querySelector('body').classList.toggle("search-open");
});