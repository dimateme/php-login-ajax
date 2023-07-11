$(document).on("submit", "form.js-register","form.js-login", function (event){
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
        console.log("done");
        // si les données sont bien envoyées rediriger vers la nouvelle page
        if(data.redirect !== undefined){
            window.location = data.redirect;
          // si les données ne sont pas envoyées afficher un message d'erreur
        }else if(data.error !== undefined){
            _error
                .text(data.error)
                .show();
        }
    })
    .fail(function ajaxFailed(e){

    })
    .always(function ajaxAlwaysDoThis(data){
        console.log('Always');
    })
    return false;


})
$(document).on("submit","form.js-login", function(event){
    var _form =$(this);
    var _error = $(".js-error", _form);
    var dataObj = {
        email: $("input[type='email']", _form).val(),
        password: $("input[type='password']", _form).val()
    }
    if(dataObj.email.length < 16) {
        _error
            .text("Please enter a valid email address")
            .show();
        return false;
    }else if (dataObj.password.length < 11) {
        _error
            .text("Please enter a passphrase that is at least 11 characters long.")
            .show();
        return false;
    }
    _error.hide();
$.ajax({
    type: 'POST',
    url: 'login_a/ajax/login.php',
    data: dataObj,
    dataType: 'json',
    async: true,
})
.done(function ajaxDone(data){
    console.log(data);
    console.log("done");
    // si les données sont bien envoyées rediriger vers la nouvelle page
    if(data.redirect !== undefined){
        window.location = data.redirect;
      // si les données ne sont pas envoyées afficher un message d'erreur
    }else if(data.error !== undefined){
        _error
            .html(data.error)
            .show();
    }
 })
.fail(function ajaxFailed(e){
  })
.always(function ajaxAlwaysDoThis(data){
    console.log('Always');


    })
return false;
})