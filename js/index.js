const msgList = document.querySelector(".pix-message__list");

const getAllMsg = () => {
  return fetch("https://pixalert-e56b.restdb.io/rest/messages", {
    method: "GET",
    headers: {
      "x-apikey": "60a0ef10e3b6e02545eda966",
    },
  });
};

const displayMsgs = async () => {
  try {
    const messages = await (await getAllMsg()).json();

    const msgItems = messages.map((msg) => {
      const date = new Date(msg.timestamp);
      const msgItem = document.createElement("li");
      msgItem.classList.add("pix-message__message");
      if (date.getUTCDate() == 18 && date.getHours() >= 9 && date.getMinutes() >= 10) {
        msgItem.classList.add("pix-message__message--on-time");
      }
      msgItem.innerText = msg.message;
      return msgItem;
    });
    msgList.innerHTML = "";
    msgList.append(...msgItems);
    const time = new Date();
    console.clear();
    console.log(`${time.toLocaleTimeString()}: Data fetched !`);
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener("load", () => {
  displayMsgs();
  setInterval(displayMsgs, 5000);
});
