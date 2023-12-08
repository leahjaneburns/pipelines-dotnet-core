$(document).ready(function () {
  $("#loginBtn").click(function () {
    // Dummy login validation
    var username = $("#username").val()
    var password = $("#password").val()

    // Check if username and password match the dummy data
    if (username === "leahb17" && password === "RCT9wwjF") {
      // If successful, redirect to the main page
      window.location.href = "index.html"
    } else {
      // If login fails, show an alert (you can customize this part)
      alert("Invalid username or password. Please try again.")


    }
  })
})


