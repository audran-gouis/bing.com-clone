// Variable declarations
const searchIcon = document.querySelector(".fa-search")
const text = document.querySelector(".text")
const triangle = document.querySelector(".triangle")
const circle  = document.querySelector(".circle")
const searchbar  = document.querySelector(".searchbar")
const itemList = document.querySelector(".item-list")
const newsGridContainer = document.querySelector(".news-grid-container")

// Display triangle and text when icon are hovered
searchIcon.addEventListener('mouseover', ()=>{
    text.style.display = "block"
    triangle.style.display = "block"
})

// Hide triangle and text when icon are not hovered
searchIcon.addEventListener('mouseout', ()=>{
    text.style.display = "none"
    triangle.style.display = "none"
})

//Go to Bing copilot link when clicking the circle
circle.addEventListener('click', ()=>{
    window.open("https://www.bing.com/chat", '_blank')
})
// change cursor when hovering the circle 
circle.addEventListener('mouseover', ()=>{
    circle.style.cursor = "pointer"
})

// searchbar trigger a search on bing when clicking on the search icon (open a new tab if ctrl is pressed)
searchIcon.addEventListener("click", (e)=>{
    if (e.ctrlKey) {
        window.open(`https://www.bing.com/search?q=${searchbar.value}`, "_blank")
    } else {
        window.location.href = `https://www.bing.com/search?q=${searchbar.value}`
    }     
})

// searchbar trigger a search on bing when pressing enter
searchbar.addEventListener("keypress", (e)=>{
    if (e.key === "Enter") {
        window.location.href = `https://www.bing.com/search?q=${searchbar.value}`
    }
})

// Function to search for landscape photos
async function searchLandscapePhotos(query) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${accessKeyUnsplash}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept-Version': 'v1',
                'Authorization': `Client-ID ${accessKeyUnsplash}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        } else {
            const data = await response.json();
            let randomNumber = Math.ceil(Math.random() *9) 
            let urlImg = `url(${data.results[randomNumber].urls.full})`
            document.body.style.backgroundImage = urlImg
            document.body.style.backgroundSize = "100% 100%"
            }
    }
    
    catch (error) {
        console.error('Error fetching data from Unsplash:', error)
    }
}

searchLandscapePhotos('landscapes')
