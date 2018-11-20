import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    // elements.searchInput.value = '';
    document.querySelector('body').classList.remove('search-open');
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
};

/* 'Pasta with tomato and spinach'
    acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
    acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
    acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
    acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato', 'and']
    acc: 18 / acc + cur.length = 24 / newtitle = ['Pasta', 'with', 'tomato', 'and', 'spinach']
*/

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <div class="recipe-grid">
            <a href="#${recipe.recipe_id}">
                <div class="recipe-img">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </div>
                <div class="recipe-content">
                    <div class="recipe-title">${limitRecipeTitle(recipe.title)}</div>
                    <div class="recipe-author">${recipe.publisher}</div>
                </div>
            </a>
        </div>
    `;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page -1 : page + 1}>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        //Button to go to next page only
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        //Button to go to prev page only
        button = createButton(page, 'prev');
    } else {
        button = '';
    }

    elements.searchResPages.insertAdjacentHTML('afterBegin', button);
};

//find total result
const totalResultsHtml = (length) => {
    const totalMarkup = `
        <span>${length} recipes</span>
    `;
    const resultText = `
        <h3 class="search-result-content">
            Results for “<span class="search-text">${getInput()}</span>”
        </h3>
    `;
    document.querySelector('.total-results').innerHTML = totalMarkup;
    elements.recipeFor.innerHTML = resultText;
};

export const renderResults = (recipes, page = 1, resPerPage = 9) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // console.log(recipes.length);


    recipes.slice(start, end).forEach(renderRecipe);

    totalResultsHtml(recipes.length);

    //render the pagination buttons

    renderButtons(page, recipes.length, resPerPage);
};