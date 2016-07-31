import { ids } from '../htmlElements/elementIds';
import { setContent } from '../htmlElements/utils';

//  Updates the status message to the specified message content.
export var updateStatus = function (msg) {
  setContent(ids['statusId'], msg);
}
