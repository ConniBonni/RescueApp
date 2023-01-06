const windowsManager = {
    presetHtml : '<div class="window"> <div class="windowHeader"> <p></p> <div class="windowBtns"> <button class="minimalize"> <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"><path d="M5 11h14v2H5z"></path></svg> </button> <button class="fullzise"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 21h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2V7h16l.001 12H4z"></path></svg> </button> <button class="close"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg> </button> </div> </div> <div class="windowContent"> </div> </div>',
    Instance: class{
        windowElement;
        headerElement;
        constructor(name, icon)
        {   
            console.log(document.querySelector(".windows"))
            const windowsParent = document.querySelector(".windows");
            this.windowElement = document.createElement("div");
            this.windowElement.setAttribute("class" , "window");
            this.windowElement.innerHTML = windowsManager.presetHtml;
            windowsParent.appendChild(this.windowElement);
            this.headerElement = this.windowElement.querySelector(".windowHeader");
            
            this.headerElement.addEventListener("mousedown" , (e) =>{
                console.log("clicked");
            })

        }

    }

}
window.addEventListener("load" , () =>{
    new windowsManager.Instance("test")
})
