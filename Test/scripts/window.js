const windowsManager = {
    OpenWindows : [],
    presetHtml : '<div class="windowHeader"> <div class="windowIcon"></div><p class="windowTitle"></p> <div class="windowBtns"> <button class="minimalize"> <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"><path d="M5 11h14v2H5z"></path></svg> </button> <button class="fullzise"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 21h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2V7h16l.001 12H4z"></path></svg> </button> <button class="close"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg> </button> </div> </div> <div class="windowContent"> </div>',
    Instance: class{
        windowElement;
        headerElement;
        dragStarted = false;
        isMinimalized = false;
        windowposition;
        mousePosition;
        constructor(name, icon)
        {   
            const windowsParent = document.querySelector(".windows");
            this.windowElement = document.createElement("div");
            this.windowElement.setAttribute("class" , "window");
            this.windowElement.innerHTML = windowsManager.presetHtml;
            windowsParent.appendChild(this.windowElement);
            this.headerElement = this.windowElement.querySelector(".windowHeader");

            // Setting windowPosition;
            const windowBoundingRect = this.windowElement.getBoundingClientRect();
            this.windowposition = {"x" : windowBoundingRect.x, "y" : windowBoundingRect.y};

            // Setting windowTitle;
            this.setTitle(name);
            
           this.enablePositioning();
           
           // Minimalize
           const minimalizeBtn = this.windowElement.querySelector(".minimalize");
           minimalizeBtn.addEventListener("click" , () =>{
            this.minimalize()
           });
           // Close Btn;
           const closeBtn = this.windowElement.querySelector(".close");
           closeBtn.addEventListener("click" , () =>{
                this.close();
           }, {once:true})
           windowsManager.OpenWindows.push(this);
        }
        setPosition(x, y){
            this.windowElement.style.top = y + "px";
            this.windowElement.style.left = x + "px";
            this.windowposition = {x , y}
        }
        setTitle(newName)
        {
            const titleElement = this.windowElement.querySelector(".windowTitle");
            titleElement.textContent = newName;
        }
        enablePositioning()
        {   
            const dektopBg = document.querySelector(".desktopBg");
            this.headerElement.addEventListener("mousedown" , (e) =>{
                this.dragStarted = true;
                this.mousePosition = { "x" : e.pageX, "y" : e.pageY};
                this.windowElement.style.transition  ="none"
                dektopBg.style.transform = "scale(1.1)";
                dektopBg.style.filter = "blur(20px)"

                document.addEventListener("mouseup", () =>{
                    this.dragStarted = false;
                    dektopBg.style.transform = "scale(1)";
                dektopBg.style.filter = "blur(0px)"
                this.windowElement.style.transition = "0.4s all";
                }, {once:true});
            })
            document.addEventListener("mousemove", (e) =>{
                if(this.dragStarted == false) return;
                const posDiff = { "x" : e.pageX - this.mousePosition.x, "y": e.pageY - this.mousePosition.y};
                this.mousePosition = { "x" : e.pageX, "y" : e.pageY};
                this.setPosition(this.windowposition.x + posDiff.x, this.windowposition.y + posDiff.y);
            })
        }
        minimalize()
        {   
            this.isMinimalized = true;
            const navRect = document.querySelector("nav").getBoundingClientRect();
            const navPos = {"x" : navRect.x + navRect.width / 2, "y": navRect.y + navRect.height / 2};
            const windowRect = this.windowElement.getBoundingClientRect();
            const windowPos = {"x" : windowRect.x + windowRect.width / 2 , "y":windowRect.y + navRect.height / 2}
            const relPos = { "x" : navPos.x - windowPos.x , "y": navPos.y - windowPos.y}
            console.log(relPos);
            this.windowElement.style.transition = "0.3s all ease-in"
            this.windowElement.style.transform = `translate(${relPos.x}px) translateY(${relPos.y}px) scale(0)`
            this.windowElement.style.opacity = 0;
        }
        close()
        {
            this.windowElement.style.transition = "0.2s all"
            this.windowElement.style.transform = "scale(0.9)"
            this.windowElement.style.opacity = 0;
            setTimeout(() =>{
                this.windowElement.remove();
            }, 200)
        }
        focus()
        {
            
        }

    }

}
window.addEventListener("load" , () =>{
    new windowsManager.Instance("test")
    new windowsManager.Instance("test2")
    new windowsManager.Instance("test3")
    new windowsManager.Instance("NOCH EIN FENSTER OMG")
})
