const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// Listen for the app to be ready

app.on('ready',function(){
    //create new window
    mainWindow = new BrowserWindow({});
    //Load HTML file
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    //Quit app when closed
    mainWindow.on('closed',function () {
        app.quit();
    })
    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create add window
function createAddWindow(){

    //create new window
    addWindow = new BrowserWindow({
        width: 500,
        height: 400,
        title:'Add example here'
    });
    //Load HTML file
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    //Garbage collection handle
    addWindow.on('close',function () {
        addWindow = null;
    })

    //DELETE MENU FROM WINDOW
    addWindow.setMenu(null);
}

//Catch item add

ipcMain.on('item:add',function (e,item) {
    mainWindow.webContents.send('item:add',item);
    //addWindow.close();
})
//create menu template

const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
        {
            label:'Quit',
            accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click(){
                app.quit();
            }
        },
            {
                label:'Another example',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click() {
                    mainWindow.webContents.send('item:clear');
                }
            }
        ]
    }
];
//if MAC add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'dev tools',
        submenu:[
            {
                label:'Toogle dev tools',
                accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    })
}