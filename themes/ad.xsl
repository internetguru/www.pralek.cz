<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" 
                xmlns:math="http://exslt.org/math"
                extension-element-prefixes="math">
  
  <xsl:template match="/body[contains(@class, 'agregator')]//div[contains(@class, 'part')][last() - position() &gt; 4][position() &gt; 1]//h2">
    <xsl:variable name="rand"><xsl:value-of select="floor(math:random()*3)" /></xsl:variable>
<!--     <xsl:if test="math:random() &lt; 0.5"> -->
      <div class="list"><ul class="ad" var="cms-server">
        <xsl:choose>
          <xsl:when test="$rand = 0">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
            <li><a href="#ebook" class="button button--simple button--img button--img-inline"><span class="fab fa-fw fa-book-medical">i</span> Nová elektronická kniha</a></li>
          </xsl:when>
          <xsl:when test="$rand = 1">
            <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</li>
            <li><a href="#ebook" class="button button--simple button--img button--img-inline"><span class="fab fa-fw fa-book-medical">i</span> Nová elektronická kniha</a></li>
          </xsl:when>
          <xsl:when test="$rand = 2">
            <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
            <li><a href="#ebook" class="button button--simple button--img button--img-inline"><span class="fab fa-fw fa-book-medical">i</span> Nová elektronická kniha</a></li>
          </xsl:when>
        </xsl:choose>
      </ul></div>
<!--     </xsl:if> -->
      <xsl:copy>
        <xsl:apply-templates select="node()|@*"/>
      </xsl:copy>
  </xsl:template>
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
