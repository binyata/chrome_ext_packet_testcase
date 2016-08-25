function setup_test(){
	window.location.href="https://google.com";

}


function go_to_lmp_login() {
	try{
		var result =[];
		console.log(window.location.href);
		window.location.href="https://saqe1.insidesales.com";
	} catch(err) {
	  result = "Error message: " + err.message + " Line Number: " + err.lineNumber + " File Name: " + err.fileName;
      return result;
    }
    result.push(1);
    result.push("LMP Login Load");
    result.push("Passed");
    return result;
}

function login_to_lmp() {
	try{
		var result =[];
		console.log(window.location.href);
		var username = document.getElementById("username");
		var password = document.getElementById("password");
		var loginbutton = document.getElementById("login_submit_button");

		username.value = "user1";
		password.value = "admin";
		loginbutton.click();

	} catch(err) {
	  result = "Error message: " + err.message + " Line Number: " + err.lineNumber + " File Name: " + err.fileName;
      return result;
    }
    result.push(2);
    result.push("LMP Login Signin");
    result.push("Passed");
    return result;
}

function click_lead_tab() {
	try{
		var result =[];
		window.location.href="https://saqe1.insidesales.com/leads/leads";

	} catch(err){
		result = "Error message: " + err.message + " Line Number: " + err.lineNumber + " File Name: " + err.fileName;
        return result;
	}
	result.push(3);
    result.push("Load LMP Leads Tab");
    result.push("Passed");
    result.push(window.location.href);
    return result;
	
}

function logout(){
	try{
		var result =[];
		var logout = document.getElementById("is_header_logout");
		logout.click();
	} catch(err){
		result = "Error message: " + err.message + " Line Number: " + err.lineNumber + " File Name: " + err.fileName;
        return result;
	}
	result.push(4);
    result.push("Log out of LMP");
    result.push("Passed");
    return result;
}