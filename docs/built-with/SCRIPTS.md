## Scripts

Create [scripts/cp-dep.sh](../../scripts/cp-dep.sh) with the following to copy a dependency from one `package.json` to another:

```bash
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
```

Create [scripts/cp-all-dep.sh](../../scripts/cp-all-dep.sh) with the following to copy all dependencies from one `package.json` to another:

```bash
#!/usr/bin/env bash

# This script copies all dependencies from source-package.json to target-package.json

# Example usage:
# ./cp-all-deps.sh target-package.json
# ./cp-all-deps.sh target-package.json source-package.json dependencies
# ./cp-all-deps.sh target-package.json source-package.json devDependencies

target="$1"
source="${2:-package.json}"
section="${3:-dependencies}" # or devDependencies

if [ -z "$source" ] || [ -z "$target" ]; then
  echo "Usage: $0 <source-package.json> <target-package.json> [section]"
  exit 1
fi
if [ ! -f "$source" ] || [ ! -f "$target" ]; then
  echo "Source or target file does not exist."
  exit 1
fi

# Read all dependencies from source and copy them to target
dependencies=$(jq -r --arg section "$section" '.[$section] | keys[]' "$source")
for pkg in $dependencies; do
  version=$(jq -r --arg pkg "$pkg" '.dependencies[$pkg] // .devDependencies[$pkg]' "$source")

  if [ "$version" != "null" ]; then
    jq --arg pkg "$pkg" --arg version "$version" \
        ".$section[\$pkg] = \$version" "$target" > "$target.tmp" && mv "$target.tmp" "$target"
    echo "✅ Updated $pkg@$version in $target"
  else
    echo "❌ Package $pkg not found in $source"
  fi
done

echo "All dependencies from $source copied to $target under section '$section'."
```
