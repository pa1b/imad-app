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
var nameInput = document.getElementById('name');
var  name = nameInput.value;
var submit = document.getElementById('submit_btn');

submit.onclick = function () {
  //Make a request to server and send the name
  
  //Capture a list of names and render it
    var names = ['name1','name2','name3', 'name4'];
    var list = '';
    for (var i = 0; i < names.length; i++) {
        list += '<li>' + names[i] +'</li>';
        
    }
    var ul = document.grtElementById ('namelist');
    ul.innerHTML = list;
};
