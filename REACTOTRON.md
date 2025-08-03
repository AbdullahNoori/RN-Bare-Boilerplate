# Reactotron Setup & Usage

Reactotron is a powerful debugging tool for React Native that allows you to inspect your app's state, network requests, and more in real-time.

## Installation

Reactotron has been pre-configured in this project. You need to install the Reactotron desktop app:

### macOS

```bash
brew install --cask reactotron
```

### Manual Download

Download from: https://github.com/infinitered/reactotron/releases

## Usage

1. **Start Reactotron Desktop App**

   - Launch the Reactotron app on your computer
   - Make sure it's listening on port 9090 (default)

2. **Run Your React Native App**

   ```bash
   npm run ios
   # or
   npm run android
   ```

3. **View Debug Information**
   - Your app will automatically connect to Reactotron
   - You'll see logs, state changes, and network requests in real-time

## Enhanced Features Available

### Console Logging

```javascript
console.tron.log('Hello from Reactotron!');
console.tron.display({
  name: 'Custom Log',
  preview: 'Debug info',
  value: { data: 'anything' },
});
```

### Enhanced Global Logger

Use the global logger for semantic logging:

```javascript
// Info messages
global.logger.info('User logged in', { userId: 123 });

// Success messages
global.logger.success('Data saved successfully', { recordId: 456 });

// Warnings
global.logger.warning('API rate limit approaching', { remaining: 10 });

// Errors
global.logger.error('Failed to save data', new Error('Network timeout'));
```

### Automatic Network Monitoring

All `fetch` requests are automatically logged with:

- ✅ Request details (URL, method, headers, body)
- ✅ Response details (status, headers, data)
- ✅ Timing information
- ✅ Error handling
- ✅ Timestamp tracking

### Performance Benchmarking

```javascript
console.tron.benchmark('Expensive Operation');
// ... your code ...
console.tron.benchmark('Expensive Operation');
```

### Image Display

```javascript
console.tron.image({
  uri: 'https://example.com/image.jpg',
  preview: 'Profile Picture',
  width: 100,
  height: 100,
});
```

## Device Connection

If you're using a physical device instead of a simulator:

1. Find your computer's IP address:

   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. Update `ReactotronConfig.js`:
   ```javascript
   Reactotron.configure({
     name: 'LintedRNApp',
     host: 'YOUR_IP_ADDRESS', // Replace with your IP
     port: 9090,
   });
   ```

## Production Builds

Reactotron is automatically disabled in production builds. The configuration includes a dummy `console.tron` object that does nothing in production.

## Troubleshooting

### Connection Issues

- Ensure Reactotron desktop app is running
- Check that your device/simulator and computer are on the same network
- Verify the IP address and port in `ReactotronConfig.js`

### No Logs Appearing

- Make sure you're using `console.tron.log()` instead of `console.log()`
- Check that `__DEV__` is true (it should be in development)

### Redux Integration

If you add Redux later, uncomment the Redux plugin in `ReactotronConfig.js` and configure it with your store.
