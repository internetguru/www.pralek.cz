<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" 
                xmlns:math="http://exslt.org/math"
                extension-element-prefixes="math">
  
  <xsl:template match="div[contains(@class, 'section')]//p">
    <xsl:variable name="pos"><xsl:number level="any"/></xsl:variable>
    <xsl:variable name="rand"><xsl:value-of select="(floor(math:random()*3) mod 3) + 1" /></xsl:variable>
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
    <p class="ad" var="cms-server">
    <xsl:if test="($pos mod 5) = 1">
      <xsl:choose>
        <xsl:when test="$rand = 1">
          [1]
        </xsl:when>
        <xsl:when test="$rand = 2">
          [2]
        </xsl:when>
        <xsl:when test="$rand = 3">
          [3]
        </xsl:when>
      </xsl:choose>
    </xsl:if>
    </p>
  </xsl:template>
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
