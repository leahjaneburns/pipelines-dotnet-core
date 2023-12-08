//The URIs of the REST endpoint
//IUPS IS THE CONSUMPTION LOGIC APP
IUPS = "https://prod-51.eastus.logic.azure.com:443/workflows/8f3d9037414e4deba113befa35590410/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=G0vO4bOHY5NMbFC_vhq22udW1voDwhlrjJSzDKTG9vM";
RAI = "https://prod-84.eastus.logic.azure.com:443/workflows/dbb2641f6893455bbcb0a785ae1f16b0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=V8xYs9rH0yWYrhc8C3xr6G5SwfZ35w7Vnw6h18HDdyk";

BLOB_ACCOUNT = "https://blobstoragelbwk6.blob.core.windows.net";

//blobstoragelbwk6

//Handlers for button clicks
$(document).ready(function () {
  $("#retImages").click(function () {
    //Run the get asset list function
    getImages()
  })

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {
    //Execute the submit new asset function
    submitNewAsset()
  })
  $("#logoutBtn").click(function () {
    // Perform logout actions as needed
    // For example, you can redirect the user back to the login page
    window.location.href = "login.html"
  })
})

//A function to submit a new asset to the REST endpoint
function submitNewAsset() {
  //Create a form data object
  submitData = new FormData()

  //Get form variables and append them to the form data object
  submitData.append("fileName", $("#fileName").val())
  submitData.append("userID", $("#userID").val())
  submitData.append("userName", $("#userName").val())
  submitData.append("file", $("#UpFile")[0].files[0])

  //Post the form data  to the endpoint, note the need to set the content type header
  $.ajax({
    url: IUPS,
    data: submitData,
    cache: false,
    enctype: "multipart/form-data",
    contentType: false,
    processData: false,
    type: "POST",
    success: function (data) {
      console.log(data)
    },
  })
}
function getImages() {
  // Replace the current HTML in that div with a loading message
  $("#ImageList").html(
    '<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span></div>'
  )

  $.getJSON(RAI, function (data) {
    // Create an array to hold all the retrieved assets
    var items = []

    // Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<hr />")

      // Check if the URL indicates a video file (replace '.mp4' with the actual video file extension)
      if (atob(val["fileName"].$content).toLowerCase().endsWith(".mp4")) {
        items.push("<video width='400' controls>")
        items.push(
          "<source src='" +
            BLOB_ACCOUNT +
            val["filePath"] +
            "' type='video/mp4'>"
        )
        items.push("Your browser does not support the video tag.")
        items.push("</video> <br />")
      }
      if(atob(val["fileName"].$content).toLowerCase().endsWith(".mp3")){
        items.push("<audio controls>")
        items.push(
          "<source src='" +
            BLOB_ACCOUNT +
            val["filePath"] +
            "' type='audio/mpeg'>"
        )
        items.push("Your browser does not support the video tag.")
        items.push("</audio> <br />")
      }
    else {
        items.push(
          "<img src='" +
            BLOB_ACCOUNT +
            val["filePath"] +
            "' width='400'/> <br />"
        )
      }

      items.push("file: " + atob(val["fileName"].$content) + "<br />")
      items.push(
        "Uploaded by: " +
          atob(val["userName"].$content) +
          " (userID: " +
          atob(val["userID"].$content) +
          ")<br />"
      )
      items.push("<hr />")
    })


    // Clear the assetlist div
    $("#ImageList").empty()

    // Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      class: "my-new-list",
      html: items.join(""),
    }).appendTo("#ImageList")
  })
}