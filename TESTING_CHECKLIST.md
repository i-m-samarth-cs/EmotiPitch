# EmotiPitch Testing Checklist

Complete testing guide to verify all features work correctly.

## Pre-Testing Setup

- [ ] Backend running at `http://localhost:5000`
- [ ] Frontend running at `http://localhost:5173`
- [ ] Browser DevTools open (F12) for debugging
- [ ] Camera permission granted (or manual mode ready)

## 1. Backend API Tests

### Health Check
```bash
curl http://localhost:5000/api/health
```
**Expected**: `{"status": "healthy", "granite_mode": "mock"}`

### Explanation Endpoint
```bash
curl -X POST http://localhost:5000/api/explain \
  -H "Content-Type: application/json" \
  -d '{
    "user_emotion": "angry",
    "video_timestamp": 67,
    "match_event": "Thuram simulation"
  }'
```
**Expected**: JSON with `explanation`, `tactical_impact`, `confidence`

### Simulation Endpoint
```bash
curl -X POST http://localhost:5000/api/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "situation": "High pressure situation",
    "user_choice": "Switch to 3-5-2",
    "emotion": "confused",
    "timestamp": 75
  }'
```
**Expected**: JSON with `outcome`, `reason`, `realCoach`, `confidence`, `success`, `emoji`

## 2. Frontend Component Tests

### Header Component
- [ ] Logo displays correctly
- [ ] "EmotiPitch" title visible
- [ ] Football emoji rotates continuously
- [ ] "June Innovation Challenge" badge shows on desktop
- [ ] Responsive on mobile (logo + title only)

### Match Watcher Component
- [ ] YouTube video loads and plays
- [ ] Video controls work (play, pause, seek)
- [ ] "Start Camera" button visible
- [ ] Camera overlay appears when started (top-right corner)
- [ ] Manual mood selector shows when camera off
- [ ] Video info displays correct title
- [ ] Timestamps hint visible

### Emotion Bar Component
- [ ] Current emotion displays with emoji
- [ ] Emotion label matches emoji (Angry/Excited/Confused/Neutral)
- [ ] Intensity bar animates smoothly
- [ ] Intensity percentage updates (60-90%)
- [ ] Timestamp displays in MM:SS format
- [ ] Recent emotions mini-chart shows 8 bars
- [ ] "AI Monitoring Active" indicator pulses
- [ ] Tip text displays at bottom

### AI Explanation Component
- [ ] Card slides in from bottom when triggered
- [ ] Emotion emoji matches current mood
- [ ] "EmotiPitch Analysis" header visible
- [ ] Close button (X) works
- [ ] Loading spinner shows football emoji
- [ ] "Analyzing with IBM Granite AI..." text displays
- [ ] Explanation text appears with typewriter effect
- [ ] Cursor blinks during typing
- [ ] Tactical Impact section appears after typing
- [ ] Confidence bar animates to correct percentage
- [ ] "Enter Coach Mode" button appears
- [ ] "Continue Watching" button works
- [ ] Card closes when X clicked

### Coach Simulation Component
- [ ] Card appears with scale animation
- [ ] Coach emoji (🎯) rotates and scales
- [ ] "Coach Simulation Mode" title visible
- [ ] Situation card displays scenario
- [ ] Three choice buttons visible
- [ ] Buttons show icons + labels
- [ ] Hover effect scales buttons up
- [ ] Click triggers loading state
- [ ] Football spinner rotates during simulation
- [ ] "AI Simulating Outcome..." text pulses
- [ ] Result card appears after 2 seconds
- [ ] Outcome emoji shows (✅ or 🛑)
- [ ] Success/failure color coding correct
- [ ] Tactical Analysis section displays
- [ ] Real Coach Decision section displays
- [ ] Confidence bar animates
- [ ] "Try Another Scenario" button works

### Emotion-Tactic Map Component
- [ ] Card appears after video ends
- [ ] Chart emoji (📊) rotates
- [ ] "Emotion-Tactic Map" title visible
- [ ] Recharts graph displays
- [ ] X-axis shows timestamps
- [ ] Y-axis shows intensity
- [ ] Line graph connects emotion points
- [ ] Reference lines show tactical moments
- [ ] Tooltip appears on hover
- [ ] Tooltip shows emotion + moment details
- [ ] Timeline cards display 5 key moments
- [ ] Each card shows time, emoji, description
- [ ] Cards animate on hover
- [ ] Emotion summary shows 4 emotion types
- [ ] Percentages calculated correctly
- [ ] Insights section displays
- [ ] Insights text mentions emotion count

### Footer Component
- [ ] Three-column layout on desktop
- [ ] Single column on mobile
- [ ] "About EmotiPitch" section visible
- [ ] "Powered By" tech stack list shows
- [ ] "Challenge" section displays
- [ ] Trophy emoji (🏆) animates on hover
- [ ] Copyright text displays
- [ ] "Emotionally Explainable AI" highlighted

## 3. Animation Tests

### Framer Motion Animations
- [ ] Header slides down on load
- [ ] Hero section fades in
- [ ] Football emoji rotates continuously
- [ ] Match watcher slides in from left
- [ ] Emotion bar slides in from right
- [ ] Explanation card slides up from bottom
- [ ] Coach simulation scales in
- [ ] Emotion map slides up from bottom
- [ ] All buttons scale on hover
- [ ] Loading spinners rotate smoothly
- [ ] Typewriter effect smooth (20ms/char)
- [ ] Confidence bars animate left-to-right
- [ ] Emotion pulse overlay flashes correctly

### CSS Animations
- [ ] Pulse glow effect on emotion changes
- [ ] Football spinner rotates
- [ ] Gradient text animates
- [ ] Glass morphism effects visible
- [ ] Card hover shadows appear
- [ ] Smooth transitions on all elements

## 4. Emotion Detection Tests

### Camera Mode
- [ ] Browser requests camera permission
- [ ] Camera feed appears in overlay
- [ ] Face detection works (green box around face)
- [ ] Emotion updates every 500ms
- [ ] Emotion bar reflects detected emotion
- [ ] Emotion pulse triggers on change
- [ ] "Stop Camera" button works
- [ ] Camera stream stops when clicked

### Manual Mode
- [ ] Four emotion buttons visible
- [ ] Angry button (😠) works
- [ ] Excited button (😃) works
- [ ] Confused button (😕) works
- [ ] Neutral button (😐) works
- [ ] Selected button highlights
- [ ] Emotion bar updates immediately
- [ ] Emotion pulse triggers

## 5. Integration Tests

### Video → Emotion → Explanation Flow
1. [ ] Start video playback
2. [ ] Set emotion to "Angry" at 1:05
3. [ ] Wait for 1:07 timestamp
4. [ ] Explanation card appears automatically
5. [ ] Explanation matches angry emotion
6. [ ] Tactical impact displays
7. [ ] Confidence score shows

### Explanation → Coach Mode Flow
1. [ ] Explanation card visible
2. [ ] Click "Enter Coach Mode"
3. [ ] Coach simulation appears
4. [ ] Explanation card stays visible
5. [ ] Can interact with both components

### Coach Simulation Flow
1. [ ] Choose option A
2. [ ] Loading animation plays
3. [ ] Result appears after 2 seconds
4. [ ] Outcome matches choice logic
5. [ ] Click "Try Another Scenario"
6. [ ] New situation appears
7. [ ] Can choose different option

### Video End → Emotion Map Flow
1. [ ] Let video play to end
2. [ ] Emotion map appears automatically
3. [ ] Graph shows all recorded emotions
4. [ ] Timeline matches video duration
5. [ ] Can click moments to review
6. [ ] Emotion summary accurate

## 6. Responsive Design Tests

### Desktop (1920x1080)
- [ ] Two-column layout (video + emotion bar)
- [ ] All text readable
- [ ] No horizontal scroll
- [ ] Animations smooth

### Tablet (768x1024)
- [ ] Single column layout
- [ ] Video full width
- [ ] Emotion bar below video
- [ ] Touch interactions work

### Mobile (375x667)
- [ ] All components stack vertically
- [ ] Text sizes appropriate
- [ ] Buttons large enough to tap
- [ ] No content cut off
- [ ] Horizontal scroll disabled

## 7. Error Handling Tests

### Backend Offline
- [ ] Frontend shows error message
- [ ] Fallback to mock data works
- [ ] User can continue using app

### Camera Denied
- [ ] Manual mode activates automatically
- [ ] Error message displays
- [ ] App continues working

### Invalid API Response
- [ ] Error caught and logged
- [ ] User sees friendly error message
- [ ] App doesn't crash

## 8. Performance Tests

### Load Time
- [ ] Initial page load < 3 seconds
- [ ] Video starts playing < 2 seconds
- [ ] Face-api models load < 5 seconds

### Runtime Performance
- [ ] No frame drops during animations
- [ ] Emotion detection doesn't lag video
- [ ] Smooth scrolling
- [ ] No memory leaks (check DevTools)

### Network
- [ ] Works on 3G connection
- [ ] API calls complete < 5 seconds
- [ ] Video buffering acceptable

## 9. Browser Compatibility

### Chrome
- [ ] All features work
- [ ] Camera access works
- [ ] Animations smooth

### Firefox
- [ ] All features work
- [ ] Camera access works
- [ ] Animations smooth

### Edge
- [ ] All features work
- [ ] Camera access works
- [ ] Animations smooth

### Safari (if available)
- [ ] All features work
- [ ] Camera access works
- [ ] Animations smooth

## 10. Accessibility Tests

### Keyboard Navigation
- [ ] Can tab through all buttons
- [ ] Enter key activates buttons
- [ ] Focus indicators visible

### Screen Reader (optional)
- [ ] Aria labels present
- [ ] Alt text on images
- [ ] Semantic HTML used

### Color Contrast
- [ ] Text readable on all backgrounds
- [ ] Emotion colors distinguishable
- [ ] Sufficient contrast ratios

## Final Checklist

- [ ] All backend endpoints working
- [ ] All frontend components rendering
- [ ] All animations smooth
- [ ] Emotion detection functional
- [ ] AI explanations generating
- [ ] Coach simulation working
- [ ] Emotion map displaying
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] No broken links
- [ ] Documentation complete
- [ ] Ready for deployment

## Bug Report Template

If you find issues, document them:

```
**Bug**: [Brief description]
**Component**: [Which component]
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected**: [What should happen]
**Actual**: [What actually happens]
**Console Errors**: [Any errors in console]
**Screenshot**: [If applicable]
```

---

**Testing Complete!** ✅ Ready for hackathon submission! 🏆