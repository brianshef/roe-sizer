import { updateStatus } from 'console';

export var log = function(level, msgs) {
  var logMsg = '';
  var delimiter = '';

  msgs.forEach(function(msg) {
    logMsg += delimiter + msg;
    delimiter = ' ';
  });

  switch(level.toUpperCase()) {
    case 'INFO':
      console.info(logMsg);
      break;
    case 'LOG':
      console.log(logMsg);
      break;
    case 'WARN':
    case 'WARNING':
      console.warn(logMsg);
      break;
    case 'ERROR':
      console.error(logMsg);
      break;
    default:
      console.log(logMsg);
      break;

    updateStatus(logMsg);
  }
}
