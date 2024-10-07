// 1. Fetch, Load and Show Categorieis on html

//display time
function getTime(time)
{
    //get hour ,seconds
    const hour = parseInt(time/3600);
    let remaining = time % 3600;
    const minute =parseInt( remaining/60);
    remaining =remaining % 60;
    return `${hour} hour ${minute} minute ${remaining} seconds ago`;

}

const removeActiveClass=()=>{
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for(let btn of buttons)
    {
        btn.classList.remove("active");
    }
}

//create load Categories
 const loadCategories = () => {
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then ((res)=> res.json())
    .then((data) => displayCategories(data.categories))  //sudhu catagories lagbe tai
    .catch((error) => console.log(error));
 };

 //create load Videos
 const loadVideos = (searchText = "" ) => {  //function jokhn call korbe tokhn jodi parameter na dewa thake tahole eibhabe "" default value set kora jay
    //fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then ((res)=> res.json())
    .then((data) => displayVideos(data.videos))  //sudhu catagories lagbe tai
    .catch((error) => console.log(error));
 };



const loadCategoriesVideos = (id) =>
    {
        fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then ((res)=> res.json())
        .then((data) => {

            //baki btn er color remove krte call
            removeActiveClass();

            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active");  //css add hosie
            displayVideos(data.category);
        })  //sudhu catagories lagbe tai
        .catch((error) => console.log(error));
    };

//create load details (another way of fetching data)
const loadDetails =async(videoID)=> {
   const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
   const res=await fetch(uri);
   const data = await res.json();
   displayDetails(data.video);

};
// detail display er jonno(Modal use kore)
const displayDetails = (video) =>
{
  const detailContainer = document.getElementById('modal-content');

  detailContainer.innerHTML=
  `<img src=${video.thumbnail} />
  <p>${video.description}</p>
  `;
//way-1
    //document.getElementById("showModalData").click();

  //way-2
  document.getElementById("customModal").showModal();
};


//create Display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");  //button er id ta ke call korsi

    categories.forEach((item) => {  //prottek item show er jnno loop
        console.log(item);
///////////////////////////////////////
        // //create button
        // const button = document.createElement('button');
        // button.classList='btn';
        // button.innerText=item.category ;

        // //add button to category container
        // categoryContainer.append(button);
 //////////////////////////////////////////////

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML=
    `<button id="btn-${item.category_id}" class="btn category-btn"
     onclick="loadCategoriesVideos(${item.category_id})" >
    ${item.category}
    </button>
    `;

    categoryContainer.append(buttonContainer);

    });
};
//create Display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");  //button er id ta ke call korsi
    // button e click korle container e ja ache aage clear kora lagbe tar jonno
    videoContainer.innerHTML= "";

    //videos na thakle eta show korbe
    if(videos.length == 0)
    {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML=
        `
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center item-center>
        <img src="Icon.png" />
        <h2 class="text-center text-xl font-bold">No content here in th  is category.</h2>
        </div>
        `;
        return ;
    }
    else{
        videoContainer.classList.add("grid");
    }

    videos.forEach((video) => {  //prottek item show er jnno loop
        console.log(video);

        //create button
        const card = document.createElement("div");
        card.classList= "card card-compact"
       card.innerHTML=
 ` <figure class="h-[200px] relative">
     <img
      src=${video.thumbnail}
      class="h-full w-full object-cover" 
      alt="" />

      ${
        video.others.posted_date?.length == 0 
        ? "" : ` <span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white">${getTime(video.others.posted_date)}</span>`
      }
     
  </figure>
  <div class="px-0 py-2 flex gap-2">
        <div>
           <img class="w-10 h-10 rounded-full " src= ${video.authors[0].profile_picture} alt="">
         </div>
         <div>
          <h2 class="font-bold "> ${video.title}</h2>
          <div class="flex items-center gap-2">
          <p class="text-gray-400">${video.authors[0].profile_name} </p>

          ${video.authors[0].verified == true ? '<img class="w-5" src=" https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">' :""}
         
          </div>
        
          <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-xm btn-error">Details</button></p>
         </div>
   </div>
       `;

       videoContainer.append(card);

    });
};

// search er jonno
document.getElementById("searchInput").addEventListener("keyup",(e)=>{
    loadVideos(e.target.value);
})

loadCategories();
loadVideos();