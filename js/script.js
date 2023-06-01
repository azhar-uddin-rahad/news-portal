
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
const cardContainer=document.querySelector(".cardContainer")
const displayNews=(data)=>{
    const dataLength=document.querySelector('#countedItem');
    dataLength.innerHTML = data.length;
    data.forEach((item)=>{
        cardContainer.innerHTML += `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div> `;
      
        

    })
}

