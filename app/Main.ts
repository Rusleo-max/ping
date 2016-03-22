/// <reference path="KeyboardAndMouseInputListener.ts" />
/// <reference path="KeyMap.ts" />
/// <reference path="Game/Game.ts" />
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
        game : Game.Game;

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
        paddleHeight : 50,
        paddleInset : 10,
        paddleSpeed : 10,
        paddleColour : '#FFFFFF',
        ballRadius : 5,
        ballSpeed: 18,
        ballColour: '#FFFFFF',
        winningScore : 10,
        clockInterval : 50
    };

    rendererSettings = {
        scoreTextStyle: '#FFFFFF',
        scoreTextFont: '20px Monospace',
        scoreTextTopMargin: 10,
        messageMaskStyle : 'rgba(0, 0, 0, 0.75)',
        messageTextFont : '20px Arial',
        messageTextStyle: '#FFFFFF'
    };

    messages = {
        ready: 'Click to play',
        paused: 'Paused',
        gameOver: 'Click to play again'
    };

    game = new Game.Game(inputListener, canvas, gameSettings, rendererSettings, messages);
}
