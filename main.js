var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Ping;
(function (Ping) {
    var Event = (function () {
        function Event() {
            this.callbacks = [];
        }
        Event.prototype.fire = function () {
            this.callbacks.forEach(function (func) {
                func();
            });
        };
        Event.prototype.register = function (func) {
            this.callbacks.push(func);
        };
        return Event;
    }());
    Ping.Event = Event;
})(Ping || (Ping = {}));
/// <reference path="Event.ts" />
var Ping;
(function (Ping) {
    var InputListener = (function () {
        function InputListener() {
            // todo make these protected when I've got a version of TypeScript that supports it
            this.startPlayerOneMovingUp = new Ping.Event();
            this.startPlayerOneMovingDown = new Ping.Event();
            this.startPlayerTwoMovingUp = new Ping.Event();
            this.startPlayerTwoMovingDown = new Ping.Event();
            this.stopPlayerOneMoving = new Ping.Event();
            this.stopPlayerTwoMoving = new Ping.Event();
            this.pause = new Ping.Event();
            this.start = new Ping.Event();
        }
        InputListener.prototype.onStartPlayerOneMovingUp = function (callback) {
            this.startPlayerOneMovingUp.register(callback);
        };
        InputListener.prototype.onStartPlayerOneMovingDown = function (callback) {
            this.startPlayerOneMovingDown.register(callback);
        };
        InputListener.prototype.onStartPlayerTwoMovingUp = function (callback) {
            this.startPlayerTwoMovingUp.register(callback);
        };
        InputListener.prototype.onStartPlayerTwoMovingDown = function (callback) {
            this.startPlayerTwoMovingDown.register(callback);
        };
        InputListener.prototype.onStopPlayerOneMoving = function (callback) {
            this.stopPlayerOneMoving.register(callback);
        };
        InputListener.prototype.onStopPlayerTwoMoving = function (callback) {
            this.stopPlayerTwoMoving.register(callback);
        };
        InputListener.prototype.onPause = function (callback) {
            this.pause.register(callback);
        };
        InputListener.prototype.onStart = function (callBack) {
            this.start.register(callBack);
        };
        return InputListener;
    }());
    Ping.InputListener = InputListener;
})(Ping || (Ping = {}));
/// <reference path="InputListener.ts" />
/// <reference path="KeyMap.ts" />
var Ping;
(function (Ping) {
    var KeyboardAndMouseInputListener = (function (_super) {
        __extends(KeyboardAndMouseInputListener, _super);
        function KeyboardAndMouseInputListener(element, keyMap) {
            var _this = this;
            _super.call(this);
            element.addEventListener('keypress', function (e) {
                switch (e.which) {
                    case keyMap.pause:
                        e.preventDefault();
                        _this.pause.fire();
                        break;
                }
            });
            element.addEventListener('keydown', function (e) {
                switch (e.which) {
                    case keyMap.playerOneMoveUp:
                        e.preventDefault();
                        _this.startPlayerOneMovingUp.fire();
                        break;
                    case keyMap.playerOneMoveDown:
                        e.preventDefault();
                        _this.startPlayerOneMovingDown.fire();
                        break;
                    case keyMap.playerTwoMoveUp:
                        e.preventDefault();
                        _this.startPlayerTwoMovingUp.fire();
                        break;
                    case keyMap.playerTwoMoveDown:
                        e.preventDefault();
                        _this.startPlayerTwoMovingDown.fire();
                        break;
                }
            });
            element.addEventListener('keyup', function (e) {
                switch (e.which) {
                    case keyMap.playerOneMoveUp:
                    case keyMap.playerOneMoveDown:
                        e.preventDefault();
                        _this.stopPlayerOneMoving.fire();
                        break;
                    case keyMap.playerTwoMoveUp:
                    case keyMap.playerTwoMoveDown:
                        e.preventDefault();
                        _this.stopPlayerTwoMoving.fire();
                        break;
                }
            });
            element.addEventListener('click', function (e) {
                e.preventDefault();
                _this.start.fire();
            });
        }
        return KeyboardAndMouseInputListener;
    }(Ping.InputListener));
    Ping.KeyboardAndMouseInputListener = KeyboardAndMouseInputListener;
})(Ping || (Ping = {}));
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var GameArea = (function () {
            function GameArea(width, height, backgroundColour) {
                this.width = width;
                this.height = height;
                this.backgroundColour = backgroundColour;
            }
            return GameArea;
        }());
        Game.GameArea = GameArea;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var Position = (function () {
            function Position(x, y) {
                this.x = x;
                this.y = y;
            }
            return Position;
        }());
        Game.Position = Position;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
/// <reference path="Position.ts" />
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var Ball = (function () {
            function Ball(radius, speed, colour, startingCentrePosition) {
                this.radius = radius;
                this.speed = speed;
                this.colour = colour;
                this.direction = this.getNewDirection();
                this.startingCentrePosition = startingCentrePosition;
                this.centrePosition = new Game.Position(startingCentrePosition.x, startingCentrePosition.y);
            }
            Ball.prototype.reset = function () {
                this.centrePosition.x = this.startingCentrePosition.x;
                this.centrePosition.y = this.startingCentrePosition.y;
                this.direction = this.getNewDirection();
            };
            Ball.prototype.getVerticalSpeed = function () {
                return this.speed * Math.sin(this.direction);
            };
            Ball.prototype.getHorizontalSpeed = function () {
                return this.speed * Math.cos(this.direction);
            };
            Ball.prototype.move = function (stepAmount) {
                this.centrePosition.x += this.getHorizontalSpeed() * stepAmount;
                this.centrePosition.y += this.getVerticalSpeed() * stepAmount;
            };
            Ball.prototype.reverseVerticalDirection = function () {
                this.direction *= -1;
            };
            Ball.prototype.getNormalizedDirection = function () {
                var twoPi = 2 * Math.PI;
                return ((this.direction % twoPi) + twoPi) % twoPi;
            };
            Ball.prototype.isMovingRight = function () {
                var normalizedDirection = this.getNormalizedDirection();
                return 0 <= normalizedDirection && normalizedDirection < 0.5 * Math.PI ||
                    1.5 * Math.PI < normalizedDirection && normalizedDirection < 2 * Math.PI;
            };
            Ball.prototype.isMovingLeft = function () {
                var normalizedDirection = this.getNormalizedDirection();
                return 0.5 * Math.PI < normalizedDirection && normalizedDirection < 1.5 * Math.PI;
            };
            Ball.prototype.getLeftSideXPosition = function () {
                return this.centrePosition.x - this.radius;
            };
            Ball.prototype.getRightSideXPosition = function () {
                return this.centrePosition.x + this.radius;
            };
            Ball.prototype.getProjectedPosition = function (stepAmount) {
                return new Game.Position(this.centrePosition.x + this.getHorizontalSpeed() * stepAmount, this.centrePosition.y + this.getVerticalSpeed() * stepAmount);
            };
            Ball.prototype.getNewDirection = function () {
                return Math.random() < 0.5 ? Math.PI : 0;
            };
            return Ball;
        }());
        Game.Ball = Ball;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        (function (Direction) {
            Direction[Direction["up"] = 0] = "up";
            Direction[Direction["down"] = 1] = "down";
            Direction[Direction["none"] = 2] = "none";
        })(Game.Direction || (Game.Direction = {}));
        var Direction = Game.Direction;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
/// <reference path="Direction.ts" />
/// <reference path="Position.ts" />
/// <reference path="VerticalPositionRange.ts" />
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var Paddle = (function () {
            function Paddle(width, height, speed, topLimit, bottomLimit, xPosition, colour) {
                this.width = width;
                this.height = height;
                this.speed = speed;
                this.topLimit = topLimit;
                this.bottomLimit = bottomLimit;
                this.colour = colour;
                this.position = new Game.Position(xPosition, this.getInitialYPosition());
            }
            Paddle.prototype.reset = function () {
                this.position.y = this.getInitialYPosition();
                this.direction = Game.Direction.none;
            };
            Paddle.prototype.getInitialYPosition = function () {
                return (this.bottomLimit - this.topLimit) / 2 - this.height / 2;
            };
            Paddle.prototype.move = function (stepAmount) {
                var distance = stepAmount * this.speed;
                switch (this.direction) {
                    case Game.Direction.down:
                        if (this.position.y + this.height + distance >= this.bottomLimit) {
                            this.position.y = this.bottomLimit - this.height;
                        }
                        else {
                            this.position.y += distance;
                        }
                        break;
                    case Game.Direction.up:
                        if (this.position.y - distance <= this.topLimit) {
                            this.position.y = this.topLimit;
                        }
                        else {
                            this.position.y -= distance;
                        }
                        break;
                }
            };
            Paddle.prototype.getRightSideXPostion = function () {
                return this.position.x + this.width;
            };
            Paddle.prototype.getLeftSideXPostion = function () {
                return this.position.x;
            };
            Paddle.prototype.getProjectedYPositions = function (stepAmount) {
                var distance = stepAmount * this.speed, result;
                switch (this.direction) {
                    case Game.Direction.up:
                        result = {
                            top: this.position.y - distance,
                            bottom: this.position.y - distance + this.height
                        };
                        break;
                    case Game.Direction.down:
                        result = {
                            top: this.position.y + distance,
                            bottom: this.position.y + distance + this.height
                        };
                        break;
                    default:
                        result = {
                            top: this.position.y,
                            bottom: this.position.y + this.height
                        };
                        break;
                }
                return result;
            };
            Paddle.prototype.getProjectedCentrePositionY = function (stepAmount) {
                var distance = stepAmount * this.speed, projectedTopYPosition;
                switch (this.direction) {
                    case Game.Direction.up:
                        projectedTopYPosition = this.position.y - distance;
                        break;
                    case Game.Direction.down:
                        projectedTopYPosition = this.position.y + distance;
                        break;
                    default:
                        projectedTopYPosition = this.position.y;
                        break;
                }
                return projectedTopYPosition + this.height / 2;
            };
            return Paddle;
        }());
        Game.Paddle = Paddle;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var Collision = (function () {
            function Collision(stepAmount, resolveCallback) {
                this.stepAmount = stepAmount;
                this.resolveCallback = resolveCallback;
            }
            Collision.prototype.resolve = function () {
                this.resolveCallback();
            };
            return Collision;
        }());
        Game.Collision = Collision;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
/// <reference path="../GameSettings.ts" />
/// <reference path="GameArea.ts" />
/// <reference path="Ball.ts" />
/// <reference path="Paddle.ts" />
/// <reference path="Collision.ts" />
/// <reference path="VerticalPositionRange.ts" />
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var GameState = (function () {
            function GameState(settings) {
                this.gameArea = new Game.GameArea(settings.gameAreaWidth, settings.gameAreaHeight, settings.gameAreaBackgroundColour);
                this.leftPaddle = new Game.Paddle(settings.paddleWidth, settings.paddleHeight, settings.paddleSpeed, 0, settings.gameAreaHeight, settings.paddleInset, settings.paddleColour);
                this.rightPaddle = new Game.Paddle(settings.paddleWidth, settings.paddleHeight, settings.paddleSpeed, 0, settings.gameAreaHeight, settings.gameAreaWidth - settings.paddleInset - settings.paddleWidth, settings.paddleColour);
                this.ball = new Game.Ball(settings.ballRadius, settings.ballSpeed, settings.ballColour, new Game.Position(Math.floor(settings.gameAreaWidth / 2), Math.floor(settings.gameAreaHeight / 2)));
                this.leftPoints = 0;
                this.rightPoints = 0;
            }
            GameState.prototype.init = function () {
                this.ball.reset();
                this.leftPaddle.reset();
                this.rightPaddle.reset();
                this.leftPoints = 0;
                this.rightPoints = 0;
            };
            GameState.prototype.ballIsLeftOfPlayingArea = function () {
                return this.ball.centrePosition.x <= this.ball.radius * -1;
            };
            GameState.prototype.ballIsRightOfPlayingArea = function () {
                return this.ball.centrePosition.x >= this.gameArea.width + this.ball.radius;
            };
            GameState.prototype.move = function (stepAmount) {
                this.ball.move(stepAmount);
                this.leftPaddle.move(stepAmount);
                this.rightPaddle.move(stepAmount);
            };
            GameState.prototype.getNearestCollision = function () {
                var collisions = [];
                collisions.push(this.getNearestTopWallCollision());
                collisions.push(this.getNearestBottomWallCollision());
                collisions.push(this.getNearestPaddleCollision());
                return collisions.filter(function (collision) {
                    return collision != null;
                }).reduce(function (previousCollision, currentCollision) {
                    return previousCollision && (previousCollision.stepAmount < currentCollision.stepAmount) ? previousCollision : currentCollision;
                }, null);
            };
            GameState.prototype.getNearestTopWallCollision = function () {
                var _this = this;
                var result = null, verticalGap = this.ball.centrePosition.y - this.ball.radius, verticalSpeed = this.ball.getVerticalSpeed(), steps;
                if (verticalSpeed < 0) {
                    steps = verticalGap / verticalSpeed * -1;
                    result = new Game.Collision(steps, function () {
                        _this.ball.reverseVerticalDirection();
                    });
                }
                return result;
            };
            GameState.prototype.getNearestBottomWallCollision = function () {
                var _this = this;
                var result = null, verticalGap = this.gameArea.height - this.ball.centrePosition.y - this.ball.radius, verticalSpeed = this.ball.getVerticalSpeed(), steps;
                if (verticalSpeed > 0) {
                    steps = verticalGap / verticalSpeed;
                    result = new Game.Collision(steps, function () {
                        _this.ball.reverseVerticalDirection();
                    });
                }
                return result;
            };
            GameState.prototype.getNearestPaddleCollision = function () {
                var _this = this;
                var ballHorizontalSpeed = this.ball.getHorizontalSpeed(), paddle, paddleBallRelativeHorizontalPosition, steps, projectedPaddlePositionRange, projectedBallCentreYPosition, result = null;
                if (ballHorizontalSpeed != 0) {
                    if (this.ball.isMovingLeft()) {
                        paddle = this.leftPaddle;
                        paddleBallRelativeHorizontalPosition = paddle.getRightSideXPostion() - this.ball.getLeftSideXPosition();
                    }
                    else {
                        paddle = this.rightPaddle;
                        paddleBallRelativeHorizontalPosition = paddle.getLeftSideXPostion() - this.ball.getRightSideXPosition();
                    }
                    steps = paddleBallRelativeHorizontalPosition / ballHorizontalSpeed;
                    projectedPaddlePositionRange = paddle.getProjectedYPositions(steps);
                    projectedBallCentreYPosition = this.ball.getProjectedPosition(steps).y;
                    if (projectedPaddlePositionRange.top <= projectedBallCentreYPosition &&
                        projectedPaddlePositionRange.bottom >= projectedBallCentreYPosition) {
                        var projectedPaddleCentrePositionY = paddle.getProjectedCentrePositionY(steps), impactRelativeYPositionFromPaddleCentre = projectedBallCentreYPosition - projectedPaddleCentrePositionY, getNewDirectionRight = function (angleRange, angleAmountAsProportion) {
                            return angleRange / 2 * angleAmountAsProportion;
                        }, getNewDirectionLeft = function (angleRange, angleAmountAsProportion) {
                            return Math.PI + angleRange / 2 * angleAmountAsProportion * -1;
                        }, resolveCollisionCallback = this.ball.isMovingRight() ?
                            function () {
                                _this.ball.direction = getNewDirectionLeft(Math.PI / 2, impactRelativeYPositionFromPaddleCentre / (paddle.height / 2));
                            } :
                            function () {
                                _this.ball.direction = getNewDirectionRight(Math.PI / 2, impactRelativeYPositionFromPaddleCentre / (paddle.height / 2));
                            };
                        result = new Game.Collision(steps, resolveCollisionCallback);
                    }
                }
                return result;
            };
            return GameState;
        }());
        Game.GameState = GameState;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        (function (ApplicationStates) {
            ApplicationStates[ApplicationStates["ready"] = 0] = "ready";
            ApplicationStates[ApplicationStates["playing"] = 1] = "playing";
            ApplicationStates[ApplicationStates["paused"] = 2] = "paused";
            ApplicationStates[ApplicationStates["gameOver"] = 3] = "gameOver";
        })(Game.ApplicationStates || (Game.ApplicationStates = {}));
        var ApplicationStates = Game.ApplicationStates;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
/// <reference path="ApplicationStates.ts" />
/// <reference path="GameState.ts" />
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var ApplicationState = (function () {
            function ApplicationState(state, gameState) {
                this.state = state;
                this.gameState = gameState;
            }
            return ApplicationState;
        }());
        Game.ApplicationState = ApplicationState;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
/// <reference path="../Event.ts" />
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var Clock = (function () {
            function Clock(interval) {
                this.interval = interval;
                this.tick = new Ping.Event();
            }
            Clock.prototype.stop = function () {
                clearInterval(this.intervalId);
            };
            Clock.prototype.start = function () {
                var _this = this;
                this.intervalId = setInterval(function () {
                    _this.tick.fire();
                }, this.interval);
            };
            Clock.prototype.onTick = function (callback) {
                this.tick.register(callback);
            };
            return Clock;
        }());
        Game.Clock = Clock;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
/// <reference path="../RendererSettings.ts" />
/// <reference path="../Messages.ts" />
/// <reference path="ApplicationState.ts" />
/// <reference path="ApplicationStates.ts" />
/// <reference path="GameState.ts" />
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var Renderer = (function () {
            function Renderer(applicationState, canvas, settings, messages) {
                this.applicationState = applicationState;
                this.context = canvas.getContext('2d');
                this.settings = settings;
                this.messages = messages;
            }
            Renderer.prototype.render = function () {
                this.renderGameArea();
                this.renderScore();
                this.renderPaddle(this.applicationState.gameState.leftPaddle);
                this.renderPaddle(this.applicationState.gameState.rightPaddle);
                this.renderBall();
                if (this.applicationState.state !== Game.ApplicationStates.playing) {
                    this.renderMask();
                    switch (this.applicationState.state) {
                        case Game.ApplicationStates.ready:
                            this.renderReadyMessage();
                            break;
                        case Game.ApplicationStates.paused:
                            this.renderPausedMessage();
                            break;
                        case Game.ApplicationStates.gameOver:
                            this.renderGameOverMessage();
                            break;
                    }
                }
            };
            Renderer.prototype.renderGameArea = function () {
                var gameArea = this.applicationState.gameState.gameArea;
                this.context.fillStyle = gameArea.backgroundColour;
                this.context.fillRect(0, 0, gameArea.width, gameArea.height);
            };
            Renderer.prototype.renderScore = function () {
                var centreXOffset = Math.floor(this.applicationState.gameState.gameArea.width / 2);
                this.context.fillStyle = this.settings.scoreTextStyle;
                this.context.font = this.settings.scoreTextFont;
                this.context.textBaseline = 'top';
                this.context.textAlign = 'center';
                this.context.fillText(this.applicationState.gameState.leftPoints.toString() + ' - ' + this.applicationState.gameState.rightPoints.toString(), centreXOffset, this.settings.scoreTextTopMargin);
            };
            Renderer.prototype.renderPaddle = function (paddle) {
                this.context.fillStyle = paddle.colour;
                this.context.fillRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height);
            };
            Renderer.prototype.renderBall = function () {
                var ball = this.applicationState.gameState.ball;
                this.context.beginPath();
                this.context.arc(ball.centrePosition.x, ball.centrePosition.y, ball.radius, 0, 2 * Math.PI, false);
                this.context.fillStyle = ball.colour;
                this.context.fill();
            };
            Renderer.prototype.renderMask = function () {
                var gameArea = this.applicationState.gameState.gameArea;
                this.context.fillStyle = this.settings.messageMaskStyle;
                this.context.fillRect(0, 0, gameArea.width, gameArea.height);
            };
            Renderer.prototype.renderReadyMessage = function () {
                this.renderMessage(this.messages.ready);
            };
            Renderer.prototype.renderPausedMessage = function () {
                this.renderMessage(this.messages.paused);
            };
            Renderer.prototype.renderGameOverMessage = function () {
                this.renderMessage(this.messages.gameOver);
            };
            Renderer.prototype.renderMessage = function (message) {
                var centreXOffset = Math.floor(this.applicationState.gameState.gameArea.width / 2), centreYOffset = Math.floor(this.applicationState.gameState.gameArea.height / 2);
                this.context.fillStyle = this.settings.messageTextStyle;
                this.context.font = this.settings.messageTextFont;
                this.context.textBaseline = 'middle';
                this.context.textAlign = 'center';
                this.context.fillText(message, centreXOffset, centreYOffset);
            };
            return Renderer;
        }());
        Game.Renderer = Renderer;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
/// <reference path="../GameSettings.ts" />
/// <reference path="../Event.ts" />
/// <reference path="GameState.ts" />
/// <reference path="Collision.ts" />
var Ping;
(function (Ping) {
    var Game;
    (function (Game) {
        var Engine = (function () {
            function Engine(gameData, settings) {
                this.playerOneConcede = new Ping.Event();
                this.playerTwoConcede = new Ping.Event();
                this.gameData = gameData;
                this.settings = settings;
            }
            Engine.prototype.step = function (remainingStep) {
                if (remainingStep === void 0) { remainingStep = 1; }
                var nearestCollision;
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
            };
            Engine.prototype.onPlayerOneConcede = function (callback) {
                this.playerOneConcede.register(callback);
            };
            Engine.prototype.onPlayerTwoConcede = function (callback) {
                this.playerTwoConcede.register(callback);
            };
            return Engine;
        }());
        Game.Engine = Engine;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
/// <reference path="../GameSettings.ts" />
/// <reference path="../RendererSettings.ts" />
/// <reference path="../InputListener.ts" />
/// <reference path="../Messages.ts" />
/// <reference path="GameState.ts" />
/// <reference path="ApplicationStates.ts" />
/// <reference path="ApplicationState.ts" />
/// <reference path="Clock.ts" />
/// <reference path="Renderer.ts" />
/// <reference path="Engine.ts" />
var Ping;
(function (Ping) {
    var Game;
    (function (Game_1) {
        var Game = (function () {
            function Game(inputListener, canvas, gameSettings, rendererSettings, messages) {
                var gameState = new Game_1.GameState(gameSettings), clock = new Game_1.Clock(gameSettings.clockInterval), applicationState = new Game_1.ApplicationState(Game_1.ApplicationStates.ready, gameState), renderer = new Game_1.Renderer(applicationState, canvas, rendererSettings, messages), engine = new Game_1.Engine(gameState, gameSettings);
                inputListener.onStartPlayerOneMovingUp(function () {
                    if (applicationState.state === Game_1.ApplicationStates.playing) {
                        gameState.leftPaddle.direction = Game_1.Direction.up;
                    }
                });
                inputListener.onStartPlayerOneMovingDown(function () {
                    if (applicationState.state === Game_1.ApplicationStates.playing) {
                        gameState.leftPaddle.direction = Game_1.Direction.down;
                    }
                });
                inputListener.onStopPlayerOneMoving(function () {
                    if (applicationState.state === Game_1.ApplicationStates.playing) {
                        gameState.leftPaddle.direction = Game_1.Direction.none;
                    }
                });
                inputListener.onStartPlayerTwoMovingUp(function () {
                    if (applicationState.state === Game_1.ApplicationStates.playing) {
                        gameState.rightPaddle.direction = Game_1.Direction.up;
                    }
                });
                inputListener.onStartPlayerTwoMovingDown(function () {
                    if (applicationState.state === Game_1.ApplicationStates.playing) {
                        gameState.rightPaddle.direction = Game_1.Direction.down;
                    }
                });
                inputListener.onStopPlayerTwoMoving(function () {
                    if (applicationState.state === Game_1.ApplicationStates.playing) {
                        gameState.rightPaddle.direction = Game_1.Direction.none;
                    }
                });
                inputListener.onPause(function () {
                    if (applicationState.state === Game_1.ApplicationStates.playing) {
                        clock.stop();
                        applicationState.state = Game_1.ApplicationStates.paused;
                        renderer.render();
                    }
                    else if (applicationState.state === Game_1.ApplicationStates.paused) {
                        clock.start();
                        applicationState.state = Game_1.ApplicationStates.playing;
                        renderer.render();
                    }
                });
                inputListener.onStart(function () {
                    if (applicationState.state === Game_1.ApplicationStates.ready ||
                        applicationState.state === Game_1.ApplicationStates.gameOver) {
                        gameState.init();
                        applicationState.state = Game_1.ApplicationStates.playing;
                        renderer.render();
                        clock.start();
                    }
                });
                clock.onTick(function () {
                    if (applicationState.state === Game_1.ApplicationStates.playing) {
                        engine.step();
                    }
                    renderer.render();
                });
                engine.onPlayerOneConcede(function () {
                    gameState.rightPoints++;
                    if (gameState.rightPoints === gameSettings.winningScore) {
                        applicationState.state = Game_1.ApplicationStates.gameOver;
                        clock.stop();
                    }
                    else {
                        gameState.ball.reset();
                    }
                });
                engine.onPlayerTwoConcede(function () {
                    gameState.leftPoints++;
                    if (gameState.leftPoints === gameSettings.winningScore) {
                        applicationState.state = Game_1.ApplicationStates.gameOver;
                        clock.stop();
                    }
                    else {
                        gameState.ball.reset();
                    }
                });
                renderer.render();
            }
            return Game;
        }());
        Game_1.Game = Game;
    })(Game = Ping.Game || (Ping.Game = {}));
})(Ping || (Ping = {}));
/// <reference path="KeyboardAndMouseInputListener.ts" />
/// <reference path="KeyMap.ts" />
/// <reference path="Game/Game.ts" />
/// <reference path="GameSettings.ts" />
/// <reference path="Messages.ts" />
/// <reference path="RendererSettings.ts" />
var Ping;
(function (Ping) {
    var canvas, keyMap, inputListener, gameSettings, rendererSettings, messages, game;
    canvas = document.getElementById('PingCanvas');
    keyMap = {
        playerOneMoveUp: 65,
        playerOneMoveDown: 90,
        playerTwoMoveUp: 75,
        playerTwoMoveDown: 77,
        pause: 32 // space
    };
    inputListener = new Ping.KeyboardAndMouseInputListener(canvas, keyMap);
    gameSettings = {
        gameAreaHeight: 360,
        gameAreaWidth: 480,
        gameAreaBackgroundColour: '#000000',
        paddleWidth: 10,
        paddleHeight: 50,
        paddleInset: 10,
        paddleSpeed: 10,
        paddleColour: '#FFFFFF',
        ballRadius: 5,
        ballSpeed: 18,
        ballColour: '#FFFFFF',
        winningScore: 10,
        clockInterval: 50
    };
    rendererSettings = {
        scoreTextStyle: '#FFFFFF',
        scoreTextFont: '20px Monospace',
        scoreTextTopMargin: 10,
        messageMaskStyle: 'rgba(0, 0, 0, 0.75)',
        messageTextFont: '20px Arial',
        messageTextStyle: '#FFFFFF'
    };
    messages = {
        ready: 'Click to play',
        paused: 'Paused',
        gameOver: 'Click to play again'
    };
    game = new Ping.Game.Game(inputListener, canvas, gameSettings, rendererSettings, messages);
})(Ping || (Ping = {}));
