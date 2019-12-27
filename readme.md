<h1 align="center">Minki</h1>
<h4 align="center">
  Minky is a cute cat. Please grow happily in the terminal. 😻
</h4>

<div align="center">
  <a href="https://pub.dartlang.org/packages/screenshot_callback">
    <img src="https://badge.fury.io/js/minki.svg" />
  </a>
  <img src="https://img.shields.io/github/license/beygee/minki" />
</div>

<p align="center">
  <a href="#usage">Usage</a> •
  <a href="#issues-and-feedback">Issues and Feedback</a> •
  <a href="#author">Author</a> •
  <a href="#license">License</a>
</p>

> [Feedback welcome](https://github.com/flutter-moum/flutter_screenshot_callback/issues/new) and [Pull Requests](https://github.com/flutter-moum/flutter_screenshot_callback/pulls) are most welcome!

<img width="1053" alt="스크린샷 2019-12-28 오전 12 29 34" src="https://user-images.githubusercontent.com/7090906/71522709-2a56d680-2909-11ea-9074-a11bac19f402.png">

## Usage

### Installing Minki

```shell
$ npm i -g minki
```

### Init it to see minki

Yon can see every time you log in the terminal.

```shell
$ minki init
```

### Show status

You can see status.

```shell
$ minki
```

### Import the package

To use this plugin, follow the [**plugin installation instructions**](https://pub.dev/packages/screenshot_callback#-installing-tab-).

### Use the plugin

Add the following import to your Dart code:

```dart
import 'package:screenshot_callback/screenshot_callback.dart';
```

Initialize ScreenshotCallback with the scopes you want:

```dart
ScreenshotCallback screenshotCallback = ScreenshotCallback();
```

### addListener

Then invoke <code>addListener</code> method of <code>ScreenshotCallback</code>.
Add custom functions that you want to excute after detect screenshot. e.g:

```dart
screenshotCallback.addListener(() {
  //Void funtions are implemented
  print('detect screenshot');
});
```

### dispose

You need to call <code>dispose</code> method to terminate <code>ScreenshotCallback</code> before you exit the app e.g:

```dart
screenshotCallback.dispose();
```

## Issues and Feedback

Please [**file**](https://github.com/flutter-moum/flutter_screenshot_callback/issues/new) issues to send feedback or report a bug. Thank you !

## Author

- [Gwangyu-Kim](https://github.com/kwanguuuu) • <kwangyu326@gmail.com>
- [minsub0922](https://github.com/minsub0922) • <minsub0922@naver.com>
- [beygee](https://github.com/beygee) • <doug0476@naver.com>
- [Flutter Moum](https://github.com/flutter-moum) • <fluttermoum@gmail.com>

## License

MIT
