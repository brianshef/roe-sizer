# ![](/resources/icon_sm.png "Roe-Sizer") Roe-Sizer
Handy image batch resizer, designed with LuLaRoe consultants in mind.

## Installation
First, Roe-Sizer requires [ImageMagick](http://imagemagick.org/script/binary-releases.php)
to be installed on your system.
Windows users might need to install all available options with ImageMagick.

### OSX / MacOS
1. Double-click the versioned `roe-sizer_*.dmg` file to mount
the disk.
2. Once mounted, the Roe-Sizer MacOS installation window will automatically open
and prompt you to drag the application icon into your Applications directory
to install Roe-Sizer.
3. To run Roe-Sizer, simply double-click the `Roe-Sizer.app` icon from
the Applications directory, or whatever dock you feel like adding it to!

### Windows
1. Double click the versioned `roe-sizer_*.exe` file to execute
the Windows installer.
2. The application will be installed by default to `C:\Program Files (x86)\Roe-Sizer`
3. To run Roe-Sizer, simply double-click the `Roe-Sizer` shortcut or executable
application file.

### Linux ( Ubuntu / Debian )
1. Use your system's software manager/installer
(or simply double-click, in most desktop distros) to install the versioned
`roe-sizer_*.deb` Debian package.
2. If you're using Linux, you know how to run the software that you install.
There are simply too many distros and desktop environments for me to list the
myriad ways to run an application. Look for the Roe-Sizer icon!

## Usage
1. Paste in *input* directory. This should be a folder containing the images that need to be processed.
1. Paste in the *output* directory. This will be the location where all the processed images will be placed when they are ready.
1. Select the *desired width*. The images will be sized down to that width; the image aspect ratio will be preserved.
1. Press the *PROCESS IMAGES* button once the above options have been set.

### Developers (Linux / MacOS)

#### Install modules
```
cd roe-sizer && sudo npm install
popd app && sudo npm install && pushd
```

#### Run (in development mode)
`cd roe-sizer && npm start`

#### Technologies
- [NodeJS](https://nodejs.org/en/)
- [Electron](https://github.com/szwacz/electron-boilerplate)
- [Bootstrap](http://getbootstrap.com/)
- [ImageMagick](http://imagemagick.org/script/binary-releases.php)
- [NSIS](http://nsis.sourceforge.net/Main_Page)
