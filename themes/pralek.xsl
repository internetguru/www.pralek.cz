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
        <a title="Aktuální filtr" class="tag nowarning"><span class="fas fa-tag">i</span><xsl:value-of disable-output-escaping="yes" select="$agregator-current-stitek"/></a>
      </span>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="//body/div/div[contains(@class, 'section')]">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
      <div class="part internetguru">
        <h2 id="internetguru">Tento web roste s námi</h2>
        <p class="description">O tento web se stará <a href="https://www.internetguru.cz">Internet Guru</a> od roku 2007. Po celou dobu web neustále roste a pomáhá <strong>desítkám tisícům unikátních návštěvníků měsíčně</strong>!</p>
        <ul class="list--ico">
          <li><span class="fas fa-fw fa-check">i</span>Perfektní čitelnost na všech zařízeních</li>
          <li><span class="fas fa-fw fa-check">i</span>Publikační proces s autorizací změn a testovacím webem</li>
          <li><span class="fas fa-fw fa-check">i</span>Správa štítků jednoduše v tabulce Excel / Spreadsheet</li>
          <li><span class="fas fa-fw fa-check">i</span>Neustálý rozvoj funkcí a vylepšování uživatelské zkušenosti</li>
          <li><span class="fas fa-fw fa-check">i</span>Podrobné statistiky návštěvnosti</li>
        </ul>
        <p>Chcete také publikovat na internetu?</p>
        <ul class="button-list">
          <li class="rw"><a href="https://www.rostouciweby.cz" title="Rostoucí weby" class="button button--img button--img-inline"><span class="fas fa-fw fa-seedling">i</span> Zjistit více o rostoucích webech!</a></li>
        </ul>
      </div>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="//div[@class='part dotace']">
    <div class="part docinfo">
      <xsl:copy-of select="//div[@id='content']/div[@class='list list-wrapper--multiple'][last()]"/>
    </div>
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
      <div id="feedback">
        <p>Víte, že Pralék je nevýdělečnou aktivitou autora? Jakýmkoli finančním příspěvkem podpoříte rozvoj Praléku.</p>
        <ul class="button-list button-list--ico">
          <li><a href="#sponzoring"><span class="fas fa-fw fa-chart-line">i</span> Jak podpořit Pralék</a></li>
          <li class="donation"><a href="https://www.patreon.com/pralek" class="button button--img button--img-inline"><span class="fab fa-fw fa-patreon">i</span> Staňte se patronem</a></li>
        </ul>
      </div>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="//div[@id='content']/div[@class='list list-wrapper--multiple'][last()]"/>
    
  <xsl:template match="//*[contains(@class, 'example')]">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <span class="fas fa-fw fa-info">i</span>
      <xsl:apply-templates select="node()"/>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="//*[contains(@class, 'important')]">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <span class="fas fa-fw fa-exclamation">i</span>
      <xsl:apply-templates select="node()"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
