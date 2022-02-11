/**
 * MIT License
 * 
 * Copyright (c) 2021 Reload - Laboratorio multimediale (https://www.reloadlab.it/)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function($){
	
	function eModal()
	{
		var $modal; // Modal jQuery object
		var defer; // Promise
		var options = {}; // Modal options
		var settings = {}; // eModal settings
		
		var DIV = '<div>';
		var BUTTON = '<button>';
		var CLOSE_BUTTON = '<button class="x btn btn-primary" data-dismiss="modal" type="button">Close</button>';
		var CLOSE_OFF_MODAL = '<button class="x btn btn-sm btn-dark position-absolute" style="top: -10px; left: -10px; width: 20px; height: 20px; padding: 0; line-height: 1;" data-dismiss="modal" type="button">&times;</button>';
		var EMPTY = '';
		
		var HIDE = 'hide';
		var EVENT_CLICK = 'click';
		var EVENT_SUBMIT = 'submit';
		var EVENT_SHOWN = 'shown.bs.modal';
		var EVENT_HIDE = HIDE + '.bs.modal';
		var EVENT_HIDDEN = 'hidden.bs.modal';
		
		var MODAL_ID = 'eModal';
		var HEADER_ID = 'eHeader';
		var FOOTER_ID = 'eFooter';
		var BODY_ID = 'eBody';
		var STYLE_ID = 'eStyle';
		
		var MODAL_HEADER = 'modal-header';
		var MODAL_FOOTER = 'modal-footer';
		var MODAL_BODY = 'modal-body';
		var MODAL_TITLE = 'modal-title';
		var MODAL_DIALOG = '.modal-dialog';
		var MODAL_BACKDROP = '.modal-backdrop';
		var MODAL_CONTENT = '.modal-content';
		
		var BIN_ID = 'eRecyclebin';
		var REC_MODAL_CONTENT = 'modal-rec';
		var TMP_MODAL_CONTENT = 'modal-tmp';
		
		var INPUT = 'input[type=text], ' + 
			'input[type=password], ' + 
			'input[type=email], ' + 
			'input[type=tel], ' + 
			'input[type=date], ' + 
			'input[type=time], ' + 
			'input[type=datetime-local], ' + 
			'input[type=url], ' + 
			'input[type=number], ' + 
			'input[type=search], ' + 
			'input[type=color], ' + 
			'textarea, ' + 
			'select';
		var KEY_DANGER = 'danger';
		var LABELS = {
				OK: 'Cancel',
				True: 'False',
				Yes: 'No'
			};
		var SIZE = {
				sm: 'sm',
				lg: 'lg',
				xl: 'xl'
			};
		
		// Default settings
		var defaults = {
				'allowContentRecycle': true,
				'animation': 'fade',
				'async': false,
				'attributes': {},
				'autofocus': false,
				'buttons': false,
				'checkValidity': false,
				'closeButton': '<button type="button" class="x close" data-dismiss="modal" aria-label="Close">' +
					'<span aria-hidden="true">&times;</span>' + 
					'</button>',
				'closeX': true,
				'confirmLabel': Object.keys(LABELS)[0],
				'cssClass': false,
				'dataType': false,
				'deferred': false,
				'footer': true,
				'header': true,
				'height': false,
				'id': false,
				'loading': false,
				'loadingHtml': '<h5>Loading...</h5>' + 
					'<div class=progress>' + 
					'<div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>' + 
					'</div>',
				'message': false,
				'modalOptions': {},
				'overlayClose': true,
				'onHide': false,
				'pattern': false,
				'placeholder': false,
				'position': ['start', 'center'],
				'required': true,
				'size': EMPTY,
				'style': [],
				'styles': false,
				'subtitle': false,
				'title': 'Attention',
				'url': false,
				'useBin': false,
				'value': false,
				'width': false,
				'wrapSubtitle': '<small>',
				'wrapTitle': '<h5>',
				'xhr': {}
			};
        
		// Export Public function
		var root = {};
		
		// Modal types function
		root.alert = alert;
		root.ajax = ajax;
		root.confirm = confirm;
		root.prompt = prompt;
		root.iframe = iframe;
		root.embed = embed;
		
		// Utility function
		root.close = close;
		root.label = addLabel;
		root.emptyBin = emptyBin;
		root.setId = setId;
		root.modal = getModal;
		root.defer = getDefer;
		root.size = addSize;
		root.version = '1.0.0';

		return root;

		//#region /////////////////////////* Private Logic */////////////////////////
		/**
		 * Find modal content and append parts to it.
		 * @param {String | DOM} parts
		 */
		function _build(parts)
		{
			// Find modal-content
			$modal.find(MODAL_CONTENT)
				
				// Append header, body and footer
				.append(
					parts.header, 
					parts.body, 
					parts.footer
				);
				
			// Set modal options: 
			// backdrop: Includes a modal-backdrop element. 
			// 			Alternatively, specify 'static' for a backdrop 
			//			which doesn't close the modal on click.
			// 			Default: true
			// keyboard: Closes the modal when escape key is pressed. Default: true
			// focus: Puts the focus on the modal when initialized. Default: true
			// show: Shows the modal when initialized. Default: true
			$modal.modal(options);
		}

		/**
		 * Will use Promises from jQuery.
		 * @returns {Promise}
		 */
		function _createDeferred()
		{
			// jQuery defer object
			defer = $.Deferred();
			
			// Call promise()
			defer.promise = defer.promise();
		
			// Set promise.element to modal-dialog jQuery object
			defer.promise.element = _getModalInstance(true).find(MODAL_DIALOG);
			
			return defer;
		}

		/**
		 * Will create modal DOM header with titles and close X.
		 * @param {Object} obj - this is a full detailed object
		 * @returns {$DOM} header DOM element
		 */
		function _getHeader(obj)
		{
			// If 'header' is set...
			if(obj.header){
				
				// Create div container
				var $messageHeader = $(DIV).addClass(MODAL_HEADER)
					.prop('id', HEADER_ID);
				
				// If 'title' is set...
				if(obj.title){
					
					// Append title to header
					var $title = $(obj.wrapTitle)
						.appendTo($messageHeader)
						.addClass(MODAL_TITLE)
						.html(obj.title);
					
					// If 'subtitle' is set...
					if(obj.subtitle){
						
						// Append subtitle to title
						$(obj.wrapSubtitle).appendTo($title)
							.html(' ' + obj.subtitle);
					}
				}
				
				// If 'closeX' is set...
				if(obj.closeX){
					
					// Append close button to header
					$(obj.closeButton)
						.appendTo($messageHeader);
				}
				
				return $messageHeader;
			}
			
			return EMPTY;
		}

		/**
		 * Will create modal DOM footer with all buttons.
		 * @param {Object} obj - this is a full detailed object
		 * @returns {$DOM} footer DOM element
		 */
		function _getFooter(obj)
		{
			// If 'footer' is set...
			if(obj.footer){
				
				// If 'buttons' is strict equal to false...
				if(obj.buttons === false){
					
					// Return an empty footer
					return EMPTY;
				}
				
				// Create div container
				var $messageFooter = $(DIV).addClass(MODAL_FOOTER)
					.prop('id', FOOTER_ID);
				
				// If 'buttons' is array...
				if(Array.isArray(obj.buttons)){
					
					for(var i = 0; i < obj.buttons.length; i++){
						
						// Button options
						var btnOp = obj.buttons[i];
						
						// Create button
						var $btn = $(BUTTON).addClass('btn btn-' + (btnOp.style || 'primary'));
						
						// Unset 'style' property
						if(btnOp.style){
							
							delete btnOp.style;
						}
						
						for(var index in btnOp){
							
							if(btnOp.hasOwnProperty(index)){
								
								switch(index){
									
									// Il pulsante chiude il modal
									case 'close':
										
										// If 'close' is true...
										if(btnOp[index]){
											
											// Add data-dismiss to close modal
											$btn.attr('data-dismiss', 'modal')
												.addClass('x');
										}
										break;
									
									// L'opzione 'click' è una funzione,
									// che viene chiamata al click sul pulsante.
									// Il valore di this è un oggetto jQuery 
									// corrispondente alla selezione di 'modal-content'.
									case EVENT_CLICK:
										
										// If click is a function...
										if(typeof btnOp.click == 'function'){
											
											// Get click function
											var fn = btnOp.click
												.bind(
													_getModalInstance(true)
														.find(MODAL_CONTENT)
												);
											
											// Assign click event to button
											$btn.on('click', fn);
										}
										break;
									
									// Imposto il valore di resolve su true o false.
									// In base al pulsante cliccato ci sarà un resolve 
									// o un reject della promise
									case 'resolve':
										
										// Assign 'resolve' status to button
										$btn.data(index, btnOp[index]);
										break;
									
									// Testo del bottone
									case 'text':
										
										// Button text
										$btn.html(btnOp[index]);
										break;
									
									default:
										
										// All other possible HTML attributes to button element
										$btn.attr(index, 
											$('<div/>').text(btnOp[index])
												.html()
										);
								}
							}
						}
						
						// Append button to footer
						$messageFooter.append($btn);
					}
				} 
				// If 'buttons' is a string...
				else if(typeof obj.buttons === 'string'){
					
					// Add string.
					$messageFooter.html(obj.buttons);
				}
				// If no buttons defined by user...
				else{
					
					// Add a standard close button.
					$messageFooter.append(CLOSE_BUTTON);
				}
				
				return $messageFooter;
			}
			
			return EMPTY;
		}

		/**
		 * Extract message from arguments.
		 * @param {Object} obj - this is a full detailed object
		 * @returns {$DOM}
		 */
		function _getBody(obj)
		{
			var $message;
			
			// If 'message' is a jQuery object...
			if(obj.message && obj.message instanceof jQuery){
				
				// Clone 'message' from Dom
				content = obj.message.clone(true);
			} 
			// Else...
			else{
				
				content = obj.message;
			}
			
			// Try to create a jQuery object
			try{
				
				// If 'useBin' is true, 'id' is set,
				// and recycle modal is in bin...
				if(obj.useBin && obj.id && 
					$('#' + BIN_ID).find('#' + obj.id + '-bin').length
				){
					
					$bin_content = $('#' + BIN_ID).find('#' + obj.id + '-bin');
					
					// Clone '$content' from bin
					$content = $bin_content.clone(true);
					
					// Remove recycled modal from bin
					$bin_content.remove();
				} 
				// Else...
				else{
					
					// Html content
					var $content = $(obj.loading?
							obj.loadingHtml:
							content
						);
				}
				
				// If $content is empty...
				if(!$content.length){
					
					// This is a string
					throw new Error('This is a string!');
				}
				
				// If $content contain modal-body...
				if($content.hasClass(MODAL_BODY) || 
					$content.find('.' + MODAL_BODY).length
				){
					
					$message = $content
						.addClass(obj.useBin && !obj.loading? 
							REC_MODAL_CONTENT: 
							TMP_MODAL_CONTENT
						);
				} 
				// Else...
				else{
					
					// Create div container
					$message = $(DIV)
						.addClass(MODAL_BODY)
						.addClass(obj.useBin && !obj.loading? 
							REC_MODAL_CONTENT: 
							TMP_MODAL_CONTENT
						)
						.attr('style', 'word-wrap: break-word;')
						.append($content);
				}
			} 
			// Else 'message' is a string...
			catch(e){
				
				// Get error
				console.log(e);
				
				// Create div container
				$message = $(DIV)
					.addClass(MODAL_BODY)
					.attr('style', 'word-wrap: break-word;')
					.html(obj.loading?
						obj.loadingHtml:
						content
					);
			}
			
			// Set Body ID
			$message.prop('id', (obj.id || BODY_ID));

			return obj.styles && (obj.styles !== $message.css && $message.css(obj.styles)), $message;
		}

		/**
		 * Set or change eModal options.
		 * @param {Object} overrideOptions
		 * @returns {Object} eModal
		 */
		function _setEModalOptions(overrideOptions)
		{
			settings = {};
			
			$.extend(settings, defaults, overrideOptions);
		}

		/**
		 * Set or change bootstrap modal options.
		 * @param {Object} overrideOptions
		 * @returns {Object} eModal
		 */
		function _setModalOptions(overrideOptions)
		{
			// Remove modal structure from Dom
			$modal && $modal.remove();
			
			$.extend(options, overrideOptions);
			
			return root;
		}

		/**
		 * Calculate size of modal (width/height)
		 * @param {String} size
		 * @param {String} type
		 * @returns {String} Size in pixel
		 */
		function _calcSize(size, type)
		{
			// Root font-size
			var fontSize = Number(window.getComputedStyle(document.documentElement).getPropertyValue('font-size').match(/\d+/)[0]);
			
			// If window width is major than 576...
			if($(window).outerWidth() >= 576){
				
				var factor = 3.5;
			} else{
				
				var factor = 1;
			}
			
			// If 'type' is height...
			if(type && type == 'height'){
				
				// Window height minus factor * fontSize
				var ws = $(window).height() - (factor * fontSize);
			} 
			// Else...
			else{
				
				// Window width minus factor * fontSize
				var ws = $(window).width() - (factor * fontSize);
			}
			
			// If size is in pixel...
			if(size.indexOf('px') != -1){
				
				size = +size.replace('px', '');
				
				// If 'size' is major than window size...
				if(size > ws){
					
					size = ws;
				} 
				
				return size + 'px';
			} 
			// If size is in percentage...
			else if(size.indexOf('%') != -1){
				
				size = +size.replace('%', '');
				
				// If 'size' is major than 100...
				if(size > 100){
					
					size = ws;
				}
				// Else...
				else{
					
					size = parseInt(ws * size / 100);
				}
				
				return size + 'px';
			} 
			// If 'size' is numeric...
			else if(!isNaN(+size)){
				
				size = +size;
				
				// If 'size' is major than window size...
				if(size > ws){
					
					size = ws;
				} 
				// If 'size' is equal to 0...
				else if(size == 0){
					
					size = 300;
				}
				
				return size + 'px';
			}
			
			return;
		}

		/**
		 * @param {String} version 
		 * @returns {Boolean}
		 */
		function _jQueryMinVersion(version)
		{
			var $ver = $.fn.jquery.split('.');
			var ver = version.split('.');
			var $major = $ver[0];
			var $minor = $ver[1];
			var $patch = $ver[2];
			var major = ver[0];
			var minor = ver[1];
			var patch = ver[2];
        
			return !(
				(major > $major) ||
				(major === $major && minor > $minor) ||
				(major === $major && minor === $minor && patch > $patch)
			);
		}

		/**
		 * Return a new modal object if is the first request or the already created modal.
		 * @param {Object | Boolean} obj
		 * @returns {jQuery Object}
		 */
		function _getModalInstance(obj)
		{
			// Create modal
			$modal = createModalElement();
			
			// If recycle bin must be created...
			if(!$('#' + BIN_ID).length){
				
				// Add recycle bin container to body
				$(DIV).appendTo('body')
					.prop('id', BIN_ID)
					.hide();
			}
			
			// If 'obj' is true...
			if(obj && obj === true && $modal){
				
				// Return modal jQuery object for further operation
				return $modal;
			}
			
			// Style inline
			$modal.find('#' + STYLE_ID).html(
				_setStyle(obj)
			);
			
			// If 'autofocus' is set...
			if(obj.autofocus){
				
				// On modal shown, set focus on first input, 
				// textarea o select field
				$modal.on(EVENT_SHOWN, function()
					{
						$(this).find(INPUT)
							.first()
							.focus();
					});
			}

			return $modal;

			/**
			 * Create a new modal object.
			 * @returns {jQuery Object}
			 */
			function createModalElement()
			{
				if($('#' + MODAL_ID).length){
					
					return $('#' + MODAL_ID);
				}
				
				return $('<div id="' + MODAL_ID + '" class="modal eModal" tabindex="-1">' +
					
					// dialog
					'<div class="modal-dialog modal-eModal modal-dialog-scrollable">' +
					'<div class="modal-content">' +
					'</div>' +
					'</div>' +
					// § dialog 
					
					// style
					'<style id="' + STYLE_ID + '"></style>' +
					// § style 

					'</div>')
					
					// Append to body
					.appendTo('body')
					
					// On hidden event call recycleModal
					.on(EVENT_HIDDEN, _recycleModal)
					
					// On click close button event call closeModal
					.on(EVENT_CLICK, '.x', _closeModal);
			}
		}

		/**
		 * Return inline style of eModal
		 * @param {Object} obj
		 * @returns {String}
		 */
		function _setStyle(obj)
		{
			// If 'width' is set...
			if(obj.width){
				
				// Calculate modal width
				var width = _calcSize(obj.width);
			}
			
			// If 'height' is set...
			if(obj.height){
				
				// Calculate modal height
				var height = _calcSize(obj.height, 'height');
			}
			
			return '.modal-eModal {display: flex; align-items: ' + obj.position[0] + '; justify-content: ' + obj.position[1] + '; width: calc(100% - 1rem)!important; max-width: none; height: calc(100% - 1rem)!important;}' + 
				'.modal-eModal.modal-dialog-scrollable .modal-content {overflow: visible !important;}' + 
				'@media (min-width: 576px) {.modal-eModal {width: calc(100% - 3.5rem)!important; height: calc(100% - 3.5rem)!important;}}' + 
				'.modal-eModal .modal-content {max-width: 500px;}' + 
				'.modal-eModal.modal-sm .modal-content {max-width: 300px;}' + 
				'.modal-eModal.modal-lg .modal-content {max-width: 800px;}' + 
				'.modal-eModal.modal-xl .modal-content {max-width: 1140px;}' + 
				(width? '.modal-eModal .modal-content {max-width: ' + width + ' !important; width: 100%;}': '') + 
				(height? '.modal-eModal .modal-content {max-height: ' + height + ' !important; height: 100%;}': '');
		}

		/**
		 * Move content to recycle bin if is a DOM object defined by user,
		 * delete it if is a simple string message.
		 * All modal messages can be deleted if default setting "allowContentRecycle" = false.
		 * @param {Object} event
		 */
		function _recycleModal(event)
		{
			// If modal doesn't exist
			if(!$modal){
				
				return;
			}
			
			// If 'event' is an event handler...
			if(event instanceof $.Event){
				
				var obj = settings;
			} 
			// Else...
			else{
				
				var obj = event;
			}
			
			// Cerca un contenuto del modal con classe css 'modal-rec'
			var $content = $modal.find('.' + REC_MODAL_CONTENT)
				// Rimuove la classe css 'modal-rec'
				.removeClass(REC_MODAL_CONTENT)
				// Appende il contenuto al contenitore recycle bin
				.appendTo('#' + BIN_ID);
			
			// If 'id' is set...
			if(obj.id){
				
				// Set id of modal in recycle bin
				$content.prop('id', obj.id + '-bin');
			}

			// If recycle bin is disabled or 'id' is unset...
			if(!obj.allowContentRecycle || !obj.id){
				
				// Remove content from Dom
				$content.remove();
			}
			
			// Cancella gli eventi hide e shown
			$modal.off(EVENT_HIDE)
				.off(EVENT_SHOWN)
				// Cerca modal-content e rimuove tutti i figli 
				// (header, body, footer)
				.find(MODAL_CONTENT)
				.children()
				.remove();
		}

		/**
		 * Close modal on X button press
		 * @param {Object} event
		 */
		function _closeModal(event)
		{
			event.preventDefault();
			
			// Clicked element
			var btn = $(event.currentTarget);
			
			// If button type is different than submit...
			if(btn.prop('type') !== EVENT_SUBMIT){
				
				// Hide modal
				return $modal.modal(HIDE);
			}
			
			try{
				
				// Check validity of form element
				if(obj.checkValidity && 
					btn.closest('form')[0].checkValidity()
				){
					
					// Than close
					close();
				}
			} catch(e){
				
				// Hide modal
				close();
			}
		}
		
		/**
		 * Handle default values and toggle between {Object | String}.
		 * Create or get Modal element
		 * @param {Object} obj - This is a full detailed object
		 */
		function _setup(obj)
		{
            // If 'obj' is empty...
			if(!obj){
				
				throw new Error('First argument cannot be blank!');
			}
			
			// Recycle and empty modal
			_recycleModal(obj);

			// Get modal
			var $ref = _getModalInstance(obj);
			
			// Set 'cssClass', 'size' and 'animation'
			$ref
				.addClass(obj.animation)
				.find(MODAL_DIALOG)
				.removeClass(function()
					{
						return SIZE? 
							Object.keys(SIZE)
								.map(function(item)
									{
										return 'modal-' + SIZE[item];
									})
								.join(' '): 
							'';
						
					})
				.addClass(obj.cssClass || null)
				.addClass(obj.size? 
					'modal-' + (obj.size): 
					null
				);
			
			// If onHide function exists...
			if(typeof obj.onHide === 'function'){
				
				// Attach on hide event to modal
				$ref.on(EVENT_HIDE, obj.onHide);
			}
		}

		/**
		 * Basic modal da utilizzare per tutti gli altri modal.
		 * @param {Object | String} data - this can be the message string or the full detailed object.
		 * @param {String} title - the string that will be shown in modal header.
		 * @returns {Promise} Promise with modal $DOM element
		 */
		function _modal(data, title)
		{
			// Set eModal settings
			_setEModalOptions(typeof data === 'object'? data: {});
			
			// If 'overlayClose' is false...
			if(!settings.overlayClose){
				
				// Disable close modal on click over backdrop
				$.extend(settings.modalOptions, {
					backdrop: 'static'
				});
			}
			
			// Set modal options
			if(typeof settings.modalOptions === 'object'){
				
				_setModalOptions(settings.modalOptions);
			}
			
			// If 'data' is string...
			if(typeof data === 'string'){
				
				// Set 'message'
				settings.message = data;
			}
			
			// If 'title' is set...
			if(title){
				
				// Set 'title'
				settings.title = title;
			}
			
			// Set promise object
			var defer = settings.deferred || _createDeferred();
			
			// Create modal structure
			_setup(settings);
			
			// Get Header, Body and Footer
			var parts = {
				header: _getHeader(settings), 
				body: _getBody(settings), 
				footer: _getFooter(settings)
			};
			
			// If backdrop is in Dom...
			if($(MODAL_BACKDROP).length){
				
				// Remove from Dom
				$(MODAL_BACKDROP).remove();
			}
			
			// Append Header, Body and Footer
			_build(parts);
			
			// If 'header' is false and 'overlayClose' is true...
			if(!data.header && data.overlayClose){
				
				// Add close button
				$modal.find(MODAL_CONTENT)
					.append(CLOSE_OFF_MODAL);
			}
			
			// Se il modal non aspetta la risoluzione di una promise...
			if(!settings.async){
				
				// La promise viene risolta quando il modal viene mostrato
				$modal.on(EVENT_SHOWN, defer.resolve);
			}

			return defer.promise;
		}
		//#endregion

		//#region /////////////////////////* Public Methods */////////////////////////
		/**
		 * Non blocking alert whit bootstrap.
		 * @param {Object | String} data - this can be the message string or the full detailed object.
		 * @param {String} title - the string that will be shown in modal header.
		 * @returns {Promise} Promise with modal $DOM element
		 */
		function alert(data, title)
		{
			// Modal settings
			var params = {
				'deferred': _createDeferred(),
				'message': data.message || data
			};
			
			// Merge 'params' in 'data'
			params = $.extend({}, typeof data === 'object'? data: {}, params);

			return _modal(params, title);
		}

		/**
		 * Gets data from URL to eModal body
		 * @param {Object | String} data - this can be the message string or the full detailed object
		 * @param {String} title - the string that will be shown in modal header
		 * @returns {Promise} Promise with modal $DOM element
		 */
		function ajax(data, title)
		{
			// Modal settings
			var params = {
				'async': true,
				'deferred': _createDeferred(),
				'loading': true,
				'url': data.url || data.message || data,
				'xhr': {
					'dataType': data.dataType || 'html',
					'xhrFields': {
						'withCredentials': false
					}
				}
			};
			
			// Merge 'params' in 'data'
			params = $.extend({}, typeof data === 'object'? data: {}, params);
			
			// Send ajax request
			$.ajax(params.url, params.xhr)
				.done(success)
				.fail(error);

			return _modal(params, title);

			/**
			 * Function call on ajax success.
			 * @returns {Promise} Promise with modal $DOM element
			 */
			function success(html)
			{
				// If modal is just shown...
				if(($('#' + MODAL_ID).data('bs.modal') || {})._isShown){
					
					// data.success is a funtion. 
					// It get HTML and must return HTML.
					$modal.find('.' + MODAL_BODY)
						.html(params.success? params.success(html): html);
					
					return defer.resolve($modal);
				}
				// Else...
				else{
					
					$modal.on(EVENT_SHOWN, function(e){
						
						// data.success is a funtion. 
						// It get HTML and must return HTML.
						$modal.find('.' + MODAL_BODY)
							.html(params.success? params.success(html): html);
	
						return defer.resolve($modal);
					});
				}
			}

			/**
			 * Function call on ajax error.
			 * @returns {Promise} Promise with modal $DOM element
			 */
			function error(error, status, thrown)
			{
				// If modal is just shown...
				if(($('#' + MODAL_ID).data('bs.modal') || {})._isShown){
					
					// data.error is a funtion. 
					// It get error, status, thrown e params and must return HTML.
					var msg = params.error?
						params.error(error, status, thrown, params):
						'<div class="alert alert-danger mb-0">' +
						'<strong>XHR Fail: </strong>URL [ ' + 
							params.url + 
							'] load fail.' +
						'</div>';
	
					$modal.find('.' + MODAL_BODY)
						.html(msg);
				
					return defer.reject(error);
				}
				// Else...
				else{
						
					$modal.on(EVENT_SHOWN, function(e){
						
						// data.error is a funtion. 
						// It get error, status, thrown e params and must return HTML.
						var msg = params.error?
							params.error(error, status, thrown, params):
							'<div class="alert alert-danger mb-0">' +
							'<strong>XHR Fail: </strong>URL [ ' + 
								params.url + 
								'] load fail.' +
							'</div>';
		
						$modal.find('.' + MODAL_BODY)
							.html(msg);
					
						return defer.reject(error);
					});
				}
			}
		}

		/**
		 * Non blocking confirm dialog with bootstrap.
		 * @param {Object | String} data - this can be the message string or the full detailed object.
		 * @param {String} title - the string that will be shown in modal header.
		 * @returns {Promise} Promise with modal $DOM element
		 */
		function confirm(data, title)
		{
			// Modal settings
			var params = {
				'async': true,
				'buttons': [
					{ // Cancel
						'close': true,
						'click': resolve,
						'resolve': false,
						'text': LABELS[data.confirmLabel]? LABELS[data.confirmLabel]: LABELS[defaults.confirmLabel],
						'style': data.style && data.style[0] || KEY_DANGER
					}, 
					{ // Confirm
						'close': true,
						'click': resolve,
						'resolve': true,
						'text': LABELS[data.confirmLabel]? data.confirmLabel: defaults.confirmLabel,
						'style': data.style && data.style[1]
					}
				],
				'deferred': _createDeferred(),
				'footer': true,
				'message': data.message || data,
				'onHide': resolve
			};
			
			// Merge 'params' in 'data'
			params = $.extend({}, typeof data === 'object'? data: {}, params);

			return _modal(params, title);

			/**
			 * Function call on buttons click (Confirm or Cancel).
			 * Resolve the promise.
			 * @returns {Promise} Promise with modal $DOM element
			 */
			function resolve(e)
			{
				return $(e.currentTarget).data('resolve')? 
					defer.resolve($modal): 
					defer.reject($modal);
			}
		}

		/**
		 * Provides one value form.
		 * @param {Object | String} data - this can be the value string label or the full detailed object.
		 * @param {String} title - the string that will be shown in modal header.
		 * @returns {Promise} Promise with input value
		 */
		function prompt(data, title)
		{
			// Modal settings
			var params = {
				'async': true,
				'deferred': _createDeferred(),
				'footer': false,
				'message': data.message || data,
				'onHide': submit
			};
			
			// Create footer and buttons
			var buttons = _getFooter({
					'footer': true,
					'buttons': [
						{ // Cancel
							'close': true,
							'type': 'reset',
							'text': LABELS[data.confirmLabel]? LABELS[data.confirmLabel]: LABELS[defaults.confirmLabel],
							'style': data.style && data.style[0] || KEY_DANGER
						}, 
						{ // Confirm
							'close': false,
							'type': EVENT_SUBMIT,
							'text': LABELS[data.confirmLabel]? data.confirmLabel: defaults.confirmLabel,
							'style': data.style && data.style[1]
						}
					]
				});
			
			// Merge 'params' in 'data'
			params = $.extend({}, typeof data === 'object'? data: {}, params);
			
			// Create form
			params.message = $('<form class="m-0 p-0" role="form">' +
				'<div class="' + MODAL_BODY + '">' +
				
				// label
				'<label for="prompt-input" class="control-label">' + 
					(params.message || EMPTY) + 
					'</label>' +
				// § label
				
				// input
				'<input type="text" class="prompt-input form-control" required autocomplete="on" value="' + 
					(params.value || EMPTY) + '"' + 
					(params.required? ' required': EMPTY) + 
					(params.pattern? ' pattern="' + params.pattern + '"': EMPTY) + 
					(params.placeholder? ' placeholder="' + params.placeholder + '"': EMPTY) + 
					'">' +
				// § input
				
				'</div>' +
				'</form>')
				.data('type', 'prompt')
				
				// Append footer and buttons inside the form
				.append(buttons)
				
				// Add submit event
				.on(EVENT_SUBMIT, submit);
			
			return _modal(params, title);

			/**
			 * Function call on form submit.
			 * Resolve the promise.
			 * @returns false
			 */
			function submit(e)
			{
				e.preventDefault();
				
				// Get input value
				var value = $modal.find('.prompt-input')
					.val();

				// Close modal
				close();

				// Resolve the promise
				e.type === EVENT_SUBMIT?
					defer.resolve(value):
					false;
			}
		}

		/**
		 * Will load a URL in iFrame inside the modal body.
		 * @param {Object | String} data - this can be the URL string or the full detailed object.
		 * @param {String} title - the string that will be shown in modal header.
		 * @returns {Promise} Promise with modal $DOM element
		 */
		function iframe(data, title)
		{
			// Modal settings
			var params = {
				'async': true,
				'deferred': _createDeferred(),
				'footer': false,
				'url': data.url || data.message || data
			};
			
			// Merge 'params' in 'data'
			params = $.extend({}, typeof data === 'object'? data: {}, params);
			
			// If 'width' is set...
			if(data.width){
				
				// Calculate modal width
				var width = _calcSize(data.width);
			}
			
			// If 'height' is set...
			if(data.height){
				
				// Calculate modal height
				var height = _calcSize(data.height, 'height');
			}
			
			params.message = $('<div class="' + MODAL_BODY + ' p-0">' +
				
				// loading
				'<div class="eLoading d-flex flex-column justify-content-center position-absolute w-100 h-100 p-3 text-center bg-white" style="z-index: 100"></div>' +
				// § loading
				
				// iframe
				'<iframe class="d-block w-100 h-100" frameborder="0" style="z-index: 10"></iframe>' +
				// § iframe
				
				'</div>')
				.data('type', 'iframe');
			
			// Set iframe src
			var iframe = params.message.find('iframe')
				.attr('src', params.url);
			
			// Set iframe attribute
			$.each(params.attributes, function(index, value){
				
				if(index == 'width' || index == 'height'){
					
					return;
				}
				
				iframe.attr(index, $('<div/>').text(value).html());
			});
			
			// Set loadingHtml
			params.message.find('.eLoading')
				.append(data.loadingHtml || defaults.loadingHtml);
			
			// On load iframe
			_jQueryMinVersion('3.0.0')? 
				params.message.find('iframe')
					.on('load', iframeReady):
				params.message.find('iframe')
					.load(iframeReady)
					.end();

			return _modal(params, title);

			/**
			 * Function call when iframe is loaded.
			 * Resolve the promise.
			 * @returns false
			 */
            function iframeReady()
			{
				$(this).parents('.' + MODAL_BODY)
					.find('.eLoading')
					.fadeOut(400, function()
						{
							$(this).remove();
						});
				
				defer.resolve($modal);
			}
		}

		/**
		 * Will load a URL to embed inside the modal body.
		 * @param {Object | String} data - this can be the URL string or the full detailed object.
		 * @param {String} title - the string that will be shown in modal header.
		 * @returns {Promise} Promise with modal $DOM element
		 */
		function embed(data, title)
		{
			// Modal settings
			var params = {
				'async': true,
				'deferred': _createDeferred(),
				'url': data.url || data.message || data
			};
			
			// Merge 'params' in 'data'
			params = $.extend({}, typeof data === 'object'? data: {}, params);
			
			params.message = $('<div class="' + MODAL_BODY + ' p-0">' +
				
				// loading
				'<div class="eLoading d-flex flex-column justify-content-center position-absolute w-100 h-100 p-3 text-center bg-white" style="z-index: 100"></div>' +
				// § loading
				
				// iframe
				'<div class="embed-responsive embed-responsive-16by9" style="z-index: 10">' +
				'<iframe class="embed-responsive-item d-block w-100" frameborder="0"></iframe>' +
				'</div>' +
				// § iframe
				
				'</div>')
				.data('type', 'embed');
			
			// Set iframe src
			var iframe = params.message.find('iframe')
				.attr('src', params.url);
			
			// Set iframe attribute
			$.each(params.attributes, function(index, value){
				
				iframe.attr(index, $('<div/>').text(value).html());
			});
			
			// Set loadingHtml
			params.message.find('.eLoading')
				.append(data.loadingHtml || defaults.loadingHtml);
			
			// On load iframe
			_jQueryMinVersion('3.0.0')? 
				params.message.find('iframe')
					.on('load', iframeReady):
				params.message.find('iframe')
					.load(iframeReady)
					.end();

			return _modal(params, title);

			/**
			 * Function call when iframe is loaded.
			 * Resolve the promise.
			 * @returns false
			 */
            function iframeReady()
			{
				$(this).parents('.' + MODAL_BODY)
					.find('.eLoading')
					.fadeOut(400, function()
						{
							$(this).remove();
						});
				
				defer.resolve($modal);
			}
		}

		/**
		 * Add/Change button labels.
		 * @returns {Object} eModal
		 */
		function addLabel(yes, no)
		{
			LABELS[yes] = no;
			
			return root;
		}

		/**
		 * Add/Change modal size.
		 * @returns {Object} eModal
		 */
		function addSize(size)
		{
			SIZE[size] = size;
			
			return root;
		}

		/**
		 * Remove all Dom elements in recycle bin.
		 * @returns {Object} eModal
		 */
		function emptyBin()
		{
			$('#' + BIN_ID + ' > *').remove();
			
			return root;
		}

		/**
		 * Set modal ID.
		 * @returns {Object} eModal
		 */
		function setId(id)
		{
			_getModalInstance(true)
				.find(MODAL_DIALOG)
				.prop('id', id);
			
			return root;
		}

		/**
		 * Close the current open eModal
		 * @returns {Object} eModal
		 */
		function close()
		{
			// If modal exist...
			if($modal){
				
				// Reset hide event
				$modal.off(EVENT_HIDE)
					// Hide modal
					.modal(HIDE);
			}
			
			return root;
		}

		/**
		 * Get the modal jQuery object
		 * @returns {jQuery Object}
		 */
		function getModal()
		{
			// If modal exist...
			if($modal){
				
				return $modal;
			}
		}

		/**
		 * Get the promise jQuery object
		 * @returns {Promise} Promise with modal $DOM element
		 */
		function getDefer()
		{
			// If 'defer' exist...
			if(defer){
				
				return defer;
			}
		}
		//#endregion
	}
	
	// Add eModal to jquery
	if(!$.eModal){
			
		$.extend($, {
			eModal: eModal()
		});
	} else{
		
		throw new Error('$.eModal already exists!');
	}
}(jQuery));