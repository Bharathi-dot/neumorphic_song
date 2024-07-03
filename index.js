

let input = document.getElementById('text');
const button = document.getElementById('bun');
const container = document.querySelector('.container');
const countbtn = document.getElementsByClassName('countbtn')[0];
var tableBody = document.getElementsByClassName('tblbody')[0];
var counttext = document.getElementsByClassName('badge')[0];


const tour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

tour.addStep('Step1', {
  text: '🎵 I am the groove for filling your favorite songs! Start Your Day With Motivate songs ❤️',
  attachTo: '#text top',
  buttons: [
    {
      text: 'Next',
      action: function () {
        input.placeholder = "";
        tour.next();
      }

    }
  ]
});

tour.addStep('Step2', {
  text: "🎼 If you forgot to fill in the groove, don't click me. If you tap me, you will see my dance moves! When you fill the groove with your songs, it becomes the starting place. Until then, you can play with me! 🎶",
  attachTo: '#bun right',
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
});

tour.addStep('Step3', {
  text: " 🔢 you will see your heart's songs count here  🎶",
  attachTo: '.countbtn left',
  buttons: [
    {
      text: 'next',
      action: tour.next
    }
  ]
});

tour.addStep('Step4', {
  text: "🔊 Welcome to your musical haven! You will see your playlist here. 📝",
  attachTo: '.out-table top',
  buttons: [
    {
      text: 'Enjoy !',
      action: tour.complete
    }
  ]
});


function isFirstTimeUser() {
  return localStorage.getItem('onboardingCompleted') == null;
}

function startOnboarding() {
  if (isFirstTimeUser()) {
    input.placeholder = "Enter the song you want to add"
    tour.start();
  }
}

tour.on('complete', function () {
  input.placeholder = ""
  localStorage.setItem('onboardingCompleted', 'true');
});


setTimeout(() => {
  startOnboarding();
}, 1000);


button.addEventListener('click', function () {
  if (!input.value) {
    const computedStyle = window.getComputedStyle(button);
    const currentTranslateX = parseFloat(computedStyle.transform.split(',')[4]);
    const currentTranslateY = parseFloat(computedStyle.transform.split(',')[5]);

    button.style.setProperty('--S-translation-distancex', `${currentTranslateX}px`);
    button.style.setProperty('--S-translation-distancey', `${currentTranslateY}px`);

    const randomTranslationx = (Math.random() * 900) - 100;
    const randomTranslationy = (Math.random() * 850) - 700;

    button.style.setProperty('--translation-distancex', `${randomTranslationx}px`);
    button.style.setProperty('--translation-distancey', `${randomTranslationy}px`);
  }

  button.classList.remove('move');
  if (!input.value) {
    setTimeout(function () {
      button.classList.add('move');
    }, 50);
  }
});

input.addEventListener('input', function () {
  if (input.value) {
    button.classList.remove('move');
    button.style.transform = 'translateX(0)';
    button.style.transform = 'translateY(0)';

  }
});

countbtn.addEventListener('click', function (evt) {
  if (evt.detail == 3) {
    localStorage.clear();
  }
});

//----Removable Code (Not Affect Live Project,This Is Only For Current Project)---//
                                                                                  //   
const apiUrl = "http://192.168.101.198:81/api/songs";                             //
                                                                                  //
  fetch(apiUrl)                                                                   //
  .then(response => {                                                             //  
    if (!response.ok) {                                                           //
      throw new Error('Network response was not ok');                             //
    }                                                                             //
    return response.json();                                                       //    
  })                                                                              //
  .then(data => {                                                                 //  
    console.log(data);                                                            //
    populateTable(data);                                                          //
  })                                                                              //
  .catch(error => {                                                               //
    console.error('Error:', error);                                               //
  });                                                                             //
                                                                                  //  
function populateTable(data) {                                                    //
  data.forEach(song => {                                                          //
    const row = document.createElement("tr");                                     //
    const cell = document.createElement("td");                                    //
    cell.textContent = song;                                                      //
    row.appendChild(cell);                                                        //
    tableBody.appendChild(row);                                                   //
    updateCount();                                                                //  
  });                                                                             //      
}                                                                                 //
function updateCount() {                                                          //  
  counttext.innerHTML = tableBody.rows.length;                                    //
}                                                                                 //
//------------------------------Removable Code Finshed--------------------------------//

// Create a new XMLHttpRequest object
var form = document.getElementById("formdetails");
form.addEventListener('submit', (event) => {
  event.preventDefault();
console.log("submit");
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  xhr.open('POST', "http://192.168.101.198:81/api/songs", true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Create a JSON object with the input value
  var song = { song: input.value };

  // Send the JSON data
  xhr.send(JSON.stringify(song));


//  ----------Removable Code (Not Affect Live Project , This Is Only For Current Project)-----------//
  xhr.onreadystatechange = function () {                                                            //
    if (xhr.readyState === XMLHttpRequest.DONE) {                                                   //
      if (xhr.status === 200) {                                                                     //
                                                                                                    //
        const row = document.createElement("tr");                                                   //   
        const cell = document.createElement("td");                                                  //
        cell.textContent = input.value;                                                             //
        row.appendChild(cell);                                                                      //
        tableBody.appendChild(row);                                                                 //
        input.value = "";                                                                           //
        updateCount();                                                                              //
                                                                                                    //
                                                                                                    //
        console.log("Success");                                                                     //
      } else {                                                                                      //
        console.error("Failed to add song");                                                        //
      }                                                                                             //
    }                                                                                               //   
  };                                                                                                //
//--------Removable Code Finished-------------------------------------------------------------------//
});
