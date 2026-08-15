import os
import shutil

src_dir = r"C:\Users\Shehan Kavinda\.gemini\antigravity-ide\brain\a9fe971a-3b15-4e1d-ae77-27d58deda641"
dest_dir = "public/images/crafts"

os.makedirs(dest_dir, exist_ok=True)

images = {
    "pottery_banner_1781723437708.png": "banner.png",
    "pottery_jug_1781723452905.png": "jug.png",
    "pottery_lamp_1781723484955.png": "lamp.png",
    "pottery_pot_1781723500310.png": "pot.png",
    "pottery_vase_1781723517033.png": "vase.png",
    "pottery_bowl_1781723532248.png": "bowl.png",
    "pottery_elephant_1781723566806.png": "elephant.png",
    "pottery_mug_1781723584076.png": "mug.png",
    "pottery_planter_1781723601547.png": "planter.png",
}

for src_name, dest_name in images.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        print(f"Copied {src_name} to {dest_name}")
    else:
        print(f"File not found: {src_path}")
