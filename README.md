# The solution

The solution uses npm to easily add more packages and plugins later. The project requires a webserver to avoid problems loading locally stored images, which was a problem in Chrome which was used during development.
The "Start" button activated the animation, and restarts the animation when Guy reaches the Goal. The tween animation is done using the pixi-tween plugin.

# Plugins

- pixi-tween 0.2.0

# To-dos

- Guy is teleported to Start/Goal when pressing the "Start" button while the tween animation is active. Should instead just stop, and start moving in the opposite direction.
- Add sprite animations to Guy when he is idle or moving.
- Add text field which changes the time of the tween animation and maybe a dropdown to add/change the easing of the tween.