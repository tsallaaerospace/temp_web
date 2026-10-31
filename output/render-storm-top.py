import bpy
import json
import math
from mathutils import Vector
from pathlib import Path

root = Path('E:/Tsalla Website')
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(root / 'frontend/public/product/STORM/SP_Main_Assembly/SP_Main_Assembly.gltf'))
scene = bpy.context.scene
meshes = [o for o in scene.objects if o.type == 'MESH']
bpy.context.view_layer.update()
points = [o.matrix_world @ Vector(c) for o in meshes for c in o.bound_box]
low = Vector(tuple(min(p[i] for p in points) for i in range(3)))
high = Vector(tuple(max(p[i] for p in points) for i in range(3)))
centre = (low + high) / 2
span = max(high.x - low.x, high.y - low.y)
carbon = bpy.data.materials.get('carbon fiber eproxy 2d')
if carbon and carbon.use_nodes:
    tree = carbon.node_tree
    shader = tree.nodes.get('Principled BSDF')
    for link in list(tree.links):
        if link.to_socket in (shader.inputs['Base Color'], shader.inputs['Normal'], shader.inputs['Metallic'], shader.inputs['Roughness']):
            tree.links.remove(link)
    coords = tree.nodes.new('ShaderNodeTexCoord')
    mapping = tree.nodes.new('ShaderNodeMapping')
    mapping.inputs['Rotation'].default_value[2] = math.radians(45)
    mapping.inputs['Scale'].default_value = (24, 24, 24)
    separate = tree.nodes.new('ShaderNodeSeparateXYZ')
    tree.links.new(coords.outputs['Object'], mapping.inputs['Vector'])
    tree.links.new(mapping.outputs['Vector'], separate.inputs[0])

    def calculate(operation, a, b=None):
        node = tree.nodes.new('ShaderNodeMath')
        node.operation = operation
        for index, value in enumerate((a, b)):
            if value is None:
                continue
            if isinstance(value, (int, float)):
                node.inputs[index].default_value = value
            else:
                tree.links.new(value, node.inputs[index])
        return node.outputs[0]

    # Four triangular faces per diamond, rather than alternating square tiles.
    x = calculate('SUBTRACT', calculate('FRACT', separate.outputs['X']), 0.5)
    y = calculate('SUBTRACT', calculate('FRACT', separate.outputs['Y']), 0.5)
    horizontal = calculate('GREATER_THAN', calculate('ABSOLUTE', x), calculate('ABSOLUTE', y))
    x_shade = calculate('MULTIPLY', calculate('GREATER_THAN', x, 0), 0.017)
    y_shade = calculate('MULTIPLY', calculate('GREATER_THAN', y, 0), 0.019)
    # Explicit offsets keep all four facets in the reference's dark graphite range.
    x_shade = calculate('ADD', x_shade, 0.008)
    y_shade = calculate('ADD', y_shade, 0.016)
    mix = tree.nodes.new('ShaderNodeMixRGB')
    tree.links.new(horizontal, mix.inputs[0])
    tree.links.new(y_shade, mix.inputs[1])
    tree.links.new(x_shade, mix.inputs[2])
    tree.links.new(mix.outputs[0], shader.inputs['Base Color'])
    shader.inputs['Metallic'].default_value = 0
    shader.inputs['Roughness'].default_value = 0.85
    graphite = tree.nodes.new('ShaderNodeEmission')
    tree.links.new(mix.outputs[0], graphite.inputs['Color'])
    tree.links.new(graphite.outputs[0], tree.nodes.get('Material Output').inputs['Surface'])

for material in bpy.data.materials:
    if material == carbon or not material.use_nodes:
        continue
    tree = material.node_tree
    tree.nodes.clear()
    output = tree.nodes.new('ShaderNodeOutputMaterial')
    white = tree.nodes.new('ShaderNodeEmission')
    white.inputs['Color'].default_value = (0.97, 0.97, 0.97, 1)
    tree.links.new(white.outputs[0], output.inputs['Surface'])

white_airframe = bpy.data.materials.new('STORM White technical airframe')
white_airframe.use_nodes = True
tree = white_airframe.node_tree
tree.nodes.clear()
output = tree.nodes.new('ShaderNodeOutputMaterial')
white = tree.nodes.new('ShaderNodeEmission')
white.inputs['Color'].default_value = (0.97, 0.97, 0.97, 1)
tree.links.new(white.outputs[0], output.inputs['Surface'])
for obj in meshes:
    if 'SP_Prop-' not in obj.name:
        for slot in obj.material_slots:
            if slot.material == carbon:
                slot.material = white_airframe

camera_data = bpy.data.cameras.new('STORM_Top_Orthographic')
camera = bpy.data.objects.new('STORM_Top_Orthographic', camera_data)
scene.collection.objects.link(camera)
camera.location = (centre.x, centre.y, high.z + span * 2)
camera.rotation_euler = (0, 0, 0)
camera_data.type = 'ORTHO'
camera_data.ortho_scale = span * 1.08
scene.camera = camera

world = bpy.data.worlds.new('STORM_Studio_World')
world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.8, 0.85, 0.9, 1)
world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.4
scene.world = world
for name, location, power, size in [
    ('STORM_Key', (-2.5, -2, 4), 500, 4),
    ('STORM_Fill', (2, 1, 3), 350, 3),
]:
    data = bpy.data.lights.new(name, 'AREA')
    data.energy, data.shape, data.size = power, 'DISK', size
    light = bpy.data.objects.new(name, data)
    scene.collection.objects.link(light)
    light.location = location
    light.rotation_euler = (centre - light.location).to_track_quat('-Z', 'Y').to_euler()

scene.render.engine = 'CYCLES'
scene.cycles.samples = 64
scene.cycles.use_denoising = True
scene.render.threads_mode = 'FIXED'
scene.render.threads = 2
scene.render.resolution_x = scene.render.resolution_y = 2048
scene.render.resolution_percentage = 100
scene.render.film_transparent = True
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.view_settings.view_transform = 'Standard'
scene.render.use_freestyle = True
freestyle = bpy.context.view_layer.freestyle_settings
lines = freestyle.linesets[0] if freestyle.linesets else freestyle.linesets.new('Technical outlines')
lines.select_silhouette = True
lines.select_border = True
lines.select_crease = True
freestyle.crease_angle = math.radians(115)
if lines.linestyle is None:
    lines.linestyle = bpy.data.linestyles.new('STORM Fine technical edges')
lines.linestyle.color = (0, 0, 0)
lines.linestyle.thickness = 1.4
scene.render.filepath = str(root / 'frontend/public/product/STORM/storm-top-view.png')
bpy.ops.wm.save_as_mainfile(filepath=str(root / 'output/storm-top-view.blend'))
(root / 'output/storm-render-metrics.json').write_text(json.dumps({
    'bounds_m': {'min': list(low), 'max': list(high), 'dimensions': list(high-low)},
    'meshes': len(meshes), 'camera': camera.name, 'projection': 'ORTHO',
    'camera_direction': [0, 0, -1], 'ortho_scale': camera_data.ortho_scale,
}, indent=2))
