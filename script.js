// responsce for catagroy 
const loadData = async ()=>{
    const responce = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const loadJson = await responce.json();
    const dataGet = loadJson.data.news_category;
    newsPostPublices(dataGet)
}

const newsPostPublices = (newsCatagory) =>{
    const newsCatagoryARea = document.getElementById('news-catagoryName');
    const newsPublicesection = document.getElementById('news-publice-section');
    const getShortId = document.getElementById('sortArea-id');
    newsCatagory.forEach(singleCatagory => {
         const newDiv = document.createElement('div');
         const newSelect = document.createElement('option');
         newSelect.classList.add('get-value')
         newDiv.classList.add('flex-wrap');
// Catagory innter text
         newDiv.innerHTML =`
                          <ul class="">
                                <li onclick="newsDataLoad('${singleCatagory.category_id}')" class="hover:text-blue-500 ">${singleCatagory.category_name}</li>
                          </ul>
      
         `
         newsCatagoryARea.appendChild(newDiv);

         newSelect.innerHTML= singleCatagory.category_id ;

        getShortId.appendChild(newSelect);
    });

    // console.log(getShortId);
}
loadData()

// responsce for news
let getData ;
const newsDataLoad = async (Id) =>{
    const responsceNews = await fetch(`https://openapi.programming-hero.com/api/news/category/${Id}`);
    const loadDataNew = await (responsceNews.json());
    getData = loadDataNew.data;
    newsPaperPublice(getData)
  

    if (getData.length === 0) {
        spinnerAdd(false)
        let sum = 0;
        const getId = setInterval(() => {
            sum ++;
            console.log(sum);
            if (sum === 10) {
                clearInterval(getId)
                spinnerAdd(true)
                spinnerAdd("hidden")
            }
        }, 1000);
    }
    else{
        spinnerAdd(true)
        const getButton = document.querySelector('#hidden-button')
        if (getData.length > 5) {
             getButton.classList.remove('hidden');
        }else{
            getButton.classList.add('hidden');
        }
    }

    
}

// ============= problems ========================

let show;

const showAllbutton = () => {
   
    newsPaperPublice(getData,true)
};

// showAllbutton()
console.log(show);
// const button = document.getElementById("show-button");
// button.addEventListener("click", showAllbutton);



const newsPaperPublice = (NewsPaper,IsTrue)=>{
     const getNewArea = document.getElementById('news-publice-section');
     document.getElementById('news-publice-section').innerHTML = '';
     const buttonHidden = document.getElementById('hidden-button');

            if (IsTrue) {
                buttonHidden.classList.add('hidden');
            }else{
                if (NewsPaper > 4) {
                    buttonHidden.classList.remove('hidden');
                }
            }    
            if (!IsTrue) {
                NewsPaper = NewsPaper.slice(0,4);
            }

    NewsPaper.forEach(singleNews => {
        const childDiv = document.createElement('div');

         

        // console.log(singleNews._id);
        childDiv.innerHTML = `
        <div class="block gap-6 items-center bg-slate-800 shadow-xl p-6 rounded-xl mb-3 md:block xl:flex">
        <div class="md:w-[400px] mb-5 ">
            <img class="w-[400px] md:h-[300px]" src="${singleNews.image_url}" alt="loading img">
        </div>
        <div class=" md:w-[800px] space-y-4 flex-1">
            <h1 class="text-2xl font-semibold">${singleNews.title}</h1>
            <p class="md:w-[800px] md:truncate">${singleNews.details}</p>
            <div class="flex justify-between items-center">
                <div class="flex w-60 gap-5 items-center">
                    <div><img class="w-[60px] rounded-[100%]" src="${singleNews.author?.img}" alt=""></div>
                    <div>
                        <h1>${singleNews.author.name}</h1>
                        <h1>${singleNews.author.published_date}</h1>
                    </div>
                </div>
                <div class="flex">
                    <div class="mr-3"><img src="./img/carbon_view.png" alt=""></div>
                    <div>${singleNews?.total_view?singleNews?.total_view:'Coming Soon'}</div>
                </div>
                 
                <div>
               

                  <div id="rating-id" class="rating">${singleNews?.rating?.badge}
                       ${ratingDynamic('rating-id',singleNews)}
                  </div>
                </div>
                <div><img src="./img/bi_arrow-right-short.png" alt=""></div>
            </div>
        </div>
    </div>
        
        `
        getNewArea.appendChild(childDiv)
        
    });
    
    
}

newsDataLoad('01')

    const selectElement = document.getElementById('sortArea-id');
   
    selectElement.addEventListener('change', function (event) {
        
        const selectElement = event.target.value ;

        
        newsDataLoad(selectElement)
       
    });


    const spinnerAdd = (stop) =>{
        const getSpinnerSection = document.getElementById('spinner-loading');
        const setErrorValue = document.getElementById('no-dataAvailable');
        const setHiddenValue = document.getElementById('hidden-errorValue');
        if (stop) {
            getSpinnerSection.classList.add('hidden')
            setHiddenValue.classList.add('hidden');
            if (stop === 'hidden') {
                setErrorValue.innerText = 'No Data Available';
                setHiddenValue.classList.remove('hidden');
            }
        } 
        else{
            getSpinnerSection.classList.remove('hidden');
        }
       
        
    }
   
    const searchaseValu = () =>{
        const getValue = document.getElementById('inputValue').value;
        console.log(getValue);
            newsDataLoad(getValue)
    }

   

    
  
const ratingDynamic = (getId,singleNews) =>{
    const ratingId = document.getElementById(getId);
    console.log(getId,singleNews);
    
    let radioInput ;
    if (ratingId) {
        const ratingNumber = singleNews.rating.number;
        const flowerRatting = Math.floor(ratingNumber)
        console.log(flowerRatting);
        for (let i = 1; i <= 5; i++) {
            radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'rating';
            radioInput.className = 'mask mask-star-2 bg-green-500';
            if (i <= flowerRatting) {
                radioInput.checked = true;
            }
            radioInput.value = i;

            
        }
        ratingId.appendChild(radioInput);
        console.log(ratingId);
        console.log(radioInput);
    }


}
//ismailjosim99@gmail.com