import PixiShader from "pixi/renderers/webgl/PixiShader";

class View {
  _textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: ["#FFFFFF"],
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#555555",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
    wordWrap: true,
    wordWrapWidth: 440,
  });

  createGame() {
    const app = new PIXI.Application({
      backgroundColor: 0xf1a8a8,
      resizeTo: document.querySelector(".main-div"),
    });

    document.querySelector(".main-div").appendChild(app.view);

    return app;
  }

  createTimeRemainingTextField(app_) {
    const timeRemainingTextField = new PIXI.Graphics();
    timeRemainingTextField
      .beginFill(0xd3d3d3, 1)
      .drawRect(app_.view.width / 4, 50, app_.view.width / 2, 80);
    app_.stage.addChild(timeRemainingTextField);

    return timeRemainingTextField;
  }

  createTimeRemainingTextHeading(app_, textField_) {
    const timeRemainingTextHeading = new PIXI.Text(
      "Time remaining:",
      this._textStyle
    );
    textField_.addChild(timeRemainingTextHeading);
    // timeRemainingTextHeading.anchor = 1;
    timeRemainingTextHeading.x = app_.view.width / 3;
    timeRemainingTextHeading.y = 60;

    return timeRemainingTextHeading;
  }

  createTimeRemainingText(app_, textField_) {
    const timeRemainingText = new PIXI.Text("1", this._textStyle);
    textField_.addChild(timeRemainingText);
    timeRemainingText.x = app_.view.width / 2 - 10;
    timeRemainingText.y = 90;

    return timeRemainingText;
  }

  createScoreTextField(app_) {
    const scoreTextField = new PIXI.Graphics();
    scoreTextField
      .beginFill(0xd3d3d3, 1)
      .drawRect(app_.view.width / 4, 150, app_.view.width / 2, 80);
    app_.stage.addChild(scoreTextField);

    return scoreTextField;
  }

  createScoreTextHeading(app_, textField_) {
    const scoreTextHeading = new PIXI.Text("Score:", this._textStyle);
    textField_.addChild(scoreTextHeading);
    scoreTextHeading.x = app_.view.width / 2.3;
    scoreTextHeading.y = 160;

    return scoreTextHeading;
  }

  createScoreText(app_, textField_) {
    const scoreText = new PIXI.Text("1", this._textStyle);
    textField_.addChild(scoreText);
    scoreText.x = app_.view.width / 2 - 10;
    scoreText.y = 190;

    return scoreText;
  }

  createColourCircle(app_) {
    const colourCircle = new PIXI.Graphics();
    colourCircle
      .beginFill(0xd3d3d3, 1)
      .lineStyle(2, 0x000000, 1)
      .drawCircle(app_.view.width / 2, 350, 100);
    app_.stage.addChild(colourCircle);

    return colourCircle;
  }

  createRedCircle(app_) {
    const redCircle = new PIXI.Graphics();
    redCircle
      .beginFill(0xff0000, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle(app_.view.width / 6, 550, 40);
    app_.stage.addChild(redCircle);
    redCircle.buttonMode = true;

    return redCircle;
  }

  createBlueCircle(app_) {
    const blueCircle = new PIXI.Graphics();
    blueCircle
      .beginFill(0x0000ff, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle((app_.view.width / 6) * 2, 550, 40);
    app_.stage.addChild(blueCircle);
    blueCircle.buttonMode = true;

    return blueCircle;
  }

  createGreenCircle(app_) {
    const greenCircle = new PIXI.Graphics();
    greenCircle
      .beginFill(0x00ff00, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle((app_.view.width / 6) * 3, 550, 40);
    app_.stage.addChild(greenCircle);
    greenCircle.buttonMode = true;

    return greenCircle;
  }

  createYellowCircle(app_) {
    const yellowCircle = new PIXI.Graphics();
    yellowCircle
      .beginFill(0xffff00, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle((app_.view.width / 6) * 4, 550, 40);
    app_.stage.addChild(yellowCircle);
    yellowCircle.buttonMode = true;

    return yellowCircle;
  }

  createOrangeCircle(app_) {
    const orangeCircle = new PIXI.Graphics();
    orangeCircle
      .beginFill(0xffa500, 1)
      .lineStyle(1, 0x000000, 1)
      .drawCircle((app_.view.width / 6) * 5, 550, 40);
    app_.stage.addChild(orangeCircle);
    orangeCircle.buttonMode = true;

    return orangeCircle;
  }
}

export default new View();
