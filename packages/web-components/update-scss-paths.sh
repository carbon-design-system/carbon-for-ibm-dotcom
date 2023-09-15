#!/bin/bash

declare -a component_names

if ! command -v fswatch &>/dev/null; then
  echo "fswatch required (https://github.com/emcrisostomo/fswatch)"
  exit 1
fi

# Function to search and replace the string with proper escaping
search_and_replace_string() {
  directory="$1"
  search_string="$2"
  replace_string="$3"
  
  # search for scss files under directory
  find "$directory" -type f -name "*.scss" ! -path "*/__stories__/*" | while read -r scss_file; do
    # search and replace the string in the file
    sed -i "" "s#$search_string#$replace_string#g" "$scss_file"
		echo "Replaced imports in $scss_file"
  done
}

# monitor for file changes under the `styles` directory
fswatch -0 ../styles/ | while read -d "" changed_file
do
  component=$(basename "$(dirname "$changed_file")")
	target_directory="src/components/$component"

	if [[ ! " ${component_names[@]} " =~ " ${component} " ]]; then
    component_names+=("$component")
		search_and_replace_string "$target_directory" "@carbon/ibmdotcom-styles/scss/components" "../../../../styles/scss/components"
	fi
	
done

cleanup() {
	echo "Reverting styles imports"
	search_and_replace_string "src/components" "../../../../styles/scss/components" "@carbon/ibmdotcom-styles/scss/components"
}

trap cleanup EXIT
