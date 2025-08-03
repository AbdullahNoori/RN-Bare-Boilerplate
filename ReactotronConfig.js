import Reactotron from 'reactotron-react-native';

// Helper to pretty-print objects for Reactotron logs
function formatForLog(obj) {
  if (!obj) return undefined;
  if (typeof obj === 'string') return obj;
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

// Helper to add pretty separators and comments to logs
function withPrettySeparators(label, valueObj) {
  return {
    '───────────────': `🚀 ${label} START 🚀`,
    ...valueObj,
    '─────────────── END': `🏁 ${label} END 🏁`,
  };
}

// Setup Reactotron with enhanced configuration
Reactotron.configure({
  name: 'LintedRNApp',
  host: 'localhost', // Change to your IP if using physical device
}) // controls connection & communication settings
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate|logs|hmr|onchange|websocket|hot-reload/,
    },
    editor: false,
    overlay: false,
  }) // add all built-in react native plugins
  .connect(); // let's connect!

// Clear Reactotron on app startup
if (__DEV__) {
  Reactotron.clear();

  // Add console.tron for easy logging
  console.tron = Reactotron;

  // Welcome message
  Reactotron.log('🚀 Reactotron connected successfully!');
}

// Enhanced logging utilities
if (__DEV__) {
  // Custom logging functions
  global.logger = {
    info: (message, data = null) => {
      Reactotron.display({
        name: 'ℹ️ INFO',
        preview: message,
        value: data || message,
      });
    },
    success: (message, data = null) => {
      Reactotron.display({
        name: '✅ SUCCESS',
        preview: message,
        value: data || message,
        important: true,
      });
    },
    warning: (message, data = null) => {
      Reactotron.display({
        name: '⚠️ WARNING',
        preview: message,
        value: data || message,
        important: true,
      });
    },
    error: (message, error = null) => {
      Reactotron.display({
        name: '❌ ERROR',
        preview: message,
        value: {
          message,
          error: error?.message || error,
          stack: error?.stack,
        },
        important: true,
      });
    },
  };

  // Global error handler
  const originalErrorHandler = global.ErrorUtils.setGlobalHandler;
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    Reactotron.display({
      name: '💥 GLOBAL ERROR',
      preview: error.message,
      value: {
        isFatal,
        message: error.message,
        stack: error.stack,
      },
      important: true,
    });

    if (originalErrorHandler) {
      originalErrorHandler(error, isFatal);
    }
  });
}

// Patch fetch to log network requests/responses to Reactotron
if (__DEV__) {
  const originalFetch = global.fetch;

  global.fetch = async (...args) => {
    const [url, config] = args;
    const startTime = Date.now();

    Reactotron.display({
      name: '📡 FETCH REQUEST',
      preview: url,
      value: withPrettySeparators('FETCH REQUEST', {
        '//': '--- REQUEST DETAILS ---',
        URL: url,
        Method: config?.method || 'GET',
        Headers: formatForLog(config?.headers),
        Body: formatForLog(config?.body),
        Timestamp: new Date().toLocaleTimeString(),
      }),
      important: true,
    });

    try {
      const response = await originalFetch(...args);
      const duration = Date.now() - startTime;

      // Clone response to read body without consuming it
      const responseClone = response.clone();
      let responseData = null;

      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          responseData = await responseClone.json();
        } else if (contentType && contentType.includes('text/')) {
          responseData = await responseClone.text();
        }
      } catch (parseError) {
        // Ignore parse errors, just log the response without body
      }

      Reactotron.display({
        name: '✅ FETCH RESPONSE',
        preview: `${url} (${duration}ms)`,
        value: withPrettySeparators('FETCH RESPONSE', {
          '//': '--- RESPONSE DETAILS ---',
          URL: url,
          Status: `${response.status} ${response.statusText}`,
          OK: response.ok,
          Duration: `${duration}ms`,
          Headers: formatForLog(Object.fromEntries(response.headers.entries())),
          '──── DATA ────': '',
          Data: formatForLog(responseData),
          Timestamp: new Date().toLocaleTimeString(),
        }),
        important: true,
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;

      Reactotron.display({
        name: '❌ FETCH ERROR',
        preview: `${url} (${duration}ms)`,
        value: withPrettySeparators('FETCH ERROR', {
          '//': '--- ERROR DETAILS ---',
          URL: url,
          Message: error.message,
          Duration: `${duration}ms`,
          Timestamp: new Date().toLocaleTimeString(),
        }),
        important: true,
      });

      throw error;
    }
  };
} else {
  // Production fallbacks - dummy implementations
  console.tron = {
    log: () => {},
    display: () => {},
    clear: () => {},
  };

  global.logger = {
    info: () => {},
    success: () => {},
    warning: () => {},
    error: () => {},
  };
}

export default Reactotron;
