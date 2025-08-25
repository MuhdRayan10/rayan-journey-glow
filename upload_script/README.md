# Journey Data Manager

A Streamlit web interface for easily managing your portfolio journey data.

## Features

- **View Current Data**: Browse all sections and their entries
- **Add New Section**: Create new journey sections (Programming, Sports, etc.)
- **Add New Row**: Add new entries to existing sections
- **Edit Existing**: Modify titles, descriptions, and photo selections
- **Delete Entry**: Remove rows or entire sections

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
streamlit run upload.py
```

## Usage

### Adding a New Section
1. Select "Add New Section" from the sidebar
2. Enter section name (e.g., "Programming", "Sports")
3. Add relevant tags (one per line)
4. Click "Create Section"

### Adding a New Row
1. Select "Add New Row" from the sidebar
2. Choose the target section
3. Enter title and description
4. Select images from the dropdown or enter manually
5. Click "Add Row"

### Editing Entries
1. Select "Edit Existing" from the sidebar
2. Choose section and row to edit
3. Modify the fields as needed
4. Update image selections
5. Click "Update Row"

## Image Management

- Images are automatically detected from `../src/assets/`
- Supports WebP, JPG, JPEG, and PNG formats
- You can select multiple images for photo stacks
- Manual input is available as a fallback

## Data Structure

The application manages data in the following JSON structure:
```json
{
  "sections": [
    {
      "section": "Programming",
      "tags": ["React", "TypeScript", "Node.js"],
      "rows": [
        {
          "title": "Achievement Title",
          "description": "Detailed description...",
          "photostack": ["image1.webp", "image2.webp"]
        }
      ]
    }
  ]
}
```

## File Paths

- **JSON Data**: `../src/data/journey-data.json`
- **Images**: `../src/assets/`

## Tips

- Use descriptive titles for better organization
- Add multiple images to create engaging photo stacks
- Keep descriptions concise but informative
- Images should be in WebP format for best performance
