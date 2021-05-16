const button = document.querySelector('button');

const sendAlert = () => {
    return fetch('https://pixalert-e56b.restdb.io/rest/messages',{
        method: "POST",
        headers: {
            "x-apikey": "60a0ef10e3b6e02545eda966",
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify({message: "Connecte toi !"})
    })
}

button.addEventListener("click",async () => {
    const res = await sendAlert();
    console.log(res);
    if (res.status >= 200 && res.status <300) {
        button.classList.add("sent");
    } else {
        button.classList.add("not-sent");
    }
    setTimeout(() => {
        button.removeAttribute("class");
    }, 2000);
});