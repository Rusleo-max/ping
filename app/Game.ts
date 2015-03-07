/// <reference path="GameState.ts" />
/// <reference path="ApplicationStates.ts" />
/// <reference path="ApplicationState.ts" />
/// <reference path="GameSettings.ts" />
/// <reference path="RendererSettings.ts" />
/// <reference path="InputListener.ts" />
/// <reference path="Clock.ts" />
/// <reference path="Renderer.ts" />
/// <reference path="Engine.ts" />
/// <reference path="Messages.ts" />

module Ping {
    export class Game {
        constructor (inputListener : InputListener, canvas : HTMLCanvasElement, gameSettings : GameSettings, rendererSettings : RendererSettings, messages : Messages) {
            var gameState : GameState = new GameState(gameSettings),
                clock : Clock = new Clock(gameSettings.clockInterval),
                applicationState: ApplicationState = new ApplicationState(ApplicationStates.ready, gameState),
                renderer : Renderer = new Renderer(applicationState, canvas, rendererSettings, messages),
                engine : Engine = new Engine(gameState, gameSettings);

            inputListener.onStartPlayerOneMovingUp(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.leftPaddle.direction = Direction.up;
                }
            });

            inputListener.onStartPlayerOneMovingDown(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.leftPaddle.direction = Direction.down;
                }
            });

            inputListener.onStopPlayerOneMoving(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.leftPaddle.direction = Direction.none;
                }
            });

            inputListener.onStartPlayerTwoMovingUp(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.rightPaddle.direction = Direction.up;
                }
            });

            inputListener.onStartPlayerTwoMovingDown(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.rightPaddle.direction = Direction.down;
                }
            });

            inputListener.onStopPlayerTwoMoving(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.rightPaddle.direction = Direction.none;
                }
            });

            inputListener.onPause(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    clock.stop();
                    applicationState.state = ApplicationStates.paused;
                    renderer.render();
                }
                else if (applicationState.state === ApplicationStates.paused) {
                    clock.start();
                    applicationState.state = ApplicationStates.playing;
                    renderer.render();
                }
            });

            inputListener.onStart(() => {
                if (applicationState.state === ApplicationStates.ready ||
                    applicationState.state === ApplicationStates.gameOver) {
                    gameState.init();
                    applicationState.state = ApplicationStates.playing;
                    renderer.render();
                    clock.start();
                }
            });

            clock.onTick(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    engine.step();
                }

                renderer.render();
            });

            engine.onPlayerOneConcede(() => {
                gameState.rightPoints++;

                if (gameState.rightPoints === gameSettings.winningScore) {
                    applicationState.state = ApplicationStates.gameOver;
                    clock.stop();
                }
                else {
                    gameState.ball.reset();
                }
            });

            engine.onPlayerTwoConcede(() => {
                gameState.leftPoints++;

                if (gameState.leftPoints === gameSettings.winningScore) {
                    applicationState.state = ApplicationStates.gameOver;
                    clock.stop();
                }
                else {
                    gameState.ball.reset();
                }
            });

            renderer.render();
        }
    }
}
