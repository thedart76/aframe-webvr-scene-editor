var selectedPrimitive = 'box';
var selectedColor = '#FFFFFF';
var toDelete = 0;
var primitives = 1;

var incrementPositionX = 0;
var incrementPositionY = 0.5;
var incrementPositionZ = 0;

var incrementScaleX = 1;
var incrementScaleY = 1;
var incrementScaleZ = 1;

var incrementRotationX = 0;
var incrementRotationY = 0;
var incrementRotationZ = 0;

var incrementUIRotation = 0;

AFRAME.registerComponent('visual-feedback', {
	schema: {
        colorHover: {type: 'color', default: '#FF0099'}
    },
    
    init: function () {
		var el = this.el;
		var data = this.data;
		var colorDefault = el.getAttribute('material').color;

        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', data.colorHover);
        });
        
        el.addEventListener('mouseleave', function () {
            el.setAttribute('material', 'color', colorDefault);
        });
	}
});

AFRAME.registerComponent('default-primitive', {	
	init: function () {
		var webvrDisplay = document.querySelector('#webvr-display');
		
		webvrDisplay.setAttribute('text', {
            value: '<a-' + selectedPrimitive + ' color="' + selectedColor + '">\n</a-' + selectedPrimitive + '>'});
    }
});

AFRAME.registerComponent('transform-position', {
	schema: {
		axis: {type: 'string'},
		direction: {type: 'string'},
		value: {type: 'number', default: 0.1}
	},
	
	init: function () {
		var el = this.el;
		var data = this.data;
        var transformPositionHovered = false;
        var positionXValue = document.querySelector('#position-x-value');
        var positionYValue = document.querySelector('#position-y-value');
        var positionZValue = document.querySelector('#position-z-value');
        
        positionXValue.setAttribute('text', {value: incrementPositionX});
        positionYValue.setAttribute('text', {value: incrementPositionY});
        positionZValue.setAttribute('text', {value: incrementPositionZ});
        
        el.addEventListener('mouseenter', function () {
			transformPositionHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			transformPositionHovered = false;
		});
		
		document.body.addEventListener('triggerdown', function () {
            if (transformPositionHovered) {
                var grabLastCreated = document.querySelector('#entity' + (toDelete - 1));
                
                if (toDelete > 0 && data.axis === 'x') {
                    
                    if (data.direction === 'positive') {
                        incrementPositionX += parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.position.x = incrementPositionX;
                    } else if (data.direction === 'negative') {
                        incrementPositionX -= parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.position.x = incrementPositionX;
                    }
                    
                    positionXValue.setAttribute('text', {
                        value: parseFloat(incrementPositionX.toFixed(2))
                    });
                }

                if (toDelete > 0 && data.axis === 'y') {
                    if (data.direction === 'positive') {
                        incrementPositionY += parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.position.y = incrementPositionY;
                    } else if (data.direction === 'negative') {
                        incrementPositionY -= parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.position.y = incrementPositionY;
                    }
                    
                    positionYValue.setAttribute('text', {
                        value: parseFloat(incrementPositionY.toFixed(2))
                    });
                }

                if (toDelete > 0 && data.axis === 'z') {
                    if (data.direction === 'positive') {
                        incrementPositionZ += parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.position.z = incrementPositionZ;
                    } else if (data.direction === 'negative') {
                        incrementPositionZ -= parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.position.z = incrementPositionZ;
                    }
                    
                    positionZValue.setAttribute('text', {
                        value: parseFloat(incrementPositionZ.toFixed(2))
                    });
                }
            }
		});
	}
});

AFRAME.registerComponent('transform-rotation', {
	schema: {
		axis: {type: 'string'},
		direction: {type: 'string'},
		value: {type: 'number', default: 15}
	},
	
	init: function () {
		var el = this.el;
		var data = this.data;
        var transformRotationHovered = false;
        var rotationXValue = document.querySelector('#rotation-x-value');
        var rotationYValue = document.querySelector('#rotation-y-value');
        var rotationZValue = document.querySelector('#rotation-z-value');
        
        rotationXValue.setAttribute('text', {value: incrementRotationX});
        rotationYValue.setAttribute('text', {value: incrementRotationY});
        rotationZValue.setAttribute('text', {value: incrementRotationZ});
        
        el.addEventListener('mouseenter', function () {
			transformRotationHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			transformRotationHovered = false;
		});
		
		document.body.addEventListener('triggerdown', function () {
            if (transformRotationHovered) {
                var grabLastCreated = document.querySelector('#entity' + (toDelete - 1));
                if (toDelete > 0 && data.axis === 'x') {
                    if (data.direction === 'positive') {
                        incrementRotationX += data.value;
                        grabLastCreated.object3D.rotation.x = (Math.PI / 180) * incrementRotationX;
                    } else if (data.direction === 'negative') {
                        incrementRotationX -= data.value;
                        grabLastCreated.object3D.rotation.x = (Math.PI / 180) * incrementRotationX;
                    }
                    
                    rotationXValue.setAttribute('text', {value: incrementRotationX});
                }

                if (toDelete > 0 && data.axis === 'y') {
                    if (data.direction === 'positive') {
                        incrementRotationY += data.value;
                        grabLastCreated.object3D.rotation.y = (Math.PI / 180) * incrementRotationY;
                    } else if (data.direction === 'negative') {
                        incrementRotationY -= data.value;
                        grabLastCreated.object3D.rotation.y = (Math.PI / 180) * incrementRotationY;
                    }
                    
                    rotationYValue.setAttribute('text', {value: incrementRotationY});
                }

                if (toDelete > 0 && data.axis === 'z') {
                    if (data.direction === 'positive') {
                        incrementRotationZ += data.value;
                        grabLastCreated.object3D.rotation.z = (Math.PI / 180) * incrementRotationZ;
                    } else if (data.direction === 'negative') {
                        incrementRotationZ -= data.value;
                        grabLastCreated.object3D.rotation.z = (Math.PI / 180) * incrementRotationZ;
                    }
                    
                    rotationZValue.setAttribute('text', {value: incrementRotationZ});
                }
            }
		});
	}
});

AFRAME.registerComponent('transform-scale', {
	schema: {
		axis: {type: 'string'},
		direction: {type: 'string'},
		value: {type: 'number', default: 1}
	},
	
	init: function () {
		var el = this.el;
		var data = this.data;
        var transformScaleHovered = false;
        var scaleXValue = document.querySelector('#scale-x-value');
        var scaleYValue = document.querySelector('#scale-y-value');
        var scaleZValue = document.querySelector('#scale-z-value');
        
        scaleXValue.setAttribute('text', {value: incrementScaleX});
        scaleYValue.setAttribute('text', {value: incrementScaleY});
        scaleZValue.setAttribute('text', {value: incrementScaleZ});
        
        el.addEventListener('mouseenter', function () {
			transformScaleHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			transformScaleHovered = false;
		});
		
		document.body.addEventListener('triggerdown', function () {
            if (transformScaleHovered) {
                var grabLastCreated = document.querySelector('#entity' + (toDelete - 1));
                if (toDelete > 0 && data.axis === 'x') {
                    if (data.direction === 'positive') {
                        incrementScaleX += parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.scale.x = incrementScaleX;
                    } else if (data.direction === 'negative') {
                        incrementScaleX -= parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.scale.x = incrementScaleX;
                    }
                    
                    scaleXValue.setAttribute('text', {
                        value: parseFloat(incrementScaleX.toFixed(2))
                    });
                }

                if (toDelete > 0 && data.axis === 'y') {
                    if (data.direction === 'positive') {
                        incrementScaleY += parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.scale.y = incrementScaleY;
                    } else if (data.direction === 'negative') {
                        incrementScaleY -= parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.scale.y = incrementScaleY;
                    }
                    
                    scaleYValue.setAttribute('text', {
                        value: parseFloat(incrementScaleY.toFixed(2))
                    });
                }

                if (toDelete > 0 && data.axis === 'z') {
                    if (data.direction === 'positive') {
                        incrementScaleZ += parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.scale.z = incrementScaleZ;
                    } else if (data.direction === 'negative') {
                        incrementScaleZ -= parseFloat(data.value.toFixed(2));
                        grabLastCreated.object3D.scale.z = incrementScaleZ;
                    }
                    
                    scaleZValue.setAttribute('text', {
                        value: parseFloat(incrementScaleZ.toFixed(2))
                    });
                }
            }
		});
	}
});

AFRAME.registerComponent('rotate-ui', {
	schema: {
		direction: {type: 'string'},
		value: {type: 'number', default: 22.5}
	},
	
	init: function () {
		var el = this.el;
		var data = this.data;
        var rotateUIHovered = false;
        
        el.addEventListener('mouseenter', function () {
			rotateUIHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			rotateUIHovered = false;
		});
		
		document.body.addEventListener('triggerdown', function () {
            if (rotateUIHovered) {
                var mainWrapper = document.querySelector('#main-wrapper');
                if (data.direction === 'ccw') {
                    incrementUIRotation += data.value;
                    mainWrapper.setAttribute('rotation', {x: 0, y: incrementUIRotation, z: 0});
                } else if (data.direction === 'cw') {
                    incrementUIRotation -= data.value;
                    mainWrapper.setAttribute('rotation', {x: 0, y: incrementUIRotation, z: 0});
                }
            }
		});
	}
});

AFRAME.registerComponent('select-primitive', {
    schema: {
        which: {type: 'string'}
    },
    
	init: function () {
        var el = this.el;
        var data = this.data;
        var box = document.querySelector('#box');
        var sphere = document.querySelector('#sphere');
        var cylinder = document.querySelector('#cylinder');
        var cone = document.querySelector('#cone');
        var webvrDisplay = document.querySelector('#webvr-display');
        var selectedPrimitiveHovered = false;
        
        el.addEventListener('mouseenter', function () {
			selectedPrimitiveHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			selectedPrimitiveHovered = false;
		});
        
		document.body.addEventListener('triggerdown', function () {
            if (data.which === 'next' && primitives < 4 && selectedPrimitiveHovered) {
                primitives += 1;
            } else if (data.which === 'next' && primitives === 4 && selectedPrimitiveHovered) {
                primitives = 1;
            } else if (data.which === 'previous' && primitives > 1 && selectedPrimitiveHovered) {
                primitives -= 1;
            } else if (data.which === 'previous' && primitives === 1 && selectedPrimitiveHovered) {
                primitives = 4;
            }

            var primitivesPreview = document.querySelectorAll('.primitives');

            for (var i = 0; i < primitivesPreview.length; i++) {
                var currentColor = primitivesPreview[i].getAttribute('color', '');
                selectedColor = currentColor;

                primitivesPreview[i].setAttribute('visible', 'false');
            }

            if (primitives === 1) {
                box.setAttribute('visible', 'true');
                selectedPrimitive = 'box';
            } else if (primitives === 2) {
                sphere.setAttribute('visible', 'true');
                selectedPrimitive = 'sphere';
            } else if (primitives === 3) {
                cylinder.setAttribute('visible', 'true');
                selectedPrimitive = 'cylinder';
            } else if (primitives === 4) {
                cone.setAttribute('visible', 'true');
                selectedPrimitive = 'cone';
            }

            webvrDisplay.setAttribute('text', {
                value: '<a-' + selectedPrimitive + ' color="' + selectedColor + '">\n</a-' + selectedPrimitive + '>'});
		});
	}
});

AFRAME.registerComponent('create-entity', {
	init: function () {
        var el = this.el;
		var webvrDisplay = document.querySelector('#webvr-display');
		var scene = document.querySelector('a-scene');
        var createEntityHovered = false;
        
        el.addEventListener('mouseenter', function () {
			createEntityHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			createEntityHovered = false;
		});

		document.body.addEventListener('triggerdown', function () {
            if (createEntityHovered) {
                var typedCode = webvrDisplay.getAttribute('text').value;
			
                var entityWrapper = document.createElement('a-entity');
                entityWrapper.innerHTML = typedCode;
                entityWrapper.setAttribute('class', 'created');
                entityWrapper.setAttribute('id', 'entity' + toDelete);
                if (primitives === 2) {
                    entityWrapper.setAttribute('position', {x: 0, y: 1, z: 0});
                    incrementPositionY = 1;
                } else {
                    entityWrapper.setAttribute('position', {x: 0, y: 0.5, z: 0});
                    incrementPositionY = 0.5;
                }
                
                scene.appendChild(entityWrapper);

                webvrDisplay.setAttribute('text', {
                    value: '<a-' + selectedPrimitive + ' color="#FFFFFF">\n</a-' + selectedPrimitive + '>'});

                var primitivesPreview = document.querySelectorAll('.primitives');

                for (var i = 0; i < primitivesPreview.length; i++) {
                    primitivesPreview[i].setAttribute('color', '#FFFFFF');
                }

                toDelete += 1;
                incrementPositionX = 0;
                
                incrementPositionZ = 0;
                incrementScaleX = 1;
                incrementScaleY = 1;
                incrementScaleZ = 1;
                incrementRotationX = 0;
                incrementRotationY = 0;
                incrementRotationZ = 0;
                
                var positionXValue = document.querySelector('#position-x-value');
                var positionYValue = document.querySelector('#position-y-value');
                var positionZValue = document.querySelector('#position-z-value');
                var rotationXValue = document.querySelector('#rotation-x-value');
                var rotationYValue = document.querySelector('#rotation-y-value');
                var rotationZValue = document.querySelector('#rotation-z-value');
                var scaleXValue = document.querySelector('#scale-x-value');
                var scaleYValue = document.querySelector('#scale-y-value');
                var scaleZValue = document.querySelector('#scale-z-value');
                
                positionXValue.setAttribute('text', {value: incrementPositionX});
                positionYValue.setAttribute('text', {value: incrementPositionY});
                positionZValue.setAttribute('text', {value: incrementPositionZ});
                rotationXValue.setAttribute('text', {value: incrementRotationX});
                rotationYValue.setAttribute('text', {value: incrementRotationY});
                rotationZValue.setAttribute('text', {value: incrementRotationZ});
                scaleXValue.setAttribute('text', {value: incrementScaleX});
                scaleYValue.setAttribute('text', {value: incrementScaleY});
                scaleZValue.setAttribute('text', {value: incrementScaleZ});
            }
		});
	}
});

AFRAME.registerComponent('copy-entity', {
	init: function () {
        var el = this.el;
        var copyEntityHovered = false;
        var scene = document.querySelector('a-scene');
        
        el.addEventListener('mouseenter', function () {
			copyEntityHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			copyEntityHovered = false;
		});
        
		document.body.addEventListener('triggerdown', function () {
            if (copyEntityHovered) {
                var grabLastCreated = document.querySelector('#entity' + (toDelete - 1));
                if (toDelete > 0) {
                    var test = grabLastCreated.innerHTML;
                    var copiedScale = grabLastCreated.getAttribute('scale');
                    var copiedRotation = grabLastCreated.getAttribute('rotation');
                    
                    var entityWrapper = document.createElement('a-entity');
                    entityWrapper.innerHTML = test;
                    entityWrapper.setAttribute('scale', copiedScale);
                    entityWrapper.setAttribute('rotation', copiedRotation);
                    entityWrapper.setAttribute('class', 'created');
                    entityWrapper.setAttribute('id', 'entity' + toDelete);
                    if (primitives === 2) {
                        entityWrapper.setAttribute('position', {x: 0, y: 1, z: 0});
                        incrementPositionY = 1;
                    } else {
                        entityWrapper.setAttribute('position', {x: 0, y: 0.5, z: 0});
                        incrementPositionY = 0.5;
                    }

                    scene.appendChild(entityWrapper);
                }

                toDelete += 1;
                incrementPositionX = 0;
                
                incrementPositionZ = 0;
                incrementScaleX = 1;
                incrementScaleY = 1;
                incrementScaleZ = 1;
                incrementRotationX = 0;
                incrementRotationY = 0;
                incrementRotationZ = 0;
                
                var positionXValue = document.querySelector('#position-x-value');
                var positionYValue = document.querySelector('#position-y-value');
                var positionZValue = document.querySelector('#position-z-value');
                var rotationXValue = document.querySelector('#rotation-x-value');
                var rotationYValue = document.querySelector('#rotation-y-value');
                var rotationZValue = document.querySelector('#rotation-z-value');
                var scaleXValue = document.querySelector('#scale-x-value');
                var scaleYValue = document.querySelector('#scale-y-value');
                var scaleZValue = document.querySelector('#scale-z-value');
                
                positionXValue.setAttribute('text', {value: incrementPositionX});
                positionYValue.setAttribute('text', {value: incrementPositionY});
                positionZValue.setAttribute('text', {value: incrementPositionZ});
                rotationXValue.setAttribute('text', {value: incrementRotationX});
                rotationYValue.setAttribute('text', {value: incrementRotationY});
                rotationZValue.setAttribute('text', {value: incrementRotationZ});
                scaleXValue.setAttribute('text', {value: incrementScaleX});
                scaleYValue.setAttribute('text', {value: incrementScaleY});
                scaleZValue.setAttribute('text', {value: incrementScaleZ});
            }
		});
	}
});

AFRAME.registerComponent('delete-entity', {
	init: function () {
        var el = this.el;
        var deleteEntityHovered = false;
        
        el.addEventListener('mouseenter', function () {
			deleteEntityHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			deleteEntityHovered = false;
		});
        
		document.body.addEventListener('triggerdown', function () {
            if (deleteEntityHovered) {
                var grabLastCreated = document.querySelector('#entity' + (toDelete - 1));
                if (toDelete > 0) {
                    grabLastCreated.parentNode.removeChild(grabLastCreated);
                }

                toDelete -= 1;
                incrementPositionX = 0;
                incrementPositionY = 0.5;
                incrementPositionZ = 0;
                incrementScaleX = 1;
                incrementScaleY = 1;
                incrementScaleZ = 1;
                incrementRotationX = 0;
                incrementRotationY = 0;
                incrementRotationZ = 0;
                
                var positionXValue = document.querySelector('#position-x-value');
                var positionYValue = document.querySelector('#position-y-value');
                var positionZValue = document.querySelector('#position-z-value');
                var rotationXValue = document.querySelector('#rotation-x-value');
                var rotationYValue = document.querySelector('#rotation-y-value');
                var rotationZValue = document.querySelector('#rotation-z-value');
                var scaleXValue = document.querySelector('#scale-x-value');
                var scaleYValue = document.querySelector('#scale-y-value');
                var scaleZValue = document.querySelector('#scale-z-value');
                
                positionXValue.setAttribute('text', {value: incrementPositionX});
                positionYValue.setAttribute('text', {value: incrementPositionY});
                positionZValue.setAttribute('text', {value: incrementPositionZ});
                rotationXValue.setAttribute('text', {value: incrementRotationX});
                rotationYValue.setAttribute('text', {value: incrementRotationY});
                rotationZValue.setAttribute('text', {value: incrementRotationZ});
                scaleXValue.setAttribute('text', {value: incrementScaleX});
                scaleYValue.setAttribute('text', {value: incrementScaleY});
                scaleZValue.setAttribute('text', {value: incrementScaleZ});
            }
		});
	}
});

AFRAME.registerComponent('compose-color', {
	init: function () {
        var el = this.el;
		var webvrDisplay = document.querySelector('#webvr-display');
        var selectedColorHovered = false;
        
        el.addEventListener('mouseenter', function () {
			selectedColorHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			selectedColorHovered = false;
		});
        
		document.body.addEventListener('triggerdown', function () {
            if (selectedColorHovered) {
                var colorValue = el.getAttribute('material').color;
                selectedColor = colorValue;

                webvrDisplay.setAttribute('text', {
                    value: '<a-' + selectedPrimitive + ' color="' + selectedColor + '">\n</a-' + selectedPrimitive + '>'});

                var primitivesPreview = document.querySelectorAll('.primitives');

                for (var i = 0; i < primitivesPreview.length; i++) {
                    primitivesPreview[i].setAttribute('color', selectedColor);
                }
            }
		});
	}
});

AFRAME.registerComponent('toggle-ui', {
	init: function () {
        var el = this.el;
        var toggleUIHovered = false;
        var hidden = false;
        
        el.addEventListener('mouseenter', function () {
			toggleUIHovered = true;
		});
        
        el.addEventListener('mouseleave', function () {
			toggleUIHovered = false;
		});
        
		document.body.addEventListener('triggerdown', function () {
            if (toggleUIHovered) {
                var hidableEntities = document.querySelectorAll('.hidable')
                
                if (hidden === false) {
                    for (var i = 0; i < hidableEntities.length; i++) {
                        hidableEntities[i].setAttribute('visible', 'false');
                        hidden = true;
                    }
                } else if (hidden === true) {
                    for (var i = 0; i < hidableEntities.length; i++) {
                        hidableEntities[i].setAttribute('visible', 'true');
                        hidden = false;
                    }
                }
            }
		});
	}
});