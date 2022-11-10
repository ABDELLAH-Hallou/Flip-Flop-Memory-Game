window.onload = function () {
    imgArr.splice(9, 1);
    imgArr.splice(0, 1);
    for (const key in imgArr) {
        imgArr[key] += ".jpg";
    }
    duplicatedArr = [...imgArr];
    for (const key in imgArr) {
        duplicatedArr.push(imgArr[key]);
    }
    // shuffle
    duplicatedArr = shuffle(duplicatedArr);
    let btn = document.getElementById("start");
    btn.addEventListener("click", () => {
        let level = document.getElementById("level");
        let time = 60;
        if (level.value == "easy") {
            time = 60;
            let hint = document.getElementById("hint");
            hint.disabled = false;
            hint.addEventListener("click", givehint);

        }

        if (level.value == "meduim")
            time = 60;
        if (level.value == "hard")
            time = 30;
        let inter = setInterval(() => {
            time -= 1;
            document.getElementById("timer").textContent = time;
            if (time == 0) {
                clearInterval(inter);
                for (let index = 0; index < duplicatedArr.length; index++) {

                    document.getElementById(index).style.pointerEvents = "none";
                }
            }
        }, 1000);
    });



    let btnReset = document.getElementById("reset");
    btnReset.addEventListener("click", reset());

}
// show cards to the user
function showCards() {
    document.getElementById("show").disabled = true;
    for (let index = 0; index < imgArr.length; index++) {
        let container = document.getElementById("card-container");
        let div = document.createElement("div");
        div.setAttribute("class", "card justShow crd");
        let defaultImg = document.createElement("img");
        defaultImg.setAttribute("class", "flip back");
        defaultImg.setAttribute("src", "images/0.jpg");
        let img = document.createElement("img");
        img.setAttribute("class", "flip face");
        img.setAttribute("width", "125px");
        img.setAttribute("height", "200px");
        img.setAttribute("alt", imgArr[index].split(".")[0]);
        img.setAttribute("src", "images/" + imgArr[index]);
        div.appendChild(img.cloneNode());
        div.appendChild(defaultImg.cloneNode());
        container.appendChild(div);

    }
}
// create cards and give each of them event listner
function startGame() {
    for (const iterator of document.getElementsByClassName("justShow")) {
        iterator.style.display = "none";
    }
    document.getElementById("start").disabled = true;
    document.getElementById("show").disabled = true;

    for (let index = 0; index < duplicatedArr.length; index++) {
        let container = document.getElementById("card-container");
        let div = document.createElement("div");
        div.setAttribute("class", "card");
        let defaultImg = document.createElement("img");
        defaultImg.setAttribute("class", "flip back");
        defaultImg.setAttribute("src", "images/0.jpg");
        defaultImg.setAttribute("id", index);

        let img = document.createElement("img");
        img.setAttribute("class", "flip face");
        img.setAttribute("width", "125px");
        img.setAttribute("height", "200px");
        img.setAttribute("id", "img-" + index.toString() + duplicatedArr[index]);
        img.setAttribute("alt", duplicatedArr[index].split(".")[0]);
        img.setAttribute("src", "images/" + duplicatedArr[index]);
        div.appendChild(img.cloneNode());
        div.appendChild(defaultImg.cloneNode());
        container.appendChild(div);

        document.addEventListener('click', function (e) {
            if (e.target && e.target.id == index) {
                scoreManager(index);
            }
        });
    }
}
// the logic of the game
function scoreManager(index) {
    let counterEl = document.getElementById("score");
    if (choices.length === 2) {
        document.getElementById(choices[choices.length - 1].index).style.transform = "perspective(2000px) rotateY(0deg)";
        document.getElementById("img-" + choices[choices.length - 1].index.toString() + choices[choices.length - 1].cart).style.transform = "perspective(1000px) rotateY(-180deg)";
        document.getElementById(choices[choices.length - 2].index).style.transform = "perspective(2000px) rotateY(0deg)";
        document.getElementById("img-" + choices[choices.length - 2].index.toString() + choices[choices.length - 2].cart).style.transform = "perspective(1000px) rotateY(-180deg)";
        choices.splice(choices.length - 1, 1);
        choices.splice(choices.length - 1, 1);
    }
    clickCounter++;
    document.getElementById(index).style.transform = "perspective(1000px) rotateY(180deg)";
    document.getElementById("img-" + index.toString() + duplicatedArr[index]).style.transform = "perspective(1000px) rotateY(0deg)";
    if (choices.length != 0 && choices[0].cart === duplicatedArr[index]) {
        score++;
        counterEl.textContent = score;
        choices.splice(choices.length - 1, 1);
        choices.splice(choices.length - 1, 1);
    } else {
        choices.push({ "cart": duplicatedArr[index], "index": index });
    }
}
// reset
function reset() {
    document.getElementById("start").disabled = false;
    score = 0;
    let counterEl = document.getElementById("score");
    counterEl.textContent = score;
    let container = document.getElementById("card-container");
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}
// hint
function givehint() {
    console.log("hello");
    for (let index = 0; index < duplicatedArr.length; index++) {
        console.log(document.getElementById("img-" + index.toString() + duplicatedArr[index]).style.transform == "perspective(1000px) rotateY(0deg)");
        if (document.getElementById("img-" + index.toString() + duplicatedArr[index]).style.transform == "perspective(1000px) rotateY(0deg)") {
            continue;
        } else {
            document.getElementById(index).style.transform = "perspective(1000px) rotateY(180deg)";
            document.getElementById("img-" + index.toString() + duplicatedArr[index]).style.transform = "perspective(1000px) rotateY(0deg)";
            for (let i = 0; i < duplicatedArr.length; i++) {
                console.log(duplicatedArr[index], duplicatedArr[i]);
                if(duplicatedArr[i] == duplicatedArr[index] && i!==index){
                    console.log("go");
                    document.getElementById(i).style.transform = "perspective(1000px) rotateY(180deg)";
                    document.getElementById("img-" + i.toString() + duplicatedArr[i]).style.transform = "perspective(1000px) rotateY(0deg)";
                    break;
                }
            }
            break;
        }
    }
}
// shuffle array
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}