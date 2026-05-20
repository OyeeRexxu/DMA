import os, re

files_to_fix = [
    r'b:\f-work\DMA-CC\templates\variants\v1_cinematic.html',
    r'b:\f-work\DMA-CC\templates\variants\v2_editorial.html',
    r'b:\f-work\DMA-CC\templates\variants\v3_gradient.html',
    r'b:\f-work\DMA-CC\templates\variants\v4_typographic.html',
    r'b:\f-work\DMA-CC\templates\variants\v5_neon.html',
    r'b:\f-work\DMA-CC\templates\variants\v2\base.html',
]

for path in files_to_fix:
    if not os.path.exists(path):
        print(f"SKIP (not found): {path}")
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Remove anchor tags pointing to v2 (any variant of the tag)
    content = re.sub(r'<a href="{% url \'v2\' %}"[^>]*>\s*2\s*</a>', '', content)
    # Remove anchor tags pointing to v7
    content = re.sub(r'<a href="{% url \'v7\' %}"[^>]*>\s*7\s*</a>', '', content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"FIXED: {path}")
    else:
        print(f"NO CHANGE: {path}")

print("Done!")
