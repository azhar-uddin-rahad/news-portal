
fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res => res.json())
.then(data =>displayData(data.data.news_category))

const displayData=(data)=>{
    const ul=document.querySelector('.ul');
    data.forEach(categoric => {
        ul.innerHTML += `<li onclick="loadFunc(${(categoric.category_id)})" > ${categoric.category_name}</li>`;
        
    });

}

const spinnerFunc=(isLoading)=>{
  const spinnerSection=document.querySelector("#spinner");
  
  if(isLoading){
    spinnerSection.classList.remove("d-none");
  }
  else{
    spinnerSection.classList.add("d-none");
  }

}
const loadFunc=async(id)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    const data= await res.json();
    //console.log(data)
    spinnerFunc(true);
    
    displayNews(data.data)
    
 
}
loadFunc(1);



const cardContainer=document.querySelector(".cardContainer");
let newValue;

/* const selectedValue=(data)=>{
    const selectedMenu=document.querySelector("#selectMenu");
     let valueChange=selectedMenu.value;
     test(selectedMenu.value)
    
    }

    function test(aa){
      console.log(aa)
    } */
    
   
    
const displayNews=(data)=>{
    data.sort((p1, p2) => (p1.total_view < p2.total_view) ? 1 : (p1.total_view > p2.total_view) ? -1 : 0);
    cardContainer.innerHTML= "";
    const dataLength=document.querySelector('#countedItem');
    dataLength.innerHTML = data.length;
    setTimeout(function(){
      data.forEach((item)=>{
        cardContainer.innerHTML += `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src=${item?.image_url} class="img-fluid rounded-start w-100" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item?.title}</h5>
              <p class="card-text">${item.details.length > 600 ? item.details.slice(0,600):  item.details}</p>
             <div class="d-flex justify-content-between align-items-center">
                <div class="authorInfo d-flex gap-3 justify-content-between align-items-center">
                <div class="authorImg">
                <img class="w-100 rounded-circle" src="${item.author.img}" alt="" />
                </div>
                <div class="authorName">
                    <h6>${item.author.name ? item.author.name : "Nodata Found"}</h6>
                    <span>${item.author.published_date ? item.author.published_date : "Nodata Found"}</span>
                </div>
                </div>

                <div class="d-flex gap-2">
                <p><i class="fa-regular fa-eye"></i></p>
                <h5>${item.total_view ? item.total_view +"M" : "Not Found"} </h5>
                </div>
                <div class="d-flex gap-2 align-items-center">
                    <p style="color:orange; font-size:20px"><i class="fa-solid fa-star"></i></p>
                    <p style="color:orange; font-size:20px"><i class="fa-solid fa-star"></i></p>
                    <p style="color:orange; font-size:20px"><i class="fa-solid fa-star-half-stroke"></i></p>
                    <p><i class="fa-regular fa-star" style="color:orange; font-size:20px"></i></p>
                    <p><i class="fa-regular fa-star" style="color:orange; font-size:20px"></i></p>
                </div>
                <div>
                <button type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModal('${item._id}')"  style="border:none; background:transparent">
                <i class="fa-solid fa-arrow-right" style="color: #7913f6; font-size:20px"></i>
                </button>
                </div>
             </div>
            </div>
          </div>
        </div>
      </div> `;
    })
    spinnerFunc(false)
    } ,3000) 
   
    
}


const loadModal=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => displayModal(data.data))
}


const modalContainer=document.querySelector(".modal-content");
console.log(modalContainer);

const displayModal=(data)=>{
    data.forEach((newsDetails)=>{
        modalContainer.innerHTML =`
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${newsDetails.title.length > 30 ? newsDetails.title.slice(0,30): newsDetails.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="h-75 w-100">
        <img class=" w-100" src="${newsDetails.image_url}" alt="" />
        </div>
        <div class="details"> 
        <p>${newsDetails.details.length > 400 ? newsDetails.details.slice(0,400):  newsDetails.details}</p>
     </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
        `
        
    })
}





