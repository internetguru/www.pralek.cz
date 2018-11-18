#!/bin/bash

getValue() {
  val="${1#\"}"
  echo "${val%\"}"
}

labels="$(curl 'https://docs.google.com/spreadsheets/d/18hz-SdBnXhB4CumVAEzZU5E5Rr6eUswvopMFb32QDPw/gviz/tq?tqx=out:csv&sheet=Labels')"

MIN_COUNT=5
AGREGATOR_XML="plugins/Agregator/Agregator.xml"
INPUTVAR_XML="plugins/InputVar/InputVar.xml"
sed -i '/for="/d' $AGREGATOR_XML 
sed -i '/<data/d' $INPUTVAR_XML 

sed -i "s/<fn id=\"replacenames\" fn=\"replace\">/<fn id=\"replacenames\" fn=\"replace\">\n    <data name=\"?clanky=nejctenejsi\"><\/data>/" $INPUTVAR_XML
while IFS=, read -r label count
do
  label="$(getValue "$label")"
  count="$(getValue "$count")"
  if [[ $count -lt $MIN_COUNT ]]; then
    sed -i "s/<fn id=\"replacenames\" fn=\"replace\">/<fn id=\"replacenames\" fn=\"replace\">\n    <data name=\"?clanky=$label#koutek\">#neaktivni<\/data>/" $INPUTVAR_XML
    continue
  fi
  normalizedLabel="$(echo "$label" | iconv -f utf8 -t ascii//TRANSLIT | tr " " "_")"
  sed -i "s/<\/Agregator>/  <doclist id=\"$normalizedLabel\" kw=\"$label\" for=\"clanky\" \/>\n<\/Agregator>/" $AGREGATOR_XML
  sed -i "s/<fn id=\"replacenames\" fn=\"replace\">/<fn id=\"replacenames\" fn=\"replace\">\n    <data name=\"=$label\">=$normalizedLabel<\/data>/" $INPUTVAR_XML
done <<< "$labels"

export="$(curl 'https://docs.google.com/spreadsheets/d/18hz-SdBnXhB4CumVAEzZU5E5Rr6eUswvopMFb32QDPw/gviz/tq?tqx=out:csv&sheet=Export')"

while IFS=, read -r url labels
do
  url="$(getValue "$url")"
  labels="$(getValue "$labels")"
  id="${url##*/}"
  file="plugins/Agregator/koutek/$id.html"
  sed -i "s/kw=\"[^\"]\+\"/kw=\"$labels\"/" "$file"
done <<< "$(echo "$export" | tail -n+2)"

