#!/bin/bash

article="$1"
[[ -z "$article" || ! -f "$article" ]] \
  && echo "Article '$article' does not exists" \
  && exit 1

# load attrs
articleContent="$(< "$article")"
ctime="$(echo "$articleContent" | hxselect -c "body > h::attr(ctime)")"
mtime="$(echo "$articleContent" | hxselect -c "body > h::attr(mtime)")"
short="$(echo "$articleContent" | hxselect -c "body > h::attr(short)")"
id="$(echo "$articleContent" | hxselect -c "body > h::attr(id)")"
kws="$(echo "$articleContent" | hxselect -c "body > h + desc::attr(kw)")"

# create params
kws="#$(echo "$kws" | sed 's/\(\w\) /\1_/g;s/-/_/g;s/, / #/g')"

[[ -z "$short" ]] \
  && short="$(echo "$articleContent" | hxselect -c "body > h")"

msg="Vydali jsme nový článek na téma $short"$'\n'"$kws"
[[ "$ctime" != "$mtime" ]] \
 && msg="Článek na téma $short prošel významnou revizí"$'\n'"$kws" \
 && ctime="$mtime"

# get response
response="$(fbpost "$TOKEN" "954536198012085" "$msg" "$ctime" "https://www.pralek.cz/$id?usp=fb")"
[[ $? != 0 ]] \
  && echo -e "Unable to create Facebook post:\n$response" \
  && exit 1

# add data-fbcommentid
sed -i "s/<body/<body data-fbcommentid=\"$response\"/" "$article"

