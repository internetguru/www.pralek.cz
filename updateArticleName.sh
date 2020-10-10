#!/bin/bash

normalize() {
  echo "$1" | iconv -f utf8 -t ascii//TRANSLIT | tr " " "_"
}


path="$1"
short="$2"
long="$3"

[[ -z "$path" || -z "$short" || -z "$long" ]] \
  && echo "Usage: ./updateArticleName.sh ARTICLE_PATH SHORT LONG" >&2 \
  && exit 2

[[ ! -f "$path" ]] \
  && echo "Article '$path' does not exists" \
  && exit 1

sed -i '/author=/s/ short="[^"]\+"/ short="'"$short"'"/' "$path"
sed -i "/author=/s/>[^<]\+/>$long</" "$path"
id="$(normalize "$short")"
sed -i '/author=/s/ id="[^"]\+"/ id="'"$id"'"/' "$path"

newpath="$(dirname "$path")/$id.html"
mv "$path" "$newpath"
git add .
git commit -m "updateArticleName.sh autocommit" -- "$newpath"

