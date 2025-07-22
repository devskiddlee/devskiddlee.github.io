const sleep = ms => new Promise(r => setTimeout(r, ms));

let selected_register = 0;
let amount_registers = 1;

function update_indicator(new_register) {
    if (new_register < 0)
        return;
    if (new_register >= amount_registers)
        add_register();

    let registers = document.querySelectorAll(".register");
    registers[selected_register].classList.remove("currentRegister");
    registers[new_register].classList.add("currentRegister");
    selected_register = new_register;
}

function current_register_as_element() {
    return document.querySelectorAll(".register")[selected_register];
}

function add_register() {
    let register = document.createElement("div");
    register.classList.add("register");
    register.innerHTML = 0;
    document.querySelector(".registers").appendChild(register);
    amount_registers++;
}

const availableCmds = [">", "<", "+", "-", ".", ",", "[", "]"]
async function interpret() {
    let start = Date.now();
    let delay = parseInt(document.querySelector("#delay").value);
    let code = document.querySelector("#code").value;
    for (var i = 0; i < code.length; i++) {
        if (!availableCmds.includes(code[i]))
        {
            alert("Illegal char found at " + i);
            return;
        }
    }
    for (var i = 0; i < code.length; i++) {
        let cmd = code[i];
        highlight_at_index(i);
        switch (cmd) {
            case ">":
                update_indicator(selected_register + 1);
                break;
            case "<":
                update_indicator(selected_register - 1);
                break;
            case "+":
                var new_value = parseInt(current_register_as_element().innerHTML)+1;
                if (new_value > 255)
                    new_value = 0;
                current_register_as_element().innerHTML = new_value;
                break;
            case "-":
                var new_value = parseInt(current_register_as_element().innerHTML)-1;
                if (new_value < 0)
                    new_value = 255;
                current_register_as_element().innerHTML = new_value;
                break;
            case ".":
                document.querySelector(".output").innerHTML += String.fromCharCode(parseInt(current_register_as_element().innerHTML));
                break;
            case ",":
                var charin = prompt("Single char input:").charCodeAt(0);
                if (charin != NaN && charin != undefined)
                    current_register_as_element().innerHTML = charin;
                break;
            case "[":
                break;
            case "]":
                if (parseInt(current_register_as_element().innerHTML) != 0) {
                    let l = 0;
                    for (var o = i-1; o >= 0; o--) {
                        if (code[o] == "]")
                            l++;
                        if (code[o] == "[" && l == 0) {
                            i = o;
                            break;
                        }else if (code[o] == "[" && l > 0)
                            l--;
                    }
                }
                break;
        }
        if (delay > 0) {
            await sleep(delay);
        }
    }
    let offset = Date.now() - start;
    document.querySelector(".output").innerHTML += `<br>Finished in ${offset}ms`;
}

function highlight_at_index(index) {
    let textarea = document.querySelector(".show");
    let text = textarea.innerText;
    var final = text.slice(0, index) + "<b>" + text[index] + "</b>" + text.slice(index+1);
    textarea.innerHTML = final;
}

function reset() {
    document.querySelector(".registers").innerHTML = `<div class="register currentRegister">0</div>`;
    document.querySelector(".output").innerHTML = `Here goes the output...<br>`;
    selected_register = 0;
    amount_registers = 1;
}

function save() {
    localStorage.setItem("bf-interpreter-skiddlee-code", document.querySelector("#code").value);
    localStorage.setItem("bf-interpreter-skiddlee-delay", document.querySelector("#delay").value);
}

function load() {
    if (localStorage.getItem("bf-interpreter-skiddlee-code"))
        document.querySelector("#code").value = localStorage.getItem("bf-interpreter-skiddlee-code");
    if (localStorage.getItem("bf-interpreter-skiddlee-delay"))
        document.querySelector("#delay").value = localStorage.getItem("bf-interpreter-skiddlee-delay");
    document.querySelector('.show').innerHTML = document.querySelector("#code").value;
}

load();

let presetsShown = false;

function togglePresets() {
    if (!presetsShown) {
        presetsShown = true;
        document.querySelector("#hiddenPresets").style.display = "flex";
    }
    else if (presetsShown) {
        presetsShown = false;
        document.querySelector("#hiddenPresets").style.display = "none";
    }
}

function loadPreset(code, delay) {
    reset();
    document.querySelector("#code").value = code;
    document.querySelector("#delay").value = delay;
    document.querySelector('.show').innerHTML = document.querySelector("#code").value;
}