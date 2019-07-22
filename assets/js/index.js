"use strict";

var autocomplete = document.getElementById("autocomplete");

// Bind Click event to the menu button
document.querySelector('.menu-opener-inner').addEventListener('click', toggleClass);

function toggleClass() {
    this.parentNode.parentNode.classList.toggle('open');
    this.classList.toggle('active');
}

function getSearchValue(val) {
    var minlength = 2;
    if (val.length > minlength) {
        setTimeout(function () {
            searchResult(val);
        }, 300);
    }
};

function setSearchValue(result) {
    if (result.totalResults > 0) {
        var thisItems = result.items,
            maxItem = 3,
            resultList = "",
            synonymList = "",
            productList = "";
        autocomplete.classList.add("active");
        thisItems.forEach(function (value, index) {
            console.log(value);
            if (index < maxItem) {
                resultList += "<li><a href='" + value.productUrl + "' title='" + value.name + "' class='link'>" + value.name + "</a></li>";
                synonymList += "<li><a href='" + value.productTrackingUrl + "' title='" + value.categoryPath + "' class='link'>" + value.categoryPath + "</a></li>";
                productList += "<li><a href='" + value.productUrl + "' class='link'><img src='" + value.thumbnailImage + "' alt='" + value.name + "' /> <span class='description'>" + value.name + "</span></a></li>";
            }
        });
        document.querySelector(".search-title").textContent = result.query;
        document.querySelector(".result-list").innerHTML = resultList;
        document.querySelector(".synonym-list").innerHTML = synonymList;
        document.querySelector(".product-list").innerHTML = productList;
        document.querySelector(".product-title .text").textContent = result.query;
    } else {
        autocomplete.classList.remove("active");
    }
};
// Close Autocomplete
function closeAutocomplete(val) {
    '' === val ? autocomplete.classList.remove("active") : autocomplete.classList.add("active");
}

function searchResult(val) {
    var s = document.createElement("script");
    s.src = "http://api.walmartlabs.com/v1/search?query=" + val + "&format=json&apiKey=732rkzdrpr9gc6zvd5tr6n4z&callback=setSearchValue";
    document.body.appendChild(s);
}