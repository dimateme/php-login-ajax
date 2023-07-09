$(document).on("submit", "form.js-register", function (event){
    event.preventDefault();
    var  _$form = $(this);           // this = form.js-register
    var _error = $(".js-error", _$form);
    var dataObj  = {
        email: $("input[type='email']", _$form).val(),
        password: $("input[type='password']", _$form).val()
    }
    //validate email and password
    if(dataObj.email.length < 16) {
        _error
            .text("Please enter a valid email address")
            .show();
        return false;
    } else if (dataObj.password.length < 11) {
        _error
            .text("Please enter a passphrase that is at least 11 characters long.")
            .show();
        return false;
    }

    // Assuming the code gets this far, we can start the ajax process
    _error.hide();
// call ajax
    $.ajax({
        type: 'POST',
        url: 'login_a/ajax/register.php',
        data: dataObj,
        dataType: 'json',
        async: true,
    })
    .done(function ajaxDone(data){
        console.log(data);
        // si les données sont bien envoyées rediriger vers la nouvelle page
        if(data.redirect !== undefined){
            window.location = data.redirect;
        }
        alert(data.name);
    })
    .fail(function ajaxFailed(e){
        console.log(e);
    })
    .always(function ajaxAlwaysDoThis(data){
        console.log('Always');
    })
    return false;


})