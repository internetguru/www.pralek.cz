#!/bin/bash

csv="$(curl 'https://docs.google.com/spreadsheets/d/18hz-SdBnXhB4CumVAEzZU5E5Rr6eUswvopMFb32QDPw/export?format=csv&id=18hz-SdBnXhB4CumVAEzZU5E5Rr6eUswvopMFb32QDPw&gid=0')"

MIN_COUNT=5
AGREGATOR_XML="plugins/Agregator/Agregator.xml"
sed -i '/for="/' $AGREGATOR_XML 

while IFS=, read -r url label count null
do
  [[ $count -lt $MIN_COUNT ]] && continue;
  id="${url##*/}"
  sed -i "s/<\/Agregator>/<doclist id=\"$normalizedLabel\" kw=\"$label\" for=\"clanky\" \/>\n<\/Agregator>/" $AGREGATOR_XML
done <<< "$csv"

