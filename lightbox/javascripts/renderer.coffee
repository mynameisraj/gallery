class self.Renderer
	constructor: ->
		@boxOpen = false
		@makeSpinner()
		@testTransitions()
	
	load: ->
		links = document.getElementById("images").getElementsByTagName("a")
		for link in links
			item = {}
			item.full = link.getAttribute "href"
			item.thumb = link.firstChild.getAttribute "src"
			item.description = link.firstChild.getAttribute "alt"
			@parent.addItem item
		@addListeners()
		
	addListeners: ->
		links = document.getElementsByTagName("a")
		for a in links
			if a.firstChild is a.getElementsByTagName("img")[0]
				a.addEventListener "click", (e) =>
					e.preventDefault()
					@parent.loadItem @parent.index[e.currentTarget.getAttribute "href"]
				, false
		document.body.addEventListener "keydown", (e) =>
			if e.keyCode is 27
				@close()
			else if e.keyCode is 37
				e.preventDefault()
				@parent.prev()
			else if e.keyCode is 39
				e.preventDefault()
				@parent.next()
		, false
	
	makeSpinner: ->
		@spinarea = document.createElement "div"
		@spinarea.className = "spin hidden"
		document.body.appendChild @spinarea
		opts = {
		lines: 12,
		length: 5,
		width: 3,
		radius: 8,
		color: '#444',
		speed: 1,
		trail: 60,
		shadow: false
		}
		@spinner = new Spinner(opts).spin(@spinarea)
		@spinner.stop()

	testTransitions: ->
		@transitions = false
		if "ontransitionend" of window
			@transitionType = "transitionend"
		else if "onwebkittransitionend" of window
			@transitions = true
			@transitionType = "webkitTransitionEnd"
		else if navigator.appName is "Opera"
			@transitionType = "OTransitionEnd"
			
	startLoading: ->
		@spinner.spin @spinarea
		@spinarea.className = "spin"
		
	endLoading: ->
		@spinner.stop()
		@spinarea.className = "spin hidden"
		
	updateCaption: (text) ->
		@caption.innerHTML = text
		
	display: (item) ->
		if not @boxOpen
			@boxOpen = true
			@container = document.createElement "div"
			@container.id = "overlay"
			if @transitions
				@container.addEventListener @transitionType, @transitionDone, false
			innerBox = document.createElement "div"
			innerBox.id = "inner"
			if @transitions
				innerBox.addEventListener @transitionType, (e) ->
					e.stopPropagation()
				, false
			@container.appendChild innerBox
			@closeBtn = document.createElement "a"
			@closeBtn.href = "#"
			@closeBtn.innerHTML = "Close"
			@closeBtn.id = "close"
			@closeBtn.addEventListener "click", (e) =>
				e.preventDefault()
				@close()
			, false
			innerBox.appendChild @closeBtn
			@caption = document.createElement "div"
			@caption.id = "caption"
			innerBox.appendChild @caption
			closeArea = document.createElement "div"
			closeArea.id = "closearea"
			closeArea.addEventListener "click", @close, false
			@container.appendChild closeArea
			img = document.createElement "img"
			
			img.onload = =>
				innerBox.style.marginLeft = "-#{img.width / 2}px"
				innerBox.style.marginTop = "-#{img.height / 2}px"
				innerBox.style.width = "#{img.width}px"
				innerBox.style.height = "#{img.height}px"
				innerBox.appendChild img
				document.body.appendChild @container
				window.setTimeout =>
					@container.className = "visible"
				, 0
				if not @transitions
					@transitionDone()

			img.setAttribute "src", item.full
		else
			innerBox = @container.firstChild
			innerBox.removeChild innerBox.lastChild
			img = document.createElement "img"
			img.onload = =>
				innerBox.style.marginLeft = "-#{img.width / 2}px"
				innerBox.style.marginTop = "-#{img.height / 2}px"
				innerBox.style.width = "#{img.width}px"
				innerBox.style.height = "#{img.height}px"
			innerBox.appendChild img
			img.setAttribute "src", item.full
		@updateCaption item.description
		
	transitionDone: =>
		if @container.className isnt "visible"
			@container.parentNode.removeChild @container
		else
			window.setTimeout =>
				@container.firstChild.className = "visible"
			, 0

	close: ->
		if @boxOpen
			@boxOpen = false
			@container.className = ""
			if not @transitions
				@transitionDone()

	addThumbs: (thumbs) ->
		###
		Handles the adding of thumbnails tothe DOM.
		thumbs is a required parameter and is an
		array of all of the thumbnails' URLS.
		###
		
	setActiveThumb: (number) ->
		###
		Sets the active thumbnail. number is a
		required parameter representing the position
		in the array of objects (starts at 0).
		###