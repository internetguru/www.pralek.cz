<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  
  <xsl:param name="inputvar-odkazy_h" select="''"/>
  <xsl:param name="inputvar-odkazy_desc" select="''"/>
  <xsl:param name="inputvar-otazky_h" select="''"/>
  <xsl:param name="inputvar-otazky_desc" select="''"/>
  <xsl:param name="linklist" select="'&lt;p&gt;&lt;em&gt;Nebyly nalezeny žádné odkazy.&lt;/em&gt;&lt;/p&gt;'"/>

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
  
  <xsl:template match="h2[contains(@id, 'otazky')]">
    <ul class="docinfo nomultiple global">
    <xsl:template match="//ul[@class = 'docinfo nomultiple global'] li[not(contains(@class, 'kw')]"/>
    </ul>
  </xsl:template>
  
  <xsl:template match="//ul[@class = 'docinfo nomultiple global'] li[not(contains(@class, 'kw')]"/>

  <xsl:template match="div[contains(@class, 'hdesc')]">
    <xsl:copy-of select="."/>
<!--     <xsl:copy-of select="//ul[@class = 'docinfo nomultiple global']"/> -->
<!--     <div id="docfooter">
      <ul>
        <li><a href="pralek/archiv">Další články lékařova koutku</a> (kompletní seznam).</li>
        <li><a href="upozorneni">Odebírejte krátká upozornění na nově vyšlé články lékařova koutku.</a></li>
      </ul>
    </div> -->
  </xsl:template>
  
<!--   <xsl:template match="//ul[@class = 'docinfo nomultiple global']"/> -->
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
