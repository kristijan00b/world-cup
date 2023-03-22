var allCountryList = ["Afghanistan", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Albania", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]
var qualifiedCountry = new Array(32)
var groupStage = new Array(8)
var knockoutStage = new Array(16)
var quarterfinal = new Array(8)
var semifinal = new Array(4)
var final = new Array(2)

function randomNumber(num) {
    let random = Math.floor(Math.random() * num)
    return random
}

function Team(name, points, goals, currently) {
    this.name = name;
    this.points = 0;
    this.win = 0;
    this.draw = 0;
    this.lose = 0;
    this.goals = 0;
    this.conceded = 0;
    this.currently = 0;
}

for (let i = 0; i < qualifiedCountry.length; i++) {
    let r = randomNumber(174 - i)
    qualifiedCountry[i] = new Team(allCountryList[r])
    allCountryList.splice(r, 1)
}


var htmlString=""

for (let i = 0; i < groupStage.length; i++) {
    groupStage[i] = new Array(4)
    for (let j = 0; j < 4; j++) {
        groupStage[i][j] = qualifiedCountry[0]
        qualifiedCountry.splice(0, 1)
       }
    
}


for (let i = 0; i < groupStage.length; i++) {
    console.log(i + 1, groupStage[i])
    
        
    htmlString=`<table class="groupMatchOne"><caption>Group ${i+1}</caption>`
    for (let j = 0; j < 4; j++) {
        for (let k = j + 1; k < 4; k++) {
            groupStage[i][j].currently = randomNumber(5)
            groupStage[i][k].currently = randomNumber(5)
            groupStage[i][j].goals += groupStage[i][j].currently
            groupStage[i][k].goals += groupStage[i][k].currently

            groupStage[i][j].conceded += groupStage[i][k].currently
            groupStage[i][k].conceded += groupStage[i][j].currently
            if (groupStage[i][j].currently > groupStage[i][k].currently) {
                groupStage[i][j].points += 3
                groupStage[i][j].win++
                groupStage[i][k].lose++
            } else if (groupStage[i][j].currently < groupStage[i][k].currently) {
                groupStage[i][k].points += 3
                groupStage[i][j].lose++
                groupStage[i][k].win++
            } else {
                groupStage[i][j].points += 1
                groupStage[i][k].points += 1
                groupStage[i][j].draw++
                groupStage[i][k].draw++
            }
            console.log(groupStage[i][j].name, " ", groupStage[i][j].currently, " - ", groupStage[i][k].currently, " ", groupStage[i][k].name)
            
            htmlString+=`<tr><td>${groupStage[i][j].name}.</td><td>${groupStage[i][j].currently}</td> <td>:</td>
            <td>${groupStage[i][k].currently}</td> <td>${groupStage[i][k].name}</td><tr>`
            
        }
        
    }
    htmlString+=`</table><br>`
        document.getElementById("groupMatch").innerHTML+=htmlString
    groupStage[i].sort(function (a, b) {
        return b.points - a.points
    })
}
for (let i = 0; i < groupStage.length; i++) {
    htmlString=`<table class="groupsOne"><tr class="headGroup"><th></th><th>Group ${i+1}</th><th>P</th> <th>W</th><th>D</th><th>L</th> </tr>`
    for (let j = 0; j < 4; j++) {
        htmlString+=`<tr><td>${j+1}.</td><td>${groupStage[i][j].name}</td> <td>${groupStage[i][j].points}</td> <td>${groupStage[i][j].win}</td> <td>${groupStage[i][j].draw}</td> <td>${groupStage[i][j].lose}</td><tr>`
    }
    htmlString+=`</table><br>`
    document.getElementById("groups").innerHTML+=htmlString
}

let brojac = 0
for (let i = 0; i < groupStage.length; i++) {
    for (let j = 0; j < 2; j++) {
        knockoutStage[brojac] = groupStage[i][j]
        brojac++
    }
}
console.log('Top 16',knockoutStage)

brojac=0
htmlString2=`<br><h3>KnockoutStage</h3>`
document.getElementById("knockout").innerHTML+=htmlString2
for (let i = 0; i < knockoutStage.length/2 ; i++) {
    console.log(i, "-", i + 8) 
    let x=match(knockoutStage[i], knockoutStage[i + 8],i,i+8) 
    console.log('------------',x.name)
    quarterfinal[brojac]=x
    brojac++
}
htmlString2=`<br><h3>Quarterfinal</h3>`
document.getElementById("knockout").innerHTML+=htmlString2
console.log('Top 8',quarterfinal)

brojac=0
for (let i = 0; i < quarterfinal.length/2 ; i++) {
    console.log(i, "-", i +4) 
    let x=match(quarterfinal[i], quarterfinal[i + 4],i,i+4) 
    console.log('------------',x.name)
    semifinal[brojac]=x
    brojac++
}
htmlString2=`<br><h3>Semifinal</h3>`
document.getElementById("knockout").innerHTML+=htmlString2
console.log('Top 4',semifinal)

brojac=0
for (let i = 0; i < semifinal.length/2 ; i++) {
    console.log(i, "-", i + 2) 
    let x=match(semifinal[i], semifinal[i + 2],i,i+2) 
    console.log('------------',x.name)
    final[brojac]=x
    brojac++
}
htmlString2=`<br><h3>Final</h3>`
document.getElementById("knockout").innerHTML+=htmlString2
console.log('Top 2',final)
var htmlString2

let x=match(final[0], final[1],0,1) 
    console.log('------------',x.name)
    console.log('POBEDNIK JE ',x.name)

    htmlString2=`<br><h2>WINNER IS <span style="color:green;text-transform: uppercase; ">${x.name}</span></h2><br>`
document.getElementById("knockout").innerHTML+=htmlString2


function match(team1, team2,i,j) {
    team1.currently = randomNumber(5)
    team2.currently = randomNumber(5)
    console.log(team1.name, team1.currently, "-", team2.currently, team2.name)
    team1.goals += team1.currently
    team2.goals += team2.currently

    team1.conceded += team2.currently
    team2.conceded += team1.currently

    
    if (team1.currently > team2.currently) {
        team1.win++
        team2.lose++
        htmlString2=`<p>${team1.name} ${team1.currently} : ${team2.currently} ${team2.name}</p>`
        document.getElementById("knockout").innerHTML+=htmlString2
        return team1
    } else if (team1.currently < team2.currently) {
        team1.lose++
        team2.win++
        htmlString2=`<p>${team1.name} ${team1.currently} : ${team2.currently} ${team2.name}</p>`
        document.getElementById("knockout").innerHTML+=htmlString2
        return team2
    } else {
        return match(team1, team2)
    }

}

