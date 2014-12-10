/**
 * @license
 * 
 * SnowStorm.dg.js Webpage:
 * http://www.css-jquery-design.com/2012/12/snow-fall-effect-with-javascript-creating-mary-christmas-greetings/
 * Snow Fall Effect - JavaScript-based Snow for web pages
 * -------------------------------------------------------- Copyright (c) 2012,
 * Dhiraj Kumar. All rights reserved. Website: http://www.css-jquery-design.com
 */

/* global window, document, navigator, clearInterval, setInterval */

var snowStorm = (function(window, document) {

	// --- common properties ---

	this.autoStart = true; // Whether the snow should start automatically or
							// not.
	this.flakesMax = 150; // Limit total amount of snow made (falling +
							// sticking)
	this.flakesMaxActive = 80; // Limit amount of snow falling at once (less =
								// lower CPU use)
	this.animationInterval = 60; // Theoretical "miliseconds per frame"
									// measurement. 20 = fast + smooth, but high
									// CPU use. 50 = more conservative, but
									// slower
	this.excludeMobile = true; // Snow is likely to be bad news for mobile
								// phones' CPUs (and batteries.) By default, be
								// nice.
	this.flakeBottom = null; // Integer for Y axis snow limit, 0 or null for
								// "full-screen" snow effect
	this.followMouse = true; // Snow movement can respond to the user's mouse
	this.snowColor = '#fff'; // Don't eat (or use?) yellow snow.
	this.snowCharacter = '*'; // &bull; = bullet, &middot; is square on some
								// systems etc.
	this.snowStick = true; // Whether or not snow should "stick" at the bottom.
							// When off, will never collect.
	this.targetElement = null; // element which snow will be appended to (null
								// = document.body) - can be an element ID eg.
								// 'myDiv', or a DOM node reference
	this.useMeltEffect = true; // When recycling fallen snow (or rarely, when
								// falling), have it "melt" and fade out if
								// browser supports it
	this.useTwinkleEffect = false; // Allow snow to randomly "flicker" in and
									// out of view while falling
	this.usePositionFixed = false; // true = snow does not shift vertically
									// when scrolling. May increase CPU load,
									// disabled by default - if enabled, used
									// only where supported

	// --- less-used bits ---

	this.freezeOnBlur = true; // Only snow when the window is in focus
								// (foreground.) Saves CPU.
	this.flakeLeftOffset = 10; // Left margin/gutter space on edge of container
								// (eg. browser window.) Bump up these values if
								// seeing horizontal scrollbars.
	this.flakeRightOffset = 10; // Right margin/gutter space on edge of
								// container
	this.flakeWidth = 60; // Max pixel width reserved for snow element
	this.flakeHeight = 60; // Max pixel height reserved for snow element
	this.vMaxX = 5; // Maximum X velocity range for snow
	this.vMaxY = 4; // Maximum Y velocity range for snow
	this.zIndex = 0; // CSS stacking order applied to each snowflake

	// --- End of user section ---

	function doStart() {
		if (!s.excludeMobile || !isMobile) {
			if (s.freezeOnBlur) {
				s.events.add(isIE ? document : window, "mousemove",
						doDelayedStart)
			} else {
				doDelayedStart()
			}
		}
		s.events.remove(window, "load", doStart)
	}
	function doDelayedStart() {
		window.setTimeout(function() {
			s.start(true)
		}, 20);
		s.events.remove(isIE ? document : window, "mousemove", doDelayedStart)
	}
	function plusMinus(a) {
		return parseInt(rnd(2), 10) === 1 ? a * -1 : a
	}
	function rnd(a, b) {
		if (isNaN(b)) {
			b = 0
		}
		return Math.random() * a + b
	}
	var s = this, storm = this, i, isIE = navigator.userAgent.match(/msie/i), isIE6 = navigator.userAgent
			.match(/msie 6/i), isWin98 = navigator.appVersion
			.match(/windows 98/i), isMobile = navigator.userAgent
			.match(/mobile|opera m(ob|in)/i), isBackCompatIE = isIE
			&& document.compatMode === "BackCompat", noFixed = isMobile
			|| isBackCompatIE || isIE6, screenX = null, screenX2 = null, screenY = null, scrollY = null, vRndX = null, vRndY = null, windOffset = 1, windMultiplier = 2, flakeTypes = 6, fixedForEverything = false, opacitySupported = function() {
		try {
			document.createElement("div").style.opacity = "0.5"
		} catch (a) {
			return false
		}
		return true
	}(), didInit = false, docFrag = document.createDocumentFragment();
	this.timers = [];
	this.flakes = [];
	this.disabled = false;
	this.active = false;
	this.meltFrameCount = 20;
	this.meltFrames = [];
	this.events = function() {
		function g() {
			e(d(arguments), "remove")
		}
		function f() {
			e(d(arguments), "add")
		}
		function e(b, d) {
			var e = b.shift(), f = [ c[d] ];
			if (a) {
				e[f](b[0], b[1])
			} else {
				e[f].apply(e, b)
			}
		}
		function d(c) {
			var d = b.call(c), e = d.length;
			if (a) {
				d[1] = "on" + d[1];
				if (e > 3) {
					d.pop()
				}
			} else if (e === 3) {
				d.push(false)
			}
			return d
		}
		var a = !window.addEventListener && window.attachEvent, b = Array.prototype.slice, c = {
			add : a ? "attachEvent" : "addEventListener",
			remove : a ? "detachEvent" : "removeEventListener"
		};
		return {
			add : f,
			remove : g
		}
	}();
	this.randomizeWind = function() {
		var a;
		vRndX = plusMinus(rnd(s.vMaxX, .2));
		vRndY = rnd(s.vMaxY, .2);
		if (this.flakes) {
			for (a = 0; a < this.flakes.length; a++) {
				if (this.flakes[a].active) {
					this.flakes[a].setVelocities()
				}
			}
		}
	};
	this.scrollHandler = function() {
		var a;
		scrollY = s.flakeBottom ? 0 : parseInt(window.scrollY
				|| document.documentElement.scrollTop
				|| document.body.scrollTop, 10);
		if (isNaN(scrollY)) {
			scrollY = 0
		}
		if (!fixedForEverything && !s.flakeBottom && s.flakes) {
			for (a = s.flakes.length; a--;) {
				if (s.flakes[a].active === 0) {
					s.flakes[a].stick()
				}
			}
		}
	};
	this.resizeHandler = function() {
		if (window.innerWidth || window.innerHeight) {
			screenX = window.innerWidth - 16 - s.flakeRightOffset;
			screenY = s.flakeBottom ? s.flakeBottom : window.innerHeight
		} else {
			screenX = (document.documentElement.clientWidth
					|| document.body.clientWidth || document.body.scrollWidth)
					- (!isIE ? 8 : 0) - s.flakeRightOffset;
			screenY = s.flakeBottom ? s.flakeBottom
					: document.documentElement.clientHeight
							|| document.body.clientHeight
							|| document.body.scrollHeight
		}
		screenX2 = parseInt(screenX / 2, 10)
	};
	this.resizeHandlerAlt = function() {
		screenX = s.targetElement.offsetLeft + s.targetElement.offsetWidth
				- s.flakeRightOffset;
		screenY = s.flakeBottom ? s.flakeBottom : s.targetElement.offsetTop
				+ s.targetElement.offsetHeight;
		screenX2 = parseInt(screenX / 2, 10)
	};
	this.freeze = function() {
		var a;
		if (!s.disabled) {
			s.disabled = 1
		} else {
			return false
		}
		for (a = s.timers.length; a--;) {
			clearInterval(s.timers[a])
		}
	};
	this.resume = function() {
		if (s.disabled) {
			s.disabled = 0
		} else {
			return false
		}
		s.timerInit()
	};
	this.toggleSnow = function() {
		if (!s.flakes.length) {
			s.start()
		} else {
			s.active = !s.active;
			if (s.active) {
				s.show();
				s.resume()
			} else {
				s.stop();
				s.freeze()
			}
		}
	};
	this.stop = function() {
		var a;
		this.freeze();
		for (a = this.flakes.length; a--;) {
			this.flakes[a].o.style.display = "none"
		}
		s.events.remove(window, "scroll", s.scrollHandler);
		s.events.remove(window, "resize", s.resizeHandler);
		if (s.freezeOnBlur) {
			if (isIE) {
				s.events.remove(document, "focusout", s.freeze);
				s.events.remove(document, "focusin", s.resume)
			} else {
				s.events.remove(window, "blur", s.freeze);
				s.events.remove(window, "focus", s.resume)
			}
		}
	};
	this.show = function() {
		var a;
		for (a = this.flakes.length; a--;) {
			this.flakes[a].o.style.display = "block"
		}
	};
	this.SnowFlake = function(a, b, c, d) {
		var e = this, f = a;
		this.type = b;
		this.x = c || parseInt(rnd(screenX - 20), 10);
		this.y = !isNaN(d) ? d : -rnd(screenY) - 12;
		this.vX = null;
		this.vY = null;
		this.vAmpTypes = [ 1, 1.2, 1.4, 1.6, 1.8 ];
		this.vAmp = this.vAmpTypes[this.type];
		this.melting = false;
		this.meltFrameCount = f.meltFrameCount;
		this.meltFrames = f.meltFrames;
		this.meltFrame = 0;
		this.twinkleFrame = 0;
		this.active = 1;
		this.fontSize = 24 + this.type / 2 * 10;
		this.o = document.createElement("div");
		this.o.innerHTML = f.snowCharacter;
		this.o.style.color = f.snowColor;
		this.o.style.position = fixedForEverything ? "fixed" : "absolute";
		this.o.style.width = f.flakeWidth + "px";
		this.o.style.height = f.flakeHeight + "px";
		this.o.style.fontFamily = "arial,verdana";
		this.o.style.cursor = "default";
		this.o.style.overflow = "hidden";
		this.o.style.fontWeight = "bold";
		this.o.style.zIndex = f.zIndex;
		docFrag.appendChild(this.o);
		this.refresh = function() {
			if (isNaN(e.x) || isNaN(e.y)) {
				return false
			}
			e.o.style.left = e.x + "px";
			e.o.style.top = e.y + "px"
		};
		this.stick = function() {
			if (noFixed || f.targetElement !== document.documentElement
					&& f.targetElement !== document.body) {
				e.o.style.top = screenY + scrollY - f.flakeHeight + "px"
			} else if (f.flakeBottom) {
				e.o.style.top = f.flakeBottom + "px"
			} else {
				e.o.style.display = "none";
				e.o.style.top = "auto";
				e.o.style.bottom = "0px";
				e.o.style.position = "fixed";
				e.o.style.display = "block"
			}
		};
		this.vCheck = function() {
			if (e.vX >= 0 && e.vX < .2) {
				e.vX = .2
			} else if (e.vX < 0 && e.vX > -.2) {
				e.vX = -.2
			}
			if (e.vY >= 0 && e.vY < .2) {
				e.vY = .2
			}
		};
		this.move = function() {
			var a = e.vX * windOffset, b;
			e.x += a;
			e.y += e.vY * e.vAmp;
			if (e.x >= screenX || screenX - e.x < f.flakeWidth) {
				e.x = 0
			} else if (a < 0 && e.x - f.flakeLeftOffset < -f.flakeWidth) {
				e.x = screenX - f.flakeWidth - 1
			}
			e.refresh();
			b = screenY + scrollY - e.y;
			if (b < f.flakeHeight) {
				e.active = 0;
				if (f.snowStick) {
					e.stick()
				} else {
					e.recycle()
				}
			} else {
				if (f.useMeltEffect && e.active && e.type < 3 && !e.melting
						&& Math.random() > .998) {
					e.melting = true;
					e.melt()
				}
				if (f.useTwinkleEffect) {
					if (!e.twinkleFrame) {
						if (Math.random() > .9) {
							e.twinkleFrame = parseInt(Math.random() * 20, 10)
						}
					} else {
						e.twinkleFrame--;
						e.o.style.visibility = e.twinkleFrame
								&& e.twinkleFrame % 2 === 0 ? "hidden"
								: "visible"
					}
				}
			}
		};
		this.animate = function() {
			e.move()
		};
		this.setVelocities = function() {
			e.vX = vRndX + rnd(f.vMaxX * .12, .1);
			e.vY = vRndY + rnd(f.vMaxY * .12, .1)
		};
		this.setOpacity = function(a, b) {
			if (!opacitySupported) {
				return false
			}
			a.style.opacity = b
		};
		this.melt = function() {
			if (!f.useMeltEffect || !e.melting) {
				e.recycle()
			} else {
				if (e.meltFrame < e.meltFrameCount) {
					e.setOpacity(e.o, e.meltFrames[e.meltFrame]);
					e.o.style.fontSize = e.fontSize - e.fontSize
							* (e.meltFrame / e.meltFrameCount) + "px";
					e.o.style.lineHeight = f.flakeHeight + 2 + f.flakeHeight
							* .75 * (e.meltFrame / e.meltFrameCount) + "px";
					e.meltFrame++
				} else {
					e.recycle()
				}
			}
		};
		this.recycle = function() {
			e.o.style.display = "none";
			e.o.style.position = fixedForEverything ? "fixed" : "absolute";
			e.o.style.bottom = "auto";
			e.setVelocities();
			e.vCheck();
			e.meltFrame = 0;
			e.melting = false;
			e.setOpacity(e.o, 1);
			e.o.style.padding = "0px";
			e.o.style.margin = "0px";
			e.o.style.fontSize = e.fontSize + "px";
			e.o.style.lineHeight = f.flakeHeight + 2 + "px";
			e.o.style.textAlign = "center";
			e.o.style.verticalAlign = "baseline";
			e.x = parseInt(rnd(screenX - f.flakeWidth - 20), 10);
			e.y = parseInt(rnd(screenY) * -1, 10) - f.flakeHeight;
			e.refresh();
			e.o.style.display = "block";
			e.active = 1
		};
		this.recycle();
		this.refresh()
	};
	this.snow = function() {
		var a = 0, b = 0, c = 0, d = null, e;
		for (e = s.flakes.length; e--;) {
			if (s.flakes[e].active === 1) {
				s.flakes[e].move();
				a++
			} else if (s.flakes[e].active === 0) {
				b++
			} else {
				c++
			}
			if (s.flakes[e].melting) {
				s.flakes[e].melt()
			}
		}
		if (a < s.flakesMaxActive) {
			d = s.flakes[parseInt(rnd(s.flakes.length), 10)];
			if (d.active === 0) {
				d.melting = true
			}
		}
	};
	this.mouseMove = function(a) {
		if (!s.followMouse) {
			return true
		}
		var b = parseInt(a.clientX, 10);
		if (b < screenX2) {
			windOffset = -windMultiplier + b / screenX2 * windMultiplier
		} else {
			b -= screenX2;
			windOffset = b / screenX2 * windMultiplier
		}
	};
	this.createSnow = function(a, b) {
		var c;
		for (c = 0; c < a; c++) {
			s.flakes[s.flakes.length] = new s.SnowFlake(s, parseInt(
					rnd(flakeTypes), 10));
			if (b || c > s.flakesMaxActive) {
				s.flakes[s.flakes.length - 1].active = -1
			}
		}
		storm.targetElement.appendChild(docFrag)
	};
	this.timerInit = function() {
		s.timers = !isWin98 ? [ setInterval(s.snow, s.animationInterval) ] : [
				setInterval(s.snow, s.animationInterval * 3),
				setInterval(s.snow, s.animationInterval) ]
	};
	this.init = function() {
		var a;
		for (a = 0; a < s.meltFrameCount; a++) {
			s.meltFrames.push(1 - a / s.meltFrameCount)
		}
		s.randomizeWind();
		s.createSnow(s.flakesMax);
		s.events.add(window, "resize", s.resizeHandler);
		s.events.add(window, "scroll", s.scrollHandler);
		if (s.freezeOnBlur) {
			if (isIE) {
				s.events.add(document, "focusout", s.freeze);
				s.events.add(document, "focusin", s.resume)
			} else {
				s.events.add(window, "blur", s.freeze);
				s.events.add(window, "focus", s.resume)
			}
		}
		s.resizeHandler();
		s.scrollHandler();
		if (s.followMouse) {
			s.events.add(isIE ? document : window, "mousemove", s.mouseMove)
		}
		s.animationInterval = Math.max(20, s.animationInterval);
		s.timerInit()
	};
	this.start = function(a) {
		if (!didInit) {
			didInit = true
		} else if (a) {
			return true
		}
		if (typeof s.targetElement === "string") {
			var b = s.targetElement;
			s.targetElement = document.getElementById(b);
			if (!s.targetElement) {
				throw new Error('Snowstorm: Unable to get targetElement "' + b
						+ '"')
			}
		}
		if (!s.targetElement) {
			s.targetElement = !isIE ? document.documentElement ? document.documentElement
					: document.body
					: document.body
		}
		if (s.targetElement !== document.documentElement
				&& s.targetElement !== document.body) {
			s.resizeHandler = s.resizeHandlerAlt
		}
		s.resizeHandler();
		s.usePositionFixed = s.usePositionFixed && !noFixed;
		fixedForEverything = s.usePositionFixed;
		if (screenX && screenY && !s.disabled) {
			s.init();
			s.active = true
		}
	};
	if (s.autoStart) {
		s.events.add(window, "load", doStart, false)
	}
	return this;

}(window, document));