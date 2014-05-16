// JavaScript Document
function chkFormular () {
  if (document.Formular.User.value == "") {
    alert("Bitte Ihren Namen eingeben!");
    document.Formular.User.focus();
    return false;
  }
  if (document.Formular.Ort.value == "") {
    alert("Bitte Ihren Wohnort eingeben!");
    document.Formular.Ort.focus();
    return false;
  }
  if (document.Formular.Mail.value == "") {
    alert("Bitte Ihre E-Mail-Adresse eingeben!");
    document.Formular.Mail.focus();
    return false;
  }
  if (document.Formular.Mail.value.indexOf("@") == -1) {
    alert("Keine E-Mail-Adresse!");
    document.Formular.Mail.focus();
    return false;
  }
  if (document.Formular.Alter.value == "") {
    alert("Bitte Ihr Alter eingeben!");
    document.Formular.Alter.focus();
    return false;
  }
  var chkZ = 1;
  for (i = 0; i < document.Formular.Alter.value.length; ++i)
    if (document.Formular.Alter.value.charAt(i) < "0" ||
        document.Formular.Alter.value.charAt(i) > "9")
      chkZ = -1;
  if (chkZ == -1) {
    alert("Altersangabe keine Zahl!");
    document.Formular.Alter.focus();
    return false;
  }