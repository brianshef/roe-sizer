# ![](/resources/icon_sm.png "Roe-Sizer") Roe-Sizer
Handy image batch resizer, designed with LuLaRoe consultants in mind.

## Installation
First, Roe-Sizer requires [ImageMagick](http://imagemagick.org/script/binary-releases.php)
to be installed on your system.

Additional installation instructions TBD

### OSX / MacOS
1. Double-click the versioned `roe-sizer-vx.y.z-darwin-x64.dmg` file to mount
the disk.
2. Once mounted, the Roe-Sizer MacOS installation window will automatically open
and prompt you to drag the application icon into your Applications directory
to install Roe-Sizer.
3. To run Roe-Sizer, simply double-click the `Roe-Sizer.app` icon from
the Applications directory, or whatever dock you feel like adding it to!

### Windows
TBD

### Linux

#### Ubuntu / Debian
TBD

#### RHEL / CentOS / Fedora
TBD

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
