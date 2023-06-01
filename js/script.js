
fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res => res.json())
.then(data =>displayData(data.data.news_category))



const displayData=(data)=>{
    const ul=document.querySelector('.ul');
    data.forEach(categoric => {
        ul.innerHTML += `<li onclick="loadFunc(${(categoric.category_id)})" > ${categoric.category_name}</li>`;
        
    });
}
const loadFunc=async(id)=>{
    console.log(id)
    const res= await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    const data= await res.json();
    //console.log(data)
  displayNews(data.data)
}
loadFunc(1)
const cardContainer=document.querySelector(".cardContainer");
const displayNews=(data)=>{
    console.log(data);
    cardContainer.innerHTML= "";
    const dataLength=document.querySelector('#countedItem');
    dataLength.innerHTML = data.length;
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
                    <h6>${item.author.name}</h6>
                    <span>${item.author.published_date}</span>
                </div>
                </div>

                <div class="d-flex gap-2">
                <p><i class="fa-regular fa-eye"></i></p>
                <h5>${item.total_view} M</h5>
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
}


const loadModal=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
}