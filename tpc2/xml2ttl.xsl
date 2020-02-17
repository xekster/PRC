<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="text"/>
    
    <xsl:template match="obra">
        ###  http://www.semanticweb.org/xekster/ontologies/2020/arquivoMusical#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Obra ;
        :titulo "<xsl:value-of select="titulo"/>"^^xsd:string ;
        :tipo "<xsl:value-of select="tipo"/>"^^xsd:string ;
        :compositor "<xsl:value-of select="compositor"/>"^^xsd:string ;
        :arranjo "<xsl:value-of select="arranjo"/>"^^xsd:string ;
        <xsl:for-each select="instrumentos/instrumento">
            :contem :<xsl:value-of select="translate(designacao, ' ','')"/>-<xsl:value-of select="../../@id"/>-<xsl:value-of select="partitura/@voz"/> ;
        </xsl:for-each> .
        <xsl:apply-templates select="instrumentos" mode="a"/>
    </xsl:template>
    
    <xsl:template match="instrumento" mode="a">
        ###  http://www.semanticweb.org/xekster/ontologies/2020/arquivoMusical#<xsl:value-of select="translate(designacao, ' ','')"/>-<xsl:value-of select="../../@id"/>-<xsl:value-of select="partitura/@voz"/>
        :<xsl:value-of select="translate(designacao, ' ','')"/>-<xsl:value-of select="../../@id"/>-<xsl:value-of select="partitura/@voz"/> rdf:type owl:NamedIndividual ,
        :Instrumento ;
        :participaEm :<xsl:value-of select="../../@id"/>;
        :designação "<xsl:value-of select="translate(designacao, ' ','')"/>"^^xsd:string;
        <xsl:for-each select="partitura">
        :partitura "<xsl:value-of select="@clave"/>-<xsl:value-of select="@path"/>"^^xsd:string ;
        </xsl:for-each> .
    </xsl:template>
    
</xsl:stylesheet>