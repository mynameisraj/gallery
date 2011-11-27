###
Renderer template
Last updated 8th October 2011

Describes the required parts of a renderer
which interacts with the Gallery class. Nothing
inside these methods is required, but without them
the Gallery will not run. It is perfectly fine to
leave these methods empty, but they must be intact.
###

class self.Renderer
	load: ->
		###
		Called after the @parent property of the current
		Renderer object has been created. Anything that
		links to @parent should be called/created here,
		NOT in the constructor. An example of what to do
		here: add your event listeners.	
		###
		
	addThumbs: (thumbs) ->
		###
		Handles the adding of thumbnails tothe DOM.
		thumbs is a required parameter and is an
		array of all of the thumbnails' URLS.
		###
		
	startLoading: ->
		###
		Called when the image starts to load.
		An example task here would be to show
		a loading indicator.
		###
		
	endLoading: ->
		###
		Called when the image completes loading.
		###
		
	display: (item) ->
		###
		Displays an item. The item is of the supplied
		form, so any extra properties also get
		passed into here. The high res image URL
		for this item is item.full
		###
		
	setActiveThumb: (number) ->
		###
		Sets the active thumbnail. number is a
		required parameter representing the position
		in the array of objects (starts at 0).
		###