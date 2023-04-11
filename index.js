(async () => {
    const url = "https://booking.safetydock.at/pages/public/manageStation.php";
    const page = (await (
        await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    ).json()).contents

    const DOM = new DOMParser().parseFromString(page, "text/html");
    const amount = Number(
        [...DOM.querySelectorAll("#list tr")]
            .find(tr => tr.innerHTML.includes("Mödling"))
            .childNodes[2].textContent.split(" ")[1]
    );

    document.querySelector(".count").textContent = amount;
    document.querySelector(".availability").classList.add(amount > 2
        ? "free"
        : amount == 0 ? "full"
            : "warn"
    );

})()