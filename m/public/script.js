const updateURL = (url, state, replace = false) =>
    replace
      ? window.history.replaceState(state, '', url)
      : window.history.pushState(state, '', url);

let params = new URLSearchParams(window.location.search)

let max_page = 3;

let current_page = 0;
if (params.has("page")) {
    let page = 0;
    page = parseInt(params.get("page"));
    if (isNaN(page)) page = 0;
    if (page > max_page) page = max_page;
    if (page < 0) page = 0;
    current_page = page;
}
switch_page(current_page);

$('.navobj').each(function(i, obj) {
    $( this ).on("click", function() {
        switch_page(i);
    });
});


function switch_page(index) {
    $("#homepage").css("left", `${0-index*100}%`);
    $("#aboutme").css("left", `${100-index*100}%`);
    $("#projects").css("left", `${200-index*100}%`);
    $("#blog").css("left", `${300-index*100}%`);
    let color = $( $(".page").get(index) ).css("background-color");
    $( $(".navbar").get(0) ).css("background-color", color);
    current_page = index;
    update_indicator()
    params.set("page", current_page.toString())
    updateURL("?" + params.toString());

    if (index == 1) {
        about_me();
    }else {
        reset_about_me();
    }
}

function about_me() {
    let perc = [80, 70, 65, 65, 50, 40, 15];
    $("#aboutme>.container>.progress>.lang>.slider").each(function (i, obj) {
        $( this ).css("width", perc[i].toString()*0.8 + "%");
        this.innerHTML = perc[i].toString() + "%";
    });
}

function reset_about_me() {
    $("#aboutme>.container>.progress>.lang>.slider").each(function (i, obj) {
        $( this ).css("width", "0%");
    });
}

function update_indicator() {
    $(".navobj").each(function(i, obj) {
        if (i == current_page) {
            $( this ).css("background-color", "#444444")
            $( this ).css("color", "#ffffff")
        }else {
            $( this ).css("background-color", "#ffffff")
            $( this ).css("color", "#000000")
        }
    });
}

$( $("#homepage>.title").get(0) ).on("click", function() {
    switch_page(1);
});

$( $("#aboutme>.container>.next").get(0) ).on("click", function() {
    switch_page(2);
});

//$( $("#aboutme>.container>.progress").get(0) ).css("width", $( $("#aboutme>.container>.text").get(0) ).css("width"))
//$( $("#aboutme>.container>.next").get(0) ).css("width", $( $("#aboutme>.container>.text").get(0) ).css("width"))

update_indicator()