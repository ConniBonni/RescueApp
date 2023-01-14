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
        isPinned = false;
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
                if(this.instances.length == 1)
                {   
                    if(this.instances[0].isMinimalized == true)
                    {
                        this.instances[0].open();
                        return;
                    }
                    this.instances[0].minimalize();
                }
                if(this.instances.length > 1)
                {
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
                }
            })
            taskbar.allInstances.push(this);
            // Activate Context Menu
            this.btnElem.addEventListener("contextmenu", (e) =>{
              e.preventDefault();
              // Setting windowed Menu;
              if(this.instances.length > 1)
              { 

                // Showing all windows;
                windowManager.showAllWindowsOfArray(this.instances);

                // Let controll all windows
                const ctxElem = new contextMenu.instance(this.btnElem , [{icon : this.instances[0].icon} , {paragraph: `Es sind ${this.instances.length} Fenster offen.`} , "GAP"], "BOTTOM" ,false);
                this.instances.forEach(inst =>{
                    const windowBtn = ctxElem.addButton({"text": inst.windowName , "icon": inst.icon ,"type": "WINDOW"});
                    windowBtn.addEventListener("click" , () =>{
                        if(inst.isMinimalized){
                            inst.open();
                            return;
                        }
                        if(inst.isMinimalized == false){
                            inst.minimalize()
                        }
                    })
                    windowBtn.addEventListener("mouseenter" , () =>{
                        inst.windowElement.style.transform = "scale(0.85)";
                    })
                    windowBtn.addEventListener("mouseleave" , () =>{
                        inst.windowElement.style.transform = "scale(0.92)";
                    })
                })
                ctxElem.addGab();
                // Close btn is closing all windows
                const closeBtn = ctxElem.addButton({"text": "Alle Fenster schließen", "icon":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.001 12H4z"></path><path d="m15.707 10.707-1.414-1.414L12 11.586 9.707 9.293l-1.414 1.414L10.586 13l-2.293 2.293 1.414 1.414L12 14.414l2.293 2.293 1.414-1.414L13.414 13z"></path></svg>', "color": "#993838"}});
                closeBtn.addEventListener("click" , () =>{
                    console.log("clicked")
                    this.closeAll()
                })
                ctxElem.addButton({"text": "Anwendung anpinnen", "icon":{"svg":'<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"><path d="m12 22 1-2v-3h5a1 1 0 0 0 1-1v-1.586c0-.526-.214-1.042-.586-1.414L17 11.586V8a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2H8c-1.103 0-2 .897-2 2v3a1 1 0 0 0 1 1v3.586L5.586 13A2.01 2.01 0 0 0 5 14.414V16a1 1 0 0 0 1 1h5v3l1 2zM8 4h8v2H8V4zM7 14.414l1.707-1.707A.996.996 0 0 0 9 12V8h6v4c0 .266.105.52.293.707L17 14.414V15H7v-.586z"></path></svg>'}});
                ctxElem.show();
                document.querySelector(".dektopAction").addEventListener("click", () =>{
                    windowManager.closeWindowPresentation(this.instances);
                })
              }
              // For only one window
              if(this.instances.length == 1){
                const ctxElem = new contextMenu.instance(this.btnElem , [{icon: this.instances[0].icon}, "GAP"], "BOTTOM" , false);
                const windowBtn = ctxElem.addButton({"text":this.instances[0].windowName , "icon" : this.instances[0].icon, "type":"WINDOW"});
                ctxElem.addGab();
                const closeBtn = ctxElem.addButton({"text": "Fenster schließen", "icon":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.001 12H4z"></path><path d="m15.707 10.707-1.414-1.414L12 11.586 9.707 9.293l-1.414 1.414L10.586 13l-2.293 2.293 1.414 1.414L12 14.414l2.293 2.293 1.414-1.414L13.414 13z"></path></svg>', "color": "#993838"},"callback" : this.closeAll});
                closeBtn.addEventListener("click" , () => {this.closeAll()})
                ctxElem.addButton({"text": "Anwendung anpinnen", "icon":{"svg":'<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"><path d="m12 22 1-2v-3h5a1 1 0 0 0 1-1v-1.586c0-.526-.214-1.042-.586-1.414L17 11.586V8a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2H8c-1.103 0-2 .897-2 2v3a1 1 0 0 0 1 1v3.586L5.586 13A2.01 2.01 0 0 0 5 14.414V16a1 1 0 0 0 1 1h5v3l1 2zM8 4h8v2H8V4zM7 14.414l1.707-1.707A.996.996 0 0 0 9 12V8h6v4c0 .266.105.52.293.707L17 14.414V15H7v-.586z"></path></svg>'}});
                ctxElem.show();

                windowBtn.addEventListener("click" , () =>{
                    if(this.instances[0].isMinimalized){
                        this.instances[0].open();
                        return;
                    }
                    if(this.instances[0].isMinimalized == false){
                        this.instances[0].minimalize()
                    }
                })
              }
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
        close(inst)
        {   
            let index = 0;
            let windowInst;
            this.instances.forEach(i =>{
                
                if(i.id == inst.id)
                {   
                    console.log(true);
                    windowInst = i;
                }
                index++;
            })
            this.instances.splice(windowInst , 1);

                if(this.instances.length > 0) return;
                if(this.isPinned == false)
                {   
                this.btnElem.style.borderRadius = "0px";
                this.btnElem.style.width = "0px";
                this.btnElem.style.opacity = 0;
                this.btnElem.style.margin = "0px";
                this.btnElem.style.padding = "0px";
            }
        }
        closeAll(inst)
        {   
            const allInstances = this.instances;
            allInstances.forEach(i =>{
                console.log(i);
                i.close();
            })
        }
    }
}
class Programm{

}