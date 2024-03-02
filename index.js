
var login_form = document.getElementById("LogInForm")
var login_button = document.getElementById("Log_In");
var signup_div = document.querySelector("#signup_div");
let signup_form = document.getElementById("signup_form");
function Login_Form_Disp(){
    
    login_button.addEventListener("click",(event)=>{
        event.target.style.display = "none";
        document.getElementById("signup_prompt").style.display = 'none';
        
        login_form.style.display = "flex"
        login_form.style.flexDirection = "column"
        login_form.style.gap = "20px";
        document.getElementById("form_submit_button").addEventListener("click",(event)=>{
            event.preventDefault()
            login_via_API();
        })
    })
}

function Signup_Form_Disp(){

    signup_div.addEventListener("click",()=>{
    
        login_button.style.display = "none";

        document.getElementById("signup_prompt").style.display = "none";
        
        signup_form.style.display = "flex";
        signup_form.style.flexDirection = "column";
        signup_form.style.gap = "20px"
        
        document.getElementById("form_submit_button_signup").addEventListener("click",(event)=>{
            event.preventDefault()
            signup_via_API();
        })
 
    })
}



async function  signup_via_API(){
    try{
        let signupformdata= new FormData(signup_form);
        jsonObject = {}
        for(var [i,j] of signupformdata.entries()){
            jsonObject[i]=j;
        }
        let res = await fetch("https://h7tbrmvdoh.execute-api.us-east-1.amazonaws.com/test/signup",{
            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(jsonObject)
        })
        let data = await res.json()
        console.log(data)
    }
    catch(error){
        console.error(error);
    }
    
}

async function  login_via_API(){
    try{
        let loginform = new FormData(login_form);

        for(var i of loginform){
            console.log(i);
        }
        let jsonObject = {};
        console.log(loginform.entries())
        for(let [key,value] of loginform.entries()){
            jsonObject[key] = value;
        }
        for(var i in jsonObject){
            console.log(i,jsonObject[i]);
        }
        let username1 = jsonObject.username;
        let res =  await fetch("https://h7tbrmvdoh.execute-api.us-east-1.amazonaws.com/test/login",{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(jsonObject),
        });
        let data = await res.json();
        console.log(data);
        let body = JSON.parse(data.body)
        if(body.success==true){
            window.open(`http://127.0.0.1:5502/homepage.html?token=${body.token}&username=${username1}`)
        }
        else{
    
                let temp = document.createElement("p");
                temp.innerHTML = "<strong>Not a valid Email/Password combo</strong>"
                temp.style.color = "red";
                login_form.append(temp);    
            }
           
     }
       

    catch(error){
        console.error(error);
    }
    
}

let inputs = Array.from(document.querySelectorAll("input"));

for(const i of inputs){
    i.setAttribute("autocomplete","off")
}

document.addEventListener("DOMContentLoaded",()=>{
    Login_Form_Disp();
    Signup_Form_Disp();
})