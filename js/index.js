
let rowData= document.getElementById(`rowData`);
let searchContainer = document.getElementById(`searchContainer`);
let submitbtn;


$(document).ready(()=>{
    searchByName("").then(function(){
        $(`.loading`).fadeOut(900);
        $(`body`).css(`overflow`,'visible')
    $(`.inner-loading`).fadeOut(500);
    })
})


function openSideNav(){
    $(`.side-nav-menu`).animate({left:0},500)
    $(`.open-close-icon`).removeClass(`fa-align-justify`)
    $(`.open-close-icon`).addClass(`fa-x`)
    

// $(`.links li`).eq(0).animate({top:0},500)
// $(`.links li`).eq(1).animate({top:0},600)
// $(`.links li`).eq(2).animate({top:0},700)
// $(`.links li`).eq(3).animate({top:0},800)
// $(`.links li`).eq(4).animate({top:0},900)

for(i=0 ; i < 5 ; i++){
$(`.links li`).eq(i).animate({
    top:0
},(i+5)*100)

}
}
function closeSideNav(){
    let boxWidth = $(`.side-nav-menu .nav-tab`).outerWidth()
    $(`.side-nav-menu`).animate({left:-boxWidth},500)
    $(`.open-close-icon`).addClass(`fa-align-justify`)
    $(`.open-close-icon`).removeClass(`fa-x`)

$(`.links li`).animate({top:300},900)
}
closeSideNav()

$(`.side-nav-menu i.open-close-icon`).click(function(){
    // console.log($(`.side-nav-menu .nav-tab`).outerWidth());
    if($(`.side-nav-menu`).css(`left`) == `0px`){
     
        closeSideNav()

    }else{
       openSideNav()
    }
})

// async function searchByName(term){
//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
//     response =await response.json();
//     displayMeals(response.meals)
// }

function displayMeals(array){
    let cartoona = ``;
    for(let i =0; i < array.length ; i++){
        cartoona +=`
        <div class="col-md-3">
        <div onclick="getMealDetalis('${array[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${array[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center text-center text-dark cursor-pointer">
                <h3>${array[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML = cartoona;
}

async function getCategories(){
    rowData.innerHTML = '';
    $(`.inner-loading`).fadeIn(500);
searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response =await response.json();
    // console.log(response);
    displayCategories(response.categories)
    $(`.inner-loading`).fadeOut(500);

}

function displayCategories(array){
    let cartoona = ``;
    for(let i =0; i < array.length ; i++){
        cartoona +=`
        <div class="col-md-3">
        <div onclick='getCategoryMeals("${array[i].strCategory}")' class="meal position-relative overflow-hidden rounded-2 cursor-pointer ">
            <img class="w-100" src="${array[i].strCategoryThumb}" alt="">
            <div class="meal-layer position-absolute text-center text-dark cursor-pointer">
                <h3>${array[i].strCategory}</h3>
                <p>${array[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML = cartoona;
}

async function getArea(){
    rowData.innerHTML = '';
    $(`.inner-loading`).fadeIn(500);
searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response =await response.json();
    // console.log(response.meals);
    displayArea(response.meals);
    $(`.inner-loading`).fadeOut(500);

}

function displayArea(array){
    let cartoona = ``;
    for(let i =0; i < array.length ; i++){
        cartoona +=`
        <div class="col-md-3">
            <div onclick="getAreaMeals('${array[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house fa-4x"></i>
                <h3>${array[i].strArea}</h3>
            </div>
        </div>
       
        `
    }
    rowData.innerHTML = cartoona;
}

async function getIngrediants(){
    rowData.innerHTML = '';
    $(`.inner-loading`).fadeIn(500);
searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response =await response.json();
    // console.log(response.meals);
    displayIngrediants(response.meals.slice(0,20));
    $(`.inner-loading`).fadeOut(500);

}

function displayIngrediants(array){
    let cartoona = ``;
    for(let i =0; i < array.length ; i++){
        cartoona +=`
        <div class="col-md-3">
            <div onclick="getIngrediantsMeals('${array[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-bowl-food fa-4x"></i>
                <h3>${array[i].strIngredient}</h3>
                <p>${array[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
       
        `
    }
    rowData.innerHTML = cartoona;
}

async function getCategoryMeals(category){
    rowData.innerHTML = '';
    $(`.inner-loading`).fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json();
    displayMeals(response.meals.slice(0,20))
    $(`.inner-loading`).fadeOut(500);
}

async function getAreaMeals(area){
    $(`.inner-loading`).fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json();
    displayMeals(response.meals.slice(0,20))
    $(`.inner-loading`).fadeOut(500);
}

async function getIngrediantsMeals(ingrediant){
    rowData.innerHTML = '';
    $(`.inner-loading`).fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`)
    response = await response.json();
    displayMeals(response.meals.slice(0,20))
    $(`.inner-loading`).fadeOut(500);
}

async function getMealDetalis(mealId){
    closeSideNav()
    rowData.innerHTML = '';
    $(`.inner-loading`).fadeIn(500);
searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    response = await response.json();
    displayMealsDetails(response.meals[0])
    $(`.inner-loading`).fadeOut(500);
}

function displayMealsDetails(meal){

   let ingredients = ``
   for(let i = 1; i <= 20; i++){
    if(meal[`strIngredient${i}`]){
        ingredients +=`
        <li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>
        `
    }
   }

    let tags = meal.strTags?.split(`,`)
    if(!tags) tags = [];

    let tagsStr = ``;
    for(let i =0; i < tags.length; i++){
        tagsStr +=`
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
        `
    }

       let cartoona =`
        <div class="col-md-4">
        <img class="w-100 rounded-3 " src="${meal.strMealThumb}">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder ">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bold">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success ">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger ">Youtube</a>
    </div>
        `
    rowData.innerHTML = cartoona;
}

function showSearchInputs(){
searchContainer.innerHTML = `
<div class="row py-4">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" class="text-white form-control bg-transparent" type="text" name="" id="" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFirstLetter(this.value)" maxlength = "1" class="text-white form-control bg-transparent" type="text" name="" id="" placeholder="Search By First Letter ">
            </div>
        </div>

`
rowData.innerHTML = ``;
}

async function searchByName(term){
    $(`.inner-loading`).fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response =await response.json();
    response.meals? displayMeals(response.meals):displayMeals([]);
    $(`.inner-loading`).fadeOut(500);
}

async function searchByFirstLetter(term){
    $(`.inner-loading`).fadeIn(500);
    term == "" ? term =`a`:"";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response =await response.json();
    response.meals? displayMeals(response.meals):displayMeals([]);
    $(`.inner-loading`).fadeOut(500);
}

function showContacts(){
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex  justify-content-center align-items-center text-center ">
    <div class="container w-50">
        <div class="row g-4">
            <div class="col-md-6">
                <input onkeyup = "inputsValidation()" class="form-control" type="text" placeholder="Enter Your Name" id="nameInput">
                <div class="alert alert-danger w-100 mt-2 d-none" id="nameAlert">
                special characters and numbers are not allowed</div>
            </div>
            <div class="col-md-6">
                <input onkeyup = "inputsValidation()" class="form-control" type="email" placeholder="Enter Your Email" id="emailInput">
                <div class="alert alert-danger w-100 mt-2 d-none" id="emailAlert">
                Enter Valid Email xxx@yyy.zzz</div>
            </div>
            <div class="col-md-6">
                <input onkeyup = "inputsValidation()" class="form-control" type="number" placeholder="Enter Your Phone" id="phoneInput">
                <div class="alert alert-danger w-100 mt-2 d-none" id="phoneAlert">
                Enter Valid Phone Number</div>
            </div>
            <div class="col-md-6">
                <input onkeyup = "inputsValidation()" class="form-control" type="number" placeholder="Enter Your Age" id="ageInput">
                <div class="alert alert-danger w-100 mt-2 d-none" id="ageAlert">
                Enter Valid Age Number</div>
            </div>
            <div class="col-md-6">
                <input onkeyup = "inputsValidation()" class="form-control" type="password" placeholder="Enter Your Password" id="passwordInput">
                <div class="alert alert-danger w-100 mt-2 d-none" id="passwordAlert">
                Enter Valid Password * Minimum 8 Characters,At Least 1 Letter and 1 Number*</div>
            </div>
            <div class="col-md-6">
                <input onkeyup = "inputsValidation()" class="form-control" type="password" placeholder="Re Password" id="repasswordInput">
                <div class="alert alert-danger w-100 mt-2 d-none" id="repasswordAlert">
                Enter Valid repassword</div>
            </div>
        </div>
        <button id="submitbtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>
    `
    submitbtn= document.getElementById(`submitbtn`)

    
document.getElementById(`nameInput`).addEventListener(`focus`,function(){
    nameInputFocus = true;
})

document.getElementById(`ageInput`).addEventListener(`focus`,function(){
    ageInputFocus = true;
})

document.getElementById(`phoneInput`).addEventListener(`focus`,function(){
    phoneInputFocus = true;
})

document.getElementById(`emailInput`).addEventListener(`focus`,function(){
    emailInputFocus = true;
})

document.getElementById(`passwordInput`).addEventListener(`focus`,function(){
    passwordInputFocus = true;
})

document.getElementById(`repasswordInput`).addEventListener(`focus`,function(){
    repasswordInputFocus = true;
})

}

let nameInputFocus = false;
let ageInputFocus = false;
let phoneInputFocus = false;
let emailInputFocus = false;
let passwordInputFocus = false;
let repasswordInputFocus = false;


        
function inputsValidation(){
    if(nameInputFocus){
        if(nameValidation()){
            document.getElementById(`nameAlert`).classList.replace(`d-block`,`d-none`);
            // document.getElementById(`nameInput`).classList.add(`is-valid`)
        }else{
            document.getElementById(`nameAlert`).classList.replace(`d-none`,`d-block`);
            // document.getElementById(`nameInput`).classList.replace(`is-invalid`,`is-valid`)

        }
    }

    if(emailInputFocus){
        if(emailValidation()){
            document.getElementById(`emailAlert`).classList.replace(`d-block`,`d-none`);
        }else{
            document.getElementById(`emailAlert`).classList.replace(`d-none`,`d-block`);
        }
    }

    if(phoneInputFocus){
        if(phoneValidation()){
            document.getElementById(`phoneAlert`).classList.replace(`d-block`,`d-none`);
        }else{
            document.getElementById(`phoneAlert`).classList.replace(`d-none`,`d-block`);
        }
    }

    if(ageInputFocus){
        if(ageValidation()){
            document.getElementById(`ageAlert`).classList.replace(`d-block`,`d-none`);
        }else{
            document.getElementById(`ageAlert`).classList.replace(`d-none`,`d-block`);
        }
    }

    if(passwordInputFocus){
        if(passwordValidation()){
            document.getElementById(`passwordAlert`).classList.replace(`d-block`,`d-none`);
        }else{
            document.getElementById(`passwordAlert`).classList.replace(`d-none`,`d-block`);
        }
    }

    if(repasswordInputFocus){
        if(rePasswordValidation()){
            document.getElementById(`repasswordAlert`).classList.replace(`d-block`,`d-none`);
        }else{
            document.getElementById(`repasswordAlert`).classList.replace(`d-none`,`d-block`);
        }
    }

    
    if(
    emailValidation()&&
    nameValidation()&&
    phoneValidation()&&
    ageValidation()&&
    passwordValidation()&&
    rePasswordValidation()
    ){
        submitbtn.removeAttribute(`disabled`);
    }
    else{
        submitbtn.setAttribute( `disabled`,true );

    }
}

function nameValidation(){
   return (/^[a-zA-Z ]+$/.test(document.getElementById(`nameInput`).value));
}

function emailValidation(){
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById(`emailInput`).value));
 }

 function phoneValidation(){
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById(`phoneInput`).value));
 }

 function ageValidation(){
    return (/^\S[0-9]{0,3}$/.test(document.getElementById(`ageInput`).value));
 }

 function passwordValidation(){
    return (/^(?=.*\d)(?=.[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById(`passwordInput`).value));
 }

 function rePasswordValidation(){
    return document.getElementById(`repasswordInput`).value == document.getElementById(`passwordInput`).value
 }





