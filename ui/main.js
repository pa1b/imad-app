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

