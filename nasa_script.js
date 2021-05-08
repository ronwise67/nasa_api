const baseURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
const key = 'KeZ3qQ7ZdWhXyXqztFTRIqBdTA7nlkRGmKaIFW4U'

//Search Form
const curiosity = document.querySelector("Curiosity")
const opportunity = document.querySelector("Opportunity")
const spirit = document.querySelector("Spirit")
const searchForm = document.querySelector('form')

// Image container
const imageContainer = document.querySelector(".image-container")


//Results Navigation
const carousel = document.querySelector('.carousel-inner')
const rover = document.getElementById("inputGroupSelect01")
const sol = document.querySelector('#sol')

let displayNav = false

//Results Section
const selection = document.querySelector('selection')

// These are event listeners
searchForm.addEventListener('submit', fetchResults)

// This gets the json results
function fetchResults(e) {
    e.preventDefault()

    console.log(rover.value, sol.value)
    url = baseURL + rover.value + '/photos' + '?api_key=' + key + '&sol=' + sol.value

    fetch(url)
        .then(res => res.json())
        .then(json => {
            displayResults(json)
        })
}

// This takes the json data from fetchResults and gives us access to the json data
function displayResults(json) {
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild)
    }

    let photos = json.photos

    if (photos.length > 0) {
        for (let i = 0; i < 25; i++) {

            // I'm keeping some of this code to revisit later 

            //     let slideShowDiv = document.createElement('div')
            //     let photo = document.createElement('img')
            //     let cameraInfo = document.createElement('p')

            //     slideShowDiv.className = "slideshow-item"
            //     photo.className = "d-block w-100"
            //     cameraInfo.className = "carousel-caption d-none d-md-block"

            //     let ssPic = photos[i]

            //     title.innerHTML = ssPic.data[0].title.substring(0, 20)
            //     description.innerHTML = ssPic.data[0].description

            //     slideShowDiv.appendChild(photo)
            //     carousel.appendChild(slideShowDiv)

            //     document.querySelector('.carousel-inner :first-child').classList.add('active')

            console.log(photos[i].camera)

            let photo = document.createElement('img')
            photo.src = photos[i].img_src
            photo.className = "image"
            imageContainer.appendChild(photo)

            let name = document.createElement('p')
            name.innerText = photos[i].camera.full_name
            name.className = "cameraNameText"
            imageContainer.appendChild(name)

        }
    } else {
        let nothing = document.createElement('h2')
        nothing.innerText = "Sorry, nothing to see here!"
        carousel.appendChild(nothing)
    }
}
