/// <reference path="ApplicationStates.ts" />
/// <reference path="GameState.ts" />

module Ping {
    export class ApplicationState {
        public state : ApplicationStates;
        public gameState : GameState;

        constructor (state: ApplicationStates, gameState: GameState) {
            this.state = state;
            this.gameState = gameState;
        }
    }
}