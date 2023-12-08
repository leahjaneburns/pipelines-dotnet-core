//The URIs of the REST endpoint
//RAAURI = "https://prod-20.centralus.logic.azure.com/workflows/77e4a8fbf1f24dbebe3572c2bc60f1e8/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ChNIwdaGqLdndq20o-GUslhDTmySPXg_4satoHnUfNw";
//CIAURI = "https://prod-04.centralus.logic.azure.com/workflows/d43a7c69438e44eb84a9b7f7195a18a7/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GzTB6av1RtQsmrybaduKNUy6klWo1ongwocrXdvp0ZM";

//DIAURI0 = "https://prod-08.centralus.logic.azure.com/workflows/8ee746fec0764ed1b5ba47a1f65c3ef9/triggers/manual/paths/invoke/rest/v1/assets/";
//DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lpC5t2hgoVM48vo-2RdvePDufNlGLaZBS1Zyo_EWen0";

RAAURI = "https://prod-19.centralus.logic.azure.com/workflows/d8e2a8f7798a417587b6f69b66fe1083/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k8YgZrRhntmnICJkHt_9PGnkwiyoM2LfQNiyJo-kmZs";
CIAURI = "https://prod-21.centralus.logic.azure.com/workflows/7b9e1277ce924bd7bdf381e6e0b599ee/triggers/manual/paths/invoke/rest/v1/assets/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HSff-ABS2cmgDxFqNFl6BQ-o2FTI54voAfVzIL1SW-8";

DIAURI0 = "https://prod-00.centralus.logic.azure.com/workflows/c12d2241e1e04bb0805a9f2776e3c0a2/triggers/manual/paths/invoke/rest/v1/assets/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VZVnMQNlkFVO5-KuHw8YJBhNZLDrOOkxFAkzclIAuvc";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retUsers").click(function(){

      //Run the get asset list function
      getNewUsers();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewUsers();
    
  }); 
  $("#loginBtn").click(function () {
    // Perform logout actions as needed
    // For example, you can redirect the user back to the login page
    window.location.href = "index.html"
  })
});

//A function to submit a new asset to the REST endpoint 
function submitNewUsers(){
  
  //Construct JSON Object for new item

  var subObj = {
    FirstName: $('#FirstName').val(),
    LastName: $('#LastName').val(),
    UserName: $('#UserName').val(),
    Email: $('#Email').val(),
    Password: $('#Password').val(),
    ConfirmPassword: $('#ConfirmPassword').val()
  }


  //Convert to a JSON String
  subObj = JSON.stringify(subObj);

  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: CIAURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
    getNewUsers();
  });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getNewUsers(){

  //Replace the current HTML in that div with a loading message
  $('#newUsers').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  //Get the JSON from the RAA API 
  $.getJSON(RAAURI, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];
      
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {

      items.push("FirstName: " + val["FirstName"] + ", LastName: " +  val["LastName"] + "<br/>");
      items.push("Email: " + val["Email"] + "<br/>");
      items.push("UserName: " + val["UserName"] + "<br/>");
      items.push("Password: " + val["Password"] + "<br/>");
      items.push("ConfirmPassword: " + val["ConfirmPassword"] + "<br/>");
      items.push('<button type="button" id="subNewForm" class="btn btn-danger" onclick="deleteAsset(' + val["UserID"]
        + ')">Delete</button> <br/><br/>');

    });


      //Clear the assetlist div 
      $('#newUsers').empty();

      //Append the contents of the items array to the AssetList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#newUsers");

  });
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id) {

  $.ajax({
    type: "DELETE",

    //Note the need to concatenate the
    url: DIAURI0 + id + DIAURI1,

  }).done(function (msg) {

    //On success, update the assetlist.
    getAssetList();
  });
}