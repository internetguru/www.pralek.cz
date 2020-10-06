<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" 
                xmlns:math="http://exslt.org/math"
                extension-element-prefixes="math">
  
  <xsl:template match="div[contains(@class, 'section')]//p">
    <xsl:variable name="pos"><xsl:number level="any"/></xsl:variable>
    <xsl:variable name="cnt"><xsl:value-of select="count(//p)"/></xsl:variable>
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
    <xsl:if test="($pos mod 5) = 1">
      <xsl:value-of select="(floor(math:random()*10) mod 10) + 1" />
    </xsl:if>
  </xsl:template>
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
