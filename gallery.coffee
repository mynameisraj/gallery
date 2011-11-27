class self.Gallery
	# Constructor
	constructor: (@items, @renderer) ->
		@loading = false
		@renderer.parent = this
		@createIndex()
		@preloadThumbs()
		@renderer.load()
		
	# Makes an index for all images
	createIndex: ->
		@index = {}
		@currentImage = 0
		tracker = 0
		for item in @items
			item.preloaded = false
			@index[item.full] = tracker
			tracker++
			
	# Adds an item to the index
	addItem: (item) ->
		@items[@items.length] = item
		@createIndex()
	
	# Closure for thumbnail stuff
	thumbLoad: (thumb) =>
		=>
			@loadItem thumb.indexNumber
	
	# Preloads all thumbnails
	preloadThumbs: ->
		@loadedThumbs = 0
		@thumbs = []
			
		# Makes the thumbs index
		for item in @items
			tempThumb = new Image()
			tempThumb.addEventListener "load", @preloadedThumb, false
			tempThumb.src = item.thumb
			@thumbs[@index[item.full]] = item.thumb
	
	# Thumbnail preloader checker
	preloadedThumb: =>
		@loadedThumbs++
		
		# If all thumbs are loaded, load image
		if @loadedThumbs is @items.length
			@renderer.addThumbs(@thumbs)

	# Preloads an image's full size
	preload: (item) ->
		@renderer.startLoading()
		@datestart = new Date()
		@loading = true
		tempImage = document.createElement "img"
		tempImage.onload = =>
			@setPreloaded item
		tempImage.src = item.full
	
	# Sets the preloaded attribute on an image to true
	setPreloaded: (item) =>
		# Make a timestamp
		@dateend = new Date()
		diff = @dateend.getTime() - @datestart.getTime()
		console.log "Loaded image ##{@index[item.full]+1} (#{diff} ms)."
		delete @dateend
		delete @datestart
		
		# Finish loading
		item.preloaded = true
		@loading = false
		@renderer.endLoading()
		@load item
		
	# For preloading the next image
	preloadNext: (item) =>
		@datestarttwo = new Date()
		tempImage = document.createElement "img"
		tempImage.onload = =>
			# Timestamp
			@dateendtwo = new Date()
			diff = @dateendtwo.getTime() - @datestarttwo.getTime()
			console.log "Loaded image ##{@index[item.full]+1} (#{diff} ms)."
			delete @dateendtwo
			delete @datestarttwo
			
			item.preloaded = true
		tempImage.src = item.full

	# Goes to an item object
	load: (item) ->
		if not item.preloaded and not @loading
			@preload item
			
		# Load the image
		else if not @loading
			@renderer.display item
			@renderer.setActiveThumb @index[item.full]
			
			# Load the next image while loading this one
			if (@index[item.full] + 1) < @items.length and not @items[@index[item.full] + 1].preloaded
				@preloadNext @items[@index[item.full] + 1]
			@currentImage = @index[item.full]
		else
			@load item
	
	# Goes to a specified item number
	loadItem: (number) =>
		@load @items[number]
		
	# Goes to the previous image
	prev: ->
		@currentImage--
		if @currentImage < 0
			@currentImage = @items.length - 1
		@load @items[@currentImage]
			
	# Goes to the next image
	next: ->
		@currentImage++
		if @currentImage > @items.length - 1
			@currentImage = 0
		@load @items[@currentImage]