import streamlit as st
import json
import os
from pathlib import Path

# Configuration
JSON_FILE_PATH = "../src/data/journey-data.json"
ASSETS_PATH = "../src/assets"

def load_journey_data():
    """Load the journey data from JSON file"""
    try:
        if os.path.exists(JSON_FILE_PATH):
            with open(JSON_FILE_PATH, 'r') as f:
                return json.load(f)
        else:
            return {"sections": []}
    except Exception as e:
        st.error(f"Error loading data: {e}")
        return {"sections": []}

def save_journey_data(data):
    """Save the journey data to JSON file"""
    try:
        # Ensure the directory exists
        os.makedirs(os.path.dirname(JSON_FILE_PATH), exist_ok=True)
        
        with open(JSON_FILE_PATH, 'w') as f:
            json.dump(data, f, indent=2)
        return True
    except Exception as e:
        st.error(f"Error saving data: {e}")
        return False

def get_available_images():
    """Get list of available image files"""
    try:
        if os.path.exists(ASSETS_PATH):
            images = []
            for file in os.listdir(ASSETS_PATH):
                if file.lower().endswith(('.webp', '.jpg', '.jpeg', '.png')):
                    images.append(file)
            return sorted(images)
        return []
    except Exception as e:
        st.error(f"Error loading images: {e}")
        return []

def main():
    st.set_page_config(
        page_title="Journey Data Manager",
        page_icon="🚀",
        layout="wide"
    )
    
    st.title("🚀 Journey Data Manager")
    st.markdown("### Manage your portfolio journey sections and entries")
    
    # Load current data
    data = load_journey_data()
    available_images = get_available_images()
    
    # Sidebar for navigation
    with st.sidebar:
        st.header("Navigation")
        action = st.radio(
            "Choose an action:",
            ["View Current Data", "Add New Section", "Add New Row", "Edit Existing", "Delete Entry"]
        )
    
    # Main content area
    if action == "View Current Data":
        st.header("📋 Current Journey Data")
        
        if not data.get("sections"):
            st.info("No sections found. Add your first section!")
        else:
            for i, section in enumerate(data["sections"]):
                with st.expander(f"📂 {section['section']} ({len(section.get('rows', []))} rows)"):
                    st.write(f"**Tags:** {', '.join(section.get('tags', []))}")
                    
                    for j, row in enumerate(section.get("rows", [])):
                        st.write(f"**Row {j+1}: {row['title']}**")
                        st.write(f"Description: {row['description']}")
                        st.write(f"Images: {', '.join(row['photostack'])}")
                        st.divider()
    
    elif action == "Add New Section":
        st.header("➕ Add New Section")
        
        with st.form("new_section_form"):
            section_name = st.text_input("Section Name *", placeholder="e.g., Programming, Sports, Music")
            
            # Tags input
            st.write("**Tags**")
            tags_input = st.text_area(
                "Enter tags (one per line)",
                placeholder="React\nTypeScript\nNode.js\nPython\nFull Stack",
                help="Enter each tag on a new line"
            )
            
            submitted = st.form_submit_button("Create Section")
            
            if submitted:
                if section_name:
                    # Parse tags
                    tags = [tag.strip() for tag in tags_input.split('\n') if tag.strip()]
                    
                    # Check if section already exists
                    existing_sections = [s['section'].lower() for s in data['sections']]
                    if section_name.lower() in existing_sections:
                        st.error("A section with this name already exists!")
                    else:
                        # Add new section
                        new_section = {
                            "section": section_name,
                            "tags": tags,
                            "rows": []
                        }
                        data['sections'].append(new_section)
                        
                        if save_journey_data(data):
                            st.success(f"✅ Section '{section_name}' created successfully!")
                            st.rerun()
                else:
                    st.error("Section name is required!")
    
    elif action == "Add New Row":
        st.header("➕ Add New Row to Section")
        
        if not data.get("sections"):
            st.warning("No sections available. Please create a section first.")
        else:
            with st.form("new_row_form"):
                # Section selection
                section_names = [section['section'] for section in data['sections']]
                selected_section = st.selectbox("Select Section *", section_names)
                
                # Row details
                row_title = st.text_input("Row Title *", placeholder="e.g., Tournament Victory")
                row_description = st.text_area(
                    "Description", 
                    placeholder="Detailed description of the achievement or experience...",
                    height=100
                )
                
                # Image selection
                st.write("**Select Images for Photo Stack**")
                if available_images:
                    selected_images = st.multiselect(
                        "Choose images",
                        available_images,
                        help="Select multiple images that will be displayed in the photo stack"
                    )
                else:
                    st.warning("No images found in assets folder")
                    selected_images = []
                
                # Manual image input as backup
                manual_images = st.text_area(
                    "Or enter image filenames manually (one per line)",
                    placeholder="image1.webp\nimage2.webp",
                    help="Use this if images are not detected automatically"
                )
                
                submitted = st.form_submit_button("Add Row")
                
                if submitted:
                    if row_title and selected_section:
                        # Combine selected and manual images
                        final_images = selected_images.copy()
                        if manual_images:
                            manual_list = [img.strip() for img in manual_images.split('\n') if img.strip()]
                            final_images.extend(manual_list)
                        
                        # Remove duplicates while preserving order
                        final_images = list(dict.fromkeys(final_images))
                        
                        if not final_images:
                            st.error("Please select at least one image!")
                        else:
                            # Find the section and add the row
                            for section in data['sections']:
                                if section['section'] == selected_section:
                                    new_row = {
                                        "title": row_title,
                                        "description": row_description,
                                        "photostack": final_images
                                    }
                                    section['rows'].append(new_row)
                                    break
                            
                            if save_journey_data(data):
                                st.success(f"✅ Row '{row_title}' added to '{selected_section}' successfully!")
                                st.rerun()
                    else:
                        st.error("Title and Section are required!")
    
    elif action == "Edit Existing":
        st.header("✏️ Edit Existing Entry")
        
        if not data.get("sections"):
            st.warning("No sections available.")
        else:
            # Section selection
            section_names = [section['section'] for section in data['sections']]
            selected_section_name = st.selectbox("Select Section", section_names)
            
            # Find selected section
            selected_section = None
            section_index = None
            for i, section in enumerate(data['sections']):
                if section['section'] == selected_section_name:
                    selected_section = section
                    section_index = i
                    break
            
            if selected_section and selected_section.get('rows'):
                # Row selection
                row_titles = [f"{i+1}. {row['title']}" for i, row in enumerate(selected_section['rows'])]
                selected_row_title = st.selectbox("Select Row to Edit", row_titles)
                row_index = int(selected_row_title.split('.')[0]) - 1
                selected_row = selected_section['rows'][row_index]
                
                # Edit form
                with st.form("edit_row_form"):
                    new_title = st.text_input("Title", value=selected_row['title'])
                    new_description = st.text_area("Description", value=selected_row['description'], height=100)
                    
                    # Current images
                    st.write("**Current Images:**", ", ".join(selected_row['photostack']))
                    
                    # Image selection
                    if available_images:
                        new_images = st.multiselect(
                            "Select new images",
                            available_images,
                            default=[img for img in selected_row['photostack'] if img in available_images]
                        )
                    else:
                        new_images = []
                    
                    # Manual image input
                    manual_images = st.text_area(
                        "Or enter image filenames manually (one per line)",
                        value='\n'.join(selected_row['photostack']),
                        help="Current images are pre-filled"
                    )
                    
                    submitted = st.form_submit_button("Update Row")
                    
                    if submitted:
                        if new_title:
                            # Combine images
                            final_images = new_images.copy()
                            if manual_images:
                                manual_list = [img.strip() for img in manual_images.split('\n') if img.strip()]
                                final_images.extend(manual_list)
                            
                            final_images = list(dict.fromkeys(final_images))
                            
                            if final_images:
                                # Update the row
                                data['sections'][section_index]['rows'][row_index] = {
                                    "title": new_title,
                                    "description": new_description,
                                    "photostack": final_images
                                }
                                
                                if save_journey_data(data):
                                    st.success("✅ Row updated successfully!")
                                    st.rerun()
                            else:
                                st.error("Please select at least one image!")
                        else:
                            st.error("Title is required!")
            else:
                st.info("No rows available in this section.")
    
    elif action == "Delete Entry":
        st.header("🗑️ Delete Entry")
        
        if not data.get("sections"):
            st.warning("No sections available.")
        else:
            delete_type = st.radio("What do you want to delete?", ["Delete a Row", "Delete an Entire Section"])
            
            if delete_type == "Delete a Row":
                # Section selection
                section_names = [section['section'] for section in data['sections']]
                selected_section_name = st.selectbox("Select Section", section_names)
                
                # Find selected section
                selected_section = None
                section_index = None
                for i, section in enumerate(data['sections']):
                    if section['section'] == selected_section_name:
                        selected_section = section
                        section_index = i
                        break
                
                if selected_section and selected_section.get('rows'):
                    row_titles = [f"{i+1}. {row['title']}" for i, row in enumerate(selected_section['rows'])]
                    selected_row_title = st.selectbox("Select Row to Delete", row_titles)
                    row_index = int(selected_row_title.split('.')[0]) - 1
                    
                    st.warning(f"⚠️ You are about to delete: **{selected_section['rows'][row_index]['title']}**")
                    
                    if st.button("🗑️ Confirm Delete Row", type="primary"):
                        data['sections'][section_index]['rows'].pop(row_index)
                        if save_journey_data(data):
                            st.success("✅ Row deleted successfully!")
                            st.rerun()
                else:
                    st.info("No rows available in this section.")
            
            else:  # Delete entire section
                section_names = [section['section'] for section in data['sections']]
                selected_section_name = st.selectbox("Select Section to Delete", section_names)
                
                # Find section
                section_index = None
                for i, section in enumerate(data['sections']):
                    if section['section'] == selected_section_name:
                        section_index = i
                        break
                
                if section_index is not None:
                    section = data['sections'][section_index]
                    st.warning(f"⚠️ You are about to delete the entire section: **{section['section']}** with {len(section.get('rows', []))} rows")
                    
                    if st.button("🗑️ Confirm Delete Section", type="primary"):
                        data['sections'].pop(section_index)
                        if save_journey_data(data):
                            st.success("✅ Section deleted successfully!")
                            st.rerun()
    
    # Footer
    st.markdown("---")
    st.markdown("💡 **Tips:**")
    st.markdown("- Use descriptive titles for better organization")
    st.markdown("- Add multiple images to create engaging photo stacks")
    st.markdown("- Keep descriptions concise but informative")
    st.markdown("- Images should be in WebP format for best performance")

if __name__ == "__main__":
    main()

