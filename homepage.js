

let post_button = document.getElementById("PostStuff_button");
let read_button = document.getElementById("ReadStuff_button");
let the_form = document.getElementById("The_input_form");
let form = document.getElementById("The_input_form");
let back_button = document.getElementById("back_button");
let urlparams = new URLSearchParams(window.location.search);
let token = urlparams.get("token");
let username = urlparams.get("username");
let maindiv = document.getElementById("MainDivToShowDocs");
let inp = document.getElementById("The_Input")
let title  = document.getElementById("Title")
const addMainButtonsEventListeners = ()=>{

let inputs = Array.from(document.querySelectorAll("input"));

for(const i of inputs){
    i.setAttribute("autocomplete","off")
}

post_button.addEventListener("click",()=>{
    post_button.style.visibility = "hidden";
    read_button.style.visibility = "hidden";

    the_form.style.visibility = "visible"
    if(title.value!=""){
        title.value = ""
    }
    if(inp.value!=""){
        inp.value=""
    }
    custombuttonseventListener();
})

}

back_button.addEventListener("click",()=>{
    post_button.style.visibility = "visible";
    read_button.style.visibility = "visible";
    the_form.style.visibility = "hidden"
})



read_button.addEventListener("click",()=>{
    GetStuff();
})

let input_for_custom = document.getElementById("The_Input");
const GetStuff = ()=>{
    if(maindiv.style.display=="none"){
        console.log("Hi");
        maindiv.style.display="flex"
        let entities = Array.from(document.getElementsByClassName("AEntity"));
        for(const i of entities){
                    i.style.visibility = "visible";
            }
    }
    let jsonObject = {}
    let keys = []
    post_button.style.visibility = "hidden";
    read_button.style.visibility = "hidden";
    jsonObject["username"]= username;
    fetch("https://h7tbrmvdoh.execute-api.us-east-1.amazonaws.com/Prod/getNotes",{
        "method":"POST",
        "headers":{
            "content-type":"application/json",
            "Token":[token,username]
        },
        "body":JSON.stringify(jsonObject)
    }).then((resp)=>resp.json()).then((data)=>{
    
        let obj = JSON.parse(data.body)
        console.log(obj);
        
        for(const i of obj.object_keys){
            keys.push(i);
        }


    maindiv.style.display = "flex";
    maindiv.style.flexDirection = "column";
    maindiv.style.gap = "10px";
    maindiv.style.alignItems = "start"
    
    for(var i of keys){
        let title = i;
        let temp = document.createElement("div");
        temp.id = i;
        let img = document.createElement("img");
        img.src = "Images/Document.png";
        img.style.width = "50%";
        img.style.height = "50%";
        let text = document.createElement("p");
        text.innerText = i;
        temp.append(img);
        temp.append(text);
        temp.classList.add("AEntity")
        temp.style.display = "flex";
        temp.style.flexDirection = "column";
        temp.style.gap = "10px";
        temp.style.alignItems = "center";
        maindiv.append(temp);
        temp.addEventListener("click",()=>{
            jsonObject = {};
            jsonObject.username= username;
            jsonObject.key = temp.id;
            fetch("https://h7tbrmvdoh.execute-api.us-east-1.amazonaws.com/Prod/get_doc",{
                "method":"post",
                "headers":{
                    "content-type":"application/json",
                    "Token":[token,username],
                },
                "body":JSON.stringify(jsonObject)
            }).then((res)=>res.json()).then((data)=>{

                console.log(data);
                let bodycontent = JSON.parse(data.body);
                content = bodycontent.content;
                metadata = bodycontent.Metadata
                console.log(content,metadata);
                let entities = Array.from(document.getElementsByClassName("AEntity"));
                for(const i of entities){
                            i.style.visibility = "Hidden";
                    }
            
                let div_temp = document.createElement("div");
                div_temp.classList.add("ClassOFDiv")
                let para_temp = document.createElement("p");
                para_temp.innerText = content.length>40?content.slice(0,40):content;
                para_temp.style.fontFamily= "monospace";
                para_temp.style.fontSize = "1.5rem";
                para_temp.style.color = "white";
                para_temp.id = "para_to_show_preview"
                div_temp.append(para_temp);
                for( const i in metadata){
                    if(metadata[i]=""){
                        null;
                    }
                    else{
                        switch(i){
                            case "font-family":
                                para_temp.style.fontFamily = metadata[i];
                                break;
                            case "font-emp":
                                para_temp.style.fontStyle = metadata[i]
                                break;
                            case "font-weight":
                                para_temp.style.fontWeight = metadata[i];
                        }
                    }
                }
                document.body.append(div_temp);

                div_temp.addEventListener("click",(event)=>{
                    event.target.style.visibility = "Hidden";
                    form.style.visibility = "visible";
                    document.getElementById("The_Input").value = content;
                    console.log(title.split("/")[1])
                    document.getElementById("Title").value = title.split("/")[1];
                    maindiv.style.display = "none";
                    weight_state = 0;
                    Emp = 0;
                    font = 0
                    custombuttonseventListener();
                })
            })
        });
    }
       
    })

}




form.addEventListener("submit",(event)=>{
    event.preventDefault();
    Post_Stuff(event.target);
})



const Post_Stuff = async (target)=>{

    
    let formdata = new FormData(target);
    console.log(formdata);
    jsonObject = {}

    for(var [key,value] of formdata.entries()){
        jsonObject.Content = value;
    }
    console.log(jsonObject);
    jsonObject["FontFam"]=input_for_custom.style.fontFamily;
    jsonObject["FontWeight"] = input_for_custom.style.fontWeight;
    jsonObject["FontEmp"] = input_for_custom.style.fontStyle;
    jsonObject["Title"] = document.getElementById("Title").value;
    jsonObject["username"] = username;
    jsonObject["TokenLogin"]=token;
    console.log(jsonObject)

   let res = await  fetch("https://h7tbrmvdoh.execute-api.us-east-1.amazonaws.com/test/PostNote",{
        "method":"POST",
        "headers":{
            'Content-Type': 'application/json', 
    },

    "body":JSON.stringify(jsonObject)

})
    let data = await res.json();
    console.log(data);
    




}


weight_state = 0;
Emp = 0;
font = 0
const custombuttonseventListener = ()=>{
    let custom_buttons = Array.from(document.getElementsByClassName("CustomButton"));
    for(const i of custom_buttons){
        i.addEventListener("click",(event)=>{
            event.preventDefault();
            switch(i.id){
                case "Font_Weight":
                 
                    if(weight_state==0){
                        input_for_custom.style.fontWeight = "bolder";
                        weight_state = 1
                    }
                    else{
                        input_for_custom.style.fontWeight = "lighter";
                        weight_state = 0;
                    }
                    
                    break;
                case "Font_Style_emphasis":
    
                    if(Emp==0){
                        input_for_custom.style.fontStyle = "italic";
                        Emp = 1
                    }
                    else{
                        input_for_custom.style.fontStyle = "none";
                        Emp = 0;
                    }
                    
                    break;
                case "FontFam":
                    console.log(font)
                    let fonts = document.getElementById("FontList");
                    if(font==0){
                        let type_of_font_needed = Array.from(document.getElementsByClassName("Font"));
                        console.log(type_of_font_needed)
                        for(const i of type_of_font_needed){
                            i.addEventListener("click",()=>{
                                font_needed = ""
                                console.log(i.id)
                                switch(i.id){
                                    case "Monospace":
                                        font_needed = "monospace"
                                        break;
                                    case "TNR":
                                        font_needed = "'Times New Roman', Times, serif"
                                        break;
                                    case "Arial":
                                        font_needed = "Arial, Helvetica, sans-serif"
                                        break;
                                    case "Cursive":
                                        font_needed = "cursive"
                                        break;
                                    case "Sans":
                                        font_needed = "sans-serif"
                                        break;
                                }
                                input_for_custom.style.fontFamily = font_needed;
                            })
                        }
                        fonts.style.visibility = "visible"
                        font = 1;
                    }
                    else{
                        fonts.style.visibility = "hidden";
                        font = 0;
                    }
                    
                    break;
            }
        })
    }
}

    document.getElementById("Title").addEventListener("keypress",(event)=>{
        if(event.key=="Enter"){
            event.preventDefault();
        }
      
    })


document.addEventListener("DOMContentLoaded",()=>{
    addMainButtonsEventListeners();
})


