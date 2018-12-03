#!/bin/bash

getValue() {
  val="${1#\"}"
  echo "${val%\"}"
}

MIN_COUNT=5
AGREGATOR_XML="plugins/Agregator/Agregator.xml"
INPUTVAR_XML="plugins/InputVar/InputVar.xml"
URLHANDLER_XML="plugins/UrlHandler/UrlHandler.xml"
sed -i '/for="/d' $AGREGATOR_XML
sed -i '/<data/d' $INPUTVAR_XML
sed -i '/<option /d' $INPUTVAR_XML
sed -i '/gen="gen"/d' $URLHANDLER_XML

sed -i "s/<UrlHandler>/<UrlHandler>\n<redir gen=\"gen\" parName='s'>https:\/\/www.google.com?sitesearch=www.pralek.cz\&amp;q=\$parvalue<\/redir>/" $URLHANDLER_XML

currentIds="$(for f in plugins/Agregator/koutek/*.html; do f="${f##*/}"; echo "${f%.html}"; done)"
export="$(curl 'https://docs.google.com/spreadsheets/d/18hz-SdBnXhB4CumVAEzZU5E5Rr6eUswvopMFb32QDPw/gviz/tq?tqx=out:csv&sheet=Export')"

exportIds=""
first=1
while IFS=, read -r id labels
do
  id="$(getValue "$id")"
  labels="$(getValue "$labels")"
  [[ $first == 1 ]] \
    && exportIds="${id}" \
    || exportIds="${exportIds}\n${id}"
  first=0
  file="plugins/Agregator/koutek/$id.html"
  sed -i "s/kw=\"[^\"]\+\"/kw=\"$labels\"/" "$file"
  sed -i "s/class=\"completable\">/class=\"completable\">\n<option class=\"article\" value=\"clanky\/$id\">$(hxselect -c "body > h" < "$file") #clanky\/$id<\/option>/" $INPUTVAR_XML
  sed -i "s/<UrlHandler>/<UrlHandler>\n<redir gen=\"gen\" parName='s' parValue='clanky\/$id'>$id?<\/redir>/" $URLHANDLER_XML
done <<< "$(echo "$export" | tail -n+2)"

diffOut="$(diff <(echo "$currentIds" | sort) <(echo -e "$exportIds" | sort))"
[[ -n "$diffOut" ]] \
  && echo "$diffOut" 1>&2

labels="$(curl 'https://docs.google.com/spreadsheets/d/18hz-SdBnXhB4CumVAEzZU5E5Rr6eUswvopMFb32QDPw/gviz/tq?tqx=out:csv&sheet=Labels')"

sed -i "s/<fn id=\"replacenames\" fn=\"replace\">/<fn id=\"replacenames\" fn=\"replace\">\n    <data name=\"\/?clanky=nejctenejsi\">\/<\/data>/" $INPUTVAR_XML
while IFS=, read -r label count
do
  label="$(getValue "$label")"
  count="$(getValue "$count")"
  if [[ $count -lt $MIN_COUNT ]]; then
    sed -i "s/<fn id=\"replacenames\" fn=\"replace\">/<fn id=\"replacenames\" fn=\"replace\">\n    <data name=\"\/?clanky=$label#koutek\"><\/data>/" $INPUTVAR_XML
    continue
  fi
  normalizedLabel="$(echo "$label" | iconv -f utf8 -t ascii//TRANSLIT | tr " " "_")"
  sed -i "s/<\/Agregator>/  <doclist id=\"$normalizedLabel\" kw=\"$label\" for=\"clanky\" \/>\n<\/Agregator>/" $AGREGATOR_XML
  sed -i "s/<fn id=\"replacenames\" fn=\"replace\">/<fn id=\"replacenames\" fn=\"replace\">\n    <data name=\"=$label\">=$normalizedLabel<\/data>/" $INPUTVAR_XML
  sed -i "s/class=\"completable\">/class=\"completable\">\n<option class=\"tag\" value=\"stitky\/$normalizedLabel\">$label ($count výskytů) #stitky\/$normalizedLabel<\/option>/" $INPUTVAR_XML
  sed -i "s/<UrlHandler>/<UrlHandler>\n<redir gen=\"gen\" parName='s' parValue='stitky\/$normalizedLabel'>\/?clanky=$normalizedLabel#koutek<\/redir>/" $URLHANDLER_XML
done <<< "$(echo "$labels" | tail -n+2)"

