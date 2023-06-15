let searchBtn = document.querySelector(".search-btn");
let boxItems = document.querySelector(".meals");
let closeBtn = document.querySelector(".close-btn");
let mealsDetails = document.querySelector(".meals-details");
let detailsContent = document.querySelector(".details-content");

//close details
closeBtn.addEventListener("click", () => {
    mealsDetails.style.display = "none";
})

//get all meals with matched ingredients
searchBtn.addEventListener("click", getMeals);
function getMeals(e) {
    e.preventDefault();
    let searchInput = document.querySelector(".search-input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response => response.json())
    .then(data=> {
        let drawMeals = ' '
        if(data.meals){
            data.meals.map(meal=> {
                drawMeals += `
                    <div class="item" id=${meal.idMeal}>
                        <div class="meal-image">
                            <img src=${meal.strMealThumb} alt="food">
                        </div>
                        <div class="meal-info">
                            <h3>${meal.strMeal}</h3>
                            <button class="meal-btn" onclick="getRecipe(${meal.idMeal})">Get Recipe</button>
                        </div>
                    </div>
                `
            })
            boxItems.classList.remove("area");
        } else {
            drawMeals = `<div class="no-meals"> Sorry we didn't have any meals </div>`
            boxItems.classList.add("area");
        }
        boxItems.innerHTML = drawMeals;
    });
}

//get meal recipe
function getRecipe(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => { 
        let mealsData = data.meals[0]
        detailsContent.innerHTML = `
            <h3>${mealsData.strMeal}</h3>
            <span>${mealsData.strCategory}</span>
            <div class="recipe-info">
                <h4>Instructions:</h4>
                <p>${mealsData.strInstructions}</p>
            </div>
            <div class="recipe-image">
                <img src="${mealsData.strMealThumb}" alt="image">
            </div>
            <div class="recipe-link">
                <a href="${mealsData.strYoutube}" target="_blank">watch Video</a>
            </div>
        `
    })
    mealsDetails.style.display = "block";
}