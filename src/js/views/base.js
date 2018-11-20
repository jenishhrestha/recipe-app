export const elements = {
    searchForm: document.querySelector('.search-form'),
    searchButton: document.querySelector('.btn-search'),
    searchInput: document.querySelector('.search-field'),
    searchRes: document.querySelector('.recipe-results'),
    searchResList: document.querySelector('.recipe-results-wrapper'),
    searchResPages: document.querySelector('.recipe-pagination'),
    recipe: document.querySelector('.recipe'),
    recipeFor: document.querySelector('.search-result-title'),
};

export const elementStrings = {
    loader: 'loader',
    compLoader: 'component-loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.compLoader}">
            <div class="data-loader section">
                <span class="data-loader-line"></span>
            </div>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.compLoader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}