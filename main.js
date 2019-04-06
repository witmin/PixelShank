/**
 * Created by millie.lin on 26-10-15.
 */

'use strict';
var electron = require('electron');
var {app, BrowserWindow} = electron;
var {crashReporter} = require('electron')


// Report Crashes to our server
crashReporter.start({
    productName: 'PixelShank',
    companyName: 'Millie Lin',
    submitURL: 'https://www.millielin.com',
    uploadToServer: false
});

// Global refernce of the window object
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    //On OS X to have the app stay active until user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    // Create Browser Window
    mainWindow = new BrowserWindow({width: 1000, height: 720});

    // load the index.html of the app
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    //mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

});