const windowManager ={
    smallestSize:
    {
        x: 550,
        y:300
    },
    showAllWindowsOfArray(arr){
        this.positionWindows(arr);
        arr.forEach(window =>{
            window.windowElement.style.transform = "scale(0.92)";
        })
        const dektopBg = document.querySelector(".desktopBg");
        dektopBg.style.transform = "scale(1.1) translate(0px, 0px)";
        dektopBg.style.filter = "blur(20px)"
    },
    closeWindowPresentation(arr)
    {
        const dektopBg = document.querySelector(".desktopBg");
        dektopBg.style.transform = "scale(1) translate(0px, 0px)";
        dektopBg.style.filter = "blur(0px)"
        arr.forEach(window =>{
            const initialSize = window.initalSize;
            console.log(initialSize)
            window.setPositionWithoutInitial(window.initalPosition.x , window.initalPosition.y);
            window.setSizeWithoutInitial(initialSize.x , initialSize.y);
            window.initialSize = initialSize;
            window.windowElement.style.transform = null;
            document.querySelector(".dektopAction").removeEventListener("click", {once:true})
        })
    },
    positionWindows(arr)
    {
        // Sorting out not- and reziseable windows
        const openWindows = arr;
        const minimalizedWindows = [];
        if(this.getTotalAreaWhenMinimalized(arr) < window.innerHeight * window.innerWidth)
        {
            const xWindow = Math.round(0.5 * arr.length);
            const yWindow = Math.round(arr.length / xWindow);
            const absoluteHeight = window.innerHeight / yWindow;
            const absoluteWidth = window.innerWidth  /xWindow;
            let rowCount = 0;
            let row = 0;
            let column= 0;
            arr.forEach(window =>{
                window.setSizeWithoutInitial(absoluteWidth , absoluteHeight);
                    window.setPositionWithoutInitial(column * absoluteWidth, row * absoluteHeight);
                    column++; 
                    rowCount++;
                if(rowCount >= xWindow){
                    rowCount = 0;
                    row++;
                    column = 0;
                }
            })
        }
    },

    getTotalArea(arr)
    {   
        let totalSize = 0;
        arr.forEach(window =>{
            const size = window.x * window.y;
            totalSize +=size;
        })
        return totalSize;
    },
    getTotalAreaWhenMinimalized(arr)
    {
        const smallestSize = this.smallestSize.x * this.smallestSize.y;
        return arr.length * smallestSize;
    },
    getBiggestWindow(arr)
    {
        let biggestWindow;
        let biggestSize = 0;
        arr.forEach(window =>{
          const size = window.x * window.y;
          if(size > biggestSize) biggestWindow = window;  
        })
        return biggestWindow;
    }
}