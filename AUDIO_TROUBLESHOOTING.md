# Audio Troubleshooting Guide

## Issues Fixed

### 1. **API Key Configuration**
- **Problem**: Code was looking for `VITE_API_KEY` but environment might have `VITE_GEMINI_API_KEY` or `GEMINI_API_KEY`
- **Fix**: Updated to check multiple environment variable names
- **Action Required**: Ensure your `.env` file has one of:
  ```env
  VITE_API_KEY=your-api-key-here
  # OR
  VITE_GEMINI_API_KEY=your-api-key-here
  ```

### 2. **Audio Pipeline Connection**
- **Problem**: Audio was connected to `destination` which can cause feedback and isn't necessary
- **Fix**: Removed direct destination connection, using muted gain node instead
- **Result**: Audio processing works without playing microphone input back

### 3. **Audio Signal Detection**
- **Problem**: Threshold might be too strict, filtering out valid speech
- **Fix**: Temporarily disabled strict filtering for first 50 chunks to verify audio capture
- **Result**: Better debugging to see if audio is being captured

### 4. **Debug Logging**
- **Added**: Comprehensive logging to track:
  - Audio chunk processing
  - Audio signal levels (RMS)
  - API calls and responses
  - AudioContext states

## How to Diagnose Issues

### Check Browser Console

When you start a conversation, you should see logs like:
```
[AUDIO] ScriptProcessor chunk #1, RMS: 0.000123, Context: running, Length: 2048
[AUDIO] ScriptProcessor chunk #2, RMS: 0.000456, Context: running, Length: 2048
...
Sending audio chunk #1: 4096 bytes
```

### Check for API Key

Look for this error in console:
```
❌ API KEY NOT FOUND! Please set VITE_API_KEY or VITE_GEMINI_API_KEY in your .env file.
```

If you see this, add the API key to your `.env` file.

### Check Microphone Permissions

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors like:
   - "NotAllowedError" - Microphone permission denied
   - "NotFoundError" - No microphone found

### Check Voice Preview

When clicking play on a voice, check console for:
```
[VOICE PREVIEW] Calling Gemini API with voice: aoede-en
[VOICE PREVIEW] API response received: { hasCandidates: true, ... }
[VOICE PREVIEW] Audio data received, length: 12345 characters
```

If you see errors, check:
1. API key is set correctly
2. Network tab shows API call is being made
3. API response contains audio data

## Common Issues and Solutions

### Issue: "No audio data received from API"
**Cause**: API key missing or invalid
**Solution**: 
1. Check `.env` file has `VITE_API_KEY` or `VITE_GEMINI_API_KEY`
2. Restart dev server after adding API key
3. Verify API key is valid in Google AI Studio

### Issue: "Microphone access denied"
**Cause**: Browser blocked microphone permission
**Solution**:
1. Click the lock icon in browser address bar
2. Allow microphone permissions
3. Refresh the page

### Issue: Audio chunks show RMS: 0.000000
**Cause**: Microphone not capturing audio or muted
**Solution**:
1. Check microphone is not muted in system settings
2. Check browser has microphone access
3. Try speaking louder or closer to microphone

### Issue: "AudioContext failed to start"
**Cause**: Browser autoplay policy blocking audio
**Solution**:
1. Click anywhere on the page first (user interaction required)
2. Then try starting conversation
3. Some browsers require user interaction before allowing audio

## Testing Steps

1. **Check API Key**:
   ```bash
   # In your .env file, ensure you have:
   VITE_API_KEY=your-actual-api-key
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser Console** (F12)

4. **Test Voice Preview**:
   - Go to Partner Setup page
   - Click play button on any voice
   - Check console for logs
   - Should hear audio playback

5. **Test Voice Recognition**:
   - Start a conversation
   - Speak into microphone
   - Check console for `[AUDIO]` logs showing chunks being processed
   - Check for `Sending audio chunk` messages
   - Your speech should appear in transcript

## Next Steps if Still Not Working

1. **Check Console Logs**: Look for specific error messages
2. **Check Network Tab**: Verify API calls are being made
3. **Check Microphone**: Test microphone in another app
4. **Check Browser**: Try a different browser (Chrome recommended)
5. **Check API Key**: Verify key is valid and has proper permissions

## Debug Mode

The code now includes extensive logging. Look for:
- `[AUDIO]` - Audio processing logs
- `[VOICE PREVIEW]` - Voice preview logs
- `✅` - Success indicators
- `❌` - Error indicators

Share these logs if issues persist!

