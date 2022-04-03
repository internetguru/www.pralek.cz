#!/bin/bash
for f in plugins/Agregator/clanky/*.html; do
  fname="${f##*/}"
  fname="${fname%.html}"
  id="$(hxselect -c "body > h::attr(id)" < "$f")"
  ctime="$(hxselect -c "body > h::attr(ctime)" < "$f")"
  mtime="$(hxselect -c "body > h::attr(mtime)" < "$f")"
  kw="$(hxselect -c "body > h + desc::attr(kw)" < "$f")"
  heading="$(hxselect -c "body > h" < "$f")"
  short="$(hxselect -c "body > h::attr(short)" < "$f")"
  echo -e "$id;$fname;$kw;$heading;$short;$ctime;$mtime"
done

