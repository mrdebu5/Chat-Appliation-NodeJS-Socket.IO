const socket = io();
// const client_total = document.getElementsByTagName('h3')[0];
const client_total = document.getElementById("client-total");
const message_container = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const sms_audio = new Audio("/notification/sms.mp3");

messageForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    sendMessage();
});


socket.on('clients-total',(data)=>{
    // $("#client-total").val(`Total Group Member : ${data}`);
    client_total.innerHTML = `Total Group Member : ${data}`;
});

socket.on('chat-message',(data)=>{
    sms_audio.play();
    addMessagetoUI(false,data);
})

function sendMessage() {
    if (messageInput.value === "") return;
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dataTime: new Date()
    }
    socket.emit('message',data);
    addMessagetoUI(true,data);
    messageInput.value = "";
    scrollToBottum();
}

function addMessagetoUI(isOwnMessage,data) {
    clearFeedback();
    const element = `<li class="${isOwnMessage ? "message-right" : "message-left"}">
          <p class="message">${data.message}
          <span>${data.name} ∙ ${moment(data.dataTime).format('LLL')}</span></p>
        </li>`;
    
    message_container.innerHTML += element;
    scrollToBottum();
}

function scrollToBottum() {
    message_container.scrollTo(0,message_container.scrollHeight);
}

messageInput.addEventListener('focus',(event)=>{
    socket.emit('feedback',{
        feedback : `${nameInput.value} Is typing a message!`
    })
});

messageInput.addEventListener("keypress", (event) => { 
    socket.emit("feedback", {
        feedback: `${nameInput.value} Is typing a message!`,
    });
});

messageInput.addEventListener("blur", (event) => { 
    socket.emit("feedback", {
        feedback: ``,
    });
});

socket.on('feedback',(data)=>{
    clearFeedback();
    const element = `<li class="message-feedback">
        <p class="feedback" id="feedback">${data.feedback}</p>
      </li>`;

    message_container.innerHTML += element;
});

function clearFeedback(params) {
    document.querySelectorAll("li.message-feedback").forEach(element=>{
        element.parentNode.removeChild(element);
    });
}