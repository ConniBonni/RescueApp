const contextMenu = {
    instance: class{
        animationType;
        ctxElem;
        parentElem;
        bttns = [];
        constructor(parent , index , animation, autoshow = true)
        {   
            this.parentElem = parent;
            this.animationType = animation;
            this.ctxElem = document.createElement("div");
            this.ctxElem.setAttribute("class" , "ctxMenu");
            document.querySelector("body").appendChild(this.ctxElem);

            contextMenu.allInstances.forEach(ctx  =>{
                ctx.hide();
            })
            contextMenu.allInstances.push(this);
    
            // Setting Content
            this.setContent(index);
    
            // if autoshow is turned on:
    
            if(autoshow == true) this.show();
    
            // Animationadjustments
            setTimeout(this.setAnimationIn(animation) , 50)
    
            // Closing events
        }
        setContent(content)
        {   
            content.forEach(ind =>{
                if(ind.icon) this.addIcon(ind.icon);
                if(ind.paragraph) this.addParagraph(ind.paragraph);
                if(ind == "LINE") this.addLine();
                if(ind == "GAP") this.addGab();
                if(ind.button) this.addButton(ind.button);
            })
        }
        positionOnTop(parent)
        {   
            // Y-Pos
            const parentPos = parent.getBoundingClientRect();
            const elemPos = this.ctxElem.getBoundingClientRect();
    
            const yDiff  = parentPos.y - parentPos.height / 2 - elemPos.height;
            this.ctxElem.style.top = yDiff + "px";
            //X-Pos
            this.ctxElem.style.left = parentPos.left + parentPos.width / 2 - elemPos.width / 2+ "px";
        }
        addParagraph(p)
        {
            this.ctxElem.innerHTML = this.ctxElem.innerHTML += "<p class='CtxMenuP'>" + p + "</p>";
        }
        addIcon(newIcon)
        {   
            // Setting icon
            if(newIcon == undefined) return;
            const iconElem = document.createElement("div");
            iconElem.setAttribute("class" , "ctxMenuIcon");
            this.ctxElem.appendChild(iconElem);
            // Icon for url
            if(newIcon.url != undefined)
            {   
                iconElem.style.backgroundImage = `url(${newIcon.url})`;
            }
            // Icon for SVG
            if(newIcon.svg != undefined)
            {
                iconElem.appendChild(newIcon.svg);
            }
    
            // Setting color for svg, if svg is not undefined;
            if(newIcon.color != undefined)
            {   
                const svg = iconElem.querySelector("svg");
                svg.style.fill = newIcon.color;
            }
        }
        addButton(newButton)
        {   
            const btnElem = document.createElement("button");
            btnElem.setAttribute("class", "ctxMenBttn");
            this.ctxElem.appendChild(btnElem);
            if(newButton.icon != undefined)
            {   
                // Setting icons
                const icon = document.createElement("div");
                icon.setAttribute("class" , "ctxMenBttnIcon");
                btnElem.appendChild(icon);
                // Adding svg icons if set
                if(newButton.icon.svg != undefined){
                    icon.innerHTML = newButton.icon.svg;
                }
                // Setting color for svg icons
                if(newButton.icon.color != undefined)
                {
                    icon.style.fill = newButton.icon.color;
                }
                // Setting up icons with bg img url
                if(newButton.icon.url != undefined){
                    const iconimg = document.createElement("img");
                    iconimg.setAttribute("class" , "ctxMenBttnIconImg");
                    iconimg.setAttribute("src" , newButton.icon.url);
                    icon.appendChild(iconimg);
                }
                // Window icons are getting bg
                if(newButton.type == "WINDOW") icon.setAttribute("class" , "ctxMenBttnIcon ctxMenBttnIconWindow");
            }
            if(newButton.text != undefined)
            {   
                const p = document.createElement("p");
                p.innerHTML = newButton.text;
                btnElem.appendChild(p);
            }
            // Click event, if enabled
            if(newButton.clickCallback != undefined)
            {
                btnElem.addEventListener("click" , () =>{
                    newButton.clickCallback();
                })
            }
            return btnElem;
        }
        addLine()
        {   
            const newLine = document.createElement("div");
            newLine.setAttribute("class" , "ctxMenuLine");
            this.ctxElem.appendChild(newLine);
        }
        addGab()
        {
            const gap = document.createElement("div");
            gap.setAttribute("class" , "ctxMenuGap");
            this.ctxElem.appendChild(gap);
        }
        setAnimationIn()
        {   
            if(this.animationType == "DEFAULT")
            {   
                this.ctxElem.style.opacity = 0;
                setTimeout(() =>{
                this.ctxElem.style.opacity = 1;
                }, 1)
                return;
            }
            if(this.animationType == "BOTTOM")
            {   
                this.ctxElem.style.opacity = 0;
                this.ctxElem.style.transform = "translateY(100px)";
                setTimeout(() =>{
                this.ctxElem.style.opacity = 1;
                this.ctxElem.style.transform = "translateY(0px)";
                }, 100)
                return;
            }
        }
        show()
        {
            document.querySelector(".desktop").appendChild(this.ctxElem);
    
            //Positioning
            const ctxElemTransform = this.ctxElem.getBoundingClientRect();
            
            // Height
            const bottomSpace = this.parentElem.getBoundingClientRect().bottom;
            const ctxElemHeight = ctxElemTransform.height;
            // Positioning
            if(bottomSpace + ctxElemHeight > window.innerHeight)
            {
                this.positionOnTop(this.parentElem)
            }
            // Child animation;
                const children = this.ctxElem.childNodes;
            const latency = 150 / children.length;
            let fadeInlatency = 160;
            children.forEach(child =>{
                child.style.pointerEvents = "none";
                child.style.opacity = 0;
                child.style.transform = "translateY(30px)";
                child.style.transition = "0.6s all";
                setTimeout(() =>{
                    child.style.transform = null;
                    child.style.opacity = null;
                    child.style.transition = null;
                    child.style.pointerEvents = null;
                }, fadeInlatency)
                fadeInlatency += latency;
            })
    
            document.addEventListener("click" , () =>{
                this.hide();
            })
    
        }
        hide()
        {   
            // Closing elements
            const children = this.ctxElem.childNodes;
            const latency = 150 / children.length;
            let fadeInlatency = 0;
            Array.from(children).reverse().forEach(child =>{
                child.style.transition = "0.4s all";
                child.style.pointerEvents = "none";
                setTimeout(() =>{
                    child.style.opacity = 0;
                    child.style.transform = "translateY(30px)";
                }, fadeInlatency)
                fadeInlatency += latency;
            })
            // Closing elem Animation;
            setTimeout(() =>{
                if(this.animationType == "DEFAULT")
            {   
                this.ctxElem.style.opacity = 0;
                return;
            }
            if(this.animationType == "BOTTOM")
            {   
                this.ctxElem.style.opacity = 0;
                this.ctxElem.style.transform = "translateY(50px)";
                return;
            }
            }, 120)
            setTimeout(() =>{
                this.ctxElem.remove();
            }, 600)
        }
    }
    ,
    allInstances: []
}