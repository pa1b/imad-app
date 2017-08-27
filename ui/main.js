//Counter Code


var button = document.getElementById('counter');

button.onclick = function () {
  // Create request
  var request = new XMLHttpRequest();
  
  //Capture the response and store it in a variable
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
  };
  //Make Request
  request.open('GET','http://pavanbellamkonda98.imad.hasura-app.io/counter',true);
  request.send(null);

};

//Submit name

var submit = document.getElementById('submit_btn');

submit.onclick = function () {
  //Make a request to server and send the name
    var request = new XMLHttpRequest();
  
  //Capture the response and store it in a variable
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
                  var names = request.responseText;
                  names = JSON.parse(names);
                  var list = '';
                  for (var i = 0; i < names.length; i++) {
                          list += '<li>' + names[i] +'</li>';
        
                  }
                  var ul = document.getElementById('namelist');
                  ul.innerHTML = list;
                }
          }
      };
      
  var nameInput = document.getElementById('name');
  var name1 = nameInput.value;
  request.open('GET', 'http://pavanbellamkonda98.imad.hasura-app.io/submit-name?name=' + name1 , true);
  request.send(null);

  };
  //Make Request
 
  //Capture a list of names and render it

