const msgList = document.querySelector(".pix-message__list");

const getAllMsg = () => {
    return axios({
        method: "GET",
        url:'https://pixalert-e56b.restdb.io/rest/messages',
        headers: {
            "x-apikey": "60a0ef10e3b6e02545eda966"
        },
    })
}

const displayMsgs = async () => {
    try {
        const messages = (await getAllMsg()).data;
        const msgItems = messages.map(msg => {
            const msgItem = document.createElement("li");
            msgItem.classList.add("pix-message__message");
            msgItem.innerText = msg.message;
            return msgItem;
        })
        msgList.innerHTML = "";
        msgList.append(...msgItems);
        const time = new Date();
        console.clear();
        console.log( `${time.toLocaleTimeString()}: Data fetched !`);
    } catch (err) {
        console.error(err);
    }
}

window.addEventListener("load", () => {
    displayMsgs();
    setInterval(displayMsgs, 5000);
});
