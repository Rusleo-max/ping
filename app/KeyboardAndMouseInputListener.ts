/// <reference path="InputListener.ts" />
/// <reference path="KeyMap.ts" />

module Ping {
    export class KeyboardAndMouseInputListener extends InputListener {
        constructor (element : HTMLCanvasElement, keyMap: KeyMap) {
            super();

            element.addEventListener('keypress', (e) => {
                switch (e.which) {
                    case keyMap.pause:
                        e.preventDefault();
                        this.pause.fire();
                        break;
                }
            });

            element.addEventListener('keydown', (e) => {
                switch (e.which) {
                    case keyMap.playerOneMoveUp:
                        e.preventDefault();
                        this.startPlayerOneMovingUp.fire();
                        break;
                    case keyMap.playerOneMoveDown:
                        e.preventDefault();
                        this.startPlayerOneMovingDown.fire();
                        break;
                    case keyMap.playerTwoMoveUp:
                        e.preventDefault();
                        this.startPlayerTwoMovingUp.fire();
                        break;
                    case keyMap.playerTwoMoveDown:
                        e.preventDefault();
                        this.startPlayerTwoMovingDown.fire();
                        break;
                }
            });

            element.addEventListener('keyup', (e) => {
                switch (e.which) {
                    case keyMap.playerOneMoveUp:
                    case keyMap.playerOneMoveDown:
                        e.preventDefault();
                        this.stopPlayerOneMoving.fire();
                        break;
                    case keyMap.playerTwoMoveUp:
                    case keyMap.playerTwoMoveDown:
                        e.preventDefault();
                        this.stopPlayerTwoMoving.fire();
                        break;
                }
            });

            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.start.fire();
            });
        }
    }
}
