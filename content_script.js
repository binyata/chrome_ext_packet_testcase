function go_to_lmp_login() {
	console.log(window.location.href);
	window.location.href="https://saqe1.insidesales.com";
}

function login_to_lmp() {
	console.log(window.location.href);

	var username = document.getElementById("username");
	var password = document.getElementById("password");
    var loginbutton = document.getElementById("login_submit_button");

    username.value = "user1";
    password.value = "admin";
    loginbutton.click();
}

function click_lead_tab() {
	window.location.href="https://saqe1.insidesales.com/leads/leads";
}

function logout(){
	var logout = document.getElementById("is_header_logout");
	logout.click();
}