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

eval(__webpack_require__.ts("//sw.js\nconst CACHE_NAME = \"optiwaste-cache-v1\";\nconst urlsToCache = [\n    \"/\"\n];\nself.addEventListener(\"install\", (event)=>{\n    event.waitUntil(caches.open(CACHE_NAME).then((cache)=>cache.addAll(urlsToCache)));\n});\nself.addEventListener(\"fetch\", (event)=>{\n    event.respondWith(caches.match(event.request).then((response)=>{\n        if (response) {\n            return response;\n        }\n        return fetch(event.request).then((response)=>{\n            if (!response || response.status !== 200 || response.type !== \"basic\") {\n                return response;\n            }\n            const responseToCache = response.clone();\n            caches.open(CACHE_NAME).then((cache)=>{\n                cache.put(event.request, responseToCache);\n            });\n            return response;\n        });\n    }));\n});\nself.addEventListener(\"push\", function(event) {\n    const data = event.data.json();\n    const options = {\n        body: data.message,\n        icon: \"/icon.png\",\n        badge: \"/badge.png\",\n        data: {\n            requestId: data.requestId\n        }\n    };\n    event.waitUntil(self.registration.showNotification(data.title, options));\n});\nself.addEventListener(\"notificationclick\", function(event) {\n    event.notification.close();\n    const requestId = event.notification.data.requestId;\n    event.waitUntil(clients.matchAll({\n        type: \"window\"\n    }).then(function(clientList) {\n        for(var i = 0; i < clientList.length; i++){\n            var client = clientList[i];\n            if (client.url.includes(\"/collector/requests\") && \"focus\" in client) return client.focus();\n        }\n        if (client.openWindow) client.openWindow(\"collector/requests\");\n    }));\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZXJ2aWNlLXdvcmtlci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQSxPQUFPO0FBQ1AsTUFBTUEsYUFBYTtBQUNuQixNQUFNQyxjQUFjO0lBQ2xCO0NBQ0Q7QUFFREMsS0FBS0MsZ0JBQWdCLENBQUMsV0FBVyxDQUFDQztJQUNoQ0EsTUFBTUMsU0FBUyxDQUNiQyxPQUFPQyxJQUFJLENBQUNQLFlBQ1RRLElBQUksQ0FBQyxDQUFDQyxRQUFVQSxNQUFNQyxNQUFNLENBQUNUO0FBRXBDO0FBRUFDLEtBQUtDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQ0M7SUFDOUJBLE1BQU1PLFdBQVcsQ0FDZkwsT0FBT00sS0FBSyxDQUFDUixNQUFNUyxPQUFPLEVBQ3ZCTCxJQUFJLENBQUMsQ0FBQ007UUFDTCxJQUFJQSxVQUFVO1lBQ1osT0FBT0E7UUFDVDtRQUNBLE9BQU9DLE1BQU1YLE1BQU1TLE9BQU8sRUFBRUwsSUFBSSxDQUM5QixDQUFDTTtZQUNDLElBQUksQ0FBQ0EsWUFBWUEsU0FBU0UsTUFBTSxLQUFLLE9BQU9GLFNBQVNHLElBQUksS0FBSyxTQUFTO2dCQUNyRSxPQUFPSDtZQUNUO1lBQ0EsTUFBTUksa0JBQWtCSixTQUFTSyxLQUFLO1lBQ3RDYixPQUFPQyxJQUFJLENBQUNQLFlBQ1RRLElBQUksQ0FBQyxDQUFDQztnQkFDTEEsTUFBTVcsR0FBRyxDQUFDaEIsTUFBTVMsT0FBTyxFQUFFSztZQUMzQjtZQUNBLE9BQU9KO1FBQ1g7SUFFSjtBQUVOO0FBR0FaLEtBQUtDLGdCQUFnQixDQUFDLFFBQVEsU0FBVUMsS0FBSztJQUN6QyxNQUFNaUIsT0FBT2pCLE1BQU1pQixJQUFJLENBQUNDLElBQUk7SUFDNUIsTUFBTUMsVUFBVTtRQUNkQyxNQUFNSCxLQUFLSSxPQUFPO1FBQ2xCQyxNQUFNO1FBQ05DLE9BQU87UUFDUE4sTUFBTTtZQUNKTyxXQUFXUCxLQUFLTyxTQUFTO1FBQzNCO0lBQ0Y7SUFFQXhCLE1BQU1DLFNBQVMsQ0FDYkgsS0FBSzJCLFlBQVksQ0FBQ0MsZ0JBQWdCLENBQUNULEtBQUtVLEtBQUssRUFBRVI7QUFFbkQ7QUFFQXJCLEtBQUtDLGdCQUFnQixDQUFDLHFCQUFxQixTQUFVQyxLQUFLO0lBQ3hEQSxNQUFNNEIsWUFBWSxDQUFDQyxLQUFLO0lBRXhCLE1BQU1MLFlBQVl4QixNQUFNNEIsWUFBWSxDQUFDWCxJQUFJLENBQUNPLFNBQVM7SUFFbkR4QixNQUFNQyxTQUFTLENBQ1g2QixRQUFRQyxRQUFRLENBQUM7UUFDYmxCLE1BQU07SUFDVixHQUFHVCxJQUFJLENBQUMsU0FBUzRCLFVBQVU7UUFDdkIsSUFBSyxJQUFJQyxJQUFJLEdBQUdBLElBQUlELFdBQVdFLE1BQU0sRUFBRUQsSUFBSztZQUN4QyxJQUFJRSxTQUFTSCxVQUFVLENBQUNDLEVBQUU7WUFDMUIsSUFBSUUsT0FBT0MsR0FBRyxDQUFDQyxRQUFRLENBQUMsMEJBQTBCLFdBQVdGLFFBQ3pELE9BQU9BLE9BQU9HLEtBQUs7UUFDM0I7UUFDQSxJQUFJSCxPQUFPSSxVQUFVLEVBQ2pCSixPQUFPSSxVQUFVLENBQUM7SUFDMUI7QUFFTiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zZXJ2aWNlLXdvcmtlci9pbmRleC5qcz8xMzAzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vc3cuanNcbmNvbnN0IENBQ0hFX05BTUUgPSAnb3B0aXdhc3RlLWNhY2hlLXYxJztcbmNvbnN0IHVybHNUb0NhY2hlID0gW1xuICAnLycsXG5dXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIChldmVudCkgPT4ge1xuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLm9wZW4oQ0FDSEVfTkFNRSlcbiAgICAgIC50aGVuKChjYWNoZSkgPT4gY2FjaGUuYWRkQWxsKHVybHNUb0NhY2hlKSlcbiAgKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnJlc3BvbmRXaXRoKFxuICAgIGNhY2hlcy5tYXRjaChldmVudC5yZXF1ZXN0KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2goZXZlbnQucmVxdWVzdCkudGhlbihcbiAgICAgICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDAgfHwgcmVzcG9uc2UudHlwZSAhPT0gJ2Jhc2ljJykge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZVRvQ2FjaGUgPSByZXNwb25zZS5jbG9uZSgpO1xuICAgICAgICAgICAgY2FjaGVzLm9wZW4oQ0FDSEVfTkFNRSlcbiAgICAgICAgICAgICAgLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIHJlc3BvbnNlVG9DYWNoZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSlcbiAgKTtcbn0pO1xuXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcigncHVzaCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhLmpzb24oKTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgYm9keTogZGF0YS5tZXNzYWdlLFxuICAgICAgaWNvbjogJy9pY29uLnBuZycsXG4gICAgICBiYWRnZTogJy9iYWRnZS5wbmcnLFxuICAgICAgZGF0YToge1xuICAgICAgICByZXF1ZXN0SWQ6IGRhdGEucmVxdWVzdElkXG4gICAgICB9XG4gICAgfTtcbiAgXG4gICAgZXZlbnQud2FpdFVudGlsKFxuICAgICAgc2VsZi5yZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbihkYXRhLnRpdGxlLCBvcHRpb25zKVxuICAgICk7XG4gIH0pO1xuICBcbiAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdub3RpZmljYXRpb25jbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50Lm5vdGlmaWNhdGlvbi5jbG9zZSgpO1xuXG4gICAgY29uc3QgcmVxdWVzdElkID0gZXZlbnQubm90aWZpY2F0aW9uLmRhdGEucmVxdWVzdElkO1xuICBcbiAgICBldmVudC53YWl0VW50aWwoXG4gICAgICAgIGNsaWVudHMubWF0Y2hBbGwoe1xuICAgICAgICAgICAgdHlwZTogJ3dpbmRvdydcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihjbGllbnRMaXN0KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsaWVudExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xpZW50ID0gY2xpZW50TGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2xpZW50LnVybC5pbmNsdWRlcygnL2NvbGxlY3Rvci9yZXF1ZXN0cycpICYmICdmb2N1cycgaW4gY2xpZW50KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xpZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2xpZW50Lm9wZW5XaW5kb3cpXG4gICAgICAgICAgICAgICAgY2xpZW50Lm9wZW5XaW5kb3coJ2NvbGxlY3Rvci9yZXF1ZXN0cycpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH0pO1xuICAiXSwibmFtZXMiOlsiQ0FDSEVfTkFNRSIsInVybHNUb0NhY2hlIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIndhaXRVbnRpbCIsImNhY2hlcyIsIm9wZW4iLCJ0aGVuIiwiY2FjaGUiLCJhZGRBbGwiLCJyZXNwb25kV2l0aCIsIm1hdGNoIiwicmVxdWVzdCIsInJlc3BvbnNlIiwiZmV0Y2giLCJzdGF0dXMiLCJ0eXBlIiwicmVzcG9uc2VUb0NhY2hlIiwiY2xvbmUiLCJwdXQiLCJkYXRhIiwianNvbiIsIm9wdGlvbnMiLCJib2R5IiwibWVzc2FnZSIsImljb24iLCJiYWRnZSIsInJlcXVlc3RJZCIsInJlZ2lzdHJhdGlvbiIsInNob3dOb3RpZmljYXRpb24iLCJ0aXRsZSIsIm5vdGlmaWNhdGlvbiIsImNsb3NlIiwiY2xpZW50cyIsIm1hdGNoQWxsIiwiY2xpZW50TGlzdCIsImkiLCJsZW5ndGgiLCJjbGllbnQiLCJ1cmwiLCJpbmNsdWRlcyIsImZvY3VzIiwib3BlbldpbmRvdyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./service-worker/index.js\n"));

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