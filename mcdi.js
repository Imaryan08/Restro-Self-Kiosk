let burgers = JSON.parse(localStorage.getItem('burger'));
let beverages = JSON.parse(localStorage.getItem('beverages'));
let desserts = JSON.parse(localStorage.getItem('desserts'));
let favMeals = JSON.parse(localStorage.getItem('favMeal'));

function beverage(){
    createSubMenu(beverages);
}
function burger(){
    createSubMenu(burgers);
}
function favMeal(){
    createSubMenu(favMeals);
}
function dessert(){
    createSubMenu(desserts);
}




let cart = JSON.parse(localStorage.getItem('cart')) || [];


let sum = 0;
let count = 0;
let i = 5;


function createSubMenu(x){
    let subMenu = document.querySelector('.subMenu');
    subMenu.innerHTML = null;
    subMenu.style.background = '#fff';

    x.map(function(elem){

        let div = document.createElement('div');
        let detailDiv = document.createElement('div');
        
        let imgDiv = document.createElement('div');
        let img = document.createElement('img');
        img.src = elem.img_url;
        imgDiv.append(img);

        let name = document.createElement('h2');
        name.innerHTML = elem.name;

        let cal = document.createElement('h4');
        cal.innerHTML = elem.cal;
        
        let price = document.createElement('h5');
        price.innerHTML = elem.price;

        let addToOrder = document.createElement('button');
        addToOrder.innerHTML = 'Add to order';

        // append
        detailDiv.append(name, cal, price, addToOrder);
        div.append(imgDiv,detailDiv);
        document.querySelector('.subMenu').append(div);

        // Add to order
        addToOrder.addEventListener('click',function(){
            addToOrder.innerHTML = 'Added';
            addToOrder.style.background = 'red';
            cart.push(elem);
            localStorage.setItem('cart',JSON.stringify(cart));
            let total = document.querySelector('.total');
            let item = document.querySelector('.item');

            //Removing all the chracters except number
            let str = elem.price;
            str = +str.replace(/[^0-9]/g, '');
            sum += str;
            
            total.innerHTML = `₹${sum}`;
            item.innerHTML = `${++count}`;

        });
    })
}

//Order Food
document.querySelector('.orderFood').addEventListener('click',function(){

    let myPromise = new Promise(function (resolve, reject){
        if(sum  && count ){
            resolve(`Your order will be ready in ${i} seconds`);
        }else{
            reject("Please add something in your order");
        }
    })

    myPromise.then(function(res){
        let id = setInterval(function(){
            message(`Your order will be ready in ${i} seconds`,'green');
            if(i === 0){
                clearInterval(id);
                let subMenu = document.querySelector('.subMenu');
                subMenu.innerHTML = null;

                let cart = JSON.parse(localStorage.getItem('cart'));
                cart.map(function(elem){
                    let img = document.createElement('img');
                    img.src = elem.img_url;
                    img.style.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';
                    img.style.margin = '10px 10px 10px 40px';
                    img.style.padding = '20px 0';
                    img.style.width = '200px';
                    subMenu.style.background = '#fff';

                    let para = document.createElement('p');
                    para.setAttribute('class','orderId');
                    para.innerHTML = `<span style='color: green; font-size: 16px;'> Thank you 🎉 </span>Your Order ID: ${Math.round(Math.random()*100000000)}`;
                    subMenu.append(para,img);
                    document.querySelector('.orderId').style.display = 'block';

                    localStorage.removeItem('cart');
                })
                


            }
            i--;
        },1000)
    })

    myPromise.catch(function(err,red){
        message(err,'red');
    })

})



function message(x,y){
    document.querySelector('.subMenu').innerHTML = null;
        let h1 = document.createElement('h1');
        h1.innerHTML = x;
        let subMenu = document.querySelector('.subMenu');
        subMenu.append(h1)
        h1.style.textAlign = 'center';
        h1.style.padding = '10px';
        h1.style.color = y;
        subMenu.style.background = 'black';
}