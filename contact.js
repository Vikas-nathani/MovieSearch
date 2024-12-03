const C_name=document.getElementById("ContactName");
const num=document.getElementById("number");
const mail=document.getElementById("ContactMail");
function search(){
    if (C_name.value.trim()==''){
        window.alert("enter your name correctly");
        C_name.focus();
        return;
    }
    if(mail.value.trim()==""){
        window.alert("enter the email");
        mail.focus();
        return ;
    }
    if (!NaN(num) && num.trim()=='' && num.length!=10){
        window.alert("enter a number with 10 digits");
        return;
    }
    alert("contact us submited");
}




