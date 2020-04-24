# scrapingtripadvisore
## La idea es utilizar herramientas de scraping en node.

> La idea general es hacer una busqueda por alguna categoria y poder sacar algunos datos
> de los resultados. Inicialmente, nombre, direccion, localidad, telefono y mail.

- [X] Leer los resultados de una de las paginas de resultado
- [X] Por ahora exportar a un archivo .csv
- [X] Por ahora tomar dos argumentos como parametros (url y nombreArchivo)
- [ ] Con la url poder calcular la siguiente pagina (se puede)
   - [ ] Con la url inicial, nos muestra cantidad de resultados y el paginado 
         Con esos datos podemos calcular la siguiente tanda de resultados, tiene
         un patron la url.

- [ ] Crear un archivo scrap.js y utilizarlo desde index.js
- [ ] Crear un server para exponer el endpoint para tomar los parametros
- [ ] Crear un endopoint para exportar como archivo .cvs|.json los resultados

