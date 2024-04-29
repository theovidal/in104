//window.location.replace("loginPage.html");

async function redirect()
{
    const response = await fetch("/profile", {
        method: "GET"
    });
    
    
    if (response.ok){
        //TODO : redirect to either scan or generating page, according to the user's status
        window.location.href = "loginPage.html";
    }
    else{
        window.location.href = "loginPage.html";
    }

}

redirect();