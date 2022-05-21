# jQuery eModal Plugin
[![GitHub Release](https://img.shields.io/badge/release-2.1.0-green)](https://github.com/Reload-Lab/jquery-eModal/releases)
[![GitHub License](https://img.shields.io/badge/license-MIT-orange)](https://github.com/Reload-Lab/jquery-eModal/blob/main/LICENSE)

**$.eModal** is a easy way to manage **Bootstrap 4** modal dialogs using javaScript. It is not only a system that facilitates the use of the Bootstrap modal dialog, but an alternative to dialog boxes, such as alert, confirm and prompt.

**Bootstrap 4** and **jQuery** are dependencies to jquery.eModal.js.

This plugin is based on the work of **Samuel Pinto** (saribe), but has been completely reengineered. https://github.com/saribe/eModal

### Dependencies
The plugin requires **jQuery 3** and **Bootstrap 4**.

### Installation
NPM:
`npm install jquery-emodal`

Yarn:
`yarn add jquery-emodal`

Bower:
`bower install Reload-Lab/jquery-eModal`

### Example And Usage
The *index.html* file in the **example/** folder contains many examples of using the script that illustrate its full potential.

You can see the plugin in action at this url:
https://www.reloadlab.it/cantieri/jquery-eModal/example/

To initialize your modal:
1.	Add the script to your page:
```html
<script src=path/to/emodal/folder/dist/ jquery.eModal.min.js></script>
```
2.	Call one of the methods of the **$.eModal** object to open your modal dialog
```html
<script>
$(document).ready(function(){
   $.eModal.ajax('ajax.html?_uid' + Math.random(), 'Ajax modal');
}); 
</script> 
```
or add an event to some element.
```html
<button class="open-ajax" type="button">OPEN MODAL</button>
<script>
$(document).ready(function(){
   $('.open-ajax').on('click', function(e){
      $.eModal.ajax('ajax.html?_uid' + Math.random(), 'Ajax modal');
   });
}); 
</script> 
```

### Modal methods
All methods take two arguments:
1.	**data** (*required*): the value passed can be a string that represents the message to be displayed, or an object that configures the characteristics of the modal dialog.
2.	**title** (*optional*): the value passed must be a string representing the title that appears in the modal header.

| Method  | Description  |
| ------------ | ------------ |
| **$.eModal.alert**  | Traditional notice box. You can pass a text or a reference to a jQuery object to the method.  |
| **$.eModal.ajax**  | This method allows you to get remote views into your modal using an URL.  |
| **$.eModal.confirm**  | Get an okay from user with a traditional confirm modal.  |
| **$.eModal.prompt**  | A simple form to ask the user a question and get an answer.  |
| **$.eModal.iframe**  | This method allows you to open a page in an iframe within the modal dialog.  |
| **$.eModal.embed**  | A modal dialog that allows you to show a video from YouTube or a map from Gmap embedded in an iframe.  |

### Available Options
It is possible to set numerous characteristics of the modal through an object to be passed as the first argument of the methods described above.

| Options  | Type  | Description  |
| ------------ | ------------ | ------------ |
| **message**  | *jQuery*, *Html*, *Url*, *String*  | Content to be loaded inside the body element of the modal. It can be a text string, a url to a web resource, html content or a jQuery object. The variable is mandatory.  |
| **async**  | *Boolean*  | If the variable is set to true, the $.eModal functions return a Promise, that is resolved when the modal is closed. For modal confirm and prompt, the value must be true. *Default: false*  |
| **useBin**  | *Boolean*  | If set to true, $.eModal keeps the content uploaded in the body element of the modal in a recycle bin can, so that it can be recalled without a new upload from the web. *Default: false*  |
| **binId**  | *String*, *false*  | Unique identifier of the content saved in the recycle bin. In case the useBin variable is set to true, binId must be set in order for the content to be saved. *Default: false*  |
| **id**  | *String*, *false*  | Set the ID attribute of the modal dialog. *Default: false*  |
| **cssClass**  | *String*, *false*  | CSS class to apply to the modal dialog. *Default: false*  |
| **bodyStyles**  | Object, false  | Inline CSS styles to be applied to the body element of the modal. *Default: false*  |
| **header**  | *Boolean*  | If the value is set to false, $.eModal does not show the Bootstrap modal header. *Default: true*  |
| **title**  | *String*  | The property sets the title that appears in the modal header. *Default: Attention*  |
| **wrapTitle**  | *String*  | Html that frames the title that appears in the modal header. *Default: `<h5>`*  |
| **subtitle**  | *String*, *false*  | The property sets the subtitle that appears in the modal header. *Default: false*  |
| **wrapSubtitle**  | *String*  | Html that frames the subtitle that appears in the modal header. *Default: `<small>`*  |
| **headerClose**  | *Boolean*  | If the value is set to false, $.eModal does not show the close button in Bootstrap's modal header. *Default: true*  |
| **headerCloseHtml**  | *Html*  | Close button html in Bootstrap modal header.  |
| **footer** | *Boolean*  | If the value is set to false, $.eModal does not show the Bootstrap modal footer. *Default: true*  |
| **buttons**  | *Array*, *String*, *false*, *null*  | You can set all button attributes and actions to be displayed in the modal footer. If the value is an array it is possible to set the characteristics of the button through an object. For example text (string) for the button label, style (string) for the css class to be applied to the button, close (boolean) if the button has to close the modal, click (function) to execute a function when the button is clicked. All other attributes can be passed through the properties of the object (key is the attribute and value is the attribute's value) If a string is passed, the text will appear in the footer. If the value is false, no footer is shown. By default, a close modal button appears. *Default: null*  |
| **width**  | *Number*, *String*, *false*  | Width of the modal relative to the browser window. You can use a numeric value, a pixel value or a percentage value. *Default: false*  |
| **height**  | *Number*, *String*, *false*  | Height of the modal relative to the browser window. You can use a numeric value, a pixel value or a percentage value. *Default: false*  |
| **size**  | *String*  | Set modal width according to Bootstrap measurements: small (sm), large (lg) and extra large (xl). *Default: empty string*  |
| **position**  | *Array*  | Sets the vertical and horizontal position of the modal relative to the screen. The first element of the array is the vertical position (top, middle and bottom). The second element indicates the horizontal position (left, center, right). *Default: [top, center]*  |
| **animation**  | *String*  | You can choose the animation that will be performed when the modal is opened. If an empty string is passed there will be no animation. *Default: 'fade'*  |
| **modalOptions**  | *Object*, *false*  | Options to pass to Bootstrap's modal function. *Default: false*  |
| **overlayClose**  | *Boolean*  | If the variable is set to false, the possibility of closing the modal by clicking on the backdrop is inhibited. *Default: true*  |
| **onHide**  | *Function*, *false*  | Function that is performed when the modal is closed. *Default: false*  |

#### Ajax modal options
| Options  | Type  | Description  |
| ------------ | ------------ | ------------ |
| **ajax.dataType**  | *String*  | In the case of modal ajax, the variable indicates the type of content (html, text, json, xml) returned by the ajax call. *Default: html*  |
| **ajax.error**  | *Function*, *false*  | Function to be performed in case of error in the ajax call. The function receives three arguments: The jqXHR object, a string describing the type of error that occurred and the configuration params passed to ajax modal. *Default: false*  |
| **ajax.loading**  | *Boolean*  | In the case of an ajax modal, if the variable is set to true, $.eModal displays a content loading bar. *Default: true*  |
| **ajax.loadingHtml**  | *Html*  | In the case of an ajax, Html of the content loading bar.  |
| **ajax.success**  | *Function*, *false*  | Function to be performed in case of success in the ajax call. The function gets passed one argument: The data returned from the server, formatted according to the dataType parameter. *Default: false*  |
| **ajax.url**  | *String*, *false*  | In the case of modal ajax, the variable sets the url of the resource to be loaded in the body element of the modal. *Default: false*  |
| **ajax.xhr**  | *Object*, *false*  | In the case of modal ajax, you can set the properties of the call. To know all the values that can be set, you can read the documentation of the jQuery $.ajax function: https://api.jquery.com/jquery.ajax/. *Default: false*   |

#### Confirm modal options
| Options  | Type  | Description  |
| ------------ | ------------ | ------------ |
| **confirm.label**  | *String*  | Confirm button label in confirm modals. *Default: Ok*  |
| **confirm.style**  | *Array*  | CSS class of the confirmation and rejection buttons of the modal confirm. *Default: [btn-primary, btn-danger]*  |

#### Prompt modal options
| Options  | Type  | Description  |
| ------------ | ------------ | ------------ |
| **prompt.autocomplete**  | *Boolean*  | In the case of a modal prompt, if the variable is set to true, the value ON is assigned to the autocomplete attribute of the field. *Default: false*  |
| **prompt.autofocus**  | *Boolean*  | In the case of a modal prompt, if the variable is set to true, the focus is assigned to the input field when the modal is opened. *Default: false*  |
| **prompt.checkValidity**  | *Boolean*  | In the case of a modal prompt, if the variable is set to true, a check is made on the validity of the content of the input field, using the browser api. *Default: false*  |
| **prompt.label**  | *String*  | Confirm button label in prompt modals. *Default: Ok*  |
| **prompt.pattern**  | *String*, *false*  | In the case of modal prompt, you can set the pattern attribute of the INPUT tag, so that the value entered by the user in the field can be validated using a regular expression. *Default: false*  |
| **prompt.placeholder**  | *String*, *false*  | In the case of modal prompt, you can set the placeholder attribute of the INPUT tag, so that a placeholder text is displayed in the input field. *Default: false*  |
| **prompt.required**  | *Boolean*  | In the case of modal prompt, set the required attribute of the INPUT tag, so that it is mandatory to fill in the input field before sending it. *Default: false*  |
| **prompt.style**  | *Array*  | CSS class of the confirmation and rejection buttons of the modal prompt. *Default: [btn-primary, btn-danger]*  |
| **prompt.type**  | *String*  | In the case of modal prompt you can set the type attribute of the INPUT tag. *Default: text*  |
| **prompt.value**  | *String*, *false*  | In the case of modal prompt, you can set the value of the value attribute of the INPUT tag. *Default: false*  |

#### Iframe and embed modal options
| Options  | Type  | Description  |
| ------------ | ------------ | ------------ |
| **iframe.loadingHtml**  | *Html*  | In the case of an embed and iframe modal, Html of the content loading bar.  |
| **iframe.url**  | *String*, *false*  | In the case of modal embed and iframe, the variable sets the url of the resource to be loaded in the body element of the modal. *Default: false*  |
| **iframe.attributes**  | *Object*, *false*  | In the case of modal iframe and embed, you can set the attributes of the IFRAME tag. The object keys correspond to the attributes and the values to the attribut's values. *Default: false*  |

### Utility methods
| Method  | Description  |
| ------------ | ------------ |
| **$.eModal.close**  | Closes the modal. The onHide function is not performed. *Nothing returns*  |
| **$.eModal.label**  | Adds new labels. It takes two arguments: confirm button label and reject button label. *Returns the $.eModal object for concatenation*.  |
| **$.eModal.modal**  | Returns the jQuery object of the modal dialog.  |
| **$.eModal.defer**  | Return the Promise to be able to perform a resolve or reject.  |
| **$.eModal.size**  | It is possible to add a size to those provided by Bootstrap (sm, lg, xl). *Returns the $.eModal object for concatenation*.  |
| **$.eModal.emptyBin**  | The method empties the recycle bin. *Returns the $.eModal object for concatenation*.  |

Created by Domenico Gigante - [Reload Laboratorio Multimediale](https://www.reloadlab.it "Reload Laboratorio Multimediale"), Rome, IT