const CONTROLLERSTATE_WAITING_FOR_INPUT = 'WaitingForInput';
const CONTROLLERSTATE_WAITING_FOR_MOVE = 'WaitingForElevatorToMove';
const CONTROLLERSTATE_AWAITING_RESPONSE = 'WaitingForElevatorsToRespond';

const ELEVATORSTATE_GOOD = "Good";
const ELEVATORSTATE_MOVING = "Moving";
const ELEVATORSTATE_OUTOFSERVICE = "OutOfService";

function generateGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}