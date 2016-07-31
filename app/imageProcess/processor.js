var fs    = require('fs');
var path  = require('path');
var im    = require('imagemagick');


export var processImages = function(data, callback) {
  _validateImageProcessingData(data, function(data) {
    var inputDir  = data['inputDir'];
    var outputDir = data['outputDir'];
    var width     = data['width'];
    var queue     = [];

    var files = fs.readdirSync(inputDir);
    _enqueueValidImages(files, queue, inputDir, outputDir, width, function(queue) {
      _performProcessing(queue, function(response) {
        if (callback) { callback(response); }
      });
    });
  });
}

function _validateImageProcessingData (data, callback) {
  var isValid = data && data.outputDir != '' && data.inputDir != '' && data.width > 0;
  if (isValid && callback) {
    callback(data);
  } else {
    console.warn('Invalid image processing data', data);
  }
}

//  Enqueue only valid images and then process the queue with a callback
function _enqueueValidImages(files, queue, inputDir, outputDir, width, callback) {
  var allowedExtensions = ['.JPG'];
  files.forEach(function(file, index) {
    var imgSrc = path.join(inputDir, file);
    var imgDst = path.join(outputDir, 'resized_' + width + '_' + file);
    var ext    = path.extname(file).toUpperCase();

    if (allowedExtensions.indexOf(ext) > -1) {
      queue.push({
        "src": imgSrc,
        "dst": imgDst,
        "width": width
      });
    }
  });

  if (callback) { callback(queue); }
}

//  Perform the image processing on the queue of image data
function _performProcessing(queue, callback) {
  queue.forEach(function(img, index) {
    var src   = img['src'];
    var dst   = img['dst'];
    var width = img['width'];

    console.log('(', index + 1, 'of', queue.length, ')', 'Processing', src,  '...');
    _resizeImage(src, dst, width);
  });

  if (callback) { callback('DONE'); }
}

//  Resizes a src image and outputs to dst
function _resizeImage(src, dst, width, callback) {
  im.resize({
    srcPath: src,
    dstPath: dst,
    width:   width
  }, function(err, stdout, stderr) {
    if (err) { throw err };
    console.log('Resized', src, 'to width', width, 'and output as', dst);
  });

  if (callback) { callback(); }
}
