import os
def create_directory(path):
    """Create directory if it doesn't exist"""
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"Created directory: {path}")

def create_file(path):
    """Create empty file if it doesn't exist"""
    if not os.path.exists(path):
        with open(path, 'w') as f:
            pass
        print(f"Created file: {path}")

def create_nextjs_structure(base_path):
    """Create Next.js project structure with src directory, TypeScript, Tailwind, ShadCN UI, and Framer Motion"""
    # Create base directory if provided path doesn't exist
    create_directory(base_path)
    
    # src directory
    src_dir = os.path.join(base_path, "src")
    create_directory(src_dir)
    
    # App directory inside src
    app_dir = os.path.join(src_dir, "app")
    create_directory(app_dir)
    create_file(os.path.join(app_dir, "layout.tsx"))
    create_file(os.path.join(app_dir, "page.tsx"))
    create_file(os.path.join(app_dir, "globals.css"))
    
    # Components directory
    components_dir = os.path.join(src_dir, "components")
    create_directory(components_dir)
    
    # UI components (ShadCN)
    ui_dir = os.path.join(components_dir, "ui")
    create_directory(ui_dir)
    shadcn_components = [
        "button.tsx", 
        "card.tsx", 
        "dialog.tsx", 
        "form.tsx", 
        "input.tsx",
        "select.tsx",
        "textarea.tsx"
    ]
    for component in shadcn_components:
        create_file(os.path.join(ui_dir, component))
    
    # Layout components
    layout_dir = os.path.join(components_dir, "layout")
    create_directory(layout_dir)
    create_file(os.path.join(layout_dir, "navbar.tsx"))
    create_file(os.path.join(layout_dir, "footer.tsx"))
    
    # Page sections
    sections_dir = os.path.join(components_dir, "sections")
    create_directory(sections_dir)
    sections = [
        "hero-section.tsx",
        "services.tsx",
        "workflow.tsx",
        "pricing.tsx",
        "testimonials.tsx",
        "booking-form.tsx",
        "disclaimer-dialog.tsx"
    ]
    for section in sections:
        create_file(os.path.join(sections_dir, section))
    
    # Hooks directory
    hooks_dir = os.path.join(src_dir, "hooks")
    create_directory(hooks_dir)
    create_file(os.path.join(hooks_dir, "use-scroll-animation.ts"))
    
    # Lib directory
    lib_dir = os.path.join(src_dir, "lib")
    create_directory(lib_dir)
    create_file(os.path.join(lib_dir, "utils.ts"))
    create_file(os.path.join(lib_dir, "email.ts"))
    
    # Constants directory
    constants_dir = os.path.join(src_dir, "constants")
    create_directory(constants_dir)
    create_file(os.path.join(constants_dir, "index.ts"))
    
    # Types directory
    types_dir = os.path.join(src_dir, "types")
    create_directory(types_dir)
    create_file(os.path.join(types_dir, "index.ts"))
    
    # Public directory
    public_dir = os.path.join(base_path, "public")
    create_directory(public_dir)
    
    # Favicon in public
    create_file(os.path.join(public_dir, "favicon.ico"))
    
    # Images directory in public
    images_dir = os.path.join(public_dir, "images")
    create_directory(images_dir)
    image_files = ["logo.webp", "code.webp", "placeholder.jpg"]
    for image in image_files:
        create_file(os.path.join(images_dir, image))
    
    create_file(os.path.join(public_dir, "website_overview.svg"))
    create_file(os.path.join(public_dir, "robots.txt"))
    create_file(os.path.join(public_dir, "sitemap.xml"))

    
    print("Next.js project structure created successfully!")

if __name__ == "__main__":
    project_dir = input("Enter the directory path for your Next.js project (or press Enter for current directory): ")
    
    if not project_dir:
        project_dir = os.path.join(os.getcwd(), "next-finance-website")
    
    create_nextjs_structure(project_dir)
    print(f"Project structure created at: {os.path.abspath(project_dir)}")