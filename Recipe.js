api="https://www.themealdb.com/api/json/v1/1/search.php?s=";

const searchbtn=document.getElementById("search-btn");
const searchbar=document.getElementById("search-bar");
const recipeContainer=document.getElementById("recipe-container")
const fetchingmsg=document.getElementById("js-fetching");
const recipeDetailsContent=document.querySelector(".recipe-details-content");
const recipeCloseBtn=document.querySelector(".recipe-close-btn");

window.addEventListener("load",()=> fetchfun("Indian"));


const fetchfun= async (query)=>{
    const res= await fetch(`${api}${query}`);
    const data= await res.json();
    binddata(data.meals);
    
}



   

searchbtn.addEventListener("click",()=>{
    fetchingmsg.innerText="Fetching Recipies";
    // recipeContainer.innerHTML="";
    const value=searchbar.value.trim();
    fetchfun(value)

    }
)


function binddata(meals){
    meals.forEach(meal => {
        if(!meal.strMealThumb) return;
        const creatediv=document.createElement('div');
        creatediv.classList.add('recipe');

        creatediv.innerHTML= `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><b>${meal.strArea}</b> Dish</p>
            <p>Belongs to <b>${meal.strCategory}</b> Category</p>`;
            


        const recipebtn=document.createElement("button");
        recipebtn.classList.add("getrecipe");
        recipebtn.innerText="View Recipe";
        recipeContainer.appendChild(creatediv);

        creatediv.appendChild(recipebtn)


        recipebtn.addEventListener("click",()=>{
            openrecipepopup(meal);
            

            

        });

        fetchingmsg.innerText="All Recipies Fetched!!";


    });
}

const fetchIngredients=(meal)=>{
    let IngredientsList ="";
    for(let i=1; i<20; i++){
        const Ingredient=meal[`strIngredient${i}`];
        if(Ingredient){
            const measure=meal[`strMeasure${i}`];
            IngredientsList+=`<li>${measure} ${Ingredient}</li>`
        }
        else{
            break;
        }
    }
    return IngredientsList;
}

const openrecipepopup= (meal)=>{
    recipeDetailsContent.innerHTML=`
        <h2 id="recipename">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul id="ingredinets">${fetchIngredients(meal)}</ul>

        <div id="Instructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        </div>
        

    `;

    recipeDetailsContent.parentElement.style.display="block";

}

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none";

})








