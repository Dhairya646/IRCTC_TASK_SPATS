//taking reference of the element in html file
const date=document.getElementById("time-and-date")

const language=document.getElementById("language")

//this function adds "0" to numbers less than 10
function format(num){
    return num<10? "0"+num:num;
}

//this function displays the time on website and calls format function for adding leading zeros to number less than 10
function showTime(){
    const time= new Date()
    const day=format(time.getDate())
    const hours=format(time.getHours())
    const minutes=format(time.getMinutes())
    const seconds=format(time.getSeconds())
    date.innerText=`${day}-${time.toLocaleString("default",{month: "short"})}-${time.getFullYear()}[${hours}:${minutes}:${seconds}]`
}

//setting interval as 1 second so that it updates every second
setInterval(showTime,1000)
//running the function once to avoid 1s delay
showTime() 

// ------------------------------------------------------------------------------------//

//station selection logic
let stations=[]

async function loadStations() {
    const res =await fetch("stations.json")
    const data=await res.json()
    stations=data.stations
}
loadStations()

const input=document.getElementById("fromInput")
const toInput=document.getElementById("toInput")
const dropdown=document.getElementById("suggestions")
const dropdown_to=document.getElementById("dropdown-to")

//from station selection
let currentListFrom = []

input.addEventListener("input",()=>{
    const value=input.value.toLowerCase()
    dropdown.innerHTML=""

    if(!value) return

    currentListFrom=stations.filter(station=>station.name.toLowerCase().includes(value))

    currentListFrom.slice(0,5).forEach(station=>{
        const div=document.createElement("div")
        div.textContent=`${station.name} (${station.code})`

        div.onclick=()=>{
            input.value=div.textContent
            dropdown.innerHTML=""
        }
        dropdown.appendChild(div)
    })
})

//enter key enters first option
input.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        e.preventDefault()

        if(currentListFrom.length>0){
            input.value=`${currentListFrom[0].name} (${currentListFrom[0].code})`
            dropdown.innerHTML=""
        }
    }
})

//to station selection

let currentListTo=[]

toInput.addEventListener("input",()=>{
    const value=toInput.value.toLowerCase()
    dropdown_to.innerHTML=""

    if(!value) return

    currentListTo=stations.filter(station=>station.name.toLowerCase().includes(value))

    currentListTo.slice(0,5).forEach(station=>{
        const div=document.createElement("div")
        div.textContent=`${station.name} (${station.code})`

        div.onclick=()=>{
            toInput.value=div.textContent
            dropdown_to.innerHTML=""
        }
        dropdown_to.appendChild(div)
    })
})

//enter key enters first option
toInput.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        e.preventDefault()

        if(currentListTo.length>0){
            toInput.value=`${currentListTo[0].name} (${currentListTo[0].code})`
            dropdown_to.innerHTML=""
        }
    }
})

// -------------------------------------------------------------- //

//Date selection 

const dateInput=document.getElementById("journeyDate")

const today= new Date()
const formattedDate = today.toISOString().split("T")[0]

dateInput.value=formattedDate

dateInput.min=formattedDate