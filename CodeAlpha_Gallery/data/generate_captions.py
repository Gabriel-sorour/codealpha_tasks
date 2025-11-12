from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import os, json, uuid

# Load BLIP model
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Folder containing images
folder = "images"
results = []

# Simple function to guess the type based on caption
def guess_type(caption):
    caption_lower = caption.lower()
    if any(word in caption_lower for word in ["car", "vehicle", "truck", "motor", "garage"]):
        return "cars"
    elif any(word in caption_lower for word in ["food", "dish", "meal", "plate", "bowl", "chef", "pancake", "vegetable", "fruit"]):
        return "food"
    elif any(word in caption_lower for word in ["tree", "flower", "sky", "mountain", "river", "field", "nature", "forest", "sunset"]):
        return "nature"
    else:
        return "nature"  # fallback if uncertain

# Process each image
for img_file in os.listdir(folder):
    if img_file.lower().endswith((".jpg", ".png")):
        path = os.path.join(folder, img_file)
        image = Image.open(path)
        inputs = processor(image, return_tensors="pt")
        out = model.generate(**inputs)
        caption = processor.decode(out[0], skip_special_tokens=True)

        # Create entry
        results.append({
            "id": str(uuid.uuid4()),
            "src": f"images/{img_file}",
            "type": guess_type(caption),
            "title": caption,
            "description": caption
        })

# Save to JSON
with open("images.json", "w") as f:
    json.dump(results, f, indent=2)

print("✅ Done! Captions and types saved to images.json")