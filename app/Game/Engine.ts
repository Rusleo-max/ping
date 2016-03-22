/// <reference path="../GameSettings.ts" />
/// <reference path="../Event.ts" />
/// <reference path="GameState.ts" />
/// <reference path="Collision.ts" />

module Ping {
    export module Game {
        export class Engine {
            private gameData : GameState;
            private settings: GameSettings;
            private playerOneConcede : Event = new Event();
            private playerTwoConcede : Event = new Event();

            constructor (gameData : GameState, settings: GameSettings) {
                this.gameData = gameData;
                this.settings = settings;
            }

            step (remainingStep : number = 1) {
                var nearestCollision : Collision;

                if (this.gameData.ballIsLeftOfPlayingArea()) {
                    this.playerOneConcede.fire();
                }
                else if (this.gameData.ballIsRightOfPlayingArea()) {
                    this.playerTwoConcede.fire();
                }
                else {
                    nearestCollision = this.gameData.getNearestCollision();
                    if (nearestCollision && nearestCollision.stepAmount < remainingStep) {
                        this.gameData.move(nearestCollision.stepAmount);
                        nearestCollision.resolve();
                        this.step(remainingStep - nearestCollision.stepAmount);
                    }
                    else {
                        this.gameData.move(remainingStep);
                    }
                }
            }

            onPlayerOneConcede (callback : () => void) {
                this.playerOneConcede.register(callback);
            }

            onPlayerTwoConcede (callback : () => void) {
                this.playerTwoConcede.register(callback);
            }
        }
    }
}
