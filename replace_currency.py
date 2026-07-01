import os
import re

files_to_check = [
    r"d:\Programming\Project\PipeBloom\src\app\wishlist\page.tsx",
    r"d:\Programming\Project\PipeBloom\src\app\shop\[slug]\RecentlyViewedTracker.tsx",
    r"d:\Programming\Project\PipeBloom\src\app\shop\[slug]\page.tsx",
    r"d:\Programming\Project\PipeBloom\src\app\shop\[slug]\AddToCartButton.tsx",
    r"d:\Programming\Project\PipeBloom\src\app\shop\page.tsx",
    r"d:\Programming\Project\PipeBloom\src\app\checkout\page.tsx",
    r"d:\Programming\Project\PipeBloom\src\components\product\product-card.tsx",
]

for file_path in files_to_check:
    if not os.path.exists(file_path):
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace \${price} with ₹${price} where the $ is literal.
    # Note: in JSX, it's often written as `${price}` or `\${price}` (if inside string template)
    # We replace literal `$${` with `₹${`
    content = content.replace("$${", "₹${")
    
    # We replace >${ with >₹${
    content = content.replace(">${", ">₹${")
    
    # We replace "${ with "₹${ if it is a string literal starting with a currency symbol
    content = content.replace('"${', '"₹${')
    content = content.replace(' \\${', ' ₹${')
    content = content.replace('Pay $${', 'Pay ₹${')
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Currency updated successfully!")
