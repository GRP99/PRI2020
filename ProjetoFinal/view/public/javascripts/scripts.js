/* SCRIPTS FILE */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get("token");

/*
function showComments(idF, idU) {
    $.ajax({
        url: "http://localhost:3001/files/" + idF + "?token=" + token,
        type: "GET",
        success: function (data) {
            let cdiv = "<fieldset class=\"w3-container w3-margin\">" + 
                "<legend>Comments</legend>"
                + "<table id=\"tableComentarios\">"
            data.comentarios.forEach(c =>{
                    cdiv +=
                    "<tr style=\"font-size:10px\"> " + c.autor + " commented: </tr>" + 
                    "<tr style=\"font-size:6px\">" + c.data + "<tr>" +
                    "<tr> <textarea style=\"resize: none;\" rows=\"3\" cols=\"37\" readonly>" + c.descricao + "</textarea> </tr>"
            }) 
            cdiv+= "</table> </fieldset>"
            var d= new Date().toISOString().substr(0,16);
            $("#displayComments").empty();
            $("#displayComments").append(cdiv)
            $("#displayComments").append("<form class=\"w3-container\" method=\"POST\" onSubmit=\"return confirm(&quot;Do you want to add this Comment?&quot;)\" action=\"http://localhost:3001/files/"+idF+"/adicionarComentario?token="+token+"\">"+
            "<fieldset class=\"w3-container w3-margin\">" + 
                "<legend>New Comment</legend>"
                + "<input type=\"hidden\" name=\"autor\" value=\""+idU+"\"/>"
                + "<input type=\"hidden\" name=\"data\" value=\""+d+"\"/>"
                + "<table>" +
                    "<tr>"
                        + "<td> <textarea style=\"resize: none;\" rows=\"3\" cols=\"35\" name=\"descricao\"> </textarea> </td> </tr> </table>" +
                "<input class=\"w3-btn w3-blue-grey w3-margin\" type=\"submit\" value=\"Add Comment\"/>"
            + "</fieldset>" +
        "</form>");
            $("#displayComments").modal();
        }
    });
} */

function showComments(idF, idU) {
            var d= new Date().toISOString().substr(0,16);
            $("#displayComments").empty();
            $("#displayComments").append("<form class=\"w3-container\" method=\"POST\" onSubmit=\"return confirm(&quot;Do you want to add this Comment?&quot;)\" action=\"http://localhost:3001/files/"+idF+"/adicionarComentario?token="+token+"\">"+
            "<fieldset class=\"w3-container w3-margin\">" + 
                "<legend>New Comment</legend>"
                + "<input type=\"hidden\" name=\"autor\" value=\""+idU+"\"/>"
                + "<input type=\"hidden\" name=\"data\" value=\""+d+"\"/>"
                + "<table>" +
                    "<tr>"
                        + "<td> <textarea style=\"resize: none;\" rows=\"3\" cols=\"35\" name=\"descricao\"> </textarea> </td> </tr> </table>" +
                "<input class=\"w3-btn w3-blue-grey w3-margin\" type=\"submit\" value=\"Add Comment\"/>"
            + "</fieldset>" +
        "</form>");
            $("#displayComments").modal();
}


function add() {
    var file = $('<input class="w3-input w3-border w3-light-grey" type="file" name="myFile">');
    $("#addeds").append(file);
}

function classificar(nmr, idF) {
    $.ajax({
        url: "http://localhost:3001/files/classificar/" + idF + "?token=" + token + "&class=" + nmr,
        type: "PUT",
        success: function () {
            location.reload();
        }
    });
}

function addAsFavourite(idF) {
    $.ajax({
        url: "http://localhost:3001/files/addAsFavourite/" + idF + "?token=" + token,
        type: "PUT",
        success: function () {
            location.reload();
        }
    });
}

function removeFavourite(idF) {
    $.ajax({
        url: "http://localhost:3001/files/removeFavourite/" + idF + "?token=" + token,
        type: "PUT",
        success: function () {
            location.reload();
        }
    });
}

function showFile(size, id, name, type, autor, desc) {
    var file = $("<pre><b>File name: </b>" + name + "</pre>" + "<pre><b>Size: </b>" + size + "</pre>" + "<pre><b>File Type: </b>" + type + "</pre>" + '<table><tr><pre><b>Description: </b></td><pre><textarea rows="4" cols="70" style="font-size: 11px; resize: none;" readonly>' + desc + "</textarea>" + "</td></tr></table>");
    var download = $('<div style="margin: auto; width: 25%; border: 2px solid black; text-align: center;"><a href="http://localhost:3001/files/download/' + autor + "/" + id + "?token=" + token + '"> Download <i class="fa fa-download"></i></a></div>');

    $("#display").empty();
    $("#display").append(file, download);
    $("#display").modal();
}

function mudafoto(id, token) {
    var file = $('<form class="w3-container" style="margin:50px" action="http://localhost:3001/users/changeprofile?token=' + token + '" method="POST" enctype="multipart/form-data">' + "<pre> <b> Change your profile pic </b> </pre>" + '<input class="w3-input w3-border w3-light-grey" type="file" name="myProfilePic" />' + '<input type="hidden" name="autor" value="' + id + '"/>' + '<input class="w3-btn w3-white w3-border w3-border-green w3-round-large fa" style="margin-top:10px;" type="submit" value="Confirm &#xf00c;"/>' + "</form>");

    $("#df").empty();
    $("#df").append(file);
    $("#df").modal();
}

function validate() {
    mail = document.getElementsByName("_id")[0].value;
    pwd = document.getElementsByName("password")[0].value;
    cpwd = document.getElementsByName("confirm_password")[0].value;

    if (pwd != cpwd) {
        alert("Passwords not matching!");
        return false;
    }

    $.get("http://localhost:3001/users/" + mail + "?token=" + token, function (data) {
        if (data) {
            alert("Email detalhado já em uso!");
            return false;
        } else {
            return true;
        }
    });
    return true;
}

function openUploadModal(user) {
    var file = $('<form class="w3-container" onSubmit="return confirm(&quot;Do you want to submit?&quot;)" action="http://localhost:3001/files?token=' + token + ' "method="POST" enctype="multipart/form-data" id="myForm"><label class="w3-text-blue-grey"><b>Select file</b></label><!-- #addeds--><input class="w3-input w3-border w3-light-grey" type="file" name="myFile" />' + '<p><b class="w3-text-blue-grey">Acess: <select id="level" name="privacy" type="num" ><option value="1">Private</option><option value="0">Public</option></select></b></p>' + "<table>" + "<tr>" + "<td>Descrição:</td>" + '<td><textarea style=\"resize: none;\" rows="3" cols="30" name="descricao"></textarea></td>' + "</tr>" + '<label class="w3-text-gray"><b>Título</b></label>' + '<input class="w3-input w3-border w3-light-grey" type="text" name="title">' + '<label class="w3-text-gray"><b>SubTítulo</b></label>' + '<input class="w3-input w3-border w3-light-grey" type="text" name="subtitle">' + '<label class="w3-text-gray"><b>Data Criação [AAAA-MM-DD]</b></label>' + '<input class="w3-input w3-border w3-light-grey" type="text" name="date">' + '</table><button.w3-btn.w3-teal(type=\'button\' onclick=\'add()\') +--><input type="hidden" name="autor" value="' + user + '" /><input class="w3-btn w3-blue-grey" type="submit" value="Submit" id="addFile" />' + "</form>");

    $("#display").empty();
    $("#display").append(file);
    $("#display").modal();
}

function openWarningModal(user) {
    var file = $('<form class="w3-container" onSubmit="return confirm(&quot;Do you want to submit?&quot;)" action="http://localhost:3001/news?token=' + token + ' "method="POST" enctype="multipart/form-data" id="myForm">' + "<table>" + "<tr>" + "<td>Warning:</td>" + '<td><textarea style=\"resize: none;\" rows="3" cols="30" name="descricao"></textarea></td>' + "</tr>" + '</table><button.w3-btn.w3-teal(type=\'button\' onclick=\'add()\') +--><input type="hidden" name="autor" value="' + user + '" /><input class="w3-btn w3-blue-grey" type="submit" value="Submit" id="addFile" />' + "</form>");

    $("#display").empty();
    $("#display").append(file);
    $("#display").modal();
}

function preventBack() {
    window.history.forward();
}

setTimeout("preventBack()", 0);

window.onunload = function () {
    null;
};

function changePrivacy(id) {
    console.log(id);
    $.ajax({
        url: "http://localhost:3001/files/changeprivacy/" + id + "?token=" + token,
        type: "PUT",
        success: function (response) {
            console.log(document.getElementById("privacy " + id).innerHTML);
            if (document.getElementById("privacy " + id).innerHTML == "Privado ") {
                document.getElementById("privacy " + id).innerHTML = "Público ";
                document.getElementById("button " + id).className = "fa fa-unlock";
            } else {
                document.getElementById("privacy " + id).innerHTML = "Privado ";
                document.getElementById("button " + id).className = "fa fa-lock";
            }
        }
    });
}

function deleteFile(id) {
    var choice = window.confirm("Do you want to delete this file?");
    if (choice) {
        $.ajax({
            url: "http://localhost:3001/files/" + id + "?token=" + token,
            type: "DELETE",
            sucess: function () {
                document.getElementById(id).remove()
            }
        });
    } else{
        false;
    }
}