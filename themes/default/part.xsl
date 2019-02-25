<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  
  <xsl:template match="//h2[1]">
    <xsl:text disable-output-escaping="yes">&lt;div class="part </xsl:text>
<!--     <xsl:value-of select="@id"/> -->
    <xsl:text disable-output-escaping="yes">"&gt;</xsl:text>
    <xsl:copy-of select="."/>
  </xsl:template>
  
  <xsl:template match="//h2[position() > 1]">
    <xsl:text disable-output-escaping="yes">&lt;/div&gt;</xsl:text>
    <xsl:text disable-output-escaping="yes">&lt;div class="part </xsl:text>
<!--     <xsl:value-of select="@id"/> -->
    <xsl:text disable-output-escaping="yes">"&gt;</xsl:text>
    <xsl:copy-of select="."/>
  </xsl:template>
  
  <xsl:template match="//body/div/div[contains(@class,'section')]">
    <div>
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates/>
    </div>
    <xsl:text disable-output-escaping="yes">&lt;/div&gt;</xsl:text>
  </xsl:template>
  
  
  <xsl:template match="//body/div/p[contains(@class,'description')]">
    <xsl:text disable-output-escaping="yes">&lt;div class="part"&gt;</xsl:text>
<!--     <xsl:copy-of select="."/> -->
    <xsl:text disable-output-escaping="yes">&lt;/div&gt;</xsl:text>
  </xsl:template>
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>
  
</xsl:stylesheet>