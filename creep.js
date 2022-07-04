import { isChrome, braveBrowser, getBraveMode, getBraveUnprotectedParameters, isFirefox, getOS, decryptUserAgent, getUserAgentPlatform, computeWindowsRelease, attemptWindows11UserAgent, isUAPostReduction, getUserAgentRestored, logTestResult, performanceLogger, getPromiseRaceFulfilled, queueEvent, createTimer, formatEmojiSet, getEmojis, cssFontFamily } from './modules/helpers.js'
import { patch, html, note, count, modal, getDiffs } from './modules/html.js'
import { hashMini, instanceId, hashify, getBotHash, getFuzzyHash  } from './modules/crypto.js'

import { captureError, attempt, caniuse, timer, errorsCaptured, getCapturedErrors, errorsHTML } from './modules/captureErrors.js'
import { sendToTrash, proxyBehavior, gibberish, trustInteger, compressWebGLRenderer, getWebGLRendererParts, hardenWebGLRenderer, getWebGLRendererConfidence, trashBin, getTrash, trashHTML } from './modules/trash.js'
import { documentLie, phantomDarkness, parentPhantom, lieProps, prototypeLies, lieRecords, getLies, proxyDetectionMethods, getPluginLies, getNonFunctionToStringLies, liesHTML } from './modules/lies.js'

import { getOfflineAudioContext, audioHTML, getKnownAudio } from './modules/audio.js'
import { getCanvas2d, canvasHTML } from './modules/canvas2d.js'
import { getCanvasWebgl, webglHTML } from './modules/canvasWebgl.js'
import { getCSS, cssHTML } from './modules/computedStyle.js'
import { getCSSMedia, cssMediaHTML } from './modules/css.js'
import { getConsoleErrors, consoleErrorsHTML } from './modules/consoleErrors.js'
import { getWindowFeatures, windowFeaturesHTML } from './modules/contentWindowVersion.js'
import { getFonts, fontsHTML } from './modules/fonts.js'
import { getHeadlessFeatures, headlesFeaturesHTML } from './modules/headless.js'
import { getHTMLElementVersion, htmlElementVersionHTML } from './modules/htmlElementVersion.js'
import { getMaths, mathsHTML } from './modules/maths.js'
import { getMedia, mediaHTML } from './modules/media.js'
import { getNavigator, navigatorHTML } from './modules/navigator.js'
import { getClientRects, clientRectsHTML } from './modules/rects.js'
import { getScreen, screenHTML } from './modules/screen.js'
import { getTimezone, timezoneHTML } from './modules/timezone.js'
import { getVoices, voicesHTML } from './modules/voices.js'
import { getBestWorkerScope, workerScopeHTML } from './modules/worker.js'
import { getSVG, svgHTML } from './modules/svg.js'
import { getResistance, resistanceHTML } from './modules/resistance.js'
import { getIntl, intlHTML } from './modules/intl.js'
import { getFeaturesLie, getEngineFeatures, featuresHTML } from './modules/features.js'
import { renderSamples } from './modules/samples.js'
import { getPrediction, renderPrediction, predictionErrorPatch } from './modules/prediction.js'
import { webrtcHTML, getWebRTCData, getMediaCapabilities } from './modules/webrtc.js'

const imports = {
	require: {
		// helpers
		isChrome,
		braveBrowser,
		getBraveMode,
		isFirefox,
		getOS,
		decryptUserAgent,
		getUserAgentPlatform,
		logTestResult,
		performanceLogger,
		getPromiseRaceFulfilled,
		queueEvent,
		createTimer,
		compressWebGLRenderer,
		getWebGLRendererParts,
		hardenWebGLRenderer,
		getWebGLRendererConfidence,
		formatEmojiSet,
		getEmojis,
		cssFontFamily,
		// crypto
		instanceId,
		hashMini,
		hashify,
		getBotHash,
		getFuzzyHash,
		// html
		patch,
		html,
		note,
		count,
		modal,
		getDiffs,
		// captureErrors
		captureError,
		attempt,
		caniuse,
		// trash
		sendToTrash,
		proxyBehavior,
		gibberish,
		trustInteger,
		// lies
		documentLie,
		// filter out lies on Function.prototype.toString (this is a false positive on native APIs void of tampering)
		lieProps: (() => {
			const props = lieProps.getProps()
			return Object.keys(props).reduce((acc, key) => {
				acc[key] = getNonFunctionToStringLies(props[key])
				return acc
			}, {})
		})(),
		prototypeLies,
		// collections
		errorsCaptured,
		trashBin,
		lieRecords,
		proxyDetectionMethods,
		phantomDarkness,
		parentPhantom,
		getPluginLies,
		getKnownAudio,
		attemptWindows11UserAgent,
		isUAPostReduction,
		getUserAgentRestored,
		// slow connections
		getWebRTCData,
		getMediaCapabilities
	}
}
// worker.js

;(async imports => {
	'use strict';

	const {
		require: {
			hashMini,
			patch,
			html,
			note,
			count,
			modal,
			caniuse,
			isFirefox
		}
	} = imports

	const isBrave = isChrome ? await braveBrowser() : false
	const braveMode = isBrave ? getBraveMode() : {}
	const braveFingerprintingBlocking = isBrave && (braveMode.standard || braveMode.strict)

	const fingerprint = async () => {
		const timeStart = timer()
		const fingerprintTimeStart = timer()
		const [
			windowFeaturesComputed,
			htmlElementVersionComputed,
			cssComputed,
			cssMediaComputed,
			screenComputed,
			voicesComputed,
			canvas2dComputed,
			canvasWebglComputed,
			mathsComputed,
			consoleErrorsComputed,
			timezoneComputed,
			clientRectsComputed,
			fontsComputed,
			workerScopeComputed,
			mediaComputed,
			svgComputed,
			resistanceComputed,
			intlComputed,
			navigatorComputed,
			offlineAudioContextComputed,
		] = await Promise.all([
			getWindowFeatures(imports),
			getHTMLElementVersion(imports),
			getCSS(imports),
			getCSSMedia(imports),
			getScreen(imports),
			getVoices(imports),
			getCanvas2d(imports),
			getCanvasWebgl(imports),
			getMaths(imports),
			getConsoleErrors(imports),
			getTimezone(imports),
			getClientRects(imports),
			getFonts(imports),
			getBestWorkerScope(imports),
			getMedia(imports),
			getSVG(imports),
			getResistance(imports),
			getIntl(imports),
			getNavigator(imports),
			getOfflineAudioContext(imports),
		]).catch(error => console.error(error.message))

		const [
			headlessComputed,
			featuresComputed
		] = await Promise.all([
			getHeadlessFeatures(imports, workerScopeComputed),
			getEngineFeatures({
				imports,
				cssComputed,
				windowFeaturesComputed
			})
		]).catch(error => console.error(error.message))

		const [
			liesComputed,
			trashComputed,
			capturedErrorsComputed
		] = await Promise.all([
			getLies(imports),
			getTrash(imports),
			getCapturedErrors(imports)
		]).catch(error => console.error(error.message))

		const fingerprintTimeEnd = fingerprintTimeStart()
		console.log(`Fingerprinting complete in ${(fingerprintTimeEnd).toFixed(2)}ms`)

		// GPU Prediction
		const { parameters: gpuParameter } = canvasWebglComputed || {}
		const reducedGPUParameters = {
			...(
				braveFingerprintingBlocking ? getBraveUnprotectedParameters(gpuParameter) :
					gpuParameter
			),
			RENDERER: undefined,
			SHADING_LANGUAGE_VERSION: undefined,
			UNMASKED_RENDERER_WEBGL: undefined,
			UNMASKED_VENDOR_WEBGL: undefined,
			VERSION: undefined,
			VENDOR: undefined
		}

		//console.log(hashMini(reducedGPUParameters))

		// Hashing
		const hashStartTime = timer()
		const [
			windowHash,
			headlessHash,
			htmlHash,
			cssMediaHash,
			cssHash,
			styleHash,
			styleSystemHash,
			screenHash,
			voicesHash,
			canvas2dHash,
			canvas2dImageHash,
			canvas2dBlobHash,
			canvas2dPaintHash,
			canvas2dTextHash,
			canvas2dEmojiHash,
			canvasWebglHash,
			canvasWebglImageHash,
			canvasWebglParametersHash,
			pixelsHash,
			pixels2Hash,
			mathsHash,
			consoleErrorsHash,
			timezoneHash,
			rectsHash,
			domRectHash,
			audioHash,
			fontsHash,
			workerHash,
			mediaHash,
			mimeTypesHash,
			navigatorHash,
			liesHash,
			trashHash,
			errorsHash,
			svgHash,
			resistanceHash,
			intlHash,
			featuresHash,
			deviceOfTimezoneHash
		] = await Promise.all([
			hashify(windowFeaturesComputed),
			hashify(headlessComputed),
			hashify((htmlElementVersionComputed || {}).keys),
			hashify(cssMediaComputed),
			hashify(cssComputed),
			hashify((cssComputed || {}).computedStyle),
			hashify((cssComputed || {}).system),
			hashify(screenComputed),
			hashify(voicesComputed),
			hashify(canvas2dComputed),
			hashify((canvas2dComputed || {}).dataURI),
			hashify((canvas2dComputed || {}).blob.readAsDataURL),
			hashify((canvas2dComputed || {}).paintURI),
			hashify((canvas2dComputed || {}).textURI),
			hashify((canvas2dComputed || {}).emojiURI),
			hashify(canvasWebglComputed),
			hashify((canvasWebglComputed || {}).dataURI),
			hashify(reducedGPUParameters),
			((canvasWebglComputed || {}).pixels || []).length ? hashify(canvasWebglComputed.pixels) : undefined,
			((canvasWebglComputed || {}).pixels2 || []).length ? hashify(canvasWebglComputed.pixels2) : undefined,
			hashify((mathsComputed || {}).data),
			hashify((consoleErrorsComputed || {}).errors),
			hashify(timezoneComputed),
			hashify(clientRectsComputed),
			hashify([
				(clientRectsComputed || {}).elementBoundingClientRect,
				(clientRectsComputed || {}).elementClientRects,
				(clientRectsComputed || {}).rangeBoundingClientRect,
				(clientRectsComputed || {}).rangeClientRects
			]),
			hashify(offlineAudioContextComputed),
			hashify(fontsComputed),
			hashify(workerScopeComputed),
			hashify(mediaComputed),
			hashify((mediaComputed || {}).mimeTypes),
			hashify(navigatorComputed),
			hashify(liesComputed),
			hashify(trashComputed),
			hashify(capturedErrorsComputed),
			hashify(svgComputed),
			hashify(resistanceComputed),
			hashify(intlComputed),
			hashify(featuresComputed),
			hashify((() => {
				const {
					bluetoothAvailability,
					device,
					deviceMemory,
					hardwareConcurrency,
					maxTouchPoints,
					oscpu,
					platform,
					system,
					userAgentData,
				} = navigatorComputed || {}
				const {
					architecture,
					bitness,
					mobile,
					model,
					platform: uaPlatform,
					platformVersion,
				} = userAgentData || {}
				const { anyPointer } = cssMediaComputed || {}
				const { colorDepth, pixelDepth, height, width  } = screenComputed || {}
				const { location, locationEpoch, zone  } = timezoneComputed || {}
				const {
					deviceMemory: deviceMemoryWorker,
					hardwareConcurrency: hardwareConcurrencyWorker,
					gpu,
					platform: platformWorker,
					system: systemWorker,
					timezoneLocation: locationWorker,
					userAgentData: userAgentDataWorker
				} = workerScopeComputed || {}
				const { compressedGPU, confidence } = gpu || {}
				const {
					architecture: architectureWorker,
					bitness: bitnessWorker,
					mobile: mobileWorker,
					model: modelWorker,
					platform: uaPlatformWorker,
					platformVersion: platformVersionWorker,
				} = userAgentDataWorker || {}

				return [
					anyPointer,
					architecture,
					architectureWorker,
					bitness,
					bitnessWorker,
					bluetoothAvailability,
					colorDepth,
					...(compressedGPU && confidence != 'low' ? [compressedGPU] : []),
					device,
					deviceMemory,
					deviceMemoryWorker,
					hardwareConcurrency,
					hardwareConcurrencyWorker,
					height,
					location,
					locationWorker,
					locationEpoch,
					maxTouchPoints,
					mobile,
					mobileWorker,
					model,
					modelWorker,
					oscpu,
					pixelDepth,
					platform,
					platformWorker,
					platformVersion,
					platformVersionWorker,
					system,
					systemWorker,
					uaPlatform,
					uaPlatformWorker,
					width,
					zone
				]
			})())
		]).catch(error => console.error(error.message))

		//console.log(performance.now()-start)
		const hashTimeEnd = hashStartTime()
		const timeEnd = timeStart()

		console.log(`Hashing complete in ${(hashTimeEnd).toFixed(2)}ms`)

		if (parentPhantom) {
			parentPhantom.parentNode.removeChild(parentPhantom)
		}

		const fingerprint = {
			workerScope: !workerScopeComputed ? undefined : { ...workerScopeComputed, $hash: workerHash},
			navigator: !navigatorComputed ? undefined : {...navigatorComputed, $hash: navigatorHash},
			windowFeatures: !windowFeaturesComputed ? undefined : {...windowFeaturesComputed, $hash: windowHash},
			headless: !headlessComputed ? undefined : {...headlessComputed, $hash: headlessHash},
			htmlElementVersion: !htmlElementVersionComputed ? undefined : {...htmlElementVersionComputed, $hash: htmlHash},
			cssMedia: !cssMediaComputed ? undefined : {...cssMediaComputed, $hash: cssMediaHash},
			css: !cssComputed ? undefined : {...cssComputed, $hash: cssHash},
			screen: !screenComputed ? undefined : {...screenComputed, $hash: screenHash},
			voices: !voicesComputed ? undefined : {...voicesComputed, $hash: voicesHash},
			media: !mediaComputed ? undefined : {...mediaComputed, $hash: mediaHash},
			canvas2d: !canvas2dComputed ? undefined : {...canvas2dComputed, $hash: canvas2dHash},
			canvasWebgl: !canvasWebglComputed ? undefined : {...canvasWebglComputed, pixels: pixelsHash, pixels2: pixels2Hash, $hash: canvasWebglHash},
			maths: !mathsComputed ? undefined : {...mathsComputed, $hash: mathsHash},
			consoleErrors: !consoleErrorsComputed ? undefined : {...consoleErrorsComputed, $hash: consoleErrorsHash},
			timezone: !timezoneComputed ? undefined : {...timezoneComputed, $hash: timezoneHash},
			clientRects: !clientRectsComputed ? undefined : {...clientRectsComputed, $hash: rectsHash},
			offlineAudioContext: !offlineAudioContextComputed ? undefined : {...offlineAudioContextComputed, $hash: audioHash},
			fonts: !fontsComputed ? undefined : {...fontsComputed, $hash: fontsHash},
			lies: !liesComputed ? undefined : {...liesComputed, $hash: liesHash},
			trash: !trashComputed ? undefined : {...trashComputed, $hash: trashHash},
			capturedErrors: !capturedErrorsComputed ? undefined : {...capturedErrorsComputed, $hash: errorsHash},
			svg: !svgComputed ? undefined : {...svgComputed, $hash: svgHash },
			resistance: !resistanceComputed ? undefined : {...resistanceComputed, $hash: resistanceHash},
			intl: !intlComputed ? undefined : {...intlComputed, $hash: intlHash},
			features: !featuresComputed ? undefined : {...featuresComputed, $hash: featuresHash},
		}
		return {
			fingerprint,
			styleSystemHash,
			styleHash,
			domRectHash,
			mimeTypesHash,
			canvas2dImageHash,
			canvasWebglImageHash,
			canvas2dBlobHash,
			canvas2dPaintHash,
			canvas2dTextHash,
			canvas2dEmojiHash,
			canvasWebglParametersHash,
			deviceOfTimezoneHash,
			timeEnd
		}
	}

	// fingerprint and render
	const {
		fingerprint: fp,
		styleSystemHash,
		styleHash,
		domRectHash,
		mimeTypesHash,
		canvas2dImageHash,
		canvas2dBlobHash,
		canvas2dPaintHash,
		canvas2dTextHash,
		canvas2dEmojiHash,
		canvasWebglImageHash,
		canvasWebglParametersHash,
		deviceOfTimezoneHash,
		timeEnd
	} = await fingerprint().catch(error => console.error(error))

	console.log('%c✔ loose fingerprint passed', 'color:#4cca9f')

	console.groupCollapsed('Loose Fingerprint')
	console.log(fp)
	console.groupEnd()

	console.groupCollapsed('Loose Fingerprint JSON')
	console.log('diff check at https://www.diffchecker.com/diff\n\n', JSON.stringify(fp, null, '\t'))
	console.groupEnd()

	// Trusted Fingerprint
	const trashLen = fp.trash.trashBin.length
	const liesLen = !('totalLies' in fp.lies) ? 0 : fp.lies.totalLies
	const errorsLen = fp.capturedErrors.data.length

	// limit to known audio
	const { offlineAudioContext } = fp || {}
	const { compressorGainReduction, sampleSum } = offlineAudioContext || {}
	const knownSums = getKnownAudio()[compressorGainReduction]
	const unknownAudio = (
		sampleSum && compressorGainReduction && knownSums && !knownSums.includes(sampleSum)
	)
	const unknownFirefoxAudio = isFirefox && unknownAudio

	const hardenEntropy = (workerScope, prop) => {
		return (
			!workerScope ? prop :
				(workerScope.localeEntropyIsTrusty && workerScope.localeIntlEntropyIsTrusty) ? prop :
					undefined
		)
	}

	const privacyResistFingerprinting = (
		fp.resistance && /^(tor browser|firefox)$/i.test(fp.resistance.privacy)
	)

	// harden gpu
	const hardenGPU = canvasWebgl => {
		const { gpu: { confidence, compressedGPU } } = canvasWebgl
		return (
			confidence == 'low' ? {} : {
				UNMASKED_RENDERER_WEBGL: compressedGPU,
				UNMASKED_VENDOR_WEBGL: canvasWebgl.parameters.UNMASKED_VENDOR_WEBGL
			}
		)
	}

	const creep = {
		navigator: (
			!fp.navigator || fp.navigator.lied ? undefined : {
				bluetoothAvailability: fp.navigator.bluetoothAvailability,
				device: fp.navigator.device,
				deviceMemory: fp.navigator.deviceMemory,
				hardwareConcurrency: fp.navigator.hardwareConcurrency,
				// distrust language if worker locale is not trusty
				language: hardenEntropy(fp.workerScope, fp.navigator.language),
				maxTouchPoints: fp.navigator.maxTouchPoints,
				mimeTypes: fp.navigator.mimeTypes,
				oscpu: fp.navigator.oscpu,
				platform: fp.navigator.platform,
				plugins: fp.navigator.plugins,
				system: fp.navigator.system,
				userAgentData: {
					...(fp.navigator.userAgentData || {}),
					// loose
					brandsVersion: undefined,
					uaFullVersion: undefined
				},
				vendor: fp.navigator.vendor
			}
		),
		screen: (
			!fp.screen || fp.screen.lied || privacyResistFingerprinting ? undefined :
				hardenEntropy(
					fp.workerScope, {
						height: fp.screen.height,
						width: fp.screen.width,
						pixelDepth: fp.screen.pixelDepth,
						colorDepth: fp.screen.colorDepth,
						lied: fp.screen.lied
					}
				)
		),
		workerScope: !fp.workerScope || fp.workerScope.lied ? undefined : {
			deviceMemory: (
				braveFingerprintingBlocking ? undefined : fp.workerScope.deviceMemory
			),
			hardwareConcurrency: (
				braveFingerprintingBlocking ? undefined : fp.workerScope.hardwareConcurrency
			),
			// system locale in blink
			language: fp.workerScope.language,
			languages: fp.workerScope.languages,
			platform: fp.workerScope.platform,
			system: fp.workerScope.system,
			device: fp.workerScope.device,
			timezoneLocation: hardenEntropy(fp.workerScope, fp.workerScope.timezoneLocation),
			webglRenderer: (
				(fp.workerScope.gpu.confidence != 'low') ? fp.workerScope.gpu.compressedGPU : undefined
			),
			webglVendor: (
				(fp.workerScope.gpu.confidence != 'low') ? fp.workerScope.webglVendor : undefined
			),
			userAgentData: {
				...fp.workerScope.userAgentData,
				// loose
				brandsVersion: undefined,
				uaFullVersion: undefined
			},
		},
		media: fp.media,
		canvas2d: (canvas2d => {
			if (!canvas2d) {
				return
			}
			const { lied, liedTextMetrics } = canvas2d
			let data
			if (!lied) {
				const { dataURI, paintURI, textURI, emojiURI, blob, blobOffscreen } = canvas2d
				data = {
					lied,
					...{ dataURI, paintURI, textURI, emojiURI, blob, blobOffscreen }
				}
			}
			if (!liedTextMetrics) {
				const { textMetricsSystemSum, emojiSet } = canvas2d
				data = {
					...(data || {}),
					...{ textMetricsSystemSum, emojiSet }
				}
			}
			return data
		})(fp.canvas2d),
		canvasWebgl: !fp.canvasWebgl ? undefined : (
			braveFingerprintingBlocking ? {
				parameters: {
					...getBraveUnprotectedParameters(fp.canvasWebgl.parameters),
					...hardenGPU(fp.canvasWebgl)
				}
			} : fp.canvasWebgl.lied ? undefined : {
				...((gl , canvas2d) => {
					if (canvas2d && canvas2d.lied) {
						// distrust images
						const { extensions, gpu, lied, parameterOrExtensionLie } = gl
						return {
							extensions,
							gpu,
							lied,
							parameterOrExtensionLie,
						}
					}
					return gl
				})(fp.canvasWebgl, fp.canvas2d),
				parameters: {
					...fp.canvasWebgl.parameters,
					...hardenGPU(fp.canvasWebgl)
				}
			}
		),
		cssMedia: !fp.cssMedia ? undefined : {
			reducedMotion: caniuse(() => fp.cssMedia.mediaCSS['prefers-reduced-motion']),
			colorScheme: (
				braveFingerprintingBlocking ? undefined :
				caniuse(() => fp.cssMedia.mediaCSS['prefers-color-scheme'])
			),
			monochrome: caniuse(() => fp.cssMedia.mediaCSS.monochrome),
			invertedColors: caniuse(() => fp.cssMedia.mediaCSS['inverted-colors']),
			forcedColors: caniuse(() => fp.cssMedia.mediaCSS['forced-colors']),
			anyHover: caniuse(() => fp.cssMedia.mediaCSS['any-hover']),
			hover: caniuse(() => fp.cssMedia.mediaCSS.hover),
			anyPointer: caniuse(() => fp.cssMedia.mediaCSS['any-pointer']),
			pointer: caniuse(() => fp.cssMedia.mediaCSS.pointer),
			colorGamut: caniuse(() => fp.cssMedia.mediaCSS['color-gamut']),
			screenQuery: privacyResistFingerprinting ? undefined : hardenEntropy(fp.workerScope, caniuse(() => fp.cssMedia.screenQuery)),
		},
		css: !fp.css ? undefined : {
			interfaceName: caniuse(() => fp.css.computedStyle.interfaceName),
			system: caniuse(() => fp.css.system)
		},
		maths: !fp.maths || fp.maths.lied ? undefined : fp.maths,
		consoleErrors: fp.consoleErrors,
		timezone: !fp.timezone || fp.timezone.lied ? undefined : {
			locationMeasured: hardenEntropy(fp.workerScope, fp.timezone.locationMeasured),
			lied: fp.timezone.lied
		},
		svg: !fp.svg || fp.svg.lied ? undefined : fp.svg,
		clientRects: !fp.clientRects || fp.clientRects.lied ? undefined : fp.clientRects,
		offlineAudioContext: !fp.offlineAudioContext ? undefined : (
			braveFingerprintingBlocking ? {
				values: fp.offlineAudioContext.values,
				compressorGainReduction: fp.offlineAudioContext.compressorGainReduction
			} :
				fp.offlineAudioContext.lied || unknownFirefoxAudio ? undefined :
					fp.offlineAudioContext
		),
		fonts: !fp.fonts || fp.fonts.lied ? undefined : fp.fonts,
		// skip trash since it is random
		capturedErrors: !!errorsLen,
		lies: !!liesLen,
		resistance: fp.resistance || undefined,
		forceRenew: 1650847106767
	}

	console.log('%c✔ stable fingerprint passed', 'color:#4cca9f')

	console.groupCollapsed('Stable Fingerprint')
	console.log(creep)
	console.groupEnd()

	console.groupCollapsed('Stable Fingerprint JSON')
	console.log('diff check at https://www.diffchecker.com/diff\n\n', JSON.stringify(creep, null, '\t'))
	console.groupEnd()

	// get/post request
	const webapp = 'https://awesome-9c938.web.app/fp'

	const [fpHash, creepHash] = await Promise.all([hashify(fp), hashify(creep)])
	.catch(error => {
		console.error(error.message)
	})

	// expose results to the window
	window.Fingerprint = JSON.parse(JSON.stringify(fp))
	window.Creep = JSON.parse(JSON.stringify(creep))

	// session
	const computeSession = ({ fingerprint, loading = false, computePreviousLoadRevision = false }) => {
		const data = {
			revisedKeysFromPreviousLoad: [],
			revisedKeys: [],
			initial: undefined,
			loads: undefined
		}
		try {
			const currentFingerprint = Object.keys(fingerprint).reduce((acc, key) => {
				if (!fingerprint[key]) {
					return acc
				}
				acc[key] = fingerprint[key].$hash
				return acc
			}, {})
			const loads = +(sessionStorage.getItem('loads'))
			const initialFingerprint = JSON.parse(sessionStorage.getItem('initialFingerprint'))
			const previousFingerprint = JSON.parse(sessionStorage.getItem('previousFingerprint'))
			if (initialFingerprint) {
				data.initial = hashMini(initialFingerprint)
				if (loading) {
					data.loads = 1+loads
					sessionStorage.setItem('loads', data.loads)
				}
				else {
					data.loads =  loads
				}

				if (computePreviousLoadRevision) {
					sessionStorage.setItem('previousFingerprint', JSON.stringify(currentFingerprint))
				}

				const currentFingerprintKeys =  Object.keys(currentFingerprint)
				const revisedKeysFromPreviousLoad = currentFingerprintKeys
					.filter(key => currentFingerprint[key] != previousFingerprint[key])

				const revisedKeys = currentFingerprintKeys
					.filter(key => currentFingerprint[key] != initialFingerprint[key])

				data.revisedKeys = revisedKeys.length ? revisedKeys : []
				data.revisedKeysFromPreviousLoad = revisedKeysFromPreviousLoad.length ? revisedKeysFromPreviousLoad : []
				return data
			}
			sessionStorage.setItem('initialFingerprint', JSON.stringify(currentFingerprint))
			sessionStorage.setItem('previousFingerprint', JSON.stringify(currentFingerprint))
			sessionStorage.setItem('loads', 1)
			data.initial = hashMini(currentFingerprint)
			data.loads = 1
			return data
		}
		catch (error) {
			console.error(error)
			return data
		}
	}

	// patch dom
	const hashSlice = x => !x ? x : x.slice(0, 8)
	const templateImports = {
		imports,
		fp,
		hashSlice,
		hashMini,
		note,
		modal,
		count,
		getDiffs,
		patch,
		html,
		styleSystemHash,
		computeWindowsRelease,
		formatEmojiSet,
		performanceLogger,
		cssFontFamily
	}
	const hasTrash = !!trashLen
	const { lies: hasLied, capturedErrors: hasErrors } = creep

	const getBlankIcons = () => `<span class="icon"></span><span class="icon"></span>`
	const el = document.getElementById('fingerprint-data')
	patch(el, html`
	<div id="fingerprint-data">
		<div class="fingerprint-header-container">
			<div class="fingerprint-header">
				<div class="ellipsis-all">FP ID: ${creepHash}</div>
				<div id="fuzzy-fingerprint">
					<div class="ellipsis-all fuzzy-fp">Fuzzy: <span class="blurred-pause">0000000000000000000000000000000000000000000000000000000000000000</span></div>
					<div class="ellipsis-all fuzzy-diffs">Diffs: <span class="blurred-pause">0000000000000000000000000000000000000000000000000000000000000000</span></div>
				</div>
				<div class="ellipsis"><span class="time">${timeEnd.toFixed(2)} ms</span></div>
			</div>
		</div>
		<div id="creep-browser" class="visitor-info">
			<div class="flex-grid">
				<div class="col-six">
					<strong id="loader">Loading...</strong>
					<div>trust score: <span class="blurred">100%</span></div>
					<div>visits: <span class="blurred">1</span></div>
					<div>first: <span class="blurred">##/##/####, 00:00:00 AM</span></div>
					<div>alive: <span class="blurred">0.0 hrs</span></div>
					<div id="auto-delete">auto-delete in</div>
					<div>shadow: <span class="blurred">0.00000</span></div>
					<div class="block-text shadow-icon"></div>
				</div>
				<div class="col-six">
					<div>trash (0): none</div>
					<div>lies (0): none</div>
					<div>errors (0): none</div>
					<div>session (0): <span class="blurred">00000000</span></div>
					<div>revisions (0): <span class="blurred">00000000</span></div>
					<div>loose fp (0): <span class="blurred">00000000</span></div>
					<div class="block-text">
						<div class="blurred">bot: 0:friend:00000</div>
						<div class="blurred">idle min-max: 0.000-0.000 hrs</div>
						<div class="blurred">performance benchmark: 0.00 ms</div>
					</div>
					<div id="signature"></div>
				</div>
			</div>
		</div>
		<div id="browser-detection" class="flex-grid">
			<div class="col-six">
				<strong>Loading...</strong>
				<div>${getBlankIcons()}</div>
				<div>${getBlankIcons()}<span class="user-agent">self</span></div>
				<div>${getBlankIcons()}system styles</div>
				<div>${getBlankIcons()}computed styles</div>
				<div>${getBlankIcons()}html element</div>
				<div>${getBlankIcons()}js runtime</div>
				<div>${getBlankIcons()}js engine</div>
				<div>${getBlankIcons()}domRect emojis</div>
				<div>${getBlankIcons()}domRect</div>
				<div>${getBlankIcons()}svg emojis</div>
				<div>${getBlankIcons()}mimeTypes</div>
				<div>${getBlankIcons()}audio</div>
				<div>${getBlankIcons()}canvas image</div>
				<div>${getBlankIcons()}canvas blob</div>
				<div>${getBlankIcons()}canvas paint</div>
				<div>${getBlankIcons()}canvas text</div>
				<div>${getBlankIcons()}canvas emoji</div>
				<div>${getBlankIcons()}textMetrics</div>
				<div>${getBlankIcons()}webgl</div>
				<div>${getBlankIcons()}gpu params</div>
				<div>${getBlankIcons()}gpu model</div>
				<div>${getBlankIcons()}fonts</div>
				<div>${getBlankIcons()}voices</div>
				<div>${getBlankIcons()}screen</div>
				<div>${getBlankIcons()}resistance</div>
				<div>${getBlankIcons()}device of timezone</div>
			</div>
			<div class="col-six icon-prediction-container">
			</div>
		</div>
		<div id="webrtc-connection" class="flex-grid">
			<div class="col-six">
				<strong>WebRTC</strong>
				<div>host connection:</div>
				<div class="block-text"></div>
			</div>
			<div class="col-six">
				<div>capabilities:</div>
				<div>stun connection:</div>
				<div class="block-text"></div>
			</div>
		</div>
		<div class="flex-grid">
			${timezoneHTML(templateImports)}
			${intlHTML(templateImports)}
		</div>
		<div id="headless-resistance-detection-results" class="flex-grid">
			${headlesFeaturesHTML(templateImports)}
			${resistanceHTML(templateImports)}
		</div>
		<div class="flex-grid relative">${workerScopeHTML(templateImports)}</div>
		<div class="flex-grid relative">
			${webglHTML(templateImports)}
			${screenHTML(templateImports)}
		</div>
		<div class="flex-grid">
			${canvasHTML(templateImports)}
			${fontsHTML(templateImports)}
		</div>
		<div class="flex-grid">
			${clientRectsHTML(templateImports)}
			${svgHTML(templateImports)}
		</div>
		<div class="flex-grid">
			${audioHTML(templateImports)}
			${voicesHTML(templateImports)}
			${mediaHTML(templateImports)}
		</div>
		<div class="flex-grid relative">${featuresHTML(templateImports)}</div>
		<div class="flex-grid">
			${cssMediaHTML(templateImports)}
			${cssHTML(templateImports)}
		</div>
		<div>
			<div class="flex-grid">
				${mathsHTML(templateImports)}
				${consoleErrorsHTML(templateImports)}
			</div>
			<div class="flex-grid">
				${windowFeaturesHTML(templateImports)}
				${htmlElementVersionHTML(templateImports)}
			</div>
		</div>
		<div class="flex-grid relative">${navigatorHTML(templateImports)}</div>
		<div>
			<strong>Tests</strong>
			<div>
				<a class="tests" href="./tests/workers.html">Workers</a>
				<br><a class="tests" href="./tests/iframes.html">Iframes</a>
				<br><a class="tests" href="./tests/fonts.html">Fonts</a>
				<br><a class="tests" href="./tests/timezone.html">Timezone</a>
				<br><a class="tests" href="./tests/window.html">Window Version</a>
				<br><a class="tests" href="./tests/screen.html">Screen</a>
				<br><a class="tests" href="./tests/prototype.html">Prototype</a>
				<br><a class="tests" href="./tests/domrect.html">DOMRect</a>
				<br><a class="tests" href="./tests/emojis.html">Emojis</a>
				<br><a class="tests" href="./tests/math.html">Math</a>
				<br><a class="tests" href="./tests/machine.html">Machine</a>
				<br><a class="tests" href="./tests/extensions.html">Chrome Extensions</a>
			</div>
		</div>
	</div>
	`, async () => {

		// get WebRTC data
		getWebRTCData().then(data => {
			patch(document.getElementById('webrtc-connection'), html`
				<div class="flex-grid">
					${webrtcHTML(data, templateImports)}
				</div>
			`)

		})

		// fetch fingerprint data from server
		const id = 'creep-browser'
		const visitorElem = document.getElementById(id)
		const { botHash, badBot } = getBotHash(fp, { getFeaturesLie, computeWindowsRelease })
		const fuzzyFingerprint = await getFuzzyHash(fp)
		const { privacy, security, mode, extension } = fp.resistance || {}
		const resistanceSet = new Set([privacy, (mode ? `(${mode})` : mode), extension])
		resistanceSet.delete()
		const resistanceType = [...resistanceSet].join(' ')
		const fetchVisitorDataTimer = timer()
		const request = `${webapp}?id=${creepHash}&subId=${fpHash}&hasTrash=${hasTrash}&hasLied=${hasLied}&hasErrors=${hasErrors}&trashLen=${trashLen}&liesLen=${liesLen}&errorsLen=${errorsLen}&fuzzy=${fuzzyFingerprint}&botHash=${botHash}&perf=${timeEnd.toFixed(2)}&resistance=${resistanceType}`

		fetch(request)
		.then(response => response.json())
		.then(async data => {
			console.groupCollapsed('Server Response')
			console.log(JSON.stringify(data, null, '\t'))
			fetchVisitorDataTimer('response time')
			console.groupEnd()

			const {
				firstVisit,
				lastVisit: latestVisit,
				lastVisitEpoch,
				timeHoursAlive: persistence,
				looseFingerprints: subIds,
				visits,
				looseSwitchCount: switchCount,
				hasTrash,
				hasLied,
				hasErrors,
				signature,
				fuzzyInit,
				fuzzyLast,
				shadow,
				shadowBits,
				score,
				scoreData,
				crowdBlendingScore: fpCrowdBlendingScore,
				bot,
				botHash,
				botLevel,
				timeHoursIdleMin,
				timeHoursIdleMax,
				benchmark,
				resistance: resistanceId
			} = data || {}

			const fuzzyFpEl = document.getElementById('fuzzy-fingerprint')
			const fuzzyDiff = getDiffs({
				stringA: fuzzyInit,
				stringB: fuzzyLast,
				charDiff: true,
				decorate: diff => `<span class="fuzzy-fp">${diff}</span>`
			})
			patch(fuzzyFpEl, html`
				<div id="fuzzy-fingerprint">
					<div class="ellipsis-all fuzzy-fp">Fuzzy: <span class="unblurred">${fuzzyInit}</span></div>
					<div class="ellipsis-all fuzzy-diffs">Diffs: <span class="unblurred">${fuzzyDiff}</span></div>
				</div>
			`)

			const toLocaleStr = str => {
				const date = new Date(str)
				const dateString = date.toLocaleDateString()
				const timeString = date.toLocaleTimeString()
				return `${dateString}, ${timeString}`
			}

			const {
				switchCountPointGain,
				errorsPointGain,
				trashPointGain,
				liesPointGain,
				shadowBitsPointGain,
				grade,
			} = JSON.parse(scoreData)

			const computePoints = x => {
				return `<span class="scale-up grade-${x < 0 ? 'F' : x > 0 ? 'A' : ''}">${
					x > 0 ? `+${x}` : x < 0 ? `${x}` : ''
				}</span>`
			}

			const renewedDate = new Date(creep.forceRenew)
			const renewedDateString = `${renewedDate.getMonth()+1}/${renewedDate.getDate()}/${renewedDate.getFullYear()}`
			const addDays = (date, n) => {
				const d = new Date(date)
				d.setDate(d.getDate() + n)
				return d
			}

			const shouldStyle = renewedDateString => {
				const endNoticeDate = addDays(renewedDateString, 7)
				const daysRemaining = Math.round((+endNoticeDate - +new Date()) / (1000 * 3600 * 24))
				return daysRemaining >= 0
			}

			const getChunks = (list, chunkLen) => list.reduce((acc, x, i) => {
				const chunk = Math.floor(i/chunkLen)
				acc[chunk] = [...(acc[chunk]||[]), x]
				return acc
			}, [])
			const styleChunks = chunks => chunks.map((y,yi) => {
				const animate = n => `animation: balloon ${3*n}00ms ${6*n}00ms cubic-bezier(.47,.47,.56,1.26) alternate infinite`
				return `<div>${
					y.map((x,  xi) => `<span class="${x == '1' ? 'shadow' : 'blank'}" style="${x == 1 ? animate(xi+yi): ''}"></span>`).join('')
				}</div>`
			}).join('')

			const { initial, loads, revisedKeys } = computeSession({ fingerprint: fp, loading: true })

			const template = `
				<div class="visitor-info">
					<span class="time">fingerprints renewed <span class="${shouldStyle(renewedDateString) ? 'renewed' : ''}">${
						new Date(renewedDateString).toLocaleDateString()
					}</span></span>
					<div class="flex-grid relative">
						<span class="aside-note-bottom left">${resistanceId}</span>
						<div class="col-six">
							<strong>Browser</strong>
							<div>trust score: <span class="unblurred">
								${score}% <span class="scale-down grade-${grade.charAt(0)}">${grade}</span>
							</span></div>
							<div>visits: <span class="unblurred">${visits}</span></div>
							<div class="ellipsis">first: <span class="unblurred">${toLocaleStr(firstVisit)}</span></div>
							<div>alive: <span class="unblurred">${(hours => {
								const format = n => {
									const fixed = n.toFixed(1)
									const shouldMakeNumberWhole = /\.0/.test(fixed)
									return shouldMakeNumberWhole ? n.toFixed() : fixed
								}
								return (
									hours > 48 ? `${format(hours/24)} days` : `${format(hours)} hrs`
								)
							})(persistence)}</span></div>
							<div id="auto-delete">auto-delete in</div>
							<div class="relative">shadow: <span class="unblurred">${!shadowBits ? '0' : shadowBits.toFixed(5)}</span>  ${computePoints(shadowBitsPointGain)}
							${
								!shadowBits ? '' : `<span class="confidence-note">${hashMini(shadow)}</span>`
							}
							</div>
							<div class="block-text shadow-icon help" title="fuzzy diff history">
								${styleChunks(getChunks(shadow.split(''), 8))}
							</div>
						</div>
						<div class="col-six">
							${trashHTML(templateImports, computePoints(trashPointGain))}
							${liesHTML(templateImports, computePoints(liesPointGain))}
							${errorsHTML(templateImports, computePoints(errorsPointGain))}
							<div>session (${''+loads}):<span class="unblurred sub-hash">${initial}</span></div>
							<div>revisions (${''+revisedKeys.length}): ${
								!revisedKeys.length ? 'none' : modal(
									`creep-revisions`,
									revisedKeys.join('<br>'),
									hashMini(revisedKeys)
								)
							}
							<div class="ellipsis">loose fp (${''+switchCount}):<span class="unblurred sub-hash">${hashSlice(fpHash)}</span> ${computePoints(switchCountPointGain)}</div>

							<div class="block-text">
								<div class="unblurred">bot: ${bot.toFixed(2)}:${botLevel}:${botHash}</div>
								<div class="unblurred">idle min-max: ${timeHoursIdleMin}-${timeHoursIdleMax} hrs</div>
								<div class="unblurred">performance benchmark: ${benchmark.toFixed(2)} ms</div>
							</div>

							${
								signature ?
								`
								<div class="fade-right-in" id="signature">
									<div class="ellipsis"><strong>signed</strong>: <span>${signature}</span></div>
								</div>
								` :
								`<form class="fade-right-in" id="signature">
									<input id="signature-input" type="text" placeholder="add a signature" title="sign this fingerprint" required minlength="4" maxlength="64">
									<input type="submit" value="Sign">
								</form>
								`
							}
						</div>
					</div>
				</div>
			`
			patch(visitorElem, html`${template}`, () => {

				// show self destruct time
				const el = document.getElementById('auto-delete')
				const arrivalTime = +new Date
				const showTime = () => {
					requestAnimationFrame(showTime)
					const hoursInMs = 36e5
					const day = hoursInMs * 24
					const destructionDate = +new Date(+new Date-(day*30))
					const hoursTillSelfDestruct = Math.abs(arrivalTime - destructionDate) / hoursInMs/24
					return el.style.setProperty(
						'--auto-delete-time',
						`'${hoursTillSelfDestruct.toFixed(8)}'`
					)
				}
				showTime()

				// listen to form signature if not already signed
				if (signature) {
					return
				}
				const form = document.getElementById('signature')
				form.addEventListener('submit', async () => {
					event.preventDefault()

					const input = document.getElementById('signature-input').value
					const submit = confirm(`Are you sure? This cannot be undone.\n\nsignature: ${input}`)

					if (!submit) {
						return
					}

					const signatureRequest = `https://awesome-9c938.web.app/sign?id=${creepHash}&signature=${input}`

					// animate out
					form.classList.remove('fade-right-in')
					form.classList.add('fade-down-out')

					// fetch/animate in
					return fetch(signatureRequest)
					.then(response => response.json())
					.then(data => {
						return setTimeout(() => {
							patch(form, html`
								<div class="fade-right-in" id="signature">
									<div class="ellipsis"><strong>signed</strong>: <span>${input}</span></div>
								</div>
							`)
							return console.log('Signed: ', JSON.stringify(data, null, '\t'))
						}, 300)
					})
					.catch(error => {
						patch(form, html`
							<div class="fade-right-in" id="signature">
								<div class="ellipsis"><strong style="color:crimson">${error}</strong></div>
							</div>
						`)
						return console.error('Error!', error.message)
					})
				})
			})

			const {
				maths,
				consoleErrors,
				htmlElementVersion,
				windowFeatures,
				css,
				clientRects,
				offlineAudioContext,
				resistance,
				canvas2d,
				canvasWebgl,
				screen: screenFp,
				fonts,
				voices,
				svg,
				media
			} = fp || {}
			const {
				computedStyle,
				system
			} = css || {}
			const isTorBrowser = resistance.privacy == 'Tor Browser'
			const isRFP = resistance.privacy == 'Firefox'
			const isBravePrivacy = resistance.privacy == 'Brave'

			const screenMetrics = (
				!screenFp || screenFp.lied || isRFP || isTorBrowser ? 'undefined' :
					`${screenFp.width}x${screenFp.height}`
			)
			const {
				compressorGainReduction: gain,
				sampleSum,
				floatFrequencyDataSum: freqSum,
				floatTimeDomainDataSum: timeSum,
				values: audioValues
			} = offlineAudioContext || {}
			const valuesHash = hashMini(audioValues)
			const audioMetrics = `${sampleSum}_${gain}_${freqSum}_${timeSum}_${valuesHash}`

			const getBestGPUModel = ({ canvasWebgl, workerScope }) => {
				const gpuHasGoodConfidence = data => {
					return (
						(data.gpu || {}).confidence &&
						(data.gpu.confidence != 'low')
					)
				}
				if (!canvasWebgl || canvasWebgl.parameterOrExtensionLie) {
					return 'undefined'
				}
				else if (workerScope && gpuHasGoodConfidence(workerScope)) {
					return workerScope.webglRenderer
				}
				else if (canvasWebgl && !canvasWebgl.parameterOrExtensionLie && gpuHasGoodConfidence(canvasWebgl)) {
					return ''+((canvasWebgl.parameters || {}).UNMASKED_RENDERER_WEBGL)
				}
				return 'undefined'
			}
			const gpuModel = encodeURIComponent(
				getBestGPUModel({ canvasWebgl, workerScope: fp.workerScope })
			)

			if (!badBot) {
				// get data from session
				let decryptionData = window.sessionStorage && JSON.parse(sessionStorage.getItem('decryptionData'))
				const targetMetrics = [
					'canvas2d',
					'canvasWebgl',
					'clientRects',
					'consoleErrors',
					'css',
					'cssMedia',
					'fonts',
					'htmlElementVersion',
					'maths',
					'media',
					'navigator',
					'offlineAudioContext',
					'resistance',
					'screen',
					'svg',
					'timezone',
					'voices',
					'windowFeatures',
					'workerScope',
					/* disregard metrics not in samples:
						capturedErrors,
						features,
						headless,
						intl,
						lies,
						trash,
					*/
				]
				const { revisedKeysFromPreviousLoad } = computeSession({
					fingerprint: fp,
					computePreviousLoadRevision: true
				})
				const sessionFingerprintRevision = targetMetrics.filter(x => revisedKeysFromPreviousLoad.includes(x))
				const revisionLen = sessionFingerprintRevision.length
				// fetch data
				const requireNewDecryptionFetch = !decryptionData || revisionLen
				console.log(`${revisionLen} revisions: fetching prediction data from ${requireNewDecryptionFetch ? 'server' : 'session'}...`)

				if (requireNewDecryptionFetch) {
					const sender = {
						e: 3.141592653589793 ** -100,
						l: +new Date('7/1/1113')
					}
					const { userAgent, userAgentData } = fp.workerScope || {}
					const { platformVersion: fontPlatformVersion } = fp.fonts || {}
					const restoredUA = getUserAgentRestored({ userAgent, userAgentData, fontPlatformVersion })
					const windows11UA = attemptWindows11UserAgent({
						userAgent,
						userAgentData,
						fontPlatformVersion
					})
					const workerScopeUserAgent = restoredUA || windows11UA
					if (restoredUA && (restoredUA != userAgent)) {
						console.log(`corrected: ${workerScopeUserAgent}`)
					}

					const decryptRequest = `https://awesome-9c938.web.app/decrypt?${[
						`sender=${sender.e}_${sender.l}`,
						`isTorBrowser=${isTorBrowser}`,
						`isRFP=${isRFP}`,
						`isBrave=${isBrave}`,
						`resistanceId=${resistance.$hash}`,
						`mathId=${maths.$hash}`,
						`errorId=${consoleErrors.$hash}`,
						`htmlId=${htmlElementVersion.$hash}`,
						`winId=${windowFeatures.$hash}`,
						`styleId=${styleHash}`,
						`styleSystemId=${styleSystemHash}`,
						`emojiId=${
							!clientRects || clientRects.lied ? 'undefined' :
								encodeURIComponent(clientRects.domrectSystemSum)
						}`,
						`domRectId=${!clientRects || clientRects.lied ? 'undefined' : domRectHash}`,
						`svgId=${
							!svg || svg.lied ? 'undefined' :
								encodeURIComponent(svg.svgrectSystemSum)
						}`,
						`mimeTypesId=${!media || media.lied ? 'undefined' : mimeTypesHash}`,
						`audioId=${
								!offlineAudioContext ||
								offlineAudioContext.lied ||
								unknownFirefoxAudio ? 'undefined' :
									audioMetrics
						}`,
						`canvasId=${
							!canvas2d || canvas2d.lied ? 'undefined' :
								canvas2dImageHash
						}`,
						`canvasBlobId=${
							!canvas2d || canvas2d.lied ? 'undefined' :
								canvas2dBlobHash
						}`,
						`canvasPaintId=${
							!canvas2d || canvas2d.lied ? 'undefined' :
								canvas2dPaintHash
						}`,
						`canvasTextId=${
							!canvas2d || canvas2d.lied ? 'undefined' :
								canvas2dTextHash
						}`,
						`canvasEmojiId=${
							!canvas2d || canvas2d.lied ? 'undefined' :
								canvas2dEmojiHash
						}`,
						`textMetricsId=${
							!canvas2d || canvas2d.liedTextMetrics || ((+canvas2d.textMetricsSystemSum) == 0) ? 'undefined' :
								encodeURIComponent(canvas2d.textMetricsSystemSum)
						}`,
						`webglId=${
							!canvasWebgl || (canvas2d || {}).lied || canvasWebgl.lied ? 'undefined' :
								canvasWebglImageHash
						}`,
						`gpuId=${
							!canvasWebgl || canvasWebgl.parameterOrExtensionLie ? 'undefined' :
								canvasWebglParametersHash
						}`,
						`gpu=${gpuModel}`,
						`fontsId=${!fonts || fonts.lied ? 'undefined' : fonts.$hash}`,
						`voicesId=${!voices || voices.lied ? 'undefined' : voices.$hash}`,
						`screenId=${screenMetrics}`,
						`deviceOfTimezoneId=${deviceOfTimezoneHash}`,
						`ua=${encodeURIComponent(workerScopeUserAgent)}`
					].join('&')}`

					const decryptionResponse = await fetch(decryptRequest)
						.catch(error => {
							console.error(error)
							predictionErrorPatch({error, patch, html})
							return
						})
					if (!decryptionResponse) {
						return
					}
					decryptionData = await decryptionResponse.json()
					if (decryptionData && window.sessionStorage) {
						sessionStorage.setItem('decryptionData', JSON.stringify(decryptionData))
					}
				}

				// Crowd-Blending Score
				const scoreKeys = [
					'windowVersion',
					'jsRuntime',
					'jsEngine',
					'htmlVersion',
					'styleVersion',
					'resistance',
					'styleSystem',
					'emojiSystem',
					'domRectSystem',
					'svgSystem',
					'mimeTypesSystem',
					'audioSystem',
					'canvasSystem',
					'canvasBlobSystem',
					'canvasPaintSystem',
					'canvasTextSystem',
					'canvasEmojiSystem',
					'textMetricsSystem',
					'webglSystem',
					'gpuSystem',
					'gpuModelSystem',
					'fontsSystem',
					'voicesSystem',
					'screenSystem',
					'deviceOfTimezone',
				]

				const decryptionDataScores = scoreKeys.reduce((acc, key) => {
					const { score } = decryptionData[key] || {}
					const reporters = (
						score == 36 ? 1:
						score == 84 ? 2 :
						score == 96 ? 3 :
						score == 100 ? 4 :
							0
					)
					acc.metrics = [...(acc.metrics||[]), { key, score: (score||0), reporters }]
					acc.scores = [...(acc.scores||[]), (score||0)]
					return acc
				}, {})

				const { metrics: scoreMetrics } = decryptionDataScores
				const scoreMetricsMap = Object.keys(scoreMetrics).reduce((acc, key) => {
					const scoreMetricData = scoreMetrics[key]
					const { score , reporters } = scoreMetricData
					acc[scoreMetricData.key] = { score, reporters }
					return acc
				}, {})

				const blockedOrOpenlyPoisonedMetric = decryptionDataScores.scores.includes(0)
				const validScores = decryptionDataScores.scores.filter(n => !!n)
				const crowdBlendingScoreMin = Math.min(...validScores)
				const crowdBlendingScore = blockedOrOpenlyPoisonedMetric ? (0.75 * crowdBlendingScoreMin) : crowdBlendingScoreMin

				console.groupCollapsed(`Crowd-Blending Score: ${crowdBlendingScore}%`)
					console.table(scoreMetricsMap)
				console.groupEnd()

				if (crowdBlendingScore != fpCrowdBlendingScore) {
					console.log(`updating crowd-blending score from ${fpCrowdBlendingScore} to ${crowdBlendingScore}`)
					const scoreRequest = `https://awesome-9c938.web.app/score-crowd-blending?id=${creepHash}&crowdBlendingScore=${crowdBlendingScore}`

					fetch(scoreRequest)
						.catch(error => console.error('Failed Score Request', error))
				}

				renderPrediction({
					decryptionData,
					crowdBlendingScore,
					patch,
					html,
					note
				})
			}

			// get GCD Samples
			const getSamples = async () => {
				const samples = window.sessionStorage && sessionStorage.getItem('samples')
				if (samples) {
					return {
						samples: JSON.parse(samples),
						samplesDidLoadFromSession: true
					}
				}
				const url = 'https://script.google.com/macros/s/AKfycbw26MLaK1PwIGzUiStwweOeVfl-sEmIxFIs5Ax7LMoP1Cuw-s0llN-aJYS7F8vxQuVG-A/exec'
				const cloudSamples = await fetch(url).then(res => res.json()).catch(error => {
					console.error(error)
					return
				})
				if (cloudSamples && window.sessionStorage) {
					sessionStorage.setItem('samples', JSON.stringify(cloudSamples))
				}
				return {
					samples: cloudSamples,
					samplesDidLoadFromSession: false
				}
			}

			const { samples: decryptionSamples, samplesDidLoadFromSession } = await getSamples()

			// prevent Error: value for argument "documentPath" must point to a document
			const cleanGPUString = x => !x ? x : (''+x).replace(/\//g,'')

			const {
				window: winSamples,
				math: mathSamples,
				error: errorSamples,
				html: htmlSamples,
				style: styleSamples,
				resistance: resistanceSamples,
				styleVersion: styleVersionSamples,
				emoji: emojiSamples,
				domRect: domRectSamples,
				svg: svgSamples,
				mimeTypes: mimeTypesSamples,
				audio: audioSamples,
				canvas: canvasSamples,
				canvasBlob: canvasBlobSamples,
				canvasPaint: canvasPaintSamples,
				canvasText: canvasTextSamples,
				canvasEmoji: canvasEmojiSamples,
				textMetrics: textMetricsSamples,
				webgl: webglSamples,
				fonts: fontsSamples,
				voices: voicesSamples,
				screen: screenSamples,
				gpu: gpuSamples,
				gpuModel: gpuModelSamples,
				deviceOfTimezone: deviceOfTimezoneSamples,
			} = decryptionSamples || {}

			if (badBot && !decryptionSamples) {
				predictionErrorPatch({error: 'Failed prediction fetch', patch, html})
			}

			if (badBot && decryptionSamples) {
				// Perform Dragon Fire Magic
				const decryptionData = {
					windowVersion: getPrediction({ hash: (windowFeatures || {}).$hash, data: winSamples }),
					jsRuntime: getPrediction({ hash: (maths || {}).$hash, data: mathSamples }),
					jsEngine: getPrediction({ hash: (consoleErrors || {}).$hash, data: errorSamples }),
					htmlVersion: getPrediction({ hash: (htmlElementVersion || {}).$hash, data: htmlSamples }),
					styleVersion: getPrediction({ hash: styleHash, data: styleVersionSamples }),
					styleSystem: getPrediction({ hash: styleSystemHash, data: styleSamples }),
					resistance: getPrediction({ hash: (resistance || {}).$hash, data: resistanceSamples }),
					emojiSystem: getPrediction({
						hash: (clientRects || {}).domrectSystemSum,
						data: emojiSamples
					}),
					domRectSystem: getPrediction({ hash: domRectHash, data: domRectSamples }),
					svgSystem: getPrediction({
						hash: (svg || {}).svgrectSystemSum,
						data: svgSamples
					}),
					mimeTypesSystem: getPrediction({ hash: mimeTypesHash, data: mimeTypesSamples }),
					audioSystem: getPrediction({ hash: audioMetrics, data: audioSamples }),
					canvasSystem: getPrediction({ hash: canvas2dImageHash, data: canvasSamples }),
					canvasBlobSystem: getPrediction({ hash: canvas2dBlobHash, data: canvasBlobSamples }),
					canvasPaintSystem: getPrediction({ hash: canvas2dPaintHash, data: canvasPaintSamples }),
					canvasTextSystem: getPrediction({ hash: canvas2dTextHash, data: canvasTextSamples }),
					canvasEmojiSystem: getPrediction({ hash: canvas2dEmojiHash, data: canvasEmojiSamples }),
					textMetricsSystem: getPrediction({
						hash: (canvas2d || {}).textMetricsSystemSum,
						data: textMetricsSamples
					}),
					webglSystem: getPrediction({ hash: canvasWebglImageHash, data: webglSamples }),
					gpuSystem: getPrediction({ hash: canvasWebglParametersHash, data: gpuSamples }),
					gpuModelSystem: getPrediction({ hash: cleanGPUString(gpuModel), data: gpuModelSamples }),
					fontsSystem: getPrediction({ hash: (fonts || {}).$hash, data: fontsSamples }),
					voicesSystem: getPrediction({ hash: (voices || {}).$hash, data: voicesSamples }),
					screenSystem: getPrediction({ hash: screenMetrics, data: screenSamples }),
					deviceOfTimezone: getPrediction({ hash: deviceOfTimezoneHash, data: deviceOfTimezoneSamples }),
				}

				renderPrediction({
					decryptionData,
					patch,
					html,
					note,
					bot: true
				})
			}

			// render entropy notes
			if (decryptionSamples) {
				const getEntropy = (hash, data) => {
					let classTotal = 0
					const metricTotal = Object.keys(data)
						.reduce((acc, key) => acc+= data[key].length, 0)
					const decryption = Object.keys(data).find(key => data[key].find(item => {
						if ((item.id == hash) && (item.reporterTrustScore > 36)) {
							const trustedSamples = data[key].filter(sample => {
								return (sample.reporterTrustScore > 36)
							})
							classTotal = trustedSamples.length
							return true
						}
						return false
					}))
					return {
						classTotal,
						decryption,
						metricTotal
					}
				}
				const entropyHash = {
					window: (windowFeatures || {}).$hash,
					math: (maths || {}).$hash,
					error: (consoleErrors || {}).$hash,
					html: (htmlElementVersion || {}).$hash,
					style: styleSystemHash,
					resistance: (resistance || {}).$hash,
					styleVersion: styleHash,
					emoji: (clientRects || {}).domrectSystemSum,
					domRect: domRectHash,
					svg: (svg || {}).svgrectSystemSum,
					mimeTypes: mimeTypesHash,
					audio: audioMetrics,
					canvas: canvas2dImageHash,
					canvasBlob: canvas2dBlobHash,
					canvasPaint: canvas2dPaintHash,
					canvasText: canvas2dTextHash,
					canvasEmoji: canvas2dEmojiHash,
					textMetrics: (canvas2d || {}).textMetricsSystemSum,
					webgl: canvasWebglImageHash,
					fonts: (fonts || {}).$hash,
					voices: (voices || {}).$hash,
					screen: screenMetrics,
					gpu: canvasWebglParametersHash,
					gpuModel,
					deviceOfTimezone: deviceOfTimezoneHash,
				}
				const entropyDescriptors = {
					window: 'window object',
					math: 'engine math runtime',
					error: 'engine console errors',
					html: 'html element',
					style: 'system styles',
					resistance: 'resistance patterns',
					styleVersion: 'computed styles',
					emoji: 'domrect emojis',
					domRect: 'domrect metrics',
					svg: 'svg emojis',
					mimeTypes: 'media mimeTypes',
					audio: 'audio metrics',
					canvas: 'canvas image',
					canvasBlob: 'canvas blob',
					canvasPaint: 'canvas paint',
					canvasText: 'canvas text',
					canvasEmoji: 'canvas emoji',
					textMetrics: 'textMetrics',
					webgl: 'webgl image',
					fonts: 'system fonts',
					voices: 'voices',
					screen: 'screen metrics',
					gpu: 'webgl parameters',
					gpuModel: 'webgl renderer',
					deviceOfTimezone: 'device of timezone',
				}
				Object.keys(decryptionSamples).forEach((key,i) => {
					const hash = (
						key == 'gpuModel' ? cleanGPUString(decodeURIComponent(entropyHash[key])) :
							entropyHash[key]
					)
					const {
						classTotal,
						decryption,
						metricTotal
					} = getEntropy(hash, decryptionSamples[key])
					const el = document.getElementById(`${key}-entropy`)
					const deviceMetric = (
						(key == 'screen') || (key == 'fonts') || (key == 'gpuModel') || (key == 'deviceOfTimezone')
					)
					const uniquePercent = !classTotal ? 0 : (1/classTotal)*100
					const signal = (
						uniquePercent == 0 ? 'entropy-unknown' :
						uniquePercent < 1 ? 'entropy-high' :
						uniquePercent > 10 ? 'entropy-low' :
							''
					)
					const animate = samplesDidLoadFromSession ? '' : `style="animation: fade-up .3s ${100*i}ms ease both;"`

					return patch(el, html`
						<span ${animate} class="${signal} entropy-note help" title="1 of ${classTotal || Infinity}${deviceMetric ? ' in x device' : ` in ${decryption || 'unknown'}`}${` (trusted ${entropyDescriptors[key]})`}">
							${(uniquePercent).toFixed(2)}%
						</span>
					`)
				})
			}

			return renderSamples({ samples: decryptionSamples, templateImports })
		})
		.catch(error => {
			fetchVisitorDataTimer('Error fetching visitor data')
			const el = document.getElementById('browser-detection')
			console.error('Error!', error.message)
			if (!el) {
				return
			}
			return patch(el, html`
				<style>
					.rejected {
						background: #ca656e14 !important;
					}
				</style>
				<div class="flex-grid rejected">
					<div class="col-eight">
						${'prediction service unavailable'}
					</div>
					<div class="col-four icon-prediction-container">
					</div>
				</div>
			`)
		})
	})
})(imports)