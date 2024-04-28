let keyWord = "oppo"; // Set default keyword globally
let pageLimit = 20;
let showAll = false;
let mobileDetails;

async function getPhoneData() {
    let response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${keyWord}`);
    let mobileList = await response.json();
    mobileDetails = mobileList.data;
    console.log(mobileDetails);
    displayPhones(mobileDetails);
}

function displayPhones(mobileDetails) {
    let phonDiv = document.getElementById("displayPhones");
    phonDiv.innerHTML = ""; // Clear the previous content
    mobileDetails.forEach((element, index) => {
        if (!showAll && index >= 9) return; // Show only 9 phones initially
        let frame = document.createElement("div");
        frame.classList.add("onePhone");

        let phnPic = document.createElement("img");
        phnPic.classList.add("phnPic");
        phnPic.src = element.image;
        
        let name = document.createElement("h2");
        name.innerText = element.phone_name;

        let disc = document.createElement("p");
        disc.innerText = "You may not get another chance to grab this deal so hurry up!";

        let showMoreBtn = document.createElement("button");
        showMoreBtn.classList.add("button-15");
        showMoreBtn.innerText = "Show Details";
        showMoreBtn.addEventListener("click", () => showAllDetailsGet(element.slug));

        frame.append(phnPic);
        frame.append(name);
        frame.append(disc);
        frame.append(showMoreBtn);
        phonDiv.append(frame);
    });
}
async function showAllDetailsGet(phoneId){
    try {
        // You can pass the phone id dynamically if you want to show details of a specific phone
        // const phoneId = "oppo_find_x5-11378";
        const ress = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
        const data = await ress.json();
        const extraData = data.data;
        console.log(extraData);
        eachDetails(extraData);
        // Display phone details or do whatever you want with the phone details
    } catch (error) {
        console.error("Error loading phone details:", error);
    }
} 
function eachDetails(specs){
    let detailImg = document.getElementById("imgPhn");
    let detailName = document.getElementById("detailName");
    let brandDetail = document.getElementById("brandDetail");
    let specsDetail = document.getElementById("specsDetail");
    let detailsRelease = document.getElementById("detailsRelease");

    detailImg.src = specs.image;
    detailName.innerText = specs.name;
    brandDetail.innerText = "Brand:" + specs.brand;
    let str = "";
    let features = specs.mainFeatures;
    for(let key in features){
        str += key + ": " + features[key] + "\n";
    }
    specsDetail.innerText = str;
    detailsRelease.innerText = specs.releaseDate;
    extraInfos.showModal();
}

let showMoreBtn = document.getElementById("showMorebtn");
showMoreBtn.addEventListener("click", () => {
    showAll = true;
    showMoreBtn.style.display = "none"; // Hide the button after clicking
    displayPhones(mobileDetails);
});

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
    keyWord = document.getElementById("searchInput").value; // Update keyword globally
    getPhoneData(); // Fetch data based on the new keyword
});

document.addEventListener("DOMContentLoaded", getPhoneData); // Call getPhoneData when the page loads
