const recipeContainer = document.getElementById('recipeContainer');
const searchBtn = document.getElementById('searchBtn');

async function fetchRecipes(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    displayRecipes(data.meals);
}

function displayRecipes(recipes) {
    recipeContainer.innerHTML = '';
    if (recipes) {
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            const ingredientsList = getIngredientsList(recipe);

            recipeDiv.innerHTML = `
                <h3>${recipe.strMeal}</h3>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <p><strong>Recipe ID:</strong> ${recipe.idMeal}</p>
                <p><strong>Ingredients:</strong> ${ingredientsList}</p>
                <a href="${recipe.strSource}" target="_blank" class="viewRecipeBtn">View Recipe</a>
            `;

            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        recipeContainer.innerHTML = '<p>No recipes found. Please try another search.</p>';
    }
}

function getIngredientsList(recipe) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        let ingredient = recipe[`strIngredient${i}`];
        let measure = recipe[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
        }
    }
    return ingredients.join(', ');
}

searchBtn.addEventListener('click', () => {
    const query = document.getElementById('search').value;
    if (query) {
        fetchRecipes(query);
    }
});
