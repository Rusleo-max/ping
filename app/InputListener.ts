/// <reference path="Event.ts" />

module Ping {
    export class InputListener {
        // todo make these protected when I've got a version of TypeScript that supports it
        startPlayerOneMovingUp : Event = new Event();
        startPlayerOneMovingDown : Event = new Event();
        startPlayerTwoMovingUp : Event = new Event();
        startPlayerTwoMovingDown : Event = new Event();
        stopPlayerOneMoving : Event = new Event();
        stopPlayerTwoMoving : Event = new Event();
        pause: Event = new Event();
        start: Event = new Event();

        onStartPlayerOneMovingUp (callback : () => void) {
            this.startPlayerOneMovingUp.register(callback);
        }

        onStartPlayerOneMovingDown (callback : () => void) {
            this.startPlayerOneMovingDown.register(callback);
        }

        onStartPlayerTwoMovingUp (callback : () => void) {
            this.startPlayerTwoMovingUp.register(callback);
        }

        onStartPlayerTwoMovingDown (callback : () => void) {
            this.startPlayerTwoMovingDown.register(callback);
        }

        onStopPlayerOneMoving (callback : () => void) {
            this.stopPlayerOneMoving.register(callback);
        }

        onStopPlayerTwoMoving (callback : () => void) {
            this.stopPlayerTwoMoving.register(callback);
        }

        onPause (callback : () => void) {
            this.pause.register(callback);
        }

        onStart (callBack : () => void) {
            this.start.register(callBack);
        }
    }
}
