#!/usr/bin/env bash

pkg="$1"
source="$2"
target="$3"
section="${4:-dependencies}" # or devDependencies

version=$(jq -r --arg pkg "$pkg" '.dependencies[$pkg] // .devDependencies[$pkg]' "$source")

if [ "$version" != "null" ]; then
  jq --arg pkg "$pkg" --arg version "$version" \
      ".$section[\$pkg] = \$version" "$target" > "$target.tmp" && mv "$target.tmp" "$target"
  echo "✅ Updated $pkg@$version in $target"
else
  echo "❌ Package $pkg not found in $source"
fi
