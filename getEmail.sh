#!/bin/bash

[[ -z "$1" || ! -f "$1" ]] \
  && echo "missing or invalid filepath param" \
  && exit 1

id="$(hxselect -c "body > h::attr(id)" < "$1")"
rawctime="$(hxselect -c "body > h::attr(ctime)" < "$1")"
[[ "$(date +"%Y-%m-%d")" != "$rawctime" ]] \
  && echo "article ctime must be today" \
  && exit 1
ctime="$(date -d "$rawctime" +"%e. -%m %Y" \
  | sed 's/-01/ledna/; s/-02/února/; s/-03/března/; s/-04/dubna/; s/-05/května/; s/-06/června/; s/-07/července/; s/-08/srpna/; s/-09/září/; s/-10/října/; s/-11/listopadu/; s/-12/prosince/')"
heading="$(hxselect -c "body > h" < "$1")"
description="$(hxselect -c "body > h + desc" < "$1")"

cat << MSG
Článek Jaroslava Pavelky z $ctime je nyní dostupný na:
     www.pralek.cz/$id?usp=news

$heading
$description

-- 
Pro odhlášení z odběru novinek klikněte na následující odkaz:
*|UNSUB|*
MSG

