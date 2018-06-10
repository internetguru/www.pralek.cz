<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:param name="agregator-docinfo" select="''"/>

  <xsl:template match="div[@id = 'content']">
    <div id="content" class="article"><div>
      <xsl:value-of disable-output-escaping="yes" select="$agregator-docinfo"/>
      <xsl:apply-templates/>
    </div></div>
    <div id="docfooter">
      <ul>
        <li><a href="koutek#archiv">yDalší články lékařova koutku</a> (kompletní seznam).</li>
        <li><a href="upozorneni">Odebírejte krátká upozornění na nově vyšlé články lékařova koutku.</a></li>
      </ul>
    </div>
  </xsl:template>

  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>