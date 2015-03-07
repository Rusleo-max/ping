/// <reference path="KeyboardAndMouseInputListener.ts" />
/// <reference path="KeyMap.ts" />
/// <reference path="Game.ts" />
/// <reference path="GameSettings.ts" />
/// <reference path="Messages.ts" />
/// <reference path="RendererSettings.ts" />

module Ping {
    var canvas : HTMLCanvasElement,
        keyMap: KeyMap,
        inputListener : InputListener,
        gameSettings : GameSettings,
        rendererSettings : RendererSettings,
        messages : Messages,
        game : Game;

    canvas = <HTMLCanvasElement> document.getElementById('PingCanvas');

    keyMap = {
        playerOneMoveUp: 65, // 'a' key
        playerOneMoveDown: 90, // 'z' key
        playerTwoMoveUp : 75, // 'k' key
        playerTwoMoveDown: 77, // 'm' key
        pause: 32 // space
    };

    inputListener = new KeyboardAndMouseInputListener(canvas, keyMap);

    gameSettings = {
        gameAreaHeight : 360,
        gameAreaWidth : 480,
        gameAreaBackgroundColour : '#000000',
        paddleWidth : 10,
        paddleHeight : 40,
        paddleInset : 10,
        paddleSpeed : 8,
        paddleColour : '#FFFFFF',
        ballRadius : 5,
        ballSpeed: 15,
        ballColour: '#FFFFFF',
        winningScore : 10,
        clockInterval : 50
    };

    rendererSettings = {
        scoreTextStyle: '#FFFFFF',
        scoreTextFont: '20px Monospace',
        scoreTextTopMargin: 10,
        messageMaskStyle : 'rgba(0, 0, 0, 0.75)',
        messageTextFont : '25px Arial',
        messageTextStyle: '#FFFFFF'
    };

    messages = {
        ready: 'Click to play',
        paused: 'Paused',
        gameOver: 'Game Over. Click to play again.'
    };

    game = new Game(inputListener, canvas, gameSettings, rendererSettings, messages);
}