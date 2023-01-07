const taskbar = {
    allInstances : [],
    getInstance : (instance , prog, options) =>
    {   
        let windowInstance;
        taskbar.allInstances.forEach(inst => {
            if(inst.programm == prog)
            {   
                windowInstance = inst;
                return;
            }
        });
        if(windowInstance == undefined)
        {
            windowInstance = new taskbar.Instance(prog , options);
        }
        return windowInstance;
    },
    Instance:class
    {   
        programm;
        taskIndicatorElem;
        btnElem;
        instances = [];
        constructor(prog, options)
        {   
            this.programm = prog;
            const tb = document.querySelector("nav");
                    // Adding clickable btn
             this.btnElem = document.createElement("button");
             this.btnElem.setAttribute("class" , "instanceBtn");
             tb.appendChild(this.btnElem);
            this.taskIndicatorElem = document.createElement("div");
            this.taskIndicatorElem.setAttribute("class" , "taskIndicator taskIndicatorOpen");
            this.btnElem.appendChild(this.taskIndicatorElem);
            // event listener for clicks (open mimialize windows)
            this.btnElem.addEventListener("click" , () =>{
                let getMayority;
                let minimalizedCount = 0;
                this.instances.forEach(inst =>{
                    if(inst.isMinimalized) minimalizedCount++;
                }) 
                if(minimalizedCount > this.instances.length / 2)
                {   
                    this.instances.forEach(inst =>{
                        inst.open();
                    }) 
                this.setIndicator("BG")
                return;
                }
                
                this.instances.forEach(inst =>{
                    inst.minimalize();
                }) 
            this.setIndicator("OPEN")
            return;
            })
            taskbar.allInstances.push(this);
            // Activate Context Menu
            this.btnElem.addEventListener("contextmenu", (e) =>{
              e.preventDefault(); 
              this.createContextMenu(); 
            })
        }
        addInstances(newInstance)
        {
            this.instances.push(newInstance);
            if(this.instances.length == 1) this.setIcon(newInstance.icon);
        }
        setIcon(newIcon)
        {   
            const iconElem = document.createElement("div");
            iconElem.setAttribute("class", "taskinstanceIcon");
            this.btnElem.appendChild(iconElem);

            if(newIcon.svg != undefined)
            {   
                iconElem.innerHTML = icon.svg;
            }
            if(newIcon.url != undefined)
            {
                iconElem.style.backgroundImage = `url(${newIcon.url})`
            }
        }
        setIndicator(code)
        {   
            const iconElem = this.btnElem.querySelector(".taskIndicator");
            switch (code) {
                case "OPEN":
                    iconElem.setAttribute("class", "taskIndicatorOpen taskIndicator");
                    break;
                case "BG":
                    iconElem.setAttribute("class" , "taskIndicatorBG taskIndicator");
                    break;
                case "FOCUS":
                    iconElem.setAttribute("class" , "taskIndicatorFocus taskIndicator");
                    break;
                    case "UNFOCUS":
                    iconElem.setAttribute("class" , "taskIndicator");
                    break;

            }
        }
        close()
        {
            if(this.isPinned == false)
            {
                this.btnElem.style.borderRadius = "0px";
                this.btnElem.style.width = "0px";
                this.btnElem.style.opacity = 0;
                this.btnElem.style.margin = "0px";
                this.btnElem.style.padding = "0px";
            }
        }
        createContextMenu()
        {
            const ctxMen = document.createElement("div");
            ctxMen.setAttribute("class" , "navCtxMenu");
            document.querySelector("nav").appendChild(ctxMen);
        }
    }
}
class Programm{

}