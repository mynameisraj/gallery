## What's this? ##
Heavily inspired by my friend Julio's [antigallery](http://github.com/capotej/antigallery), this is a gallery designed for ultimate customizability in mind. It's so customizable that what you make doesn't even have to act like a gallery (you can even make a great lightbox with it). It takes a hash of images and a renderer as parameters. The renderer is what you make it: it is the "front face" of the gallery. The gallery class powers the display of images and thumbnails, and facilitates next and previous actions. It also controls the loading of images. All of this stuff is written in CoffeeScript, but you can use the Gallery class in raw JavaScript if you so desire.

The easiest way to think of this gallery is as a template for making your own galleries. It has a data model which is infinitely extendable; in the example which I have provided, for instance, the data model has been extended to add descriptions for each image. Since these properties are transparent to the gallery, your renderer can take care of whatever you want.

## How do I use it? ##
The easiest way to make a gallery is with the following syntax:

	images = [
		{full: "imageone.jpg", thumb: "thumbone.jpg"},
		{full: "imagetwo.jpg", thumb: "thumbtwo.jpg"}
	]
	myGallery = new Gallery images, new Renderer()

And so on. The syntax is super easy to understand (I hope), and you can add as many extras as you want (which are passed to your renderer's `display` method). I added a description property in my example.

## Required stuff ##
There are a few things which you must include, but not much. Please reference the renderer template for a set of required methods and their functionality.

## Stuff you can use ##
There is also a set of methods which you can access in the Gallery. From your renderer, you can reference these methods on the @parent object (nothing in the constructor, please):

- `addItem (item)`: Adds an item to the Gallery's index and subsequently rebuilds the index. This is useful if creating a lightbox. You must load the item after it is added.
- `load (item)`: Item must have property `full` matching one of the preexisting objects in the Gallery index (you must have loaded the item first, unless it was in the original constructor).
- `loadItem (number)` : Goes to a specified item number. This is especially useful for linking to different items in the gallery.
- `next ()`: Goes to the next image.
- `prev()`: Goes to the previous image.
- `thumbLoad (item)`: Useful for when ou add event listeners to your thumbnails. This already includes a closure, so you can use something akin to the following syntax in your renderer without errors:

		for thumb in thumbList
			thumb.addEventListener "click", @parent.thumbLoad thumb, false

All of these will eventually reference your renderer's `display` method. A note on circular references: they are the only way to make this work in the flexible manner which I have aimed for. Unless you are creating many, many galleries and renderers, this shouldn't be anything you have to worry about. If you are savvy enough to know about circular references, I'll assume you can modify this to work without them (if you so need). Note that you will lose any ability to have custom buttons on a case-by-case basis; if you want an even more advanced version of this gallery, please see Julio's [original](http://github.com/capotej/antigallery).	