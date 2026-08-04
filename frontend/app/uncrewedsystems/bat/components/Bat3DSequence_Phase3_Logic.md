# Bat3DSequence Phase 3 Logic & Camera Implementation

## Summary of Changes (Session: 2026-02-19)

### 1. Two-Stage Animation for Phase 3
To achieve the specific movement requirement for Phase 3 ("BAT TRANSITIONS TO HORIZONTAL POSITION"):
- **Initial State**: when entering Phase 3, the model moves to `x: 20, y: 6` (defined in `PHASES` array).
- **Delayed Update**: A `useEffect` hook triggers a second animation step after **3.6 seconds** (2.5s initial transition + 1.1s delay).
- **Final State**: The model updates to `x: 22, y: 18`.
- **Camera Update**: Synchronized with the model update, the camera moves to `{ position: [4.73, 1.62, 0.05] }`.

**Code Reference:**
```tsx
// Special delayed transition for Phase 3 (ID 3)
useEffect(() => {
    if (PHASES[currentPhase].id === 3 && !isManualMode) {
        // Wait for initial arrival (2.5s) + 1.1s delay = 3.6s
        const timer = setTimeout(() => {
            setLiveDrone(prev => ({ ...prev, x: 22, y: 18 }));
            setCameraTarget({ position: [4.73, 1.62, 0.05], rotation: [-88.4, 71.1, 88.3], fov: 45 });
            setIsAnimating(true);

            // End animation after transition
            setTimeout(() => setIsAnimating(false), 2500);
        }, 3600);

        return () => clearTimeout(timer);
    }
}, [currentPhase, isManualMode]);
```

### 2. Camera Transitions & "2D-Like" Fix
The user reported "awkward" 3D tumbling during the camera transition.
- **Solution**: We now force `camera.lookAt(0, 0, 0)` specifically for **Phase 3**.
- **Implementation**: In `CameraController`, we check `if (activePhase.id === 3)`.
- **Behavior**: Instead of interpolating rotation (which causes roll/gimbal lock issues), we simply interpolate the *position* and force the camera to keep looking at the center. This creates a smooth "2D-like" panning effect.

**Code Reference (CameraController):**
```tsx
if (activePhase.id === 3) {
    // Special handling for Phase 3: "2D-like" behavior
    if (isAnimating) {
            // ... lerp logic for position only
            camera.position.lerp(targetPos, lerpFactor);
    }
    // Force lookAt origin to prevent 3D roll
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
} else {
    // Standard behavior for other phases (using Quaternion Slerp)
    // ...
}
```

### 3. State Management
- Added `cameraTarget` state to allow dynamic camera updates separate from the static `PHASES` config.
- `handlePhaseChange` updates both `liveDrone` and `cameraTarget`.
