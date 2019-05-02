<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  
  <xsl:param name="inputvar-odkazy_h" select="''"/>
  <xsl:param name="inputvar-odkazy_desc" select="''"/>
  <xsl:param name="inputvar-otazky_h" select="''"/>
  <xsl:param name="inputvar-otazky_desc" select="''"/>
  <xsl:param name="linklist" select="'&lt;p&gt;&lt;em&gt;Nebyly nalezeny žádné odkazy.&lt;/em&gt;&lt;/p&gt;'"/>
  <xsl:param name="agregator-current-stitek" select="'nejčtenější'"/>

<!--   <xsl:template match="div[@id = 'header']">
    <div id="header"><div>
      <form class="search" action="//google.com/search" method="get"><div>
        <input type="search" placeholder="Co Vás zajímá?" class="eventable" required="required" name="q"/>
        <button type="submit" title="Prohledat stránky Praléku">
          <span class="flaticon-magnifier56">Hledat</span>
        </button>
        <input type="hidden" value="www.pralek.cz" name="sitesearch"/>
      </div></form>
      <xsl:apply-templates/>
    </div></div>
  </xsl:template> -->
  
  <xsl:template match="h2[@id='clanky']">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
      <span>
        <a title="Aktuální filtr" class="tag nowarning"><xsl:value-of disable-output-escaping="yes" select="$agregator-current-stitek"/></a>
      </span>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="//body/div/div[contains(@class, 'section')]">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
      <h2 id="internetguru">Tento web roste s námi</h2>
      <p class="description">O tento web se stará <a href="https://www.internetguru.cz">Internet Guru</a> od roku 2007. Po celou dobu web neustále roste a pomáhá <strong>desítkám tisícům unikátních návštěvníků měsíčně</strong>!</p>
      <div class="list"><ul>
        <li>Perfektní čitelnost na všech zařízeních</li>
        <li>Publikační proces s autorizací změn a testovacím webem</li>
        <li>Správa štítků jednoduše v tabulce Excel / Spreadsheet</li>
        <li>Neustálý rozvoj funkcí a vylepšování uživatelské zkušenosti</li>
        <li>Podrobné statistiky návštěvnosti</li>
      </ul></div>
      <p>Chcete také publikovat na internetu?</p>
      <div class="contentbalancer-simple">
        <ul>
          <li><a href="https://www.rostouciweby.cz" title="Rostoucí weby">Zjistit více o rostoucích webech!</a></li>
        </ul>
      </div>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="div[ol[contains(@class, 'otazky')]]">
    <xsl:copy-of select="."/>
    <h2 id="docinfo" class="hide">Informace o článku</h2>
    <xsl:copy-of select="//ul[@class = 'docinfo nomultiple global']"/>
    <xsl:copy-of select="//ul[@class = 'share nomultiple']"/>
    
    <p>Víte, že Pralék je nevýdělečnou aktivitou autora? Jakýmkoli finančním příspěvkem podpoříte rozvoj Praléku. <dd class="contentbalancer-simple"><ul>
      <li><a href="pralek#sponzoring">Jak to funguje</a></li>
      <li class="donation"><a href="https://www.patreon.com/pralek">Staňte se patronem</a></li>
      </ul></dd>
    </p>

<!--     
    <h2 id="zpetna_vazba" class="hide">Zpětná vazba</h2>
    <dl>
      <dt>Byl pro Vás tento článek přínosný?</dt>
      <dd>
        <a class="nowarning eventable button">ano</a>
        <dl>
          <dt>Co byste vzkázali autorovi nebo ostatním čtenářům? Jak byl pro Vás článek nebo celý Pralék přínosný?</dt>
          <dd><label for="feedback-possitive-comment">Komentář</label></dd>
          <dd>
            <textarea name="feedback-possitive-comment" id="feedback-possitive-comment" placeholder="">
* Článek pomohl mně nebo mému blízkému s uzdravením.
* Jako zdravotníkovi mi článek pomohl pochopit problematiku.
* Na Pralék se obracím, když…
            </textarea>
          </dd>
          <dd><label for="feedback-possitive-email">E-mail (nepovinné)</label></dd>
          <dd><input type="email" name="feedback-possitive-email" id="feedback-possitive-email"/></dd>
          <dd>Autoři nejlepších komentářů obdrží nabídku zveřejnění komentářů na webu.</dd>
          <dt>Víte, že Pralék je nevýdělečnou aktivitou autora? Jakýmkoli finančním příspěvkem podpoříte rozvoj Praléku.</dt>
          <dd class="contentbalancer-simple"><ul>
            <li><a href="pralek#sponzoring">Jak to funguje</a></li>
            <li class="donation"><a href="https://www.patreon.com/pralek">Staňte se patronem</a></li>
            </ul>
          </dd>
        </dl>
      </dd>
      <dd>
        <a class="nowarning eventable button">ne</a>
        <dl>
          <dt>Co Vám ve článku nebo na Praléku obecně chybí?</dt>
          <dd><label for="feedback-negative-comment">Komentář</label></dd>
          <dd>
            <textarea name="feedback-negative-comment" id="feedback-negative-comment" placeholder="">
* Článek je příliš neodborný a obshuje málo zdrojů.
* Jsem v rozpacích, neboť mi můj lékař doporučil pravý opak.
* #TODO
            </textarea>
          </dd>
          <dd><label for="feedback-negative-email">E-mail (nepovinné)</label></dd>
          <dd><input type="email" name="feedback-negative-email" id="feedback-negative-email"/></dd>
          <dt>Pomohla by veřejná diskuze, osobní konzultace či jiné rozšíření Praléku?</dt>
          <dd class="contentbalancer-simple"><ul>
            <li><a href="pralek#sponzoring">Jak to funguje</a></li>
            <li class="donation"><a href="https://www.patreon.com/pralek">Staňte se patronem</a></li>
            </ul>
          </dd>
        </dl>
      </dd>
    </dl> -->
    
  </xsl:template>
  
  <xsl:template match="//ul[@class = 'docinfo nomultiple global']"/>
  <xsl:template match="//ul[@class = 'share nomultiple']"/>
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
