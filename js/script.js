fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res => res.json())
.then(data =>displayData(data.data.news_category))



const displayData=(data)=>{
    console.log(data)
    const ul=document.querySelector('.ul');

    data.forEach(categoric => {
        ul.innerHTML += `<li onclick="${loadData(categoric.category_id)}" > ${categoric.category_name}</li>`;
        
    });
}

const loadData=(id)=>{
    console.log(id)
}