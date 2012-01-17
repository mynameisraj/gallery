class self.Renderer
	constructor: (id, parentEl) ->
		@activeStarted = false
		@gallery = document.createElement("div")
		@gallery.id = id
		parentEl.appendChild @gallery
		@checkiOS()
		@makeViewport()
	
	load: ->
		@addListeners()
		@parent.load @parent.items[0]
	
	addThumbs: (thumbs) ->
		@pages = document.createElement("ul")
		@pages.className = "pages"
		@gallery.appendChild @pages
		@thumbsIndex = []
		index = 0
		for thumb in thumbs
			thumb = new Image()
			thumb.src = thumbs[index]
			thumb.indexNumber = index
			@thumbsIndex[index] = thumb
			li = document.createElement "li"
			li.appendChild thumb
			@pages.appendChild li
			thumb.addEventListener @touchlistener, @parent.thumbLoad thumb, false
			index++
	
	addListeners: ->
		document.body.addEventListener "keyup", (e) =>
			unless @animating
				if e.keyCode is 37
					e.preventDefault()
					@parent.prev()
				else if e.keyCode is 39
					e.preventDefault()
					@parent.next()
		, false
	
	checkiOS: ->
		iOS = navigator.userAgent.match(/iPad/i) isnt null or navigator.userAgent.match(/iPhone/i) isnt null
		if iOS
			@touchlistener = "touchend"
		else
			@touchlistener = "click"
	
	makeViewport: ->
		@viewport = document.createElement "div"
		@viewport.className = "viewport"
		@gallery.appendChild @viewport
	
	display: (item) ->
		if @viewport.childNodes.length is 0
			@image = new Image()
			@image.src = item.full
			@viewport.appendChild @image
		else
			@image.src = item.full
	
	setActiveThumb: (index) ->
		unless @activeStarted
			if @pages isnt undefined
				@pages.getElementsByTagName("img")[index].className = "active"
			@activeStarted = true
		else
			for active in gallery.getElementsByClassName("active")
				active.className = ""
			@pages.getElementsByTagName("img")[index].className = "active"
	
	startLoading: ->
	
	endLoading: ->