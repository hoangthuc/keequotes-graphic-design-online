
    // initialize fabric canvas and assign to global windows object for debug
    var mainCanvas, canvas1, canvas2, padding = 10, canvas_image
        view = false;

    var canvas1Config = {
        canvasState             : [],
        currentStateIndex       : -1,
        undoStatus              : false,
        redoStatus              : false,
        undoFinishedStatus      : 1,
        redoFinishedStatus      : 1,
    };

    var canvas2Config = {
        canvasState             : [],
        currentStateIndex       : -1,
        undoStatus              : false,
        redoStatus              : false,
        undoFinishedStatus      : 1,
        redoFinishedStatus      : 1,
    };

//Change View
    function changeView(value) {
        if (view) {
            $viewText.textContent = "Back";
            mainCanvas = canvas1;
            $('#canvas1').parent().css('display', 'block');
            $('#canvas2').parent().css('display', 'none');
        } else {
            $viewText.textContent = "Front";
            mainCanvas = canvas2;
            $('#canvas1').parent().css('display', 'none');
            $('#canvas2').parent().css('display', 'block');
        }

        view = !view;
        updateMementoButtons();
    }

    function setZIndexes(canvas = null) {
        var curr_zIndex = 0;
        if (canvas === null) {
            canvas = mainCanvas;
        }
        canvas.getObjects().forEach(function(obj) {
        });
    }

    function loadJsonIntoCanvas(json, canvas, ignoreAddedEvent = false) {
        canvas.clear();
        fabric.util.enlivenObjects(json, function(objects) {
            objects.forEach(function(obj) {
                canvas.add(obj);
                setZIndexes(canvas);
                canvas.renderAll.bind(canvas);
            });
        });
    }

    function updateCanvasState(canvas, config) {
        if((config.undoStatus === false && config.redoStatus === false)){
            var jsonData        = canvas.toJSON(['selectable', 'id']);
            var canvasAsJson        = JSON.stringify(jsonData);
            if(config.currentStateIndex < config.canvasState.length-1){
                var indexToBeInserted                  = config.currentStateIndex+1;
                config.canvasState[indexToBeInserted] = canvasAsJson;
                var numberOfElementsToRetain           = indexToBeInserted+1;
                config.canvasState                    = config.canvasState.splice(0,numberOfElementsToRetain);
            }else{
                config.canvasState.push(canvasAsJson);
            }
            config.currentStateIndex = config.canvasState.length-1;
            if((config.currentStateIndex === config.canvasState.length-1) && config.currentStateIndex != -1){
                $('#redo').prop('disabled', true);
            }
            $('#undo').prop('disabled', false);
        }

    }

    function updateMementoButtons() {
        console.log(mainCanvas.mementoConfig);
        if ((mainCanvas.mementoConfig.currentStateIndex === mainCanvas.mementoConfig.canvasState.length-1) || (mainCanvas.mementoConfig.currentStateIndex === -1 && mainCanvas.mementoConfig.canvasState.length === 0)) {
            $('#redo').prop('disabled', true);
        } else {
            $('#redo').prop('disabled', false);
        }

        if (mainCanvas.mementoConfig.currentStateIndex > -1) {
            $('#undo').prop('disabled', false);
        }
        else {
            $('#undo').prop('disabled', true);
        }
    }



//Set Control Canvas
    fabric.Object.prototype.objectCaching = false;
    fabric.Object.prototype.set(

        {
            borderColor: '#ff3207',
            cornerColor: 'white',
            cornerSize: 17,
            padding: 0,
            transparentCorners: false,
            borderDashArray: [2, 2],
            rotatingPointOffset: 20,
            cornerStyle: 'circle',
            lockUniScaling: true,
            cornerStrokeColor: '#ccc',
        });


    function zoomout() {
        canvas1.setZoom(canvas1.getZoom() *0.9);
        canvas1.setDimensions({
            width: canvas1.width * 0.9,
            height: canvas1.height * 0.9
        });
        canvas2.setZoom(canvas2.getZoom() *0.9);
        canvas2.setDimensions({
            width: canvas2.width * 0.9,
            height: canvas2.height * 0.9
        });
    };


    function optTextChanged(opt) {
        var t1 = opt.target;
        if (t1.width > t1.fixedWidth) {
            t1.fontSize *= t1.fixedWidth / (t1.width + 1);
            t1.width = t1.fixedWidth;
        }
    }

//Check type and display
    function onObjectSelected(o){
        console.log(o.target.get('type'));
        activeObject = o.target;
        if(activeObject.isType('textbox')){
            $(".text-function").show(100);
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".image-function").hide(100);
            $(".color-function").show(100);
            $(".group-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
        }
        if(activeObject.isType('i-text')){
            $(".text-function").show(100);
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".image-function").hide(100);
            $(".color-function").show(100);
            $(".group-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
        }
        else if(activeObject.isType('image')){
            $(".image-function").show(100);
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".text-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
            $(".text-function").hide(100);
            $(".color-function").hide(100);
            $(".group-function").hide(100);
        }
        else if( activeObject.isType('polygon')){
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".image-function").hide(100);
            $(".color-function").show(100);
            $(".group-function").hide(100);
            $(".text-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
        }
        else if( activeObject.isType('rect')){
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".image-function").hide(100);
            $(".color-function").show(100);
            $(".group-function").hide(100);
            $(".text-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
        }
        else if( activeObject.isType('triangle')){
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".image-function").hide(100);
            $(".color-function").show(100);
            $(".group-function").hide(100);
            $(".text-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
        }
        else if( activeObject.isType('circle')){
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".image-function").hide(100);
            $(".color-function").show(100);
            $(".group-function").hide(100);
            $(".text-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
        }
        else if( activeObject.isType('path')){
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".image-function").hide(100);
            $(".color-function").show(100);
            $(".group-function").hide(100);
            $(".text-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
        }
        else if( activeObject.isType('path-group')){
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".image-function").hide(100);
            $(".color-function").show(100);
            $(".text-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
        }
        else if( activeObject.isType('group')){
            $(".detail-function").show(100);
            $(".delete-color-function").show(100);
            $(".general-function").hide(100);
            $(".image-function").hide(100);
            $(".color-function").show(100);
            $(".group-function").show(100);
            $(".text-function").hide(100);
            $(".tools-colors").hide(100);
            $(".tools-details").hide(100);
        }
    }

//Show icons first view
    function onCanvasSelected(o){
        $(".general-function").show(100);
        $(".image-function").hide(100);
        $(".text-function").hide(100);
        $(".detail-function").hide(100);
        $(".delete-color-function").hide(100);
        $(".color-function").hide(100);
        $(".group-function").hide(100);
        $(".tools-details").hide(100);
        $(".tools-fonts").hide(100);
        $(".tools-colors").hide(100);
        $(".tools-fonts-details").hide(100);
        $(".tools-fonts-style").hide(100);
        $(".tools-fonts-effect").hide();
    }

    //Flip Just toggling flipX and flipY
    document.getElementById('flipY').addEventListener('click', function () {
        var activeObject = mainCanvas.getActiveObject(),
            activeGroup = mainCanvas.getActiveGroup();
        if (activeObject) {
            activeObject.toggle('flipY');
            mainCanvas.renderAll();
        }
        else if (activeGroup) {
            activeGroup.toggle('flipY');
            mainCanvas.renderAll();
        }

    });

    document.getElementById('flipX').addEventListener('click', function () {
        var activeObject = mainCanvas.getActiveObject(),
            activeGroup = mainCanvas.getActiveGroup();
        if (activeObject) {
            activeObject.toggle('flipX');
            mainCanvas.renderAll();
        }
        else if (activeGroup) {
            activeGroup.toggle('flipX');
            mainCanvas.renderAll();
        }

    });



    /* Align the selected object */
    function process_align(val, activeObj) {
        switch (val) {

            case 'left':
                var left;
                if(activeObj.angle <= 90) {
                    left = activeObj.aCoords.tl.x - activeObj.aCoords.bl.x;
                }
                if(activeObj.angle > 90 && activeObj.angle <= 180) {
                    left = activeObj.aCoords.tl.x - activeObj.aCoords.br.x;
                }
                if(activeObj.angle > 180 && activeObj.angle <= 270) {
                    left = activeObj.aCoords.tl.x - activeObj.aCoords.tr.x;
                }
                if(activeObj.angle > 270) {
                    left = 0;
                }
                activeObj.set({
                    left: left
                });
                break;
            case 'right':
                var left;
                if(activeObj.angle <= 90) {
                    canvas2.setZoom(1);
                    canvas1.setZoom(1);
                    left = activeObj.aCoords.tl.x + (mainCanvas.width - activeObj.aCoords.tr.x);
                }
                if(activeObj.angle > 90 && activeObj.angle <= 180) {
                    left = mainCanvas.width;
                }
                if(activeObj.angle > 180 && activeObj.angle <= 270) {
                    left = activeObj.aCoords.tl.x + (mainCanvas.width - activeObj.aCoords.bl.x);
                }
                if(activeObj.angle > 270) {
                    left = activeObj.aCoords.tl.x + (mainCanvas.width - activeObj.aCoords.br.x);
                }
                activeObj.set({
                    left: left
                });
                break;
            case 'top':
                var top;
                if(activeObj.angle <= 90) {
                    top = 0;
                }
                if(activeObj.angle > 90 && activeObj.angle <= 180) {
                    top = activeObj.aCoords.tl.y - activeObj.aCoords.bl.y;
                }
                if(activeObj.angle > 180 && activeObj.angle <= 270) {
                    top = activeObj.aCoords.tl.y - activeObj.aCoords.br.y;
                }
                if(activeObj.angle > 270) {
                    top = activeObj.aCoords.tl.y - activeObj.aCoords.tr.y;
                }
                activeObj.set({
                    top: top
                });
                break;
            case 'bottom':
                var top;
                if(activeObj.angle <= 90) {
                    canvas2.setZoom(1);
                    canvas1.setZoom(1);
                    top = activeObj.aCoords.tl.y + (mainCanvas.height - activeObj.aCoords.br.y);
                }
                if(activeObj.angle > 90 && activeObj.angle <= 180) {
                    top = activeObj.aCoords.tl.y + (mainCanvas.height - activeObj.aCoords.tr.y);
                }
                if(activeObj.angle > 180 && activeObj.angle <= 270) {
                    top = mainCanvas.height;
                }
                if(activeObj.angle > 270) {
                    top = activeObj.aCoords.tl.y + (mainCanvas.height - activeObj.aCoords.bl.y);
                }
                activeObj.set({
                    top: top
                });
                break;
            case 'center':
                activeObj.viewportCenterH();
                break;
            case 'middle':
                activeObj.viewportCenterV();
                break;
        }
    }

// Order
    var sendSelectedObjectBack = function() {
        selectedObject = mainCanvas.getActiveObject(),
            selectedGroup = mainCanvas.getActiveGroup();
        if(selectedObject)
            mainCanvas.sendBackwards(selectedObject);
        else if(selectedGroup)
            mainCanvas.sendBackwards(selectedGroup)

        mainCanvas.renderAll();
    }

    var sendSelectedObjectToFront = function() {
        selectedObject = mainCanvas.getActiveObject(),
            selectedGroup = mainCanvas.getActiveGroup();
        if(selectedObject)
            mainCanvas.bringForward(selectedObject);
        else if(selectedGroup)
            mainCanvas.bringForward(selectedGroup)

        mainCanvas.renderAll();
    }

    var sendSelectedObjectBackwards = function() {
        selectedObject = mainCanvas.getActiveObject(),
            selectedGroup = mainCanvas.getActiveGroup();
        if(selectedObject)
            mainCanvas.sendToBack(selectedObject);
        else if(selectedGroup)
            mainCanvas.sendToBack(selectedGroup)
        mainCanvas.renderAll();
    }

    var sendSelectedObjectbringForward = function() {
        selectedObject = mainCanvas.getActiveObject(),
            selectedGroup = mainCanvas.getActiveGroup();
        if(selectedObject)
            mainCanvas.bringToFront(selectedObject);
        else if(selectedGroup)
            mainCanvas.bringToFront(selectedGroup)

        mainCanvas.renderAll();
    }

//Let image to background

    document.getElementById('makeitbackground').addEventListener('click', function() {
        var cv1 = document.getElementById('canvas1');
        var cv2 = document.getElementById('canvas2');
        canvas1.setZoom(1);
        canvas1.setDimensions({
            width: cv1.width,
            height: cv1.height
        });
        canvas2.setZoom(1);
        canvas2.setDimensions({
            width: cv2.width,
            height: cv2.height
        });
        var object = mainCanvas.getActiveObject();
        var height = object.height;
        var width = object.width;
        if (mainCanvas.width / mainCanvas.height >= width / height) {
            object.set({'left':0, 'top':0});
            mainCanvas.setBackgroundImage(object, mainCanvas.renderAll.bind(mainCanvas), {
                scaleX: mainCanvas.width / object.width,
                scaleY: mainCanvas.width / object.width
            });
            mainCanvas.remove(object);
        }
        else {
            object.set({'left':0, 'top':0});
            mainCanvas.setBackgroundImage(object, mainCanvas.renderAll.bind(mainCanvas), {
                scaleX: mainCanvas.height / object.height,
                scaleY: mainCanvas.height / object.height
            });
            mainCanvas.remove(object);
        }
    });

// Lock & UnLock

    document.getElementById('lock').addEventListener('click', function() {
        var activeObject = mainCanvas.getActiveObject(),
            activeGroup = mainCanvas.getActiveGroup();
        if (activeObject) {
            activeObject.lockMovementX = true;
            activeObject.lockMovementY = true;
            activeObject.lockScalingX = true;
            activeObject.lockScalingY = true;
        }
        else if (activeGroup) {
            activeGroup.lockMovementX = true;
            activeGroup.lockMovementY = true;
            activeGroup.lockScalingX = true;
            activeGroup.lockScalingY = true;
        }
    });

    document.getElementById('unlock').addEventListener('click', function() {
        var object = mainCanvas.getActiveObject();
        object.lockMovementX = object.lockMovementY = false;
        object.lockScalingX = object.lockScalingY = false;
    });



//Hotkey
    document.onkeydown = function(e) {
        switch (e.keyCode) {

            case 46:  /* delete */
                removeObjects();
                break;
        }

        if (event.ctrlKey) {
            switch (e.keyCode) {

                case 71:  /* Ctrl - G */
                    groupObjects();

                case 68:  /* Ctrl - D */
                    cloneObjects();
                    e.preventDefault();
                    break;

            }
        }
    }

// Upload file Stuffs
    function uploadstuffs(e) {
        var fileType = e.target.files[0].type;
        var fd = new FormData();
        console.log(e.target.files[0]);
        fd.append( "upload_image", $('#photo_file')[0].files[0] );
        fd.append( "action", 'upload_img_wp');
        //Append here your necessary data
        $.ajax({
            type: 'POST',
            url: ajax_url,
            data: fd,
            processData: false,
            contentType: false,
            success: function(url, textStatus, XMLHttpRequest) {

                if (fileType === 'image/png') { //check if png
                    fabric.Image.fromURL(url, function(img) {
                        img.set({
                            width: mainCanvas.width/3,
                            height: img.height*((mainCanvas.width/3)/img.width)
                        });
                        mainCanvas.add(img);
                    });
                } else if (fileType === 'image/svg+xml') { //check if svg
                    fabric.loadSVGFromURL(url, function(objects, options) {
                        var svg = fabric.util.groupSVGElements(objects, options);
                        svg.scaleToWidth(180);
                        svg.scaleToHeight(180);
                        mainCanvas.add(svg);
                    });
                } else if (fileType === 'image/jpeg') { //check if png
                    fabric.Image.fromURL(url, function(img) {
                        img.set({
                            width: mainCanvas.width/3,
                            height: img.height*((mainCanvas.width/3)/img.width)
                        });
                        mainCanvas.add(img);
                    });
                }


            },
            error: function(MLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });

    }



    function download(url, name) {
        $('#downloader').attr({
            href: url,
            download: name
        })[0].click();
    }

    function save() {
        var c = document.getElementById('canvas2');
        var dataURL = c.toDataURL();
        var name = 'mat-truoc';
        download(dataURL, name + ".png");
        var c = document.getElementById('canvas1');
        var dataURL = c.toDataURL();
        var name = 'mat-sau';
        download(dataURL, name + ".png");
    }

    function removeObjects() {
        var activeObject = mainCanvas.getActiveObject(),
            activeGroup = mainCanvas.getActiveGroup();
        if (activeObject) {
            mainCanvas.remove(activeObject);
        }
        else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            mainCanvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
                mainCanvas.remove(object);
            });
        }
    }

    function groupObjects() {
        var activegroup = mainCanvas.getActiveGroup();
        var objectsInGroup = activegroup.getObjects();

        activegroup.clone(function(newgroup) {
            mainCanvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
                mainCanvas.remove(object);
            });
            mainCanvas.add(newgroup);

        });
    }

    function ungroupObjects(){
        var activeObject = mainCanvas.getActiveObject();
        if(activeObject.type=="group"){
            var items = activeObject._objects;
            activeObject._restoreObjectsState();
            mainCanvas.remove(activeObject);
            for(var i = 0; i < items.length; i++) {
                mainCanvas.add(items[i]);
                mainCanvas.item(mainCanvas.size()-1).hasControls = true;
                mainCanvas.setZoom(mainCanvas.getZoom() *0.99999);
            }

            mainCanvas.discardActiveGroup();
            mainCanvas.renderAll();
        }
    }

    function cloneObjects() {
        var activeObject = mainCanvas.getActiveObject(),
            activeGroup = mainCanvas.getActiveGroup();
        if (activeObject) {
            activeObject.clone(function (cloned) {
                mainCanvas.discardActiveObject();
                cloned.set({
                    top: cloned.top + 20,
                    evented: true
                });
                mainCanvas.add(cloned);
                mainCanvas.setActiveObject(cloned);
                mainCanvas.requestRenderAll();
            });
        }
        else if (activeGroup) {
            activeGroup.clone(function (cloned2) {
                mainCanvas.discardActiveGroup();
                cloned2.set({
                    top: cloned2.top + 20,
                    evented: true
                });
                mainCanvas.add(cloned2);
                mainCanvas.requestRenderAll();
            });
        }
    }


    jQuery(function($) {

        $viewText = document.querySelector("#viewText");
        canvas1 = new fabric.Canvas('canvas1', {
            preserveObjectStacking: true,
        });
        canvas1.accents = [];
        canvas1.mementoConfig = canvas1Config;
        canvas1.on('text:changed', optTextChanged);
        canvas1.on('selection:cleared', onCanvasSelected);
        canvas1.on('object:selected', onObjectSelected);
        canvas1.on('object:modified', function () { updateCanvasState(canvas1, canvas1Config); });
        canvas1.on('object:added', function (e) {
            if (!e.target.ignoreAddedEvent) {
                updateCanvasState(canvas1, canvas1Config);
            }
        });
        canvas2 = new fabric.Canvas('canvas2', {
            preserveObjectStacking: true,
        });
        canvas2.accents = [];
        canvas2.mementoConfig = canvas2Config;
        canvas2.on('text:changed', optTextChanged);
        canvas2.on('selection:cleared', onCanvasSelected);
        canvas2.on('object:selected', onObjectSelected);
        canvas2.on('object:modified', function() { updateCanvasState(canvas2, canvas2Config); });
        canvas2.on('object:added', function(e) {
            if (!e.target.ignoreAddedEvent) {
                updateCanvasState(canvas2, canvas2Config);
            }
        });

        canvas_image = new fabric.Canvas('canvas_image', {
            preserveObjectStacking: true,
        });
        canvas_image.accents = [];
        canvas_image.mementoConfig = canvas2Config;
        canvas_image.on('text:changed', optTextChanged);
        canvas_image.on('selection:cleared', onCanvasSelected);
        canvas_image.on('object:selected', onObjectSelected);
        canvas_image.on('object:modified', function() { updateCanvasState(canvas_image, canvas2Config); });
        canvas_image.on('object:added', function(e) {
            if (!e.target.ignoreAddedEvent) {
                updateCanvasState(canvas_image, canvas2Config);
            }
        });
        changeView(1);

//Redo Undo
        $('#undo').click(function(undo) {
            console.log(mainCanvas.mementoConfig);
            if(mainCanvas.mementoConfig.undoFinishedStatus){
                if(mainCanvas.mementoConfig.currentStateIndex === -1){
                    mainCanvas.mementoConfig.undoStatus = false;
                }
                else{
                    if (mainCanvas.mementoConfig.canvasState.length >= 1) {
                        mainCanvas.mementoConfig.undoFinishedStatus = 0;
                        if(mainCanvas.mementoConfig.currentStateIndex != 0){
                            mainCanvas.mementoConfig.undoStatus = true;
                            loadJsonIntoCanvas(JSON.parse(mainCanvas.mementoConfig.canvasState[mainCanvas.mementoConfig.currentStateIndex-1]).objects, mainCanvas, true);
                            mainCanvas.mementoConfig.undoStatus = false;
                            console.log(mainCanvas.mementoConfig.currentStateIndex);
                            mainCanvas.mementoConfig.currentStateIndex -= 1;
                            console.log(mainCanvas.mementoConfig.currentStateIndex);
                            $('#undo').prop('disabled', false);
                            if(mainCanvas.mementoConfig.currentStateIndex !== mainCanvas.mementoConfig.canvasState.length-1){
                                $('#redo').prop('disabled', false);
                            }
                            mainCanvas.mementoConfig.undoFinishedStatus = 1;
                        }
                        else if(mainCanvas.mementoConfig.currentStateIndex === 0){
                            mainCanvas.clear();
                            mainCanvas.mementoConfig.undoFinishedStatus = 1;
                            $('#undo').prop('disabled', true);
                            $('#redo').prop('disabled', false);
                            mainCanvas.mementoConfig.currentStateIndex -= 1;
                        }
                    }
                }
            }
        });

        $('#redo').click(function(redo) {
            if(mainCanvas.mementoConfig.redoFinishedStatus){
                if((mainCanvas.mementoConfig.currentStateIndex === mainCanvas.mementoConfig.canvasState.length-1) && mainCanvas.mementoConfig.currentStateIndex != -1){
                    $('#redo').prop('disabled', true);
                }else{
                    if (mainCanvas.mementoConfig.canvasState.length > mainCanvas.mementoConfig.currentStateIndex && mainCanvas.mementoConfig.canvasState.length != 0){
                        mainCanvas.mementoConfig.redoFinishedStatus = 0;
                        mainCanvas.mementoConfig.redoStatus = true;
                        console.log(mainCanvas.mementoConfig.canvasState[mainCanvas.mementoConfig.currentStateIndex+1]);
                        console.log(JSON.parse(mainCanvas.mementoConfig.canvasState[mainCanvas.mementoConfig.currentStateIndex+1]).objects);
                        console.log('hmmm');
                        loadJsonIntoCanvas(JSON.parse(mainCanvas.mementoConfig.canvasState[mainCanvas.mementoConfig.currentStateIndex+1]).objects, mainCanvas, true);
                        console.log('ahh');
                        mainCanvas.mementoConfig.redoStatus = false;
                        mainCanvas.mementoConfig.currentStateIndex += 1;
                        if(mainCanvas.mementoConfig.currentStateIndex != -1){
                            $('#undo').prop('disabled', false);
                        }
                        mainCanvas.mementoConfig.redoFinishedStatus = 1;
                        if((mainCanvas.mementoConfig.currentStateIndex === mainCanvas.mementoConfig.canvasState.length-1) && mainCanvas.mementoConfig.currentStateIndex != -1){
                            $('#redo').prop('disabled', true);
                        }
                    }
                }
            }
        });


//Zoom Control
        $("#zoomin").click(zoomin);
        function zoomin() {
            canvas1.setZoom(canvas1.getZoom() *1.1);
            canvas1.setDimensions({
                width: canvas1.width * 1.1,
                height: canvas1.height * 1.1
            });
            canvas2.setZoom(canvas2.getZoom() *1.1);
            canvas2.setDimensions({
                width: canvas2.width * 1.1,
                height: canvas2.height * 1.1
            });
        };

        $("#zoomout").click(zoomout);


        //Add Text
                $("#addtext").on("click", function(e) {
                    text = new fabric.IText("Text", {
                        id: "cardalltexthex",
                        fontSize: 32,
                        selectable: true,
                        left: 400,
                        top: 100,
                        text: "Add A New Short Text",
                        fill: '#333',
                        opacity :1,
                        lineHeight: 1,
                        textAlign: 'center',
                        originY: 'center',
                        originX: 'center',
                        lockUniScaling: false,
                        fontFamily: 'Anton'
                    });
                    mainCanvas.add(text);
                });

                $("#addtextbox").on("click", function(e) {
                    var t1 = new fabric.Textbox('Add A New\nLong Text', {
                        fill: '#666',
                        width: 350,
                        selectable: true,
                        left: 400,
                        top: 100,
                        fontSize: 42,
                        textAlign: 'center',
                        originY: 'center',
                        originX: 'center',
                        fixedWidth: 350,
                        lockUniScaling: false,
                        fontFamily: 'Open Sans',
                    });

                    mainCanvas.add(t1);
                });

        //Delect Objects
        $("#remove").click(removeObjects);

//Group object
        $("#group").click(groupObjects);

//Unroup object
        $("#ungroup").click(ungroupObjects);


// Clone object
        $("#clone").click(cloneObjects);


//* Align Objects
        $('.alignment').click(function() {
            var cur_value = $(this).attr('data-action');
            var activeObj = mainCanvas.getActiveObject() || mainCanvas.getActiveGroup();
            if (cur_value != '' && activeObj) {
                process_align(cur_value, activeObj);
                activeObj.setCoords();
                mainCanvas.renderAll();
            } else {
                alert('Please select a item');
                return false;
            }
        });


//Create Mask

        $("#createmark").click(function () {
            var activegroup = mainCanvas.getActiveGroup();
            var objectsInGroup = activegroup.getObjects();
            objectsInGroup.forEach(function(object) {
                if ( object.isType('circle')){
                    mainCanvas.bringToFront(object);
                    object.globalCompositeOperation = 'destination-atop';
                }
                else if ( object.isType('rect')){
                    mainCanvas.bringToFront(object);
                    object.globalCompositeOperation = 'destination-atop';
                }
            });
            activegroup.clone(function(newgroup) {
                mainCanvas.discardActiveGroup();
                objectsInGroup.forEach(function(object) {
                    mainCanvas.remove(object);
                });
                mainCanvas.add(newgroup);
                mainCanvas.renderAll();
            });
        });

// canvas2json
        $("#canvas2json").click(function() {
            var json = {};
            json.c1 = canvas1.toJSON(['selectable', 'id']);
            json.c2 = canvas2.toJSON(['selectable', 'id']);
            $("#myTextArea").text(JSON.stringify(json));
            var a = document.createElement("a");
            var file = new Blob([JSON.stringify(json)], {
                type: 'text/plain'
            });
            var url = URL.createObjectURL(file);
            var name = 'json.txt';
            download(url, name);
        });

// Save as image

        $("#download").click(save);

    });

function search_template(event,slug='/products',query='&search=') {
    let s = $(event).val();
    if(s)query = query+s;
    let post_id = $(event).data('id');
    let div  = document.querySelector('#template .sidebarpost');
    var settings = {
        "url": setting.URL_API+slug+"?license_key="+setting.K_API+query,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json",
        },
    };

    $.ajax(settings).done(function (response) {
        setup_list_item_product(response,'#template .sidebarpost','select_template');
    });
}

//Load JSON
function select_template(event){
let product = $(event).data('product');
let slug = (product=='user')?'/user/products':'/products';
load_json( $(event).attr('data-id'),slug ).then(Datajson=>{
    $('.form_add_new_product [name="product_name"]').val(Datajson.result.name);
    Datajson=JSON.parse(Datajson.result.data);
    console.log(Datajson);
    setting.json_active = setting.json_download = Datajson
    let Datawidth = Datajson.width;
    let DataHeight = Datajson.height;
    back_step('.display-products','#card-design-online');
    document.querySelector('#canvas1').setAttribute('width',Datawidth);
    document.querySelector('#canvas2').setAttribute('width',Datawidth);
    document.querySelector('#canvas1').setAttribute('height',DataHeight);
    document.querySelector('#canvas2').setAttribute('height',DataHeight);
    document.querySelector('#templatemessage').setAttribute('data-id', $(event).attr('data-id') );
    var dataToLoad = Datajson;
    canvas1.loadFromJSON(
        dataToLoad.c1,
        canvas1.renderAll.bind(canvas1),
    );
    canvas2.loadFromJSON(
        dataToLoad.c2,
        canvas2.renderAll.bind(canvas2),
    );
    canvas1.setZoom(canvas1.getZoom() * 1);
    canvas2.setZoom(canvas2.getZoom() * 1);
    var originalWidth = Datajson.width;
    var originalHeight = Datajson.height;
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.Height;
    var widthRatio = width / originalWidth;
    var heightRatio = height / originalHeight;
    if (screen.width < 700) {
    canvas1.setZoom(canvas1.getZoom() * widthRatio * 0.9);
    canvas1.setDimensions({
    width: canvas1.width * widthRatio * 0.9,
    height: canvas1.height * widthRatio * 0.9,
    });
    canvas2.setZoom(canvas2.getZoom() * widthRatio * 0.9);
    canvas2.setDimensions({
    width: canvas2.width * widthRatio * 0.9,
    height: canvas2.height * widthRatio * 0.9,
    });
    }

    else {
    if (originalWidth > originalHeight) {
    canvas1.setZoom(canvas1.getZoom() * widthRatio * 0.6);
    canvas1.setDimensions({
    width: originalWidth * widthRatio * 0.6,
    height: originalHeight * widthRatio * 0.6,
    });
    canvas2.setZoom(canvas2.getZoom() * widthRatio * 0.6);
    canvas2.setDimensions({
    width: originalWidth * widthRatio * 0.6,
    height: originalHeight * widthRatio * 0.6,
    });
    }
    else {
    canvas1.setZoom(canvas1.getZoom() * heightRatio * 0.8);
    canvas1.setDimensions({
    width: originalWidth * heightRatio * 0.8,
    height: originalHeight * heightRatio * 0.8,
    });
    canvas2.setZoom(canvas2.getZoom() * heightRatio * 0.8);
    canvas2.setDimensions({
    width: originalWidth * heightRatio * 0.8,
    height: originalHeight * heightRatio * 0.8,
    });
    }
    }
    $(".overlayeditcanvas").hide(200);
    $(".general-function, a.continue_template").show(200);
    $(".tools").show(200);
    $('#templatemessage').keyup();
    setup_json(Datajson);
});
if(product == 'demo'){
    $('.save_product_c').hide();
}else {
    $('.save_product_c').show();
}
}
async function load_json(id,slug='/products'){
var settings = {
    "url": setting.URL_API+slug+'/'+id+'/detail?license_key='+setting.K_API,
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Accept": "application/json",
    },
};
return $.ajax(settings).done(function (response) {});
}

function open_form_save(){
    var dataToLoad = { c1:canvas1.toJSON(),c2:canvas2.toJSON()} ;
    setting.json_active.c1 = canvas1.toJSON();
    setting.json_active.c2 = canvas2.toJSON();
    upload_img(dataToLoad);
    $('.overUpdateProduct').show(300);
    $('.form_add_new_product img').attr('src',canvas_image.toDataURL());
    $('.form_add_new_product button').attr('onclick','save_canvas()');
}

 async function save_canvas(){
        var dataToLoad = { c1:canvas1.toJSON(),c2:canvas2.toJSON()} ;
        setting.json_active.c1 = canvas1.toJSON();
        setting.json_active.c2 = canvas2.toJSON();
     var file = dataURLtoFile( canvas_image.toDataURL() );
     var name = $('.form_add_new_product [name="product_name"]').val();
     var id = $('#templatemessage').attr('data-id');
        var form = new FormData();
        form.append("cover_image", file, generate_token(45)+'.jpg');
        form.append("name", name);
        form.append("data", JSON.stringify(setting.json_active));
     form.append("license_key", setting.K_API);

     var settings = {
         "url": setting.URL_API+"/user/products/"+id+"/update",
         "method": "POST",
         "timeout": 0,
         "headers": {
             "Accept": "application/json",
         },
         "processData": false,
         "mimeType": "multipart/form-data",
         "contentType": false,
         "data": form
     };

     $.ajax(settings).done(function (response) {
         console.log(response);
         Swal.fire({
             position: 'top-end',
             icon: 'success',
             title: 'Your work has been saved',
             showConfirmButton: false,
             timer: 1500
         });
         back_step('.overUpdateProduct','#card-design-online');
     });
}
async function add_canvas(){
    var dataToLoad = { c1:canvas1.toJSON(),c2:canvas2.toJSON()} ;
    setting.json_active.c1 = canvas1.toJSON();
    setting.json_active.c2 = canvas2.toJSON();
    upload_img(dataToLoad);
    $('.form_add_new_product img').attr('src',canvas_image.toDataURL());
    $('.overUpdateProduct').show(300);
    $('.form_add_new_product button').attr('onclick','create_product()');
 }
async function upload_img(dataToLoad){
    var pause = 0;
    dataToLoad.c2.objects.forEach(el=>{
        if(el.type =='image' && !isBase64(el.src)){
            pause++;
            getBase64FromUrl(el.src).then(base=>{
                el.src = base;
                upload_img(dataToLoad );
            })

        }

        /// for groups svg
        if(el.type == 'group'){
            el.objects.forEach(elg=>{
                if(elg.type =='image' && !isBase64(elg.src)){
                    pause++;
                    getBase64FromUrl(elg.src).then(base=>{
                        elg.src = base;
                        upload_img(dataToLoad );
                    })

                }
            })

        }


    });
/// for background image
    if(dataToLoad.c2.backgroundImage){
        if(dataToLoad.c2.backgroundImage.type == 'image' && !isBase64(dataToLoad.c2.backgroundImage.src)){
            pause++;
            getBase64FromUrl(dataToLoad.c2.backgroundImage.src).then(base=>{
                dataToLoad.c2.backgroundImage.src = base;
                upload_img(dataToLoad );
            })
        }
    }

        /// for background image 2
    if(dataToLoad.c2.background){
        if(dataToLoad.c2.background.type == 'pattern' && !isBase64(dataToLoad.c2.background.source)){
            pause++;
            getBase64FromUrl(dataToLoad.c2.background.source).then(base=>{
                dataToLoad.c2.background.source = base;
                upload_img(dataToLoad );
            })
        }
    }


    if(pause < 1){
        canvas_image.loadFromJSON(
            dataToLoad.c2,
            canvas_image.renderAll.bind(canvas_image),
            function(o, object) {
           // fabric.log(o, object);
                 $('.form_add_new_product img').attr('src',canvas_image.toDataURL());
                return true;
        });


    }
    return false;
}

function getBase64FromUrl(url){
 return fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
         return  reader.readAsDataURL(blob)
        }));
}


function show_image_upsplash(link){
    fabric.Image.fromURL(link, function(oImg) {
        oImg.set({'left':10});
        oImg.set({'top':10});
        oImg.set({'height':oImg.height/2.5*(mainCanvas.width/oImg.width)});
        oImg.set({'width':oImg.width/2.5*(mainCanvas.width/oImg.width)});
        mainCanvas.add(oImg);
    });
}

/// set background color solid
function setBackgroundSolid(event){
    let color = $(event).data('color');
    mainCanvas.backgroundImage = 0;
    mainCanvas.setBackgroundColor(color, mainCanvas.renderAll.bind(mainCanvas));
}
    /// set background color Gradient
function setBackgroundGradient(event){
    var data_img = $(event).data('color');
    fabric.Image.fromURL(data_img, function (img) {
        if (mainCanvas.width < mainCanvas.height ||  img.width > img.height) {
            mainCanvas.setBackgroundImage(img, mainCanvas.renderAll.bind(mainCanvas), {scaleX: img.height/mainCanvas.height,scaleY: img.height/mainCanvas.height});
        }else {
            mainCanvas.setBackgroundImage(img, mainCanvas.renderAll.bind(mainCanvas), {scaleX: mainCanvas.height / img.height,scaleY: mainCanvas.height / img.height});
        }});
    mainCanvas.renderAll();
}
function setBackgroundRepeat(event){
        var src = $(event).data('color');
        mainCanvas.backgroundImage = 0;
        mainCanvas.setBackgroundColor({source: src, repeat: "repeat"}, function () {mainCanvas.renderAll();
        });
}

function setBackgroundNormal(event){
    var data_img = $(event).data('color');
    fabric.Image.fromURL(data_img, function (img) {
        if (mainCanvas.width < mainCanvas.height ||  img.width > img.height) {
            mainCanvas.setBackgroundImage(img, mainCanvas.renderAll.bind(mainCanvas), {scaleX: img.height/mainCanvas.height,scaleY: img.height/mainCanvas.height});
        }else {
            mainCanvas.setBackgroundImage(img, mainCanvas.renderAll.bind(mainCanvas), {scaleX: mainCanvas.height / img.height,scaleY: mainCanvas.height / img.height});
        }});
        mainCanvas.renderAll();
}


function generate_token(length){
        //edit the token allowed characters
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
}

// add element to canvas
function add_element_detail(event){
    let image = $(event).data('image');
    fabric.loadSVGFromURL(image, function(objects, options) {
        if(objects.length < 4){
            objects.forEach(function(svg) {
                svg.set({'active':true,});
                mainCanvas.add(svg).renderAll();
            });
        }else{
            var obj = fabric.util.groupSVGElements(objects, options);
            obj.set({left:10,top:10,'active':true});
            mainCanvas.add(obj);
        }

    });
}
/// add text detail
function add_text_detail(event){
    let image = $(event).data('image');
    fabric.loadSVGFromURL(image, function(objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        obj.set({left:10,top:10,'active':true});mainCanvas.add(obj);
    });
}


// load data json
function load_item_json(event){
    var json_data = $(event).data('json');
    fabric.util.enlivenObjects(json_data.objects, function(objects) {
        mainCanvas.add(...objects);
    });
}

/// set up json canvas 3
function setup_json(Datajson){
            let Datawidth = Datajson.width;
            let DataHeight = Datajson.height;
            var dataToLoad = Datajson;
            upload_img(dataToLoad)
            canvas_image.setZoom(canvas_image.getZoom() * 1);
            var originalWidth = 800;
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            var widthRatio = width / originalWidth;
            if (screen.width < 700) {
                canvas_image.setZoom(widthRatio * 0.9);
                canvas_image.setDimensions({
                    width: Datawidth * widthRatio * 0.9,
                    height: DataHeight * widthRatio * 0.9,
                });
            }
            else if (screen.width >= 700 && screen.width < 1024) {
                canvas_image.setZoom(0.6);
                canvas_image.setDimensions({
                    width: Datawidth * 0.6,
                    height: DataHeight * 0.6,
                });
            }
            else {
                canvas_image.setZoom(0.7);
                canvas_image.setDimensions({
                    width: Datawidth * 0.7,
                    height: DataHeight * 0.7,
                });
            }
            return canvas_image;

    }

// convert base64 to  file
function dataURLtoFile(dataurl, filename='product_image_default') {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type:mime});
    }
//// URL get to array
function getUrlParameter(sParam,url) {
        var sPageURL =decodeURIComponent(url);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

function changeBackgroundSolid(event){
    let v=  $(event).val();
    $(event).prev().data('color',v).css({'background-color':'#ffffff'});
    $(event).prev().data('color',v).text(v).click();
}
// check base64
function isBase64(str) {
        let check = str.slice(0,4);
        if(check == 'data')return true;
        return false;
    }

/// user create product
function create_product(event){
    var form = new FormData();
    var file = dataURLtoFile( canvas_image.toDataURL() );
    var name = $('.form_add_new_product [name="product_name"]').val();
    form.append("cover_image", file, 'immage_product_canvas.jpg');
    form.append("name", name);
    form.append("data", JSON.stringify(setting.json_active));
    form.append("license_key", setting.K_API);
    var settings = {
        "url": setting.URL_API+"/user/products",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Accept": "application/json",
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        });
        back_step('.overUpdateProduct','#card-design-online');
    });
}

/// function get producr for user and demo product
function click_get_products(event){
    let product = $(event).data('product');
    let slug = $(event).data('slug');
    let insert = document.querySelector( $(event).data('insert') );
    insert.innerHTML= '';
    $('.control_main > a').removeClass('active');
    $(event).addClass('active');
    var settings = {
        "url": setting.URL_API+slug+"?license_key="+setting.K_API,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json",
        },
    };

    $.ajax(settings).done(function (response) {
        let div = document.createElement('div');
        let a  = document.createElement('a');
        div.className = 'brick add-new-product';
        a.className = 'btn-load';
        a.innerHTML = 'Add New';
        a.setAttribute('onclick','load_template_data_product()');
        a.setAttribute('data-product','demo');
        div.appendChild(a);
        insert.appendChild(div);
        if(response){
            response.result.forEach(el=>{
                let div = document.createElement('div');
                let a = document.createElement('a');
                let img = document.createElement('img');
                if(product == 'user'){
                    let close = document.createElement('span');
                    close.className = 'delete-product far fa-times-circle';
                    close.setAttribute('data-id',el.id);
                    close.setAttribute('onclick','delete_template(this)');
                    div.appendChild(close);
                    $('.filter_categories').addClass('k-none');
                }
                div.className = 'brick';
                div.setAttribute('product_category_id',el.product_category_id)
                a.setAttribute('data-product',product);
                a.setAttribute('data-id',el.id);
                a.setAttribute('onclick','select_template(this)');
                img.src = response.image_server_url+'/'+el.cover_image;
                a.appendChild(img);
                div.appendChild(a);
                insert.appendChild(div);
            });
            if(product == 'demo'){
            $('.filter_categories').removeClass('k-none');
            }
        }
    });
}

function insert_canvas(event){
        $('.insert_media_product i').show();
        var dataToLoad = { c1:canvas1.toJSON(),c2:canvas2.toJSON()} ;
        setting.json_active.c1 = canvas1.toJSON();
        setting.json_active.c2 = canvas2.toJSON();
        upload_img(dataToLoad);
        setTimeout(function(){
            $('.insert_media_product i').hide();
            let div = document.querySelector('#TB_closeWindowButton');
            if(div){
              //  var dataURL = canvas_image.toDataURL();
                var form = new FormData();
                var file = dataURLtoFile( canvas_image.toDataURL() );
                form.append("upload_image", file, 'immage_product_canvas.jpg');
                form.append("action", 'upload_img_wp');
                var settings = {
                    "url": ajax_url,
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Accept": "application/json",
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };

                $.ajax(settings).done(function (response) {
                   // var i = document.querySelector('#add-design-editor').getAttribute('data-number');
                   // var myContent = tinymce.editors[i].getContent();
                    var img = document.createElement('img');
                    img.src = response;
                   // tinymce.editors[i].execCommand('mceInsertContent', true, img.outerHTML);
                  // /  console.log(myContent);
                  // / tinymce.editors[i].setContent(myContent+img.outerHTML);
                    wp.media.editor.insert(img.outerHTML );
                    $('#TB_closeWindowButton').click();
                });
            }else{
                $('#CloseCard button').click();
            }
        },2000);
    }

    /// use for web
function load_template_data_product(Data=''){
        var Datajson = {"width":800,"height":1120,"c1":{"objects":[]},"c2":{"objects":[],"background":"transparent"}};
        console.log(Datajson);
        let Datawidth = Datajson.width;
        let DataHeight = Datajson.height;
         setting.json_active = setting.json_download = Datajson;
        back_step('.display-products','#card-design-online');
        document.querySelector('#canvas1').setAttribute('width',Datawidth);
        document.querySelector('#canvas2').setAttribute('width',Datawidth);
        document.querySelector('#canvas1').setAttribute('height',DataHeight);
        document.querySelector('#canvas2').setAttribute('height',DataHeight);
        document.querySelector('#templatemessage').setAttribute('data-id', $(event).attr('data-id') );
        var dataToLoad = Datajson;
        canvas1.loadFromJSON(
            dataToLoad.c1,
            canvas1.renderAll.bind(canvas1),
        );
        canvas2.loadFromJSON(
            dataToLoad.c2,
            canvas2.renderAll.bind(canvas2),
        );
        canvas1.setZoom(canvas1.getZoom() * 1);
        canvas2.setZoom(canvas2.getZoom() * 1);
        var originalWidth = 800;
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var widthRatio = width / originalWidth;
        if (screen.width < 700) {
            canvas1.setZoom(widthRatio * 0.9);
            canvas1.setDimensions({
                width: Datawidth * widthRatio * 0.9,
                height: DataHeight * widthRatio * 0.9,
            });
            canvas2.setZoom(widthRatio * 0.9);
            canvas2.setDimensions({
                width: Datawidth * widthRatio * 0.9,
                height: DataHeight * widthRatio * 0.9,
            });
        }
        else if (screen.width >= 700 && screen.width < 1024) {
            canvas1.setZoom(0.6);
            canvas1.setDimensions({
                width: Datawidth * 0.6,
                height: DataHeight * 0.6,
            });
            canvas2.setZoom(0.6);
            canvas2.setDimensions({
                width: Datawidth * 0.6,
                height: DataHeight * 0.6,
            });
        }
        else {
            canvas1.setZoom(0.7);
            canvas1.setDimensions({
                width: Datawidth * 0.7,
                height: DataHeight * 0.7,
            });
            canvas2.setZoom(0.7);
            canvas2.setDimensions({
                width: Datawidth * 0.7,
                height: DataHeight * 0.7,
            });
        }
        $(".overlayeditcanvas,.save_product_c").hide(200);
        $(".general-function, a.continue_template").show(200);
        $(".tools").show(200);
        $('#templatemessage').keyup();
        setup_json(Datajson);
    }

    /// delete product template
function delete_template(event){
    let id = $(event).attr('data-id');
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
        var settings = {
            "url": setting.URL_API+"/user/products/"+id+"/delete?license_key="+setting.K_API,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Accept": "application/json",
            },
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            );
            $(event).parent().remove();
        });
        }
    })
}
/// edit resize
function edit_resize(){
    setting.json_active.width =  $('#canvaswidth').val();
    setting.json_active.height =  $('#canvasheight').val();
    $('.overlayresize').hide(200);
}

function refresh_img(){
    $('.form_add_new_product img').attr('src',canvas_image.toDataURL());
}

function download_canvas(event){
    var dataToLoad = { c1:canvas1.toJSON(),c2:canvas2.toJSON()} ;
    setting.json_active.c1 = canvas1.toJSON();
    setting.json_active.c2 = canvas2.toJSON();
    upload_img(dataToLoad);
    $('.download_images > i').show(100);
    setTimeout(function(){
        var dataURL = canvas_image.toDataURL();
        var name = 'mat-truoc';
        download(dataURL, name + ".png");
        var c = document.getElementById('canvas1');
        var dataURL = c.toDataURL();
        var name = 'mat-sau';
        download(dataURL, name + ".png");
        $('.download_images > i').hide();
    },2000);

}
function show_upgrade(){
    $('.overUpgradeAccount').show(300);
}

    // General Color
function changeColorSolid(event){
        var color = $(event).val();
        $(event).prev().text(color);
        var activeObject = mainCanvas.getActiveObject(),
            activeGroup = mainCanvas.getActiveGroup();
        if (activeObject) {
            activeObject.setFill(color);
            mainCanvas.renderAll();
        } else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();

            objectsInGroup.forEach(function (object) {
                object.setFill(color);
                mainCanvas.renderAll();
            });
        }
    }
//how to add custom button in tinymce wp gutenberg
//https://1stwebdesigner.com/how-to-add-custom-buttons-to-the-wordpress-tinymce-editor/

    function setColorsolid(event){
       var color = $(event).attr('data-color');
        var activeObject = mainCanvas.getActiveObject(),
            activeGroup = mainCanvas.getActiveGroup();
        if (activeObject) {
            activeObject.setFill(color);
            mainCanvas.renderAll();
        } else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();

            objectsInGroup.forEach(function (object) {
                object.setFill(color);
                mainCanvas.renderAll();
            });
        }
    }
