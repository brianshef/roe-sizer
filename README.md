# roe-sizer
Handy image batch resizer, designed with LuLaRoe consultants in mind.

## Installation
First, Roe-Sizer requires [ImageMagick](http://imagemagick.org/script/binary-releases.php)
to be installed on your system.

Additional installation instrutions TBD

## Usage
1. Paste in *input* directory. This should be a folder containing the images that need to be processed.
1. Paste in the *output* directory. This will be the location where all the processed images will be placed when they are ready.
1. Select the *desired width*. The images will be sized down to that width; the image aspect ratio will be preserved.
1. Press the *PROCESS IMAGES* button once the above options have been set.

### LuLaRoe Consultants
Instructions TBD

### Developers (Linux / MacOS)
#### Install modules
`cd roe-sizer && sudo npm install`
`popd app && sudo npm install && pushd`
#### Run (in development mode)
`cd roe-sizer && npm start`
