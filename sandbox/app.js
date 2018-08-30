for(var x=1; x <= 20; x++){
    var button = document.createElement('button');
    button.innerHTML= x;
    button.className = "button"
    document.body.appendChild(button);
}

document.querySelectorAll('.button').forEach(button => {
    button.onclick = () => alert(button.innerHTML);
});
