/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./service-worker/index.js":
/*!*********************************!*\
  !*** ./service-worker/index.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("self.addEventListener(\"push\", function(event) {\n    const data = event.data.json();\n    const options = {\n        body: data.message,\n        icon: \"/icon.png\",\n        badge: \"/badge.png\",\n        data: {\n            requestId: data.requestId\n        }\n    };\n    event.waitUntil(self.registration.showNotification(data.title, options));\n});\nself.addEventListener(\"notificationclick\", function(event) {\n    event.notification.close();\n    const requestId = event.notification.data.requestId;\n    event.waitUntil(clients.matchAll({\n        type: \"window\"\n    }).then(function(clientList) {\n        for(var i = 0; i < clientList.length; i++){\n            var client = clientList[i];\n            if (client.url.includes(\"/collector/requests\") && \"focus\" in client) {\n                client.focus();\n                // Send a message to the client\n                client.postMessage({\n                    type: \"NOTIFICATION_CLICKED\",\n                    requestId: requestId\n                });\n                return;\n            }\n        }\n        if (client.openWindow) {\n            client.openWindow(\"/collector/requests\").then((windowClient)=>{\n                // Wait for the new window to load and then send the message\n                windowClient.postMessage({\n                    type: \"NOTIFICATION_CLICKED\",\n                    requestId: requestId\n                });\n            });\n        }\n    }));\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZXJ2aWNlLXdvcmtlci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQUEsS0FBS0MsZ0JBQWdCLENBQUMsUUFBUSxTQUFVQyxLQUFLO0lBQzNDLE1BQU1DLE9BQU9ELE1BQU1DLElBQUksQ0FBQ0MsSUFBSTtJQUM1QixNQUFNQyxVQUFVO1FBQ2RDLE1BQU1ILEtBQUtJLE9BQU87UUFDbEJDLE1BQU07UUFDTkMsT0FBTztRQUNQTixNQUFNO1lBQ0pPLFdBQVdQLEtBQUtPLFNBQVM7UUFDM0I7SUFDRjtJQUVBUixNQUFNUyxTQUFTLENBQ2JYLEtBQUtZLFlBQVksQ0FBQ0MsZ0JBQWdCLENBQUNWLEtBQUtXLEtBQUssRUFBRVQ7QUFFbkQ7QUFFQUwsS0FBS0MsZ0JBQWdCLENBQUMscUJBQXFCLFNBQVVDLEtBQUs7SUFDeERBLE1BQU1hLFlBQVksQ0FBQ0MsS0FBSztJQUV4QixNQUFNTixZQUFZUixNQUFNYSxZQUFZLENBQUNaLElBQUksQ0FBQ08sU0FBUztJQUVuRFIsTUFBTVMsU0FBUyxDQUNiTSxRQUFRQyxRQUFRLENBQUM7UUFDZkMsTUFBTTtJQUNSLEdBQUdDLElBQUksQ0FBQyxTQUFTQyxVQUFVO1FBQ3pCLElBQUssSUFBSUMsSUFBSSxHQUFHQSxJQUFJRCxXQUFXRSxNQUFNLEVBQUVELElBQUs7WUFDMUMsSUFBSUUsU0FBU0gsVUFBVSxDQUFDQyxFQUFFO1lBQzFCLElBQUlFLE9BQU9DLEdBQUcsQ0FBQ0MsUUFBUSxDQUFDLDBCQUEwQixXQUFXRixRQUFRO2dCQUNuRUEsT0FBT0csS0FBSztnQkFDWiwrQkFBK0I7Z0JBQy9CSCxPQUFPSSxXQUFXLENBQUM7b0JBQ2pCVCxNQUFNO29CQUNOVCxXQUFXQTtnQkFDYjtnQkFDQTtZQUNGO1FBQ0Y7UUFDQSxJQUFJYyxPQUFPSyxVQUFVLEVBQUU7WUFDckJMLE9BQU9LLFVBQVUsQ0FBQyx1QkFBdUJULElBQUksQ0FBQ1UsQ0FBQUE7Z0JBQzVDLDREQUE0RDtnQkFDNURBLGFBQWFGLFdBQVcsQ0FBQztvQkFDdkJULE1BQU07b0JBQ05ULFdBQVdBO2dCQUNiO1lBQ0Y7UUFDRjtJQUNGO0FBRUoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc2VydmljZS13b3JrZXIvaW5kZXguanM/MTMwMyJdLCJzb3VyY2VzQ29udGVudCI6WyJzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ3B1c2gnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGEuanNvbigpO1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIGJvZHk6IGRhdGEubWVzc2FnZSxcbiAgICBpY29uOiAnL2ljb24ucG5nJyxcbiAgICBiYWRnZTogJy9iYWRnZS5wbmcnLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RJZDogZGF0YS5yZXF1ZXN0SWRcbiAgICB9XG4gIH07XG5cbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIHNlbGYucmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24oZGF0YS50aXRsZSwgb3B0aW9ucylcbiAgKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ25vdGlmaWNhdGlvbmNsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50Lm5vdGlmaWNhdGlvbi5jbG9zZSgpO1xuXG4gIGNvbnN0IHJlcXVlc3RJZCA9IGV2ZW50Lm5vdGlmaWNhdGlvbi5kYXRhLnJlcXVlc3RJZDtcblxuICBldmVudC53YWl0VW50aWwoXG4gICAgY2xpZW50cy5tYXRjaEFsbCh7XG4gICAgICB0eXBlOiAnd2luZG93J1xuICAgIH0pLnRoZW4oZnVuY3Rpb24oY2xpZW50TGlzdCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGllbnRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjbGllbnQgPSBjbGllbnRMaXN0W2ldO1xuICAgICAgICBpZiAoY2xpZW50LnVybC5pbmNsdWRlcygnL2NvbGxlY3Rvci9yZXF1ZXN0cycpICYmICdmb2N1cycgaW4gY2xpZW50KSB7XG4gICAgICAgICAgY2xpZW50LmZvY3VzKCk7XG4gICAgICAgICAgLy8gU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIGNsaWVudFxuICAgICAgICAgIGNsaWVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAnTk9USUZJQ0FUSU9OX0NMSUNLRUQnLFxuICAgICAgICAgICAgcmVxdWVzdElkOiByZXF1ZXN0SWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjbGllbnQub3BlbldpbmRvdykge1xuICAgICAgICBjbGllbnQub3BlbldpbmRvdygnL2NvbGxlY3Rvci9yZXF1ZXN0cycpLnRoZW4od2luZG93Q2xpZW50ID0+IHtcbiAgICAgICAgICAvLyBXYWl0IGZvciB0aGUgbmV3IHdpbmRvdyB0byBsb2FkIGFuZCB0aGVuIHNlbmQgdGhlIG1lc3NhZ2VcbiAgICAgICAgICB3aW5kb3dDbGllbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ05PVElGSUNBVElPTl9DTElDS0VEJyxcbiAgICAgICAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG59KTtcbiJdLCJuYW1lcyI6WyJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZGF0YSIsImpzb24iLCJvcHRpb25zIiwiYm9keSIsIm1lc3NhZ2UiLCJpY29uIiwiYmFkZ2UiLCJyZXF1ZXN0SWQiLCJ3YWl0VW50aWwiLCJyZWdpc3RyYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwidGl0bGUiLCJub3RpZmljYXRpb24iLCJjbG9zZSIsImNsaWVudHMiLCJtYXRjaEFsbCIsInR5cGUiLCJ0aGVuIiwiY2xpZW50TGlzdCIsImkiLCJsZW5ndGgiLCJjbGllbnQiLCJ1cmwiLCJpbmNsdWRlcyIsImZvY3VzIiwicG9zdE1lc3NhZ2UiLCJvcGVuV2luZG93Iiwid2luZG93Q2xpZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./service-worker/index.js\n"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	!function() {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = function() {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: function(script) { return script; }
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	!function() {
/******/ 		__webpack_require__.ts = function(script) { return __webpack_require__.tt().createScript(script); };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	!function() {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push(function(options) {
/******/ 			var originalFactory = options.factory;
/******/ 			options.factory = function(moduleObject, moduleExports, webpackRequire) {
/******/ 				var hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				var cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : function() {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./service-worker/index.js");
/******/ 	
/******/ })()
;