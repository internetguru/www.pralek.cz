<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  
  <xsl:param name="cms-link" select="''"/>
  
  <!-- keep only elements matching data-visibility="$cms-link" -->
  <xsl:template match="//*[@data-visibility]">
    <xsl:variable name="visibility" select="@data-visibility"/>
    <xsl:if test="$cms-link = $visibility">
      <xsl:copy>
        <xsl:apply-templates select="node()|@*"/>
      </xsl:copy>
    </xsl:if>
  </xsl:template>

  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>