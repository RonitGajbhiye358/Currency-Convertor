const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//for of - to iterate in array
for (let select of dropdown) {
    //for in because we have to iterate key of object
    for (const currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);

        select.addEventListener("change",(evt) => {
            updateFlag(evt.target);
        });
    }
};
const getExchangeRate = async () =>{
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;
    if (amtval === "" || amtval <= 0){
        amtval = 1;
        amt.value = "1"; //important to show on box 
    }

    const URL = `${BASE_URL}/currencies/${fromcurr.value.toLowerCase()}.json`

    let response = await fetch(URL);

    if(!response.ok){
        msg.innerText = "failed to fetch the exchange rate .....";
        return;
    }

    let data = await response.json();

    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalamt = amtval * rate ;
    
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt.toPrecision(4)} ${tocurr.value}`;
};

const updateFlag = (element) =>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    
    // difficult  to understand 
    element.parentElement.querySelector("img").src = `https://flagsapi.com/${countryCode}/flat/64.png`; 
    // check again 
};

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    getExchangeRate();
});

window.addEventListener("load", () => {
    getExchangeRate();
  });