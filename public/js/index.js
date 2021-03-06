let $messages = $('.messages-content');
let serverResponse = "NONE";


function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
document.getElementById("message").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    serverMessage("I'm your friendly student support Bot. Say Hi and I will assist you.");
  }, 100);

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}



function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  fetchmsg() 
  
  $('.message-input').val(null);
  updateScrollbar();

}

document.getElementById("message-form").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();
  // Enable for robotic Text to Speech
  //speechSynthesis.speak( new SpeechSynthesisUtterance("hello"))
}

function serverMessage(response2) {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="css/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

}


function fetchmsg(){

      let url = 'http://localhost:5000/send-msg';
      const data = new URLSearchParams();
      for (const pair of new FormData(document.getElementById("message-form"))) {
          data.append(pair[0], pair[1]);
          // console.log(pair)
      }
      fetch(url, {
        method: 'POST',
        body:data
      }).then(res => res.json())
        .then(response => {
        // console.log(response);
        serverMessage(response.reply);
        //speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
      
        
        })
        .catch(error => console.error('Error :', error));

}
