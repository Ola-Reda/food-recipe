const searchBtn = document.querySelector(".search-btn");
const boxItems = document.querySelector(".meals");
const closeBtn = document.querySelector(".close-btn");
const mealsDetails = document.querySelector(".meals-details");
const detailsContent = document.querySelector(".details-content");
const backdrop = document.querySelector(".backdrop");
const loader = document.querySelector('.loader')

//close details
closeBtn.addEventListener("click", () => {
    mealsDetails.style.display = "none";
    backdrop.style.display = "none";
})
backdrop.addEventListener("click", () => {
    mealsDetails.style.display = "none";
    backdrop.style.display = "none";
})

//get all meals with matched ingredients
searchBtn.addEventListener("click", getMeals);
function getMeals(e) {
    e.preventDefault();
    loader.style.display = "block";
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
            loader.style.display = "none";
        } else {
            drawMeals = `<div class="no-meals"> Sorry we didn't have any meals </div>`
            boxItems.classList.add("area");
            loader.style.display = "none";
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
    backdrop.style.display = "block";
}