const name_f=document.getElementById("Name");
const mail=document.getElementById("mail");
const rating=document.getElementById("rating")
const feedback=document.getElementById("feedback");
function validate(){
    if (name_f.value.trim()==''){
        window.alert("enter your name correctly");
        name_f.focus();
        return;
    }
    if(feedback.value.trim()==""){
        window.alert("please enter your feedback");
        feedback.focus();
        return ;
    }
    if(rating.value.trim()=='' || isNaN(rating.value) || rating.value<1 || rating.value>5){
        window.alert("enter your rating between 1 to 5");
        rating.focus();
        return ;
    }
    if(mail.value.trim()==""){
        window.alert("enter the email");
        mail.focus();
        return ;
    }
    alert("feedback submited!")
}