#!/usr/bin/env bash

# This script copies a single dependency from source-package.json to target-package.json

# Example usage:
# ./cp-dep.sh package-name target-package.json
# ./cp-dep.sh package-name target-package.json source-package.json dependencies
# ./cp-dep.sh package-name target-package.json source-package.json devDependencies

pkg="$1"
target="$2"
source="${3:-package.json}"
section="${4:-dependencies}" # or devDependencies

version=$(jq -r --arg pkg "$pkg" '.dependencies[$pkg] // .devDependencies[$pkg]' "$source")

if [ "$version" != "null" ]; then
  jq --arg pkg "$pkg" --arg version "$version" \
      ".$section[\$pkg] = \$version" "$target" > "$target.tmp" && mv "$target.tmp" "$target"
  echo "✅ Updated $pkg@$version in $target"
else
  echo "❌ Package $pkg not found in $source"
fi
