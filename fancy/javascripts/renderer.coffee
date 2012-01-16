class self.Renderer
	constructor: (id) ->
		@animating = false
		@activeStarted = false
		@testTransitions()
		@gallery = document.createElement("div")
		@gallery.id = id
		document.body.appendChild @gallery
		@checkiOS()
		@makeViewport()
		@makeNav()
		@makeCaptions()
		@makeSpinner()
		@startLoading()
	
	load: ->
		@addListeners()
		@parent.load @parent.items[0]
	
	testTransitions: ->
		@transitions = false
		if "ontransitionend" of window
			@transitionType = "transitionend"
		else if "onwebkittransitionend" of window
			@transitions = true
			@transitionType = "webkitTransitionEnd"
		else if navigator.appName is "Opera"
			@transitionType = "OTransitionEnd"
	
	addThumbs: (thumbs) ->
		@pages = document.createElement("div")
		@pages.className = "pages"
		@gallery.appendChild @pages
		@thumbsIndex = []
		index = 0
		for thumb in thumbs
			thumb = new Image()
			thumb.src = thumbs[index]
			thumb.indexNumber = index
			@thumbsIndex[index] = thumb
			@pages.appendChild thumb
			thumb.addEventListener @touchlistener, @parent.thumbLoad thumb, false
			index++
		clear = document.createElement("div")
		clear.className = "clear"
		@pages.appendChild clear
	
	addListeners: ->
		@prevBtn.addEventListener "click", (e) =>
			e.preventDefault()
			@parent.prev()
		, false
		@nextBtn.addEventListener "click", (e) =>
			e.preventDefault()
			@parent.next()
		, false
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
	
	makeNav: ->
		nav = document.createElement("div")
		nav.className = "nav"
		@gallery.appendChild nav
		@prevBtn = document.createElement("a")
		@prevBtn.href = "#"
		@prevBtn.className = "prev"
		@prevBtn.innerHTML = "Previous"
		nav.appendChild @prevBtn
		@nextBtn = document.createElement("a")
		@nextBtn.href = "#"
		@nextBtn.className = "next"
		@nextBtn.innerHTML = "Next"
		nav.appendChild @nextBtn
	
	makeCaptions: ->
		@caption = document.createElement("div")
		@caption.className = "caption"
		@gallery.appendChild @caption
	
	makeSpinner: ->
		@spinarea = document.createElement("div")
		@spinarea.className = "spin hidden"
		@gallery.appendChild @spinarea
		opts =
			lines: 12
			length: 5
			width: 3
			radius: 8
			color: "#444"
			speed: 1
			trail: 60
			shadow: false
		
		@spinner = new Spinner(opts).spin @spinarea
		@spinner.stop()
	
	display: (item) ->
		@updateCaption item.description
		if @viewport.childNodes.length is 0
			@image = new Image()
			@image.src = item.full
			@viewport.appendChild @image
		else
			if @viewport.childNodes.length > 1
				for num in [1..@viewport.childNodes.length-1]
					@viewport.removeChild @viewport.childNodes[num]
			if @transitions
				@viewport.firstChild.addEventListener @transitionType, @doneTransitioning, false
			@animating = true
			@viewport.className = "viewport start"
			@viewport.firstChild.className = "out " + @getAnimation()
			incoming = new Image()
			incoming.src = item.full
			incoming.className = "in"
			@viewport.appendChild incoming
			window.setTimeout =>
				@viewport.className = "viewport end"
			, 0
			unless @transitions
				window.setTimeout =>
					@doneTransitioning()
				, 0
	
	updateCaption: (caption) ->
		@caption.innerHTML = caption
	
	getAnimation: ->
		animations = [
			"squeeze",
			"cardleft",
			"cardright",
			"opacity",
			"movedown",
			"moveup",
			"hang topleft",
			"hang topright"
		]
		rand = animations[Math.round(Math.random() * (animations.length - 1))]
		rand
	
	doneTransitioning: =>
		if @animating
			@animating = false
			@viewport.removeChild @viewport.firstChild
			@viewport.className = "viewport"
			@viewport.getElementsByClassName("in")[0].className = ""
	
	setActiveThumb: (index) ->
		unless @activeStarted
			if @pages isnt undefined
				@pages.getElementsByTagName("img")[index].className = "active"
			@activeStarted = true
		else
			for active in @gallery.getElementsByClassName("active")
				active.className = ""
			@pages.getElementsByTagName("img")[index].className = "active"
	
	startLoading: ->
		@spinner.spin @spinarea
		@spinarea.className = "spin"
	
	endLoading: ->
		@spinner.stop()
		@spinarea.className = "spin hidden"
