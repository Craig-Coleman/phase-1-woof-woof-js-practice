document.addEventListener('DOMContentLoaded', ()=> {

//Fetch the Dogs
document.addEventListener('DOMContentLoaded', getDogs());
function getDogs() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => appendDogs(data))
}


//Appends and gives function to everything
function appendDogs(data) {
    for(let i = 0; i < data.length; i++) {
    let dogBtn = document.createElement('span');
    dogBtn.textContent = data[i].name;
    dogBtn.style.textAlign = 'center'
    dogBtn.setAttribute('id', data[i].id)
    dogBtn.setAttribute('class', 'button')
    let dogBar = document.querySelector('#dog-bar');
    dogBar.appendChild(dogBtn);
    let dog = document.createElement('div')
    dog.setAttribute('id', data[i].id);
    dog.setAttribute('class', 'dog')
    let dogPic = document.createElement('img');
    dogPic.setAttribute('src', data[i].image)
    let dogName = document.createElement('h2');
    dogName.textContent = data[i].name;


    //Creates button with good or bad dog based on API info--------------
    let goodDogBtn = document.createElement('BUTTON');
    goodDogBtn.setAttribute('class', 'goodDog')
    if (data[i].isGoodDog === true) {
        goodDogBtn.textContent = 'Good Dog!'
    } else if (data[i].isGoodDog === false) {
        goodDogBtn.textContent = 'Bad Dog!'
    }

    //Appends everything and then hides it so it won't show up until its called
    let dogContainer = document.querySelector('#dog-info');
    dog.style.display = 'none'
    dogContainer.appendChild(dog);
    dog.appendChild(dogPic);
    dog.appendChild(dogName);
    dog.appendChild(goodDogBtn);


    //Causes dogs to show up when their bar button is clicked
    dogBtn.addEventListener('click', function (event) {
        let dogs = document.querySelectorAll('.dog');
        for (let i = 0; i < dogs.length; i++) {
            if (dogs[i].id === event.target.id) {
                dogs[i].style.display = 'block';
           } else {
               dogs[i].style.display = 'none'
           }
        }
    })


      //Causes Button Text to Change from Good Dog to Bad Dog and updates info in API
      goodDogBtn.addEventListener('click', function(event) {
        if (event.target.textContent === 'Good Dog!') {
            event.target.textContent = 'Bad Dog!'
            let dogObj = {
                name: data[i].name,
                isGoodDog: false,
                image: data[i].image
            }
            fetch(`http://localhost:3000/pups/${data[i].id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dogObj)
                })
                .then(res => res.json())
        } else if (event.target.textContent === 'Bad Dog!') {
            event.target.textContent = 'Good Dog!'
            let dogObj = {
                name: data[i].name,
                isGoodDog: true,
                image: data[i].image
            }
            fetch(`http://localhost:3000/pups/${data[i].id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dogObj)
                })
                .then(res => res.json())
        }
    })
    }
     //Filters Good Dogs
     //document.querySelector('#good-dog-filter').addEventListener('click', function(event) {
        //let filterList = document.querySelectorAll('.goodDog')
        //if (event.target.textContent === 'Filter good dogs: OFF') {
            //event.target.textContent = 'Filter good dogs: ON'
            //for (let i = 0; i < filterList.length; i++) {
                //console.log(filterList[i].parentElement.id)
               // if (filterList[i].innerText === 'Bad Dog!') {
                 //   filterList[i].parentElement.style.display = 'none'
                //}
            //}
        //} else if (event.target.textContent === 'Filter good dogs: ON') {
          //  event.target.textContent = 'Filter good dogs: OFF'
            //for (let i = 0; i < filterList.length; i++) {
              //  if (filterList[i].innerText === 'Bad Dog!') {
                //    filterList[i].parentElement.style.display = 'block'
                //}
           // }
        //}
    //})
}





})