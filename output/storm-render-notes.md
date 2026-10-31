# STORM specifications render

- Source: frontend/public/product/STORM/SP_Main_Assembly/SP_Main_Assembly.gltf and its supplied binaries/textures.
- Import inspected in Blender 5.2: 429 mesh objects, 1,383,356 triangles, no missing material faces or invalid vertices.
- Output: frontend/public/product/STORM/storm-top-view-black-outline.webp, 2048 by 2048, transparent.
- Camera: orthographic, world +Z looking directly down -Z, no perspective tilt; original assembly geometry preserved.
- Finish: white technical illustration with black Freestyle contours (1.4px at 2048px), and dark four-facet diamond propeller material. Original source files unchanged.
- Rendering: Cycles 64 samples, RTX 4090 OPTIX, OIDN GPU denoising. Render manifest: output/storm-top-render-black-outline/render-manifest.json.
- Layout: removed the overflowing 2x transform; the larger render fits between the heading and dimensions. Checked at 1920x1080, 1440x900, and 390x844. Mobile page has pre-existing horizontal overflow outside this section; section bounds and contents pass.
- Overall CAD assembly bounds: 2275.48 by 2275.48 by 800.165 mm, rounded for the dimension labels. These include propellers and landing gear, not a manufacturer-confirmed nominal dimension specification.
- Performance figures reused from existing StormFeatures.tsx: communication over 15 km LOS, endurance 30+ minutes, optimal cruise 15 m/s, lift 20–25 kg.
- Scene recipe: output/render-storm-top.py; editable scene: output/storm-top-view.blend.
