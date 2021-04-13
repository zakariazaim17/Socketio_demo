"use strict";

const socket = io();
let roomEntered = "";

const room1 = document.getElementById("room1");

const room2 = document.getElementById("room2");

const room3 = document.getElementById("room3");

const end = document.getElementById("end");

const group_list = document.getElementById("messages_in_room");

const buttons = [room1, room2, room3, end];

const group_form22 = document.getElementById("formii");

group_form22.style.display = "none";

/*buttons.forEach((d) => {

  d.onclick(buttons.)
})*/

end.style.display = "none";

function disable(name) {
  roomEntered = name;
  try {
    socket.emit("room", roomEntered);
    console.log("user joined room");
  } catch (e) {
    console.log(e);
  }

  console.log(name);
  room3.style.display = "none";
  room2.style.display = "none";
  room1.style.display = "none";
  end.style.display = "initial";
  group_form22.style.display = "initial";
}

end.addEventListener("click", (ecent) => {
  ecent.preventDefault();
  try {
    socket.emit("leave", roomEntered);
    console.log("user left");

    while (group_list.hasChildNodes()) {
      group_list.removeChild(group_list.firstChild);
    }
  } catch (e) {
    console.log(e);
  }

  room1.style.display = "initial";
  room3.style.display = "initial";
  room2.style.display = "initial";
  end.style.display = "none";
  roomEntered = "";
  group_form22.style.display = "none";
});

document.getElementById("room2").addEventListener("click", (event) => {
  event.preventDefault();
  disable("room2");
});
document.getElementById("room1").addEventListener("click", (event) => {
  event.preventDefault();

  disable("room1");
});
document.getElementById("room3").addEventListener("click", (event) => {
  event.preventDefault();
  disable("room3");
});

document.getElementById("general").addEventListener("submit", (event) => {
  event.preventDefault();
  const inp = document.getElementById("m");
  const nickname = document.getElementById("name");
  const data = { name: nickname.value, content: inp.value };
  socket.emit("chat message", data);
  inp.value = "";
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.innerHTML = `${msg.name} Says:  ${msg.content}`;
  document.getElementById("messages").appendChild(item);
});

document.getElementById("group").addEventListener("submit", (event) => {
  event.preventDefault();
  const inp = document.getElementById("message_in_room");
  const nickname = document.getElementById("name");
  const roomAB = roomEntered;
  const data = {
    name: nickname.value,
    content: inp.value,
    room: roomAB,
  };
  socket.emit("group message", data);
  inp.value = "";
});

socket.on("group message", (msg) => {
  const name = document.getElementById("name");
  const item = document.createElement("li");
  item.innerHTML = `${msg.name} Says:  ${msg.content}`;
  document.getElementById("messages_in_room").appendChild(item);
});
