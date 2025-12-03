
// 1. get the targetted values
const searchInput = document.querySelector("#searchInput")
const searchBtn = document.querySelector("#searchBtn")
const results = document.querySelector("#results")
const message = document.querySelector("#message")
const modal = document.querySelector("#modal")
const modalBody = document.querySelector("#modalBody")
const closeBtn = document.querySelector("#closeBtn")


// creating async function

async function searchMeals(){
    const searchTerm = searchInput.value;

    // check the search input
    if(searchTerm === ""){
        message.textContent = "Please enter meal name...";
        return;
    }

    // clear the message
    results.innerHTML = "";
    message.textContent = "Searching meals.."

    // api
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    const data = await response.json();

    // check if no meals found
    if(data.meals === null){
        message.textContent = "No meals found!";
        return;
    }

    // clear the message
    message.textContent="";
    

    // loop
    for(let i=0;i<data.meals.length;i++){
        const meal = data.meals[i]

        // meal card creation
        const mealCard = document.createElement('div')
        mealCard.className = 'meal-card';

        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}">
            <div class="meal-info">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strCategory} - ${meal.strArea}</p>
            </div>
        `;

        // open the modal
        mealCard.addEventListener("click", ()=> {
            openModal(meal);
        })

        // results append
        results.appendChild(mealCard);
    }
}




// modal
function openModal(meal){
    modalBody.innerHTML= `
        <div class="modal-header">
            <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p><strong>Category:</strong>${meal.strCategory} | <strong>Area:</strong>${meal.strArea}</p>
        </div>

        <div class="modal-body">
            <h3>Instrctions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;

    modal.style.display = "flex";
}


// close closeBtn
closeBtn.addEventListener("click", ()=>{ modal.style.display = "none"})

// search btn function calling
searchBtn.addEventListener("click", searchMeals)

// search with enter keydown
searchInput.addEventListener("keydown", (e)=>{ if (e.key ==="Enter"){
    searchMeals();
}})