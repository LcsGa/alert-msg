const msgList = document.querySelector(".pix-message__list");
const btnDelete = document.querySelector(".pix-message__button--delete");

const getAllMsg = () => {
    return fetch("https://pixalert-e56b.restdb.io/rest/messages", {
        method: "GET",
        headers: {
            "x-apikey": "60a0ef10e3b6e02545eda966",
        },
    });
};

const deleteById = id => {
    return fetch(`https://pixalert-e56b.restdb.io/rest/messages/${id}`, {
        method: 'DELETE',
        headers: {
            "x-apikey": "60a0ef10e3b6e02545eda966",
            "content-type": "application/json"
        }
    })
}

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
    } catch (err) {
        console.error(err);
    }
};

const deleteAll = async () => {
    try {
        const messages = await (await getAllMsg()).json();
        messages.forEach(async msg => {
            await deleteById(msg._id);
        })
        alert("Toutes les alertes ont été supprimées !");
    } catch (err) {
        console.error(err);
    }
}

window.addEventListener("load", () => {
    displayMsgs();
    setInterval(displayMsgs, 5000);
});

btnDelete.addEventListener("click", () => {
    if (confirm("Etes-vous sûr de vouloir tout supprimer ?")) {
        deleteAll();
    }
})