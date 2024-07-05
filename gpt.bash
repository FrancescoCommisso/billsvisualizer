#!/bin/bash

# Function to display usage
usage() {
  echo "Usage: $0 [folder_path]"
  exit 1
}

# Set the folder path to the current directory if not specified
FOLDER_PATH=${1:-.}

# Output file
OUTPUT_FILE="project_contents.txt"

# Function to recursively process files
process_files() {
  local dir=$1
  for file in "$dir"/*; do
    # Ignore node_modules and .env files
    if [[ "$file" == *node_modules* ]] || [[ "$file" == *".env"* ]]; then
      continue
    fi

    if [ -d "$file" ]; then
      process_files "$file"
    elif [ -f "$file" ]; then
      # Process only .js and .css files
      if [[ "$file" == *.js ]] || [[ "$file" == *.css ]]; then
        echo "==== File: $file ====" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        echo -e "\n" >> "$OUTPUT_FILE"
      fi
    fi
  done
}

# Function to generate directory structure using find
generate_tree() {
  local dir=$1
  echo "==== Project Tree ====" >> "$OUTPUT_FILE"
  find "$dir" -type d \( -name node_modules -o -name .env \) -prune -o -type f \( -name '*.js' -o -name '*.css' \) -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g' >> "$OUTPUT_FILE"
  echo -e "\n" >> "$OUTPUT_FILE"
}

# Main execution
if [ ! -d "$FOLDER_PATH" ]; then
  echo "Error: Directory $FOLDER_PATH does not exist."
  usage
fi

# Clear the output file
> "$OUTPUT_FILE"

# Generate tree and process files
generate_tree "$FOLDER_PATH"
process_files "$FOLDER_PATH"

echo "Project contents saved to $OUTPUT_FILE"
