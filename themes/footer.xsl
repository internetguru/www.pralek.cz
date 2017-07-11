<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:param name="cms-title" select="''"/>
  <xsl:param name="contentlink-bc" select="''"/>
  <xsl:param name="globalmenu" select="''"/>
  <xsl:param name="agregator-filepath" select="''"/>

  <xsl:param name="cms-lang" select="''"/>
  <xsl:param name="cms-author" select="''"/>
  <xsl:param name="cms-authorid" select="''"/>
  <xsl:param name="cms-resp" select="''"/>
  <xsl:param name="cms-respid" select="''"/>
  <xsl:param name="cms-ctime" select="''"/>
  <xsl:param name="cms-mtime" select="''"/>
  <xsl:param name="cms-version" select="''"/>
  <xsl:param name="cms-desc" select="''"/>
  <xsl:param name="cms-kw" select="''"/>
  <xsl:param name="cms-url" select="''"/>
  <xsl:param name="cms-uri" select="''"/>
  <xsl:param name="cms-link" select="''"/>
  <xsl:param name="cms-logged_user" select="''"/>
  <xsl:param name="cms-super_user" select="''"/>
  <xsl:param name="cms-admin_id" select="''"/>

  <xsl:param name="contentlink-lang" select="''"/>
  <xsl:param name="contentlink-author" select="''"/>
  <xsl:param name="contentlink-authorid" select="''"/>
  <xsl:param name="contentlink-resp" select="''"/>
  <xsl:param name="contentlink-respid" select="''"/>
  <xsl:param name="contentlink-ctime" select="''"/>
  <xsl:param name="contentlink-mtime" select="''"/>

  <xsl:param name="inputvar-myctime" select="''"/>
  <xsl:param name="inputvar-mymtime" select="''"/>
  <xsl:param name="inputvar-linkmtime" select="''"/>
  <xsl:param name="inputvar-linkctime" select="''"/>
  <xsl:param name="inputvar-creation" select="''"/>
  <xsl:param name="inputvar-cyear" select="''"/>
  <xsl:param name="inputvar-year" select="''"/>
  <xsl:param name="inputvar-service_html" select="''"/>

  <xsl:template match="/body">
    <body>
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates/>
      <div id="footer">
        <dl>
          <dt>Autor</dt>
          <dd>MUDr. Jaroslav Pavelka, <a href="mailto:mudr.pavelka@pralek.cz">mudr.pavelka@pralek.cz</a></dd>
          <dt>©&#160;<xsl:value-of disable-output-escaping="yes" select="$inputvar-cyear"/>–<xsl:value-of disable-output-escaping="yes" select="$inputvar-year"/></dt>
          <dd>Všechna práva vyhrazena</dd>
          <dt class="link">Odkaz</dt>
          <dd class="link"><xsl:value-of select="$cms-uri"/></dd>
          <dt>Na službě</dt>
          <dd><xsl:value-of disable-output-escaping="yes" select="$inputvar-service_html"/></dd>
        </dl>
      </div>
    </body>
  </xsl:template>

  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>