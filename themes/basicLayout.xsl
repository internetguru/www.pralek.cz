<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:param name="breadcrumb" select="''"/>

  <xsl:template match="/body">
    <body>
      <xsl:copy-of select="@*"/>
      <xsl:attribute name="class">
        <xsl:value-of select="concat(@class,' fragmentable scrolltopable')"/>
      </xsl:attribute>
     <div id="header">
        <xsl:value-of disable-output-escaping="yes" select="$breadcrumb"/>
      </div>
      <div id="content"><div>
        <xsl:apply-templates/>
      </div></div>
    </body>
  </xsl:template>

  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
