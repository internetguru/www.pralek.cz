#!/bin/bash

article="$1"
[[ -z "$article" || ! -f "$article" ]] \
  && echo "Article '$article' does not exists" \
  && exit 1

customMsg="$2"

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

# create message
msg="Vydali jsme nový článek na téma $short"
if [[ -n "$customMsg" ]]; then
  msg="${customMsg/\$short/$short}"
elif [[ "$ctime" != "$mtime" ]]; then
 msg="Článek na téma $short prošel významnou revizí"
 ctime="$mtime"
fi
msg="$msg"$'\n'"$kws"

[[ -n "$DEBUG" ]] \
  && echo "$msg" \
  && exit 0

ctime="${ctime}T18:00:00Z"

# get response
response="$(fbpost "$TOKEN" "954536198012085" "$msg" "$ctime" "https://www.pralek.cz/$id?usp=fb")"
[[ $? != 0 ]] \
  && echo -e "Unable to create Facebook post:\n$response" \
  && exit 1

# add data-fbcommentid
sed -i "s/<body/<body data-fbcommentid=\"$response\"/" "$article"

