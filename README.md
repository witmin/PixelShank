<img src="https://github.com/witmin/PixelShank/blob/master/img/icon.png?raw=true" alt="PixelShank Icon" width="128" />

# PixelShank
Add pixel size mark on image and save as .png. Build with [p5.js](http://p5js.org/), [electron](http://electron.atom.io/) and [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

<img src="https://github.com/witmin/PixelShank/blob/master/design_source/screenshots/PixelShank.png?raw=true" alt="PixelShank Screenshot"/>

### Work as desktop app
PixelShank is integrated with electron, aftere simple setup, you can build the cross-platform desktop app on Windows, MacOS or Linux.

#### Install
1. Check out the repository to your local machine as a new project
2. Ensure you have the latest version of [node.js](https://nodejs.org/en/) installed.
3. Open the terminal `cd` to the project folder `.../pixelshank`
4. Type `npm install` to install the Dependencies include electron, electron-packager and electron-prebuild.
5. Type `npm run-script start` or run `electron .`, you will have the development version of the desktop app work.  

#### Package as an app
PixelShank use electron-packager to generate the desktop app for windows, MacOS and Linux.
 
##### Build app for Windows
The default setup is for windows(64bit)
In terminal, run "npm run-script build", the folder "PixelShank-win32-x64" with PixelShank.exe file should appears in your project folder. Now you can have the program run anytime as you want.
If you want to generate app in 32bit, please refer to the document of [electron-packager](https://github.com/maxogden/electron-packager).

You can also directly run the electron command as you want like the sample code below

```
electron-packager ./ PixelShank --platform=win32 --arch=x64 --version=0.35.0 --icon=./img/icon.ico --ignore=design_source --asar --overwrite
```

##### Build app for MacOS
```
electron-packager ./ PixelShank --platform=darwin --arch=x64 --version=0.35.0 --icon=./img/icon.ico --ignore=design_source --asar --overwrite
```

#### Build app for Linux or in other format
Please refer to the npm page of [electron-packager](https://www.npmjs.com/package/electron-packager).


### Work in modern browser
It needs you to run a local server to make it work in the browser on local machine. I would suggest [http-server](https://www.npmjs.com/package/http-server) if you want to test it locally. 
You can also upload the index.html, js and css folder to your online server to make it work.

Build with love with Webstorm.