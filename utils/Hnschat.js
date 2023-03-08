const getUserAll = async () => await new Promise(resolve => {
    const data = `{"action":"getUsers"}`;
    fetch("https://hns.chat/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Content-Length': Buffer.byteLength(data)
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            resolve();
        });
});

const Hnschat = {};
Hnschat.getUsers = getUserAll;

export default Hnschat;